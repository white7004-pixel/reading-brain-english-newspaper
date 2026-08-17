import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleEditor } from "@/components/studio/article-editor";
import { ReviewPanel } from "@/components/studio/review-panel";
import { StudioApp } from "@/components/studio/studio-app";
import { StudioPreview } from "@/components/studio/studio-preview";
import { completeStage } from "@/lib/studio-workflow";
import type { StudioArticle } from "@/lib/studio-types";
import { createMemoryStorage, makePublishedArticle, makeStudioArticle } from "./studio-fixtures";

const NOW = "2026-08-18T09:00:00.000Z";

function makeFullyReviewedArticle(): StudioArticle {
  const facts = completeStage(makeStudioArticle(), "facts", "fact-checker", "2026-08-18T06:00:00.000Z");
  const language = completeStage(facts, "language", "language-reviewer", "2026-08-18T07:00:00.000Z");
  return completeStage(language, "age", "age-reviewer", "2026-08-18T08:00:00.000Z");
}

function StudioEditorHarness({ initialArticle }: { initialArticle: StudioArticle }) {
  const [article, setArticle] = useState(initialArticle);

  return (
    <>
      <ArticleEditor article={article} onArticleChange={setArticle} now={() => NOW} />
      <ReviewPanel article={article} onArticleChange={setArticle} actor="reviewer-1" now={() => NOW} />
    </>
  );
}

function LivePreviewHarness({ initialArticle }: { initialArticle: StudioArticle }) {
  const [article, setArticle] = useState(initialArticle);
  return <>
    <ArticleEditor article={article} onArticleChange={setArticle} now={() => NOW} />
    <StudioPreview article={article} onArticleChange={setArticle} actor="previewer" now={() => NOW} />
    <ReviewPanel article={article} onArticleChange={setArticle} actor="reviewer-1" now={() => NOW} />
  </>;
}

test("누락된 출처를 표시하고 사실 검수 완료를 막는다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeStudioArticle({ sources: [] })} />);

  await user.click(screen.getByRole("button", { name: "사실·출처 검수 완료" }));

  expect(screen.getByText("출처를 한 개 이상 추가해 주세요.")).toBeInTheDocument();
  expect(screen.queryByText("사실·출처 검수 완료됨")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "출처로 이동" })).toHaveAttribute("href", "#studio-field-sources");
});

test("모든 단계를 완료한 뒤에만 승인과 발행이 활성화된다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeFullyReviewedArticle()} />);

  const approve = screen.getByRole("button", { name: "최종 승인" });
  expect(approve).toBeEnabled();
  expect(screen.getByRole("button", { name: "발행" })).toBeDisabled();

  await user.click(approve);

  expect(screen.getByRole("button", { name: "발행" })).toBeEnabled();
});

test("필드와 배열 항목을 수정할 때 작업 버전을 갱신하고 저장 상태를 표시한다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makePublishedArticle()} />);

  const title = screen.getByRole("textbox", { name: "영문 제목" });
  await user.clear(title);
  await user.type(title, "A New Rainforest");
  await user.click(screen.getByRole("button", { name: "본문 페이지 추가" }));

  expect(title).toHaveValue("A New Rainforest");
  expect(screen.getByText("저장됨")).toBeInTheDocument();
  expect(screen.getByText("작업 버전 2")).toBeInTheDocument();
  expect(screen.getAllByRole("textbox", { name: /본문 페이지 \d+/ })).toHaveLength(4);
});

test("발행 취소 전에 확인을 요구한다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makePublishedArticle()} />);

  await user.click(screen.getByRole("button", { name: "발행 취소" }));

  const confirmation = screen.getByRole("group", { name: "발행 취소 확인" });
  expect(within(confirmation).getByText("학습자 목록에서 이 콘텐츠를 내릴까요?")).toBeInTheDocument();
  await user.click(within(confirmation).getByRole("button", { name: "취소 유지" }));
  expect(screen.queryByRole("group", { name: "발행 취소 확인" })).not.toBeInTheDocument();
});

test("작업 버전을 실제 리더로 미리 보고 리더 동작을 편집 상태와 분리한다", async () => {
  const user = userEvent.setup();
  const article = makeStudioArticle({
    title: "Working Copy",
    pages: ["First working page.", "Second working page."],
    vocabulary: [],
  });
  const frozenArticle = structuredClone(article);

  render(<StudioPreview article={article} />);

  expect(screen.getByRole("heading", { name: "Working Copy" })).toBeInTheDocument();
  expect(screen.getByText("First working page.")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "다음 페이지" }));
  expect(screen.getByText("Second working page.")).toBeInTheDocument();
  expect(article).toEqual(frozenArticle);
});

test("대시보드의 열기와 새 콘텐츠 콜백을 편집기로 연결하고 변경을 저장한다", async () => {
  const user = userEvent.setup();
  const initialArticle = makeStudioArticle({ title: "Open me" });
  const storage = createMemoryStorage({
    "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 1, articles: [initialArticle] }),
  });

  render(<StudioApp storage={storage} />);

  const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Open me 열기" }));
  expect(screen.getByRole("heading", { name: "Open me 편집" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "목록으로" }));
  await user.click(screen.getByRole("button", { name: "새 콘텐츠" }));
  expect(screen.getByRole("heading", { name: "새 콘텐츠 편집" })).toBeInTheDocument();

  const saved = JSON.parse(storage.getItem("nonfiction-lab:studio:v1") ?? "null") as { articles: StudioArticle[] };
  expect(saved.articles).toHaveLength(2);
});

test("저장 실패에도 입력 중인 초안을 유지하고 명시적으로 재시도한다", async () => {
  const user = userEvent.setup();
  const initialArticle = makeStudioArticle({ title: "Original" });
  const controlled = createControlledStorage({
    "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 2, articles: [initialArticle] }),
  });
  render(<StudioApp storage={controlled.storage} />);

  const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Original 열기" }));
  controlled.failWrites();
  const title = screen.getByRole("textbox", { name: "영문 제목" });
  await user.clear(title);
  await user.type(title, "Unsaved draft");

  expect(title).toHaveValue("Unsaved draft");
  expect(await screen.findByText("저장 실패")).toBeInTheDocument();
  expect(screen.queryByText("저장됨")).not.toBeInTheDocument();
  expect(readStoredArticle(controlled.storage).title).toBe("Original");

  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "저장 재시도" }));
  expect(await screen.findByText("저장됨")).toBeInTheDocument();
  expect(readStoredArticle(controlled.storage).title).toBe("Unsaved draft");
});

test("초기 시드 저장 실패를 표시하고 로딩 화면에 갇히지 않는다", async () => {
  const user = userEvent.setup();
  const controlled = createControlledStorage();
  controlled.failWrites();

  render(<StudioApp storage={controlled.storage} />);

  expect(await screen.findByRole("heading", { name: "콘텐츠 스튜디오" })).toBeInTheDocument();
  expect(screen.getByRole("alert")).toHaveTextContent("초기 저장에 실패했습니다.");
  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "초기 저장 재시도" }));
  expect(screen.queryByText("초기 저장에 실패했습니다.")).not.toBeInTheDocument();
  expect(JSON.parse(controlled.storage.getItem("nonfiction-lab:studio:v1") ?? "null").schemaVersion).toBe(2);
});

test("승인된 편집 필드를 접근 가능한 컨트롤로 제공하고 수정 사유를 이력에 남긴다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeStudioArticle()} />);

  expect(screen.getByRole("textbox", { name: "영문 요약" })).toHaveValue("Why rainforests matter to life and climate.");
  expect(screen.getByRole("textbox", { name: "세부 주제" })).toHaveValue("ecosystems");
  expect(screen.getByRole("spinbutton", { name: "권장 최소 연령" })).toHaveValue(10);
  expect(screen.getByRole("spinbutton", { name: "권장 최대 연령" })).toHaveValue(12);
  expect(screen.getByRole("spinbutton", { name: "예상 읽기 시간(초)" })).toHaveValue(180);
  expect(screen.getByRole("checkbox", { name: "아동 주의 요소 검토 완료" })).toBeChecked();
  expect(screen.getByRole("textbox", { name: "어휘 1 예문" })).toHaveValue("The canopy shelters many rainforest animals.");
  expect(screen.getByRole("combobox", { name: "퀴즈 1 문제 유형" })).toHaveValue("comprehension");
  expect(screen.getByRole("textbox", { name: "퀴즈 1 본문 근거" })).toHaveValue("They help regulate climate.");
  expect(screen.getByRole("combobox", { name: "출처 1 자료 유형" })).toHaveValue("article");
  expect(screen.getByRole("textbox", { name: "출처 1 뒷받침 사실" })).toHaveValue("Rainforests regulate climate and support biodiversity.");
  expect(screen.getByRole("checkbox", { name: "독립적 재구성 확인" })).toBeChecked();
  expect(screen.getByRole("textbox", { name: "사용 조건 확인 메모" })).toHaveValue("Source links and media use conditions were checked.");

  await user.type(screen.getByRole("textbox", { name: "수정 사유" }), "영문 요약 보강");
  await user.clear(screen.getByRole("textbox", { name: "영문 요약" }));
  await user.type(screen.getByRole("textbox", { name: "영문 요약" }), "Updated English summary.");
  expect(screen.getByRole("list", { name: "수정 이력" })).toHaveTextContent("영문 요약 보강");
  expect(screen.getByRole("list", { name: "수정 이력" })).toHaveTextContent("summaryEn");
});

test("미디어 제공자와 URL을 완전 제어 상태로 자유롭게 편집한다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeStudioArticle({ media: [{ provider: "youtube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", alt: "Forest", usageConfirmed: true }] })} />);

  await user.selectOptions(screen.getByRole("combobox", { name: "미디어 1 제공처" }), "ted");
  const url = screen.getByRole("textbox", { name: "미디어 1 공식 임베드 URL" });
  await user.clear(url);
  await user.type(url, "https://embed.ted.com/talks/forest_future");

  expect(screen.getByRole("combobox", { name: "미디어 1 제공처" })).toHaveValue("ted");
  expect(url).toHaveValue("https://embed.ted.com/talks/forest_future");
  expect(screen.getByRole("checkbox", { name: "미디어 1 사용 조건 확인" })).toBeChecked();
});

test("검수 오류를 정확한 필드 컨트롤과 프로그램적으로 연결한다", async () => {
  const user = userEvent.setup();
  const source = { ...makeStudioArticle().sources[0], title: "" };
  render(<StudioEditorHarness initialArticle={makeStudioArticle({ sources: [source] })} />);

  await user.click(screen.getByRole("button", { name: "사실·출처 검수 완료" }));

  const input = screen.getByRole("textbox", { name: "출처 1 제목" });
  const issue = screen.getByText("출처 제목을 입력해 주세요.");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAttribute("aria-describedby", issue.id);
  expect(screen.getByRole("link", { name: "출처 1 제목으로 이동" })).toHaveAttribute("href", `#${input.id}`);
});

test("미리보기 중 본문 페이지가 줄어도 유효한 페이지로 복구한다", async () => {
  const user = userEvent.setup();
  render(<LivePreviewHarness initialArticle={makeStudioArticle({ pages: ["Page one", "Page two", "Page three"] })} />);

  const preview = screen.getByRole("region", { name: "모바일 미리보기" });
  await user.click(within(preview).getByRole("button", { name: "다음 페이지" }));
  await user.click(within(preview).getByRole("button", { name: "다음 페이지" }));
  expect(within(preview).getByText("Page three")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "본문 페이지 3 제거" }));
  expect(within(preview).getByText("Page two")).toBeInTheDocument();
});

test("현재 작업 버전의 미리보기 확인을 영속 상태로 기록해야 승인할 수 있다", async () => {
  const user = userEvent.setup();
  const article = makeFullyReviewedArticle();
  render(<LivePreviewHarness initialArticle={{ ...article, previewReview: null }} />);

  expect(screen.getByRole("button", { name: "최종 승인" })).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "미리보기 확인 완료" }));
  expect(screen.getByText("previewer · 작업 버전 1 확인")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "최종 승인" })).toBeEnabled();
});

test("모바일에서 편집·검수·미리보기 탭을 키보드로 전환한다", async () => {
  const user = userEvent.setup();
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = (() => ({
    matches: true,
    media: "(max-width: 760px)",
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => true,
  })) as typeof window.matchMedia;
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 2, articles: [makeStudioArticle()] }) });

  try {
    render(<StudioApp storage={storage} />);
    const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
    await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
    const tabs = screen.getByRole("tablist", { name: "스튜디오 작업 보기" });
    const edit = within(tabs).getByRole("tab", { name: "편집" });
    const review = within(tabs).getByRole("tab", { name: "검수" });
    const preview = within(tabs).getByRole("tab", { name: "미리보기" });
    expect(edit).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "편집" })).toBeVisible();
    expect(document.getElementById("studio-panel-review")).not.toBeVisible();

    await user.click(review);
    await user.keyboard("{ArrowRight}");
    expect(preview).toHaveFocus();
    expect(preview).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Home}");
    expect(edit).toHaveFocus();
  } finally {
    window.matchMedia = originalMatchMedia;
  }
});

test("UI에서 만든 미완성 배열 행을 저장하고 다시 열어 그대로 복원한다", async () => {
  const user = userEvent.setup();
  const article = makeStudioArticle({ vocabulary: [] });
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 2, articles: [article] }) });
  const first = render(<StudioApp storage={storage} />);
  let list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
  await user.click(screen.getByRole("button", { name: "어휘 추가" }));
  expect(screen.getByRole("textbox", { name: "어휘 1 단어" })).toHaveValue("");
  first.unmount();

  render(<StudioApp storage={storage} />);
  list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
  expect(screen.getByRole("textbox", { name: "어휘 1 단어" })).toHaveValue("");
  expect(JSON.parse(storage.getItem("nonfiction-lab:studio:v1") ?? "null").articles).toHaveLength(1);
});

test("읽기 전용 미리보기 탐색은 스튜디오 저장 상태를 변경하지 않는다", async () => {
  const user = userEvent.setup();
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 2, articles: [makeStudioArticle()] }) });
  render(<StudioApp storage={storage} />);
  const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
  const before = storage.getItem("nonfiction-lab:studio:v1");
  const preview = screen.getByRole("region", { name: "모바일 미리보기" });
  await user.click(within(preview).getByRole("button", { name: "다음 페이지" }));
  expect(storage.getItem("nonfiction-lab:studio:v1")).toBe(before);
});

test("발행 취소를 앱 저장 경계까지 영속화한다", async () => {
  const user = userEvent.setup();
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 2, articles: [makePublishedArticle()] }) });
  render(<StudioApp storage={storage} />);
  const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
  await user.click(screen.getByRole("button", { name: "발행 취소" }));
  await user.click(within(screen.getByRole("group", { name: "발행 취소 확인" })).getByRole("button", { name: "발행 취소 확정" }));
  expect(readStoredArticle(storage).workflowStatus).toBe("withdrawn");
  expect(readStoredArticle(storage).withdrawnAt).toBeTruthy();
});

test("미리보기 확인 저장 실패를 알리고 같은 확인 기록을 재시도한다", async () => {
  const user = userEvent.setup();
  const article = { ...makeFullyReviewedArticle(), previewReview: null };
  const controlled = createControlledStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 2, articles: [article] }) });
  render(<StudioApp storage={controlled.storage} />);
  const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
  controlled.failWrites();
  await user.click(screen.getByRole("button", { name: "미리보기 확인 완료" }));

  expect(await screen.findByRole("alert")).toHaveTextContent("브라우저 저장소에 저장하지 못했습니다.");
  expect(readStoredArticle(controlled.storage).previewReview).toBeNull();
  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "미리보기 확인 저장 재시도" }));
  expect(readStoredArticle(controlled.storage).previewReview).toMatchObject({ workingVersion: 1 });
});

function createControlledStorage(initial: Record<string, string> = {}) {
  const storage = createMemoryStorage(initial);
  const setItem = storage.setItem.bind(storage);
  let failing = false;
  storage.setItem = (key, value) => {
    if (failing) throw new DOMException("Quota exceeded", "QuotaExceededError");
    setItem(key, value);
  };
  return {
    storage,
    failWrites: () => { failing = true; },
    allowWrites: () => { failing = false; },
  };
}

function readStoredArticle(storage: Storage): StudioArticle {
  return (JSON.parse(storage.getItem("nonfiction-lab:studio:v1") ?? "null") as { articles: StudioArticle[] }).articles[0];
}

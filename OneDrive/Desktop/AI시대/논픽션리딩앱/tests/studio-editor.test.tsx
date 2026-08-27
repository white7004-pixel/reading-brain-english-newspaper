import { useState } from "react";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleEditor } from "@/components/studio/article-editor";
import { ReviewPanel } from "@/components/studio/review-panel";
import { StudioApp } from "@/components/studio/studio-app";
import { StudioPreview } from "@/components/studio/studio-preview";
import { approveArticle } from "@/lib/studio-workflow";
import type { StudioArticle, ValidationIssue } from "@/lib/studio-types";
import { completeAttestedStage, createMemoryStorage, makePublishedArticle, makeStudioArticle } from "./studio-fixtures";

const NOW = "2026-08-18T09:00:00.000Z";

function makeFullyReviewedArticle(): StudioArticle {
  const facts = completeAttestedStage(makeStudioArticle(), "facts", "fact-checker", "2026-08-18T06:00:00.000Z");
  const language = completeAttestedStage(facts, "language", "language-reviewer", "2026-08-18T07:00:00.000Z");
  return completeAttestedStage(language, "age", "age-reviewer", "2026-08-18T08:00:00.000Z");
}

function makeApprovedArticle(): StudioArticle {
  return approveArticle(makeFullyReviewedArticle(), "approver", "2026-08-18T08:30:00.000Z");
}

function StudioEditorHarness({ initialArticle }: { initialArticle: StudioArticle }) {
  const [article, setArticle] = useState(initialArticle);
  const [displayedIssues, setDisplayedIssues] = useState<ValidationIssue[]>([]);

  return (
    <>
      <ArticleEditor article={article} onArticleChange={setArticle} onDraftChange={setArticle} displayedIssues={displayedIssues} now={() => NOW} />
      <ReviewPanel article={article} onArticleChange={setArticle} onIssuesChange={setDisplayedIssues} actor="reviewer-1" now={() => NOW} />
    </>
  );
}

function LivePreviewHarness({ initialArticle }: { initialArticle: StudioArticle }) {
  const [article, setArticle] = useState(initialArticle);
  const [displayedIssues, setDisplayedIssues] = useState<ValidationIssue[]>([]);
  return <>
    <ArticleEditor article={article} onArticleChange={setArticle} onDraftChange={setArticle} displayedIssues={displayedIssues} now={() => NOW} />
    <StudioPreview article={article} onArticleChange={setArticle} actor="previewer" now={() => NOW} />
    <ReviewPanel article={article} onArticleChange={setArticle} onIssuesChange={setDisplayedIssues} actor="reviewer-1" now={() => NOW} />
  </>;
}

test("누락된 출처를 표시하고 사실 검수 완료를 막는다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeStudioArticle({ sources: [] })} />);

  await attestFactsInUi(user);
  expect(screen.getByRole("button", { name: "사실·출처 검수 완료" })).toBeDisabled();

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
  expect(await screen.findByText("저장됨", {}, { timeout: 1500 })).toBeInTheDocument();
  expect(screen.getByText("작업 버전 2")).toBeInTheDocument();
  expect(screen.getAllByRole("textbox", { name: /본문 페이지 \d+/ })).toHaveLength(4);
});

test("학년과 AR, 글별 낭독 제한시간을 편집하고 학년 기본값으로 되돌린다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeStudioArticle()} />);

  await user.selectOptions(screen.getByRole("combobox", { name: "권장 학년" }), "elementary-1");
  const ar = screen.getByRole("spinbutton", { name: "액셀러레이터 추정 AR" });
  await user.clear(ar);
  await user.type(ar, "4.2");
  const limit = screen.getByRole("spinbutton", { name: "낭독 제한시간(초)" });
  await user.type(limit, "70");

  expect(ar).toHaveValue(4.2);
  expect(limit).toHaveValue(70);

  await user.clear(limit);
  expect(limit).toHaveValue(null);
  expect(screen.getByText("학년 기본값 90초")).toBeVisible();
});

test("여러 키 입력을 하나의 자동 저장과 의미 있는 변경 기록으로 병합한다", async () => {
  vi.useFakeTimers();
  const onArticleChange = vi.fn((_article: StudioArticle) => ({ ok: true as const }));
  try {
    render(<ArticleEditor article={makeStudioArticle({ title: "R" })} onArticleChange={onArticleChange} now={() => NOW} />);
    const title = screen.getByRole("textbox", { name: "영문 제목" });

    act(() => {
      fireEvent.change(title, { target: { value: "Ra" } });
      fireEvent.change(title, { target: { value: "Rain" } });
      fireEvent.change(title, { target: { value: "Rainforest" } });
    });

    expect(onArticleChange).not.toHaveBeenCalled();
    await act(async () => { vi.advanceTimersByTime(599); });
    expect(onArticleChange).not.toHaveBeenCalled();
    await act(async () => { vi.advanceTimersByTime(1); });

    expect(onArticleChange).toHaveBeenCalledTimes(1);
    expect(onArticleChange.mock.calls[0][0]).toMatchObject({
      title: "Rainforest",
      changeLog: [{ fields: ["title"], reason: "" }],
    });
  } finally {
    vi.useRealTimers();
  }
});

test("대기 중인 편집을 목록 이동 전에 한 번만 안전하게 저장한다", async () => {
  const user = userEvent.setup();
  const controlled = createControlledStorage({
    "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [makeStudioArticle({ title: "Before" })] }),
  });
  render(<StudioApp storage={controlled.storage} />);
  await openArticle(user, "Before");
  const writesBeforeEdit = controlled.successfulWrites();

  fireEvent.change(screen.getByRole("textbox", { name: "영문 제목" }), { target: { value: "Flushed before navigation" } });
  await user.click(screen.getByRole("button", { name: "목록으로" }));

  expect(await screen.findByRole("heading", { name: "콘텐츠 스튜디오" })).toBeInTheDocument();
  expect(readStoredArticle(controlled.storage).title).toBe("Flushed before navigation");
  expect(controlled.successfulWrites()).toBe(writesBeforeEdit + 1);
});

test("승인된 의미 검수 항목을 명시적으로 확인해야 단계를 완료한다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeStudioArticle()} />);

  const semanticChecks = [
    "출처가 한 개 이상 존재한다.",
    "핵심 사실이 신뢰할 수 있는 출처와 일치한다.",
    "원문 복제가 아닌 독립적 재구성이다.",
  ];
  const finish = screen.getByRole("button", { name: "사실·출처 검수 완료" });
  expect(finish).toBeDisabled();
  for (const label of semanticChecks) expect(screen.getByRole("checkbox", { name: label })).not.toBeChecked();

  for (const checkbox of screen.getAllByRole("checkbox", { name: /./ }).filter((item) => item.closest(".studio-review-stage"))) {
    await user.click(checkbox);
  }
  expect(finish).toBeEnabled();
});

test("미디어를 이미지와 공식 영상 임베드 형태로 작성한다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makeStudioArticle({ media: [] })} />);

  await user.click(screen.getByRole("button", { name: "미디어 추가" }));
  const kind = screen.getByRole("combobox", { name: "미디어 1 유형" });
  await user.selectOptions(kind, "image");

  expect(screen.getByRole("textbox", { name: "미디어 1 이미지 URL" })).toBeInTheDocument();
  expect(screen.queryByRole("combobox", { name: "미디어 1 제공처" })).not.toBeInTheDocument();
});

test("손상 백업 실패 시 원본을 덮어쓰지 않고 재시도와 내보내기를 제공한다", async () => {
  const primaryKey = "nonfiction-lab:studio:v1";
  const backupKey = "nonfiction-lab:studio:corrupt-backup";
  let primary = "{only-original";
  let primaryWrites = 0;
  const storage = {
    get length() { return 1; },
    clear() {},
    getItem(key: string) { return key === primaryKey ? primary : null; },
    key() { return primaryKey; },
    removeItem() {},
    setItem(key: string, value: string) {
      if (key === backupKey) throw new Error("backup failed");
      if (key === primaryKey) { primary = value; primaryWrites += 1; }
    },
  } as Storage;

  render(<StudioApp storage={storage} />);

  expect(await screen.findByRole("alert", { name: "저장 데이터 복구 필요" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "백업 및 복구 재시도" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "원본 JSON 내보내기" })).toHaveAttribute("download");
  expect(screen.queryByRole("heading", { name: "콘텐츠 스튜디오" })).not.toBeInTheDocument();
  expect(primary).toBe("{only-original");
  expect(primaryWrites).toBe(0);
});

test("손상 원본을 백업한 뒤에도 자동 시드 저장으로 기본 키를 덮어쓰지 않는다", async () => {
  const raw = "{recoverable-original";
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": raw });

  render(<StudioApp storage={storage} />);

  expect(await screen.findByRole("heading", { name: "콘텐츠 스튜디오" })).toBeInTheDocument();
  expect(storage.getItem("nonfiction-lab:studio:corrupt-backup")).toBe(raw);
  expect(storage.getItem("nonfiction-lab:studio:v1")).toBe(raw);
});

test("일시적 읽기 실패를 명시적으로 재시도해 저장된 상태를 복구한다", async () => {
  const user = userEvent.setup();
  const stored = JSON.stringify({ schemaVersion: 3, articles: [makeStudioArticle({ title: "Recovered draft" })] });
  let reads = 0;
  let writes = 0;
  const storage = {
    get length() { return 1; },
    clear() {},
    getItem(key: string) {
      if (key !== "nonfiction-lab:studio:v1") return null;
      reads += 1;
      if (reads === 1) throw new Error("temporary read failure");
      return stored;
    },
    key() { return "nonfiction-lab:studio:v1"; },
    removeItem() {},
    setItem() { writes += 1; },
  } as Storage;

  render(<StudioApp storage={storage} />);
  expect(await screen.findByRole("alert", { name: "저장 데이터 복구 필요" })).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "백업 및 복구 재시도" }));

  const articleList = await screen.findByRole("list", { name: "콘텐츠 목록" });
  expect(within(articleList).getByRole("button", { name: "Recovered draft 열기" })).toBeInTheDocument();
  expect(writes).toBe(0);
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

test("대체 버전을 편집하는 동안에도 기존 공개본을 명시적으로 내린다", async () => {
  const user = userEvent.setup();
  render(<StudioEditorHarness initialArticle={makePublishedArticle({ title: "Approved title" })} />);

  const title = screen.getByRole("textbox", { name: "영문 제목" });
  await user.clear(title);
  await user.type(title, "Replacement draft");

  expect(screen.getByText("작업 버전 2")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "발행 취소" }));
  await user.click(within(screen.getByRole("group", { name: "발행 취소 확인" })).getByRole("button", { name: "발행 취소 확정" }));

  expect(title).toHaveValue("Replacement draft");
  expect(screen.getByText("초안", { selector: ".studio-status" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "발행 취소" })).not.toBeInTheDocument();
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
    "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [initialArticle] }),
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
    "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [initialArticle] }),
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

test("편집 저장 실패를 전역 재시도하면 편집기의 실패 상태와 로컬 재시도가 사라진다", async () => {
  const user = userEvent.setup();
  const initialArticle = makeStudioArticle({ title: "Original" });
  const controlled = createControlledStorage({
    "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [initialArticle] }),
  });
  render(<StudioApp storage={controlled.storage} />);
  await openArticle(user, "Original");
  controlled.failWrites();

  const title = screen.getByRole("textbox", { name: "영문 제목" });
  await user.clear(title);
  await user.type(title, "Globally retried draft");
  expect(await screen.findByText("저장 실패")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "저장 재시도" })).toBeInTheDocument();

  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "보류된 저장 재시도" }));

  expect(readStoredArticle(controlled.storage).title).toBe("Globally retried draft");
  expect(await screen.findByText("저장됨")).toBeInTheDocument();
  expect(screen.queryByText("저장 실패")).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "저장 재시도" })).not.toBeInTheDocument();
  expect(screen.queryByRole("alert", { name: "보류된 저장" })).not.toBeInTheDocument();
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
  expect(JSON.parse(controlled.storage.getItem("nonfiction-lab:studio:v1") ?? "null").schemaVersion).toBe(3);
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
  render(<StudioEditorHarness initialArticle={makeStudioArticle({ media: [{ kind: "video", provider: "youtube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", alt: "Forest", usageConfirmed: true }] })} />);

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

  await attestFactsInUi(user);
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
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [makeStudioArticle()] }) });

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
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [article] }) });
  const first = render(<StudioApp storage={storage} />);
  let list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
  await user.click(screen.getByRole("button", { name: "어휘 추가" }));
  expect(screen.getByRole("textbox", { name: "어휘 1 단어" })).toHaveValue("");
  await screen.findByText("저장됨", {}, { timeout: 1500 });
  first.unmount();

  render(<StudioApp storage={storage} />);
  list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
  expect(screen.getByRole("textbox", { name: "어휘 1 단어" })).toHaveValue("");
  expect(JSON.parse(storage.getItem("nonfiction-lab:studio:v1") ?? "null").articles).toHaveLength(1);
});

test("읽기 전용 미리보기 탐색은 스튜디오 저장 상태를 변경하지 않는다", async () => {
  const user = userEvent.setup();
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [makeStudioArticle()] }) });
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
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [makePublishedArticle()] }) });
  render(<StudioApp storage={storage} />);
  const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
  await user.click(screen.getByRole("button", { name: "발행 취소" }));
  await user.click(within(screen.getByRole("group", { name: "발행 취소 확인" })).getByRole("button", { name: "발행 취소 확정" }));
  expect(readStoredArticle(storage).workflowStatus).toBe("withdrawn");
  expect(readStoredArticle(storage).versionHistory[0].withdrawnAt).toBeTruthy();
});

test("미리보기 확인 저장 실패를 전역 재시도하면 로컬 오류와 재시도가 사라진다", async () => {
  const user = userEvent.setup();
  const article = { ...makeFullyReviewedArticle(), previewReview: null };
  const controlled = createControlledStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [article] }) });
  render(<StudioApp storage={controlled.storage} />);
  const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: "Rainforests 열기" }));
  controlled.failWrites();
  await user.click(screen.getByRole("button", { name: "미리보기 확인 완료" }));

  expect(await screen.findByRole("alert", { name: "보류된 저장" })).toHaveTextContent("브라우저 저장소에 저장하지 못했습니다.");
  expect(readStoredArticle(controlled.storage).previewReview).toBeNull();
  expect(screen.getByRole("button", { name: "미리보기 확인 저장 재시도" })).toBeInTheDocument();
  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "보류된 저장 재시도" }));
  expect(readStoredArticle(controlled.storage).previewReview).toMatchObject({ workingVersion: 1 });
  expect(screen.getByText(/작업 버전 1 확인/)).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByRole("button", { name: "미리보기 확인 저장 재시도" })).not.toBeInTheDocument());
  await waitFor(() => expect(screen.queryByText("브라우저 저장소에 저장하지 못했습니다.")).not.toBeInTheDocument());
});

test("새 콘텐츠 저장 실패를 보류 상태로 유지하고 같은 초안을 한 번만 재시도한다", async () => {
  const user = userEvent.setup();
  const initial = makeStudioArticle();
  const controlled = createControlledStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [initial] }) });
  render(<StudioApp storage={controlled.storage} />);
  await screen.findByRole("heading", { name: "콘텐츠 스튜디오" });
  controlled.failWrites();
  const writesBeforeFailure = controlled.successfulWrites();
  await user.click(screen.getByRole("button", { name: "새 콘텐츠" }));

  expect(await screen.findByRole("alert", { name: "보류된 저장" })).toHaveTextContent("브라우저 저장소에 저장하지 못했습니다.");
  expect(screen.getByRole("heading", { name: "새 콘텐츠 편집" })).toBeInTheDocument();
  expect(readStoredArticles(controlled.storage)).toHaveLength(1);
  expect(controlled.successfulWrites()).toBe(writesBeforeFailure);

  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "보류된 저장 재시도" }));
  expect(readStoredArticles(controlled.storage)).toHaveLength(2);
  expect(controlled.successfulWrites()).toBe(writesBeforeFailure + 1);
  expect(screen.queryByRole("alert", { name: "보류된 저장" })).not.toBeInTheDocument();
  expect(screen.queryByText("저장 실패")).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /저장 재시도/ })).not.toBeInTheDocument();
});

test("검수 단계 저장 실패 후 정확한 다음 상태를 보류하고 한 번만 재시도한다", async () => {
  const user = userEvent.setup();
  const controlled = createControlledStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [makeStudioArticle()] }) });
  render(<StudioApp storage={controlled.storage} />);
  await openArticle(user, "Rainforests");
  await attestFactsInUi(user);
  controlled.failWrites();
  const writesBeforeFailure = controlled.successfulWrites();
  await user.click(screen.getByRole("button", { name: "사실·출처 검수 완료" }));

  expect(await screen.findByRole("alert", { name: "보류된 저장" })).toBeInTheDocument();
  expect(screen.getByText("사실·출처 검수 완료됨")).toBeInTheDocument();
  expect(readStoredArticle(controlled.storage).workflowStatus).toBe("draft");
  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "보류된 저장 재시도" }));
  expect(readStoredArticle(controlled.storage).workflowStatus).toBe("facts_reviewed");
  expect(controlled.successfulWrites()).toBe(writesBeforeFailure + 1);
  await waitFor(() => expect(screen.queryByText("브라우저 저장소에 저장하지 못했습니다.")).not.toBeInTheDocument());
});

test("최종 승인 저장 실패 후 승인 상태를 보류하고 한 번만 재시도한다", async () => {
  const user = userEvent.setup();
  const controlled = createControlledStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [makeFullyReviewedArticle()] }) });
  render(<StudioApp storage={controlled.storage} />);
  await openArticle(user, "Rainforests");
  controlled.failWrites();
  const writesBeforeFailure = controlled.successfulWrites();
  await user.click(screen.getByRole("button", { name: "최종 승인" }));

  expect(await screen.findByRole("alert", { name: "보류된 저장" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "발행" })).toBeEnabled();
  expect(readStoredArticle(controlled.storage).workflowStatus).toBe("age_reviewed");
  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "보류된 저장 재시도" }));
  expect(readStoredArticle(controlled.storage).workflowStatus).toBe("approved");
  expect(controlled.successfulWrites()).toBe(writesBeforeFailure + 1);
  await waitFor(() => expect(screen.queryByText("브라우저 저장소에 저장하지 못했습니다.")).not.toBeInTheDocument());
});

test("발행 저장 실패 후 발행 상태를 보류하고 한 번만 재시도한다", async () => {
  const user = userEvent.setup();
  const controlled = createControlledStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [makeApprovedArticle()] }) });
  render(<StudioApp storage={controlled.storage} />);
  await openArticle(user, "Rainforests");
  controlled.failWrites();
  const writesBeforeFailure = controlled.successfulWrites();
  await user.click(screen.getByRole("button", { name: "발행" }));

  expect(await screen.findByRole("alert", { name: "보류된 저장" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "발행 취소" })).toBeInTheDocument();
  expect(readStoredArticle(controlled.storage).workflowStatus).toBe("approved");
  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "보류된 저장 재시도" }));
  expect(readStoredArticle(controlled.storage).workflowStatus).toBe("published");
  expect(controlled.successfulWrites()).toBe(writesBeforeFailure + 1);
  await waitFor(() => expect(screen.queryByText("브라우저 저장소에 저장하지 못했습니다.")).not.toBeInTheDocument());
});

test("발행 취소 저장 실패 후 취소 상태를 보류하고 한 번만 재시도한다", async () => {
  const user = userEvent.setup();
  const controlled = createControlledStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [makePublishedArticle()] }) });
  render(<StudioApp storage={controlled.storage} />);
  await openArticle(user, "Rainforests");
  controlled.failWrites();
  const writesBeforeFailure = controlled.successfulWrites();
  await user.click(screen.getByRole("button", { name: "발행 취소" }));
  await user.click(within(screen.getByRole("group", { name: "발행 취소 확인" })).getByRole("button", { name: "발행 취소 확정" }));

  expect(await screen.findByRole("alert", { name: "보류된 저장" })).toBeInTheDocument();
  expect(screen.getByText("발행 취소", { selector: ".studio-status" })).toBeInTheDocument();
  expect(readStoredArticle(controlled.storage).workflowStatus).toBe("published");
  controlled.allowWrites();
  await user.click(screen.getByRole("button", { name: "보류된 저장 재시도" }));
  expect(readStoredArticle(controlled.storage).workflowStatus).toBe("withdrawn");
  expect(controlled.successfulWrites()).toBe(writesBeforeFailure + 1);
  await waitFor(() => expect(screen.queryByText("브라우저 저장소에 저장하지 못했습니다.")).not.toBeInTheDocument());
});

test("검수를 제출하기 전에는 존재하지 않는 오류 메시지를 aria-describedby로 참조하지 않는다", async () => {
  const user = userEvent.setup();
  const source = { ...makeStudioArticle().sources[0], title: "" };
  render(<StudioEditorHarness initialArticle={makeStudioArticle({ sources: [source] })} />);
  const input = screen.getByRole("textbox", { name: "출처 1 제목" });

  expect(input).not.toHaveAttribute("aria-describedby");
  await attestFactsInUi(user);
  await user.click(screen.getByRole("button", { name: "사실·출처 검수 완료" }));
  const issue = screen.getByText("출처 제목을 입력해 주세요.");
  expect(input).toHaveAttribute("aria-describedby", issue.id);
});

test("모바일 검수 오류 링크가 편집 탭을 열고 정확한 필드에 초점을 이동한다", async () => {
  const restoreMatchMedia = mockMobileViewport();
  const user = userEvent.setup();
  const source = { ...makeStudioArticle().sources[0], title: "" };
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [makeStudioArticle({ sources: [source] })] }) });
  try {
    render(<StudioApp storage={storage} />);
    await openArticle(user, "Rainforests");
    await user.click(screen.getByRole("tab", { name: "검수" }));
    await attestFactsInUi(user);
    await user.click(screen.getByRole("button", { name: "사실·출처 검수 완료" }));
    await user.click(screen.getByRole("link", { name: "출처 1 제목으로 이동" }));

    const editTab = screen.getByRole("tab", { name: "편집" });
    const field = screen.getByRole("textbox", { name: "출처 1 제목" });
    await waitFor(() => expect(editTab).toHaveAttribute("aria-selected", "true"));
    await waitFor(() => expect(field).toHaveFocus());
  } finally {
    restoreMatchMedia();
  }
});

test("모바일 미리보기 확인 링크가 미리보기 탭을 열고 확인 버튼에 초점을 이동한다", async () => {
  const restoreMatchMedia = mockMobileViewport();
  const user = userEvent.setup();
  const article = { ...makeFullyReviewedArticle(), previewReview: null };
  const storage = createMemoryStorage({ "nonfiction-lab:studio:v1": JSON.stringify({ schemaVersion: 3, articles: [article] }) });
  try {
    render(<StudioApp storage={storage} />);
    await openArticle(user, "Rainforests");
    await user.click(screen.getByRole("tab", { name: "검수" }));
    await user.click(screen.getByRole("link", { name: "미리보기를 확인해 주세요." }));

    const previewTab = screen.getByRole("tab", { name: "미리보기" });
    const acknowledge = screen.getByRole("button", { name: "미리보기 확인 완료" });
    await waitFor(() => expect(previewTab).toHaveAttribute("aria-selected", "true"));
    await waitFor(() => expect(acknowledge).toHaveFocus());
  } finally {
    restoreMatchMedia();
  }
});

function createControlledStorage(initial: Record<string, string> = {}) {
  const storage = createMemoryStorage(initial);
  const setItem = storage.setItem.bind(storage);
  let failing = false;
  let successfulWrites = 0;
  storage.setItem = (key, value) => {
    if (failing) throw new DOMException("Quota exceeded", "QuotaExceededError");
    setItem(key, value);
    successfulWrites += 1;
  };
  return {
    storage,
    failWrites: () => { failing = true; },
    allowWrites: () => { failing = false; },
    successfulWrites: () => successfulWrites,
  };
}

function readStoredArticle(storage: Storage): StudioArticle {
  return readStoredArticles(storage)[0];
}

function readStoredArticles(storage: Storage): StudioArticle[] {
  return (JSON.parse(storage.getItem("nonfiction-lab:studio:v1") ?? "null") as { articles: StudioArticle[] }).articles;
}

async function openArticle(user: ReturnType<typeof userEvent.setup>, title: string): Promise<void> {
  const list = await screen.findByRole("list", { name: "콘텐츠 목록" });
  await user.click(within(list).getByRole("button", { name: `${title} 열기` }));
}

async function attestFactsInUi(user: ReturnType<typeof userEvent.setup>): Promise<void> {
  const heading = screen.getByRole("heading", { name: "사실·출처" });
  const stage = heading.closest(".studio-review-stage");
  if (!stage) throw new Error("Facts review stage is missing");
  for (const checkbox of within(stage as HTMLElement).getAllByRole("checkbox")) {
    if (!(checkbox as HTMLInputElement).checked) await user.click(checkbox);
  }
}

function mockMobileViewport(): () => void {
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
  return () => { window.matchMedia = originalMatchMedia; };
}

import { expect, test, type Page } from "@playwright/test";

const ARTICLE_TITLE = "How Ants Work Together";

test("편집자가 검수한 콘텐츠만 학습자에게 발행한다", async ({ page }) => {
  await completeLearnerOnboarding(page);

  await page.goto("/studio");
  await page.getByRole("button", { name: "새 콘텐츠", exact: true }).click();
  await fillValidThreeMinuteArticle(page, { title: ARTICLE_TITLE });

  await page.getByRole("tab", { name: "검수" }).click();
  await page.getByRole("button", { name: "사실·출처 검수 완료" }).click();
  await page.getByRole("button", { name: "영어·AR 검수 완료" }).click();
  await page.getByRole("button", { name: "연령 적합성 검수 완료" }).click();

  await page.getByRole("tab", { name: "미리보기" }).click();
  await page.getByRole("button", { name: "미리보기 확인 완료" }).click();
  await page.getByRole("tab", { name: "검수" }).click();
  await page.getByRole("button", { name: "최종 승인" }).click();
  await page.getByRole("button", { name: "발행", exact: true }).click();

  await page.goto("/");
  await expect(page.getByText(ARTICLE_TITLE, { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "탐험" }).click();
  await page.getByRole("textbox", { name: "지식 검색" }).fill(ARTICLE_TITLE);
  await expect(page.getByText(ARTICLE_TITLE, { exact: true })).toBeVisible();

  await page.goto("/studio");
  await page.getByRole("button", { name: `${ARTICLE_TITLE} 열기` }).click();
  await page.getByRole("tab", { name: "검수" }).click();
  await page.getByRole("button", { name: "발행 취소", exact: true }).click();
  await page.getByRole("group", { name: "발행 취소 확인" }).getByRole("button", { name: "발행 취소 확정" }).click();

  await page.goto("/");
  await expect(page.getByText(ARTICLE_TITLE, { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "탐험" }).click();
  await page.getByRole("textbox", { name: "지식 검색" }).fill(ARTICLE_TITLE);
  await expect(page.getByText(ARTICLE_TITLE, { exact: true })).toHaveCount(0);
});

async function completeLearnerOnboarding(page: Page): Promise<void> {
  await page.goto("/");
  await page.getByRole("button", { name: "가장 쉬운 단계부터" }).click();
  await expect(page.getByRole("button", { name: "오늘의 지식 시작하기" })).toBeVisible();
}

async function fillValidThreeMinuteArticle(page: Page, { title }: { title: string }): Promise<void> {
  const editor = page.getByRole("form", { name: "콘텐츠 편집기" });

  await editor.getByLabel("영문 제목").fill(title);
  await editor.getByLabel("한글 제목").fill("개미는 어떻게 협력할까?");
  await editor.getByLabel("영문 요약").fill("Ants cooperate through signals and shared tasks.");
  await editor.getByLabel("한글 요약").fill("개미가 신호와 역할 분담으로 협력하는 방법을 알아봅니다.");
  await editor.getByLabel("세부 주제").fill("animal cooperation");
  await editor.getByLabel("액셀러레이터 추정 AR").fill("0.5");
  await editor.getByLabel("난이도 설명").fill("논픽션랩 추정 난이도 0.5");
  await editor.getByLabel("단어 수").fill("360");
  await editor.getByLabel("아동 주의 요소 검토 완료").check();
  await editor.getByLabel("학습 목표").fill("Explain how ants divide work and share information.");
  await editor.getByLabel("핵심 문장").fill("Ants use chemical signals to coordinate their work.");
  await editor.getByLabel("핵심 개념").fill("cooperation");
  await editor.getByRole("textbox", { name: "본문 페이지 1", exact: true }).fill("Ants live in colonies where each ant contributes to shared work.");

  await editor.getByRole("button", { name: "어휘 추가" }).click();
  await editor.getByLabel("어휘 1 단어").fill("colony");
  await editor.getByLabel("어휘 1 발음").fill("KOL-uh-nee");
  await editor.getByLabel("어휘 1 한글 뜻").fill("군집");
  await editor.getByLabel("어휘 1 영문 정의").fill("a group of ants living together");
  await editor.getByLabel("어휘 1 예문").fill("The ant colony works together to gather food.");

  await editor.getByRole("button", { name: "퀴즈 추가" }).click();
  await editor.getByLabel("퀴즈 1 질문").fill("How do ants coordinate their work?");
  await editor.getByLabel("퀴즈 1 선택지 1").fill("They use chemical signals.");
  await editor.getByLabel("퀴즈 1 선택지 2").fill("They work without communication.");
  await editor.getByLabel("퀴즈 1 해설").fill("Chemical signals help ants share information.");
  await editor.getByLabel("퀴즈 1 본문 근거").fill("Ants use chemical signals to coordinate their work.");

  await editor.getByLabel("출처 메모").fill("The source supports the article's explanation of ant cooperation.");
  await editor.getByLabel("독립적 재구성 확인").check();
  await editor.getByLabel("사용 조건 확인 메모").fill("The source link and usage conditions were checked.");
  await editor.getByRole("button", { name: "출처 추가" }).click();
  await editor.getByLabel("출처 1 제목").fill("Ant Communication");
  await editor.getByLabel("출처 1 발행처").fill("Smithsonian Institution");
  await editor.getByLabel("출처 1 URL").fill("https://www.si.edu/spotlight/ants");
  await editor.getByLabel("출처 1 발행일").fill("2025-01-01");
  await editor.getByLabel("출처 1 뒷받침 사실").fill("Ants communicate and divide work within colonies.");

  await expect(editor.getByText("저장됨", { exact: true })).toBeVisible();
}

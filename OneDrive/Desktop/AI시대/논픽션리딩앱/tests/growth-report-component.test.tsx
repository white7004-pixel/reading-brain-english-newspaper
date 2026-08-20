import { render, screen } from "@testing-library/react";
import { GrowthReport } from "@/components/growth-report";
import type { WeeklyGrowth } from "@/lib/growth-report";

const growth: WeeklyGrowth = {
  startLocalDate: "2026-08-17",
  endLocalDate: "2026-08-23",
  activeDays: 4,
  questCount: 5,
  totalMinutes: 18,
  quizAccuracyPercent: 90,
  keyFinderAccuracyPercent: null,
  domainCounts: { science: 2, arts: 2, history: 1 },
  dailyMinutes: [
    { localDate: "2026-08-17", minutes: 3 },
    { localDate: "2026-08-18", minutes: 4 },
    { localDate: "2026-08-19", minutes: 2 },
    { localDate: "2026-08-20", minutes: 9 },
    { localDate: "2026-08-21", minutes: 0 },
    { localDate: "2026-08-22", minutes: 0 },
    { localDate: "2026-08-23", minutes: 0 },
  ],
};

it("summarizes weekly growth with a textual chart and nullable key-finder result", () => {
  render(<GrowthReport growth={growth} />);

  expect(screen.getByRole("heading", { name: "이번 주 성장" })).toBeVisible();
  expect(screen.getByText(/이번 주.*5개/)).toBeVisible();
  expect(screen.getByLabelText("이번 주 읽기 시간: 월 3분, 화 4분, 수 2분, 목 9분, 금 0분, 토 0분, 일 0분")).toBeVisible();
  expect(screen.getByText("핵심 찾기: 기록을 쌓으면 확인할 수 있어요")).toBeVisible();
  expect(screen.getByText("다음 주에는 하루 5분, 과학 주제부터 이어 읽어 보세요.")).toBeVisible();
});

it("gives a supportive empty weekly report", () => {
  render(<GrowthReport growth={{ ...growth, activeDays: 0, questCount: 0, totalMinutes: 0, quizAccuracyPercent: 0, domainCounts: {}, dailyMinutes: growth.dailyMinutes.map((day) => ({ ...day, minutes: 0 })) }} />);

  expect(screen.getByText("이번 주 읽기 기록이 아직 없어요.")).toBeVisible();
  expect(screen.getByText("다음 주에는 첫 탐험을 시작해 보세요.")).toBeVisible();
});

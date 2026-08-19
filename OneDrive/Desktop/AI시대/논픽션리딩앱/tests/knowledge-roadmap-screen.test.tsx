import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { KnowledgeRoadmap } from "@/components/knowledge-roadmap";
import { getPublishedArticles } from "@/lib/content";

it("switches between elementary grades and shows both grade and AR labels", async () => {
  const user = userEvent.setup();
  render(<KnowledgeRoadmap articles={getPublishedArticles()} onOpen={() => {}} />);
  expect(screen.getAllByTestId("roadmap-topic")).toHaveLength(12);
  expect(screen.getByRole("heading", { name: "초등 1학년" })).toBeVisible();
  await user.click(screen.getByRole("tab", { name: "초4" }));
  expect(screen.getByRole("heading", { name: "초등 4학년" })).toBeVisible();
  expect(screen.getByText("차 문화와 교류")).toBeVisible();
  expect(screen.getAllByText(/AR 2\.5–3\.4/)).toHaveLength(12);
});

it("opens an available reading and marks unavailable topics as preparing", async () => {
  const user = userEvent.setup();
  const onOpen = vi.fn();
  render(<KnowledgeRoadmap articles={getPublishedArticles()} onOpen={onOpen} />);
  await user.click(screen.getByRole("tab", { name: "초5" }));
  await user.click(screen.getByRole("button", { name: /별과 태양계 읽기 시작/ }));
  expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "stars-shine" }));
  expect(screen.getAllByText("준비 중").length).toBeGreaterThan(0);
});

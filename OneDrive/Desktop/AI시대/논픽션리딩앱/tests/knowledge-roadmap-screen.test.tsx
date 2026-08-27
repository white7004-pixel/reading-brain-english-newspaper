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
  expect(screen.getAllByText(/AR 2\.5–2\.9/)).toHaveLength(7);
  expect(screen.getAllByText(/AR 3\.0–3\.4/)).toHaveLength(7);
});

it("opens an available reading and marks unavailable topics as preparing", async () => {
  const user = userEvent.setup();
  const onOpen = vi.fn();
  render(<KnowledgeRoadmap articles={getPublishedArticles()} onOpen={onOpen} />);
  await user.click(screen.getByRole("tab", { name: "초5" }));
  await user.click(screen.getByText("별과 태양계"));
  expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "stars-shine" }));
  expect(screen.getAllByText("준비 중").length).toBeGreaterThan(0);
});

it("renders a growth map with AR stages, domain lanes, and connected passage nodes", () => {
  render(<KnowledgeRoadmap articles={getPublishedArticles()} onOpen={() => {}} />);

  expect(screen.getByTestId("knowledge-growth-map")).toBeVisible();
  expect(screen.getAllByTestId("ar-stage")).toHaveLength(2);
  expect(screen.getAllByTestId("roadmap-lane")).toHaveLength(6);
  expect(screen.getAllByTestId("passage-node")).toHaveLength(12);
  expect(screen.getByText("기초 단계")).toBeVisible();
  expect(screen.getByText("도전 단계")).toBeVisible();
});

it("offers middle and high school grades with a content-ready empty state", async () => {
  const user = userEvent.setup();
  render(<KnowledgeRoadmap articles={getPublishedArticles()} onOpen={() => {}} />);

  await user.click(screen.getByRole("tab", { name: "중1" }));
  expect(screen.getByRole("heading", { name: "중등 1학년" })).toBeVisible();
  expect(screen.getByText("중등 1학년 콘텐츠 준비 중")).toBeVisible();

  await user.click(screen.getByRole("tab", { name: "고3" }));
  expect(screen.getByRole("heading", { name: "고등 3학년" })).toBeVisible();
});

it("visibly groups all twelve grades by school level", () => {
  render(<KnowledgeRoadmap articles={getPublishedArticles()} onOpen={() => {}} />);

  expect(screen.getByRole("heading", { name: "초등", exact: true })).toBeVisible();
  expect(screen.getByRole("heading", { name: "중등", exact: true })).toBeVisible();
  expect(screen.getByRole("heading", { name: "고등", exact: true })).toBeVisible();
  expect(screen.getAllByRole("tab")).toHaveLength(12);
});

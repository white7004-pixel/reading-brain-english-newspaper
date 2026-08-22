import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/app-shell";

it("exposes four primary destinations around main content", () => {
  render(
    <AppShell active="today" onNavigate={() => {}}>
      <p>content</p>
    </AppShell>,
  );

  expect(screen.getByRole("button", { name: "오늘" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("button", { name: "지식지도" })).toBeVisible();
  expect(screen.getByRole("navigation", { name: "주요 메뉴" }).querySelectorAll("button")).toHaveLength(4);
  expect(screen.getByRole("main")).toHaveTextContent("content");
});

it("removes persistent navigation while the learner is focused on a quest", () => {
  render(
    <AppShell active="learn" onNavigate={() => {}}>
      <p>focused content</p>
    </AppShell>,
  );

  expect(screen.queryByRole("navigation", { name: "주요 메뉴" })).not.toBeInTheDocument();
  expect(screen.getByRole("main")).toHaveTextContent("focused content");
});

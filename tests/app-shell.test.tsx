import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/app-shell";

it("exposes four primary destinations around main content", () => {
  render(
    <AppShell active="home" onNavigate={() => {}}>
      <p>content</p>
    </AppShell>,
  );

  expect(screen.getAllByRole("button", { name: /홈|탐험|학습|나/ })).toHaveLength(4);
  expect(screen.getByRole("main")).toHaveTextContent("content");
  expect(screen.getByRole("button", { name: "홈" })).toHaveAttribute("aria-current", "page");
});

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "app", "knowledge-map.css"), "utf8");

it("keeps roadmap copy horizontal in a comfortably wide card", () => {
  expect(css).toMatch(/\.passage-node__card\s*\{[^}]*width:\s*100%/s);
  expect(css).toMatch(/\.passage-node__card\s*\{[^}]*word-break:\s*keep-all/s);
  expect(css).toMatch(/@media\s*\(min-width:\s*720px\)[\s\S]*\.roadmap-lane__track\s*\{[^}]*grid-template-columns:\s*1fr/s);
});

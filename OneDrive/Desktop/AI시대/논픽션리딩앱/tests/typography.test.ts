import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

describe("reading typography", () => {
  it("uses separate Korean UI and English reading font stacks", () => {
    expect(css).toContain('--font-ui: "Pretendard"');
    expect(css).toContain('--font-reading: "Lexend"');
    expect(css).toMatch(/body\s*\{[^}]*font-family:\s*var\(--font-ui\)/s);
    expect(css).toMatch(/\.article-copy\s*\{[^}]*font-family:\s*var\(--font-reading\)/s);
  });

  it("gives English passages a comfortable reading size and spacing", () => {
    expect(css).toMatch(/\.article-copy\s*\{[^}]*font-size:\s*19px[^}]*line-height:\s*1\.8/s);
    expect(css).toMatch(/@media\s*\(min-width:\s*720px\)[\s\S]*\.article-copy\s*\{[^}]*font-size:\s*20px/s);
  });
});

import {
  ELEMENTARY_GRADES,
  KNOWLEDGE_ROADMAP,
  ROADMAP_DOMAIN_LABELS,
  roadmapForGrade,
} from "@/lib/knowledge-roadmap";

it("provides twelve ordered nonfiction topics for every elementary grade", () => {
  expect(ELEMENTARY_GRADES).toEqual([1, 2, 3, 4, 5, 6]);
  for (const grade of ELEMENTARY_GRADES) {
    const items = roadmapForGrade(grade);
    expect(items).toHaveLength(12);
    expect(items.map((item) => item.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  }
  expect(KNOWLEDGE_ROADMAP).toHaveLength(72);
});

it("covers all roadmap domains in every grade", () => {
  const domains = Object.keys(ROADMAP_DOMAIN_LABELS).sort();
  for (const grade of ELEMENTARY_GRADES) {
    expect([...new Set(roadmapForGrade(grade).map((item) => item.domain))].sort()).toEqual(domains);
  }
});

it("keeps ids and AR ranges valid", () => {
  expect(new Set(KNOWLEDGE_ROADMAP.map((item) => item.id)).size).toBe(72);
  for (const item of KNOWLEDGE_ROADMAP) {
    expect(item.arMin).toBeGreaterThanOrEqual(1);
    expect(item.arMax).toBeGreaterThanOrEqual(item.arMin);
    expect(item.goal.trim().length).toBeGreaterThan(10);
  }
});

it("builds two AR stages with one topic from every domain in each stage", () => {
  for (const grade of ELEMENTARY_GRADES) {
    const items = roadmapForGrade(grade);
    const stages = [...new Set(items.map((item) => `${item.arMin}-${item.arMax}`))];
    expect(stages).toHaveLength(2);
    for (const stage of stages) {
      const domains = items.filter((item) => `${item.arMin}-${item.arMax}` === stage).map((item) => item.domain);
      expect(new Set(domains).size).toBe(6);
    }
  }
});

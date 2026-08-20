import type { Article } from "@/lib/types";

export function KnowledgeCard({ article }: { article: Article }) {
  const takeaway = article.quest?.knowledgeTakeawayKo ?? `${article.titleKo}에서 읽은 내용을 내 지식에 더했어요.`;

  return (
    <section className="knowledge-card" aria-labelledby="knowledge-card-heading">
      <p className="eyebrow">COLLECTED KNOWLEDGE</p>
      <h2 id="knowledge-card-heading">오늘의 지식 카드</h2>
      <strong>{article.titleKo}</strong>
      <p>{takeaway}</p>
    </section>
  );
}

"use client";

import type { KnowledgeMapNode } from "@/lib/knowledge-quest-map";
import type { Article } from "@/lib/types";

const statusCopy: Record<KnowledgeMapNode["state"], string> = {
  completed: "완료한 탐험",
  recommended: "다음 추천 탐험",
  available: "탐험 시작",
  locked: "이전 탐험을 완료하면 열려요",
};

function nodeLabel(node: KnowledgeMapNode): string {
  return `${statusCopy[node.state]}: ${node.article.title}${node.state === "locked" ? " (잠김)" : ""}`;
}

export function KnowledgeMapScreen({ nodes, onStart }: { nodes: readonly KnowledgeMapNode[]; onStart: (article: Article) => void }) {
  return (
    <section className="knowledge-map-screen" aria-labelledby="knowledge-map-heading">
      <p className="eyebrow">KNOWLEDGE QUEST</p>
      <h1>지식지도</h1>
      <h2 id="knowledge-map-heading">나의 지식지도</h2>
      <p className="knowledge-map-screen__intro">완료한 탐험에서 다음 연결을 찾아, 나만의 지식을 이어 가요.</p>
      {nodes.length === 0 ? (
        <div className="empty-state" role="status">
          <strong>아직 지식지도를 만들 탐험이 없어요.</strong>
          <p>새 탐험이 공개되면 여기에서 연결을 따라갈 수 있어요.</p>
        </div>
      ) : (
        <ol className="knowledge-map-path" aria-label="지식 탐험 경로">
          {nodes.map((node) => (
            <li key={node.articleId} className={`knowledge-map-node knowledge-map-node--${node.state}`}>
              <button type="button" className="knowledge-map-node__control" aria-label={nodeLabel(node)} disabled={node.state === "locked"} onClick={() => onStart(node.article)}>
                <span className="knowledge-map-node__step" aria-hidden="true">{node.order}</span>
                <span className="knowledge-map-node__body"><span className="knowledge-map-node__status">{statusCopy[node.state]}</span><strong>{node.article.title}</strong><span>{node.article.titleKo}</span></span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

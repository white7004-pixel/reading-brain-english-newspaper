// 리포트 총평을 AI 에 부탁하기. 숫자·학기·단원은 브라우저가 계산해 넘기고, AI 는 문장만 쓴다.
import { UserError } from './http.js';

const str = { type: 'string' };
export const COMMENT_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['summary', 'directions'],
  properties: { summary: str, directions: { type: 'array', items: str } },
};

export const SYSTEM = `당신은 영어학원 원장을 돕는 레벨테스트 리포트 작성자입니다. 받은 JSON 사실만으로 학부모에게 보낼 글을 씁니다.

규칙
- summary: 학부모용 총평 2~3문장. "~합니다" 체. 강한 영역, 보완할 영역, 고3 과정 완료 예상 시점(overall)을 담습니다.
- directions: 학원 지도 방향 정확히 3개. 각 한 문장. 영역의 next(다음에 시작할 단원)를 넣어 구체적인 수업 활동으로 씁니다.
- 받은 학기·단원 이름·시점을 그대로 쓰고, 새 숫자나 점수를 만들지 않습니다. gap 은 지금 학년보다 몇 학기 앞(+)·뒤(−)인지이며 숫자로 옮겨 쓰지 않습니다.
- 학생 이름을 쓰지 않고 "학생"이라고 씁니다.
- 교재 이름, 다른 학원 이름, 과장 표현("최고의", "완벽한", "혁신적인")을 쓰지 않습니다.
- skipped 에 있는 영역은 "이번에 응시하지 않았습니다" 정도로만 언급합니다.`;

const text = (v, max = 200) => typeof v === 'string' && v.length <= max;

export function commentRequest(body) {
  const f = body?.facts;
  const ok = f && text(f.grade, 10) && text(f.overall ?? '', 40)
    && Array.isArray(f.skipped ?? []) && (f.skipped ?? []).every((x) => text(x, 10))
    && Array.isArray(f.sections) && f.sections.length >= 1 && f.sections.length <= 4
    && f.sections.every((s) => text(s.name, 10) && text(s.position) && text(s.level, 40) && text(s.next) && Number.isFinite(s.gap));
  if (!ok) throw new UserError('리포트 내용이 올바르지 않습니다');
  const facts = {
    grade: f.grade, overall: f.overall ?? '', skipped: f.skipped ?? [],
    sections: f.sections.map(({ name, position, level, next, gap }) => ({ name, position, level, next, gap })),
  };
  return { system: SYSTEM, content: [{ type: 'text', text: JSON.stringify(facts) }], schema: COMMENT_SCHEMA, maxTokens: 2000 };
}

export function checkComment(json) {
  const { summary, directions } = json ?? {};
  if (typeof summary !== 'string' || !summary.trim() || !Array.isArray(directions) || !directions.length) throw new Error('AI 총평 형식이 맞지 않음');
  return { summary: summary.trim(), directions: directions.slice(0, 3).map((d) => String(d).trim()) };
}

// 클로드 한 번 부르기. 규칙(시스템 프롬프트)은 캐시하고, 긴 답은 스트리밍으로 받는다.
import Anthropic from '@anthropic-ai/sdk';
import { UserError } from './http.js';

let client;

export async function askJson({ system, content, schema, maxTokens }) {
  client ||= new Anthropic({ maxRetries: 2 });
  const stream = client.beta.messages.stream({
    model: process.env.CLAUDE_MODEL || 'claude-opus-5',
    max_tokens: maxTokens,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default', // 안전 분류기가 거절하면 서버가 권장 모델로 다시 돌린다
    thinking: { type: 'adaptive' },
    system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
    output_config: { format: { type: 'json_schema', schema } },
    messages: [{ role: 'user', content }],
  });
  const msg = await stream.finalMessage();
  const u = msg.usage || {};
  console.log(`claude usage ${JSON.stringify({ model: msg.model, in: u.input_tokens, out: u.output_tokens, cacheRead: u.cache_read_input_tokens })}`);
  if (msg.stop_reason === 'refusal') throw new UserError('이 사진은 분석하지 못했습니다. 영어 시험지 사진인지 확인해 주세요');
  if (msg.stop_reason === 'max_tokens') throw new UserError('내용이 너무 길어 끝까지 받지 못했습니다. 사진이나 학생 수를 나눠 주세요');
  return JSON.parse(msg.content.filter((b) => b.type === 'text').map((b) => b.text).join(''));
}

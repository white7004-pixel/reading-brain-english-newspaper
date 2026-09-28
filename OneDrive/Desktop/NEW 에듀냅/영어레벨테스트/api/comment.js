import { makeHandler, UserError } from '../lib/http.js';
import { askJson } from '../lib/claude.js';
import { commentRequest, checkComment } from '../lib/comment.js';

export default makeHandler(async (body) => {
  const request = commentRequest(body);
  if (!process.env.ANTHROPIC_API_KEY) throw new UserError('AI 키가 없어 기본 총평을 넣었습니다');
  return checkComment(await askJson(request));
});

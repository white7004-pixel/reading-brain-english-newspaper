import { makeHandler } from '../lib/http.js';
import { askJson } from '../lib/claude.js';
import { extractRequest } from '../lib/rules.js';

export default makeHandler(async (body) => {
  const request = extractRequest(body);
  return request.finish(await askJson(request));
});

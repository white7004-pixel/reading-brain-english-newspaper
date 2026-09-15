import { makeHandler } from '../lib/http.js';
import { askJson } from '../lib/claude.js';
import { reportRequest } from '../lib/rules.js';

export default makeHandler(async (body) => {
  const request = reportRequest(body);
  return request.finish(await askJson(request));
});

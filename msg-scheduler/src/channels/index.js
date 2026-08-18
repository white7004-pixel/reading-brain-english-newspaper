/** 채널 레지스트리. 새 채널은 어댑터 파일을 만들어 여기에 추가하면 된다. */

import * as slack from './slack.js';
import * as kakaowork from './kakaowork.js';
import * as kakaotalk from './kakaotalk.js';
import * as sms from './sms.js';
import * as telegram from './telegram.js';
import * as line from './line.js';
import * as webhook from './webhook.js';

export const channels = { slack, kakaotalk, kakaowork, telegram, line, sms, webhook };

export const CHANNEL_KEYS = Object.keys(channels);

export function getChannel(key) {
  const channel = channels[key];
  if (!channel) throw new Error(`알 수 없는 채널: ${key}`);
  return channel;
}

/** UI가 그릴 채널 메타데이터 목록. */
export function channelCatalog() {
  return CHANNEL_KEYS.map((key) => channels[key].meta);
}

export { ChannelError } from './http.js';

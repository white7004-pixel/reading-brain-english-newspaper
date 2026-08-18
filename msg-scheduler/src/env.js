/** .env 파일과 환경변수에서 초기 설정을 읽어온다. (외부 패키지 없이) */

import fs from 'node:fs';
import path from 'node:path';

export function loadDotEnv(dir) {
  const file = path.join(dir, '.env');
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

/** 환경변수 → 채널 설정. UI에서 저장한 값이 이미 있으면 덮어쓰지 않는다. */
const ENV_MAP = {
  slack: {
    webhookUrl: 'SLACK_WEBHOOK_URL',
    botToken: 'SLACK_BOT_TOKEN',
    defaultChannel: 'SLACK_DEFAULT_CHANNEL',
    mode: 'SLACK_MODE',
  },
  kakaowork: {
    appKey: 'KAKAOWORK_APP_KEY',
    defaultEmail: 'KAKAOWORK_DEFAULT_EMAIL',
    defaultConversationId: 'KAKAOWORK_DEFAULT_CONVERSATION_ID',
  },
  kakaotalk: {
    restApiKey: 'KAKAO_REST_API_KEY',
    clientSecret: 'KAKAO_CLIENT_SECRET',
    redirectUri: 'KAKAO_REDIRECT_URI',
    accessToken: 'KAKAO_ACCESS_TOKEN',
    refreshToken: 'KAKAO_REFRESH_TOKEN',
  },
  telegram: {
    botToken: 'TELEGRAM_BOT_TOKEN',
    defaultChatId: 'TELEGRAM_DEFAULT_CHAT_ID',
  },
  line: {
    channelAccessToken: 'LINE_CHANNEL_ACCESS_TOKEN',
    channelSecret: 'LINE_CHANNEL_SECRET',
    defaultTo: 'LINE_DEFAULT_TO',
  },
  sms: {
    provider: 'SMS_PROVIDER',
    apiKey: 'SMS_API_KEY',
    apiSecret: 'SMS_API_SECRET',
    from: 'SMS_FROM',
    defaultTo: 'SMS_DEFAULT_TO',
  },
  webhook: {
    url: 'WEBHOOK_URL',
    bodyTemplate: 'WEBHOOK_BODY_TEMPLATE',
    headers: 'WEBHOOK_HEADERS',
  },
};

export function seedChannelsFromEnv(store) {
  let changed = false;
  for (const [channelKey, fields] of Object.entries(ENV_MAP)) {
    const current = store.getChannelConfig(channelKey);
    const patch = {};
    for (const [field, envName] of Object.entries(fields)) {
      const value = process.env[envName];
      if (value && !current[field]) patch[field] = value;
    }
    if (Object.keys(patch).length) {
      store.setChannelConfig(channelKey, patch);
      changed = true;
    }
  }
  if (process.env.TZ_DEFAULT && !store.settings.timeZone) {
    store.updateSettings({ timeZone: process.env.TZ_DEFAULT });
    changed = true;
  }
  return changed;
}

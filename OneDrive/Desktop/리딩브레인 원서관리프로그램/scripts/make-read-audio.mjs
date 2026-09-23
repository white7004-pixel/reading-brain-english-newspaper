// 쪽별 낭독 음원 만들기:  node scripts/make-read-audio.mjs <slug> <목록.json>
// 출판사 음원이 없는 책은 타입캐스트(영어 Kristen)로 쪽 글을 읽어 assets/audio/<slug>/read/*.mp3 를 만든다.
// 목록.json 은 [{ "file": "p04", "text": "Sam and a mat." }, ...] — 이미 있는 파일은 건너뛴다.
// 키는 scripts/typecast.mjs 가 ~/typecast-audio/key.txt 에서 읽는다. 여기에 적지 않는다.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, KEY, speak, VOICE_EN } from "./typecast.mjs";

const [slug, listPath] = process.argv.slice(2);
if (!slug || !listPath) { console.error("쓰는 법: node scripts/make-read-audio.mjs <slug> <목록.json>"); process.exit(1); }
if (!KEY) { console.error("타입캐스트 키가 없습니다 (~/typecast-audio/key.txt)"); process.exit(1); }

const out = join(ROOT, "assets", "audio", slug, "read");
await mkdir(out, { recursive: true });
const list = JSON.parse(await readFile(listPath, "utf8"));
let made = 0, chars = 0;
for (const { file, text } of list) {
  const path = join(out, file + ".mp3");
  if (await access(path).then(() => true, () => false)) continue;
  await writeFile(path, await speak(text, VOICE_EN));
  made++; chars += text.length;
  console.log(`${file}.mp3  ${text.slice(0, 50)}`);
}
console.log(`${slug}: ${made}개 만듦 (${chars}글자), ${list.length - made}개는 이미 있음`);

"""
AI 카드 이미지 일괄 다운로드 스크립트
pollinations.ai에서 표현별 이미지를 생성·저장합니다.
"""
import re
import os
import json
import time
import requests
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXPRESSIONS_JS = os.path.join(BASE_DIR, "data", "expressions.js")
OUTPUT_DIR = os.path.join(BASE_DIR, "assets", "images")
os.makedirs(OUTPUT_DIR, exist_ok=True)

WIDTH, HEIGHT = 480, 300
CONCURRENCY = 6
TIMEOUT = 90
RETRY = 3

def load_expressions():
    with open(EXPRESSIONS_JS, encoding="utf-8") as f:
        content = f.read()
    match = re.search(r"window\.EXPRESSIONS\s*=\s*(\[[\s\S]*?\]);", content)
    if not match:
        raise ValueError("EXPRESSIONS 배열을 찾을 수 없습니다.")
    # 키에 따옴표 추가해서 JSON으로 파싱
    js = match.group(1)
    js = re.sub(r'(\w+):', r'"\1":', js)        # 키에 따옴표
    js = re.sub(r',\s*\]', ']', js)              # trailing comma 제거
    js = re.sub(r',\s*\}', '}', js)
    return json.loads(js)

def image_filename(item_id):
    return f"{str(item_id).zfill(4)}.jpg"

def pollinations_url(item):
    prompt = (
        f'photorealistic image for English learners showing: "{item["english"]}" '
        f'(Korean: "{item["korean"]}"). '
        f'Style: realistic photo, natural lighting, sharp focus, warm setting, '
        f'no text, suitable for young learners. Focus on the core action or situation.'
    )
    encoded = quote(prompt)
    return (
        f"https://image.pollinations.ai/prompt/{encoded}"
        f"?width={WIDTH}&height={HEIGHT}&seed={item['id']}&nologo=true&model=flux-realism"
    )

def download_one(item):
    fname = image_filename(item["id"])
    fpath = os.path.join(OUTPUT_DIR, fname)

    if os.path.exists(fpath) and os.path.getsize(fpath) > 5000:
        return (item["id"], "skip", fname)

    url = pollinations_url(item)
    for attempt in range(1, RETRY + 1):
        try:
            resp = requests.get(url, timeout=TIMEOUT)
            if resp.status_code == 200 and len(resp.content) > 5000:
                with open(fpath, "wb") as f:
                    f.write(resp.content)
                return (item["id"], "ok", fname)
            time.sleep(2 * attempt)
        except Exception as e:
            if attempt == RETRY:
                return (item["id"], f"fail:{e}", fname)
            time.sleep(3 * attempt)
    return (item["id"], "fail:max-retry", fname)

def main():
    print("표현 데이터 로딩 중...")
    try:
        expressions = load_expressions()
    except Exception:
        # JSON 파싱 실패 시 Node.js로 추출
        import subprocess
        result = subprocess.run(
            ["node", "-e", """
const fs = require('fs');
let c = fs.readFileSync('data/expressions.js','utf8');
c = c.replace('window.EXPRESSIONS','const __E');
eval(c);
console.log(JSON.stringify(__E));
"""],
            capture_output=True, text=True,
            cwd=BASE_DIR
        )
        expressions = json.loads(result.stdout)

    total = len(expressions)
    print(f"총 {total}개 표현 이미지 다운로드 시작 (동시 {CONCURRENCY}개)")
    print(f"저장 위치: {OUTPUT_DIR}\n")

    done = 0
    skipped = 0
    failed = []

    with ThreadPoolExecutor(max_workers=CONCURRENCY) as pool:
        futures = {pool.submit(download_one, item): item for item in expressions}
        for future in as_completed(futures):
            item_id, status, fname = future.result()
            done += 1
            if status == "skip":
                skipped += 1
            elif status == "ok":
                print(f"[{done:4d}/{total}] ✓ {fname}")
            else:
                failed.append((item_id, fname, status))
                print(f"[{done:4d}/{total}] ✗ {fname}  ({status})")

            if done % 50 == 0:
                print(f"  --- 진행: {done}/{total} (건너뜀 {skipped}, 실패 {len(failed)}) ---")

    print(f"\n완료: {done}개 처리 / 건너뜀 {skipped} / 실패 {len(failed)}")
    if failed:
        print("실패 목록:")
        for item_id, fname, reason in failed:
            print(f"  {fname}: {reason}")

if __name__ == "__main__":
    main()

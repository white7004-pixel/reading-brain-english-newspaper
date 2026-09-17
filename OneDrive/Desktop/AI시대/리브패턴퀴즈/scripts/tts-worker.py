# 원어민(Edge Neural) 발음 음원을 만드는 상주 프로그램.
#
# edge-tts.exe 를 문장마다 새로 실행하면 파이썬을 켜고 edge_tts 를 불러오는 데만
# 10초 넘게 걸려, 카드가 넘어갈 때까지 소리가 나지 않았다. 음원 생성 자체는 1초 안쪽이다.
# 그래서 server.js 가 이 프로그램을 한 번 띄워 두고 한 줄씩 요청을 보낸다.
#
# 입력(한 줄 JSON):  {"id": 1, "text": "Hello", "voice": "en-US-AvaNeural", "rate": "-8%", "out": "C:/tmp/a.mp3"}
# 출력(한 줄 JSON):  {"id": 1, "ok": true}  또는  {"id": 1, "ok": false, "error": "..."}
import asyncio
import json
import sys

import edge_tts


async def synthesize(job):
    communicate = edge_tts.Communicate(job["text"], job["voice"], rate=job.get("rate", "+0%"))
    await communicate.save(job["out"])


async def main():
    loop = asyncio.get_running_loop()
    print(json.dumps({"ready": True}), flush=True)
    while True:
        line = await loop.run_in_executor(None, sys.stdin.readline)
        if not line:
            return
        job = json.loads(line)
        try:
            await synthesize(job)
            reply = {"id": job["id"], "ok": True}
        except Exception as error:  # 한 문장이 실패해도 다음 요청은 계속 받는다
            reply = {"id": job["id"], "ok": False, "error": str(error)}
        print(json.dumps(reply), flush=True)


if __name__ == "__main__":
    asyncio.run(main())

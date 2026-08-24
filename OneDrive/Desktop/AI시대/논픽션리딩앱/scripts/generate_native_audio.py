import asyncio
import json
import sys

import edge_tts


async def generate(text: str, media_path: str, timing_path: str) -> None:
    communicator = edge_tts.Communicate(text, "en-US-AriaNeural", rate="-8%", boundary="WordBoundary")
    audio = bytearray()
    timings = []
    search_from = 0

    async for chunk in communicator.stream():
        if chunk["type"] == "audio":
            audio.extend(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            word = chunk["text"]
            char_index = text.lower().find(word.lower(), search_from)
            if char_index < 0:
                char_index = text.lower().find(word.lower())
            if char_index < 0:
                continue
            search_from = char_index + len(word)
            timings.append({
                "startMs": round(chunk["offset"] / 10_000),
                "endMs": round((chunk["offset"] + chunk["duration"]) / 10_000),
                "charIndex": char_index,
                "length": len(word),
            })

    with open(media_path, "wb") as media_file:
        media_file.write(audio)
    with open(timing_path, "w", encoding="utf-8") as timing_file:
        json.dump(timings, timing_file, ensure_ascii=False, separators=(",", ":"))


asyncio.run(generate(sys.argv[1], sys.argv[2], sys.argv[3]))

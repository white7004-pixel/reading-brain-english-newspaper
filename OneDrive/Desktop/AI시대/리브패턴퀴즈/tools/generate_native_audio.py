import argparse
import asyncio
import json
import re
from pathlib import Path

import edge_tts


DATA_FILE = Path("data/expressions.js")
OUTPUT_DIR = Path("assets/native-audio")
DEFAULT_VOICE = "en-US-JennyNeural"


def load_expressions():
    text = DATA_FILE.read_text(encoding="utf-8")
    match = re.search(r"window\.EXPRESSIONS\s*=\s*(\[.*\]);\s*$", text, re.S)
    if not match:
        raise ValueError("Could not parse data/expressions.js")
    return json.loads(match.group(1))


def load_bookquiz():
    text = Path("data/bookquiz.js").read_text(encoding="utf-8")
    matches = re.findall(
        r"\{\s*id:\s*(\d+),\s*english:\s*(\"(?:\\.|[^\"\\])*\")",
        text,
    )
    if not matches:
        raise ValueError("Could not parse data/bookquiz.js")
    return [{"id": int(item_id), "english": json.loads(english)} for item_id, english in matches]


def load_verbs():
    text = Path("data/verbs.js").read_text(encoding="utf-8")
    matches = re.findall(
        r"\{\s*id:\s*(\d+),\s*base:\s*(\"(?:\\.|[^\"\\])*\")"
        r",\s*past:\s*(\"(?:\\.|[^\"\\])*\")"
        r",\s*pp:\s*(\"(?:\\.|[^\"\\])*\")",
        text,
    )
    if not matches:
        raise ValueError("Could not parse data/verbs.js")
    return [
        {
            "id": int(item_id),
            "base": json.loads(base),
            "past": json.loads(past),
            "pp": json.loads(pp),
        }
        for item_id, base, past, pp in matches
    ]


async def generate_one(item, voice, output_dir=OUTPUT_DIR, force=False):
    output = output_dir / f"{int(item['id']):03d}.mp3"
    if output.exists() and output.stat().st_size > 0 and not force:
        return "skipped", output
    communicate = edge_tts.Communicate(
        text=item["english"],
        voice=voice,
        rate="+0%",
        pitch="+0Hz",
    )
    await communicate.save(str(output))
    return "created", output


async def generate_verb_form(item, form, voice, output_dir, force=False):
    output = output_dir / f"{int(item['id'])}-{form}.mp3"
    if output.exists() and output.stat().st_size > 0 and not force:
        return "skipped", output
    spoken_text = re.sub(r"\s*\[.*?\]\s*", "", item[form]).strip()
    communicate = edge_tts.Communicate(
        text=spoken_text,
        voice=voice,
        rate="-8%",
        pitch="+0Hz",
    )
    await communicate.save(str(output))
    return "created", output


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--voice", default=DEFAULT_VOICE)
    parser.add_argument("--dataset", choices=["expressions", "bookquiz", "verbs"], default="expressions")
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    output_dirs = {
        "expressions": OUTPUT_DIR,
        "bookquiz": Path("assets/bookquiz-audio"),
        "verbs": Path("assets/verb-audio"),
    }
    output_dir = output_dirs[args.dataset]
    output_dir.mkdir(parents=True, exist_ok=True)
    loaders = {
        "expressions": load_expressions,
        "bookquiz": load_bookquiz,
        "verbs": load_verbs,
    }
    expressions = loaders[args.dataset]()
    if args.limit:
        expressions = expressions[: args.limit]

    created = 0
    skipped = 0
    for item in expressions:
        if args.dataset == "verbs":
            for form in ("base", "past", "pp"):
                status, output = await generate_verb_form(
                    item, form, args.voice, output_dir, args.force
                )
                created += status == "created"
                skipped += status == "skipped"
                print(f"{status}: {output.name} - {item[form]}")
        else:
            status, output = await generate_one(item, args.voice, output_dir, args.force)
            created += status == "created"
            skipped += status == "skipped"
            print(f"{status}: {output.name} - {item['english']}")

    print(f"Done. created={created}, skipped={skipped}, voice={args.voice}")


if __name__ == "__main__":
    asyncio.run(main())

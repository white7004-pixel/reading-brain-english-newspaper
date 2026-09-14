# 마스코트 표정 시트(3열 x 2행)를 상태별 PNG 6장으로 자른다.
#
# 생성 이미지는 격자에 픽셀 단위로 맞지 않으므로, 셀로 자른 뒤 각 셀 안에서
# 흰 여백을 다시 깎아 캐릭터만 남긴다. 그래야 6장의 크기가 고르게 보인다.
#
# 사용: python scripts/slice-mascot.py <시트.png> <출력폴더>
import sys
from pathlib import Path

from PIL import Image, ImageDraw

# setMascot() 이 쓰는 상태 이름과 같아야 한다 (game-ui-model.js)
STATES = [
    ["default", "guide", "listening"],
    ["correct", "wrong", "complete"],
]

WHITE_CUTOFF = 244  # 이 값보다 밝으면 배경으로 본다
PADDING = 12        # 캐릭터 주위에 남길 여백(px)
EDGE_THRESH = 28    # 가장자리에서 번져 나가며 투명하게 만들 흰색 허용 폭


def trim_white(cell):
    """셀 안의 흰 여백을 깎아 캐릭터가 꽉 차게 만든다."""
    grey = cell.convert("L")
    mask = grey.point(lambda v: 0 if v >= WHITE_CUTOFF else 255)
    box = mask.getbbox()
    if not box:
        return cell
    left, top, right, bottom = box
    left = max(0, left - PADDING)
    top = max(0, top - PADDING)
    right = min(cell.width, right + PADDING)
    bottom = min(cell.height, bottom + PADDING)
    return cell.crop((left, top, right, bottom))


def clear_background(cell):
    """테두리에 닿은 흰 배경만 투명하게 한다.

    밝기로 한꺼번에 지우면 부엉이의 흰 배·눈까지 뚫리므로, 가장자리에서
    이어진 흰 영역만 번지기(flood fill)로 지운다.
    """
    rgba = cell.convert("RGBA")
    w, h = rgba.size
    seeds = [(x, y) for x in range(0, w, 8) for y in (0, h - 1)]
    seeds += [(x, y) for y in range(0, h, 8) for x in (0, w - 1)]
    for seed in seeds:
        r, g, b, a = rgba.getpixel(seed)
        if a and min(r, g, b) >= WHITE_CUTOFF:
            ImageDraw.floodfill(rgba, seed, (255, 255, 255, 0), thresh=EDGE_THRESH)
    return rgba


def main():
    if len(sys.argv) != 3:
        print("사용: python scripts/slice-mascot.py <시트.png> <출력폴더>")
        return 1

    sheet_path = Path(sys.argv[1])
    out_dir = Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)

    sheet = Image.open(sheet_path).convert("RGB")
    rows = len(STATES)
    cols = len(STATES[0])
    cell_w = sheet.width // cols
    cell_h = sheet.height // rows

    for r, row in enumerate(STATES):
        for c, state in enumerate(row):
            cell = sheet.crop((c * cell_w, r * cell_h, (c + 1) * cell_w, (r + 1) * cell_h))
            trimmed = clear_background(trim_white(cell))
            # 화면에서는 54~120px 로 쓴다. 고해상도 화면(2배)을 감안해도
            # 긴 변 280px 이면 충분하다. 오프라인 캐시에 들어가므로 webp 로 줄인다.
            trimmed.thumbnail((280, 280), Image.LANCZOS)
            target = out_dir / f"{state}.webp"
            trimmed.save(target, "WEBP", quality=88, method=6)
            size_kb = target.stat().st_size / 1024
            print(f"{state:<10} {trimmed.width}x{trimmed.height}  {size_kb:.0f}KB")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

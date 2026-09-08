# -*- coding: utf-8 -*-
"""배포본 만들기 — 페이지가 실제로 참조하는 파일만 담는다.

images/ 에 있는 파일 대부분은 학생 얼굴이 담긴 원본 사진이고 페이지가
쓰지 않는다. 폴더째 올리면 링크가 없어도 주소만 알면 받을 수 있으므로,
참조되는 것만 골라 담는다. 자세한 이유는 CLAUDE.md 참고."""
import io, os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT  = os.path.join(ROOT, '.deploy-pamus-tone')
ENTRY = ['index.html', 'curriculum-detail.html']
EXTRA = ['vercel.json', 'robots.txt', 'sitemap.xml']
os.chdir(ROOT)

scan = ''
for f in ENTRY:
    if os.path.exists(f):
        scan += io.open(f, encoding='utf-8', errors='replace').read()

code = sorted({m.group(1) for m in re.finditer(r'(?:href|src)\s*=\s*"([^"]+\.(?:css|js))"', scan)
               if not m.group(1).startswith('http')})
for c in code:
    if os.path.exists(c):
        scan += io.open(c, encoding='utf-8', errors='replace').read()

media = {m.group(0) for m in re.finditer(
    r'(?:images|videos)/[^\s"\'()<>|?]+?\.(?:jpg|jpeg|png|webp|gif|svg|ico|mp4|MP4|mov|MOV|m4v)', scan, re.I)}
media |= {m.group(1) for m in re.finditer(
    r'(?:href|src|content)\s*=\s*"(?!http)([A-Za-z0-9가-힣_-]+\.(?:jpg|jpeg|png|webp|gif|svg|ico))"', scan)}

keep = sorted(set(ENTRY) | set(code) | set(EXTRA) | media)

link = os.path.join(ROOT, '.vercel', 'project.json')
if os.path.isdir(OUT):
    shutil.rmtree(OUT)
os.makedirs(os.path.join(OUT, '.vercel'))
shutil.copy2(link, os.path.join(OUT, '.vercel', 'project.json'))

n = total = 0
missing = []
for rel in keep:
    src = os.path.join(ROOT, rel)
    if not os.path.exists(src):
        missing.append(rel); continue
    dst = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)
    total += os.path.getsize(src); n += 1

io.open(os.path.join(OUT, '.vercelignore'), 'w', encoding='utf-8').write('')
print('배포본: 파일 %d개 / %.1f MB' % (n, total / 1048576))
if missing:
    print('참조됐지만 없는 파일:', missing)

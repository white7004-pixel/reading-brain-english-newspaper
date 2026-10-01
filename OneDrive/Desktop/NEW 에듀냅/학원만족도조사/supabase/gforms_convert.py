# 구글폼(viewform HTML) → 학원설문조사 def + 그림 파일 + SQL
import json, os, re, io, sys, subprocess, html as H
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'gforms')
ROOT = r'C:\Users\white\OneDrive\Desktop\NEW 에듀냅\학원만족도조사'
IMG = os.path.join(ROOT, 'survey', 'img', 'gforms')
os.makedirs(IMG, exist_ok=True)

FORMS = [  # (구글 id, 주소 이름, 종류 s=만족도 r=신청서)
    ('1D7iycLhHg6jddirlPYQWlPQM0jEqbfEvObomLzxfrfI', 'sat-us-curriculum', 's'),
    ('1Y6N_9rhvWZEVrP_9HegitVWXheXItxqptjS6KDj2TVE', 'sat-harvard-camp', 's'),
    ('16yUXWf4lOC7XS5AY6nyUNk9J_xVsDTOD2pkv2oxwamg', 'sat-2028-reform', 's'),
    ('1xYG_Ahl5R8yv9wYnfv2Y5kUgzk5xGPhOT0j_BvCSfxA', 'sat-top1-mom', 's'),
    ('1uDidK3YN7d4n-U2FXjq6w30gZEUbqoiWViCN9K2S6yU', 'sat-mbti', 's'),
    ('1lFTvlICFGFFc3mAEsSZSQEm6TgD-jbpCyS2REpvRT4g', 'sat-acting-therapy', 's'),
    ('1I5wsxiluvHYof7-x29dvmynuuU7IZD4ILGK3Qollomg', 'reg-highschool-2026', 'r'),
    ('1GaRfWgZ7YelZorioUFDxMmTO0PAHyq6tJ3XL-tzOlCQ', 'reg-strategy-2025', 'r'),
    ('1qWlyk62a0TJB5bFeqz5S2oTZ6aPPNbdh1JCx0Wa2aB4', 'reg-top1-2024', 'r'),
    ('10nNWCq9whp4mwe1I3HUBFcgfo-yiFkh9-N8ssCExIS0', 'reg-2028-reform', 'r'),
    ('1d25BHokD0YHLT1FAIIEeNq6nR20VCpfeqWrYychAKNM', 'reg-snu-mentoring', 'r'),
    ('1QyQSrHC-YcvLYghY3puC-fy3jKJUT5mkOK91wrFs72o', 'reg-harvard-camp', 'r'),
    ('1MdyUaRqL52LxOoQO7sPz903oH3jC9YMJ4iCWdpIhxxo', 'reg-acting-therapy', 'r'),
]
# 이미 받아 둔 그림이 없으면 받는다 (2026 고교선택전략 하나는 rt 주소로 받음)


def lines(t):
    return [x.strip() for x in str(t or '').split('\n') if x.strip()]


def item_images(page):
    out = {}
    for part in page.split('data-item-id="')[1:]:
        iid = part[:part.index('"')]
        m = re.search(r'<img[^>]*src="([^"]+)"', part)
        if m and 'forms-images' in m.group(1):
            out[iid] = H.unescape(m.group(1))
    return out


def save_img(url, name):
    path = os.path.join(IMG, name)
    if not os.path.exists(path):
        url = re.sub(r'=w\d+$', '=w1000', url)
        raw = subprocess.run(['curl', '-sfL', '-A', 'Mozilla/5.0', url], capture_output=True, check=True).stdout
        im = Image.open(io.BytesIO(raw))
        if im.mode in ('RGBA', 'LA', 'P'):
            im = im.convert('RGBA'); bg = Image.new('RGB', im.size, 'white'); bg.paste(im, mask=im.split()[-1]); im = bg
        else:
            im = im.convert('RGB')
        if im.width > 1000:
            im = im.resize((1000, round(im.height * 1000 / im.width)), Image.LANCZOS)
        im.save(path, 'JPEG', quality=80, optimize=True, progressive=True)
    return '/img/gforms/' + name


def convert(gid, slug, kind):
    page = open(os.path.join(SRC, gid + '.html'), encoding='utf-8').read()
    data = json.loads(re.search(r'FB_PUBLIC_LOAD_DATA_ = (.*?);</script>', page, re.S).group(1))
    f = data[1]
    title = (f[8] or data[3] or slug).strip()
    imgs = item_images(page)
    sections = [{'title': '설문' if kind == 's' else '신청서', 'items': []}]
    for it in f[1] or []:
        iid, label, desc, typ = it[0], (it[1] or '').strip(), (it[2] or '').strip(), it[3]
        x = {'id': 'g%d' % iid}
        if typ == 8:  # 다음 페이지
            sections.append({'title': label or '다음', 'items': []})
            if desc: sections[-1]['desc'] = desc
            continue
        if typ in (6, 11, 12):
            x.update(type='info', label=label)
            if desc: x['desc'] = desc
            if typ == 12: x['desc'] = (desc + '\n' if desc else '') + '(영상은 구글폼에만 있습니다)'
        else:
            ans = (it[4] or [[None, None, 0]])[0]
            req = bool(ans[2]) if len(ans) > 2 else False
            x.update(label=label, required=req)
            if desc: x['desc'] = desc
            opts = []
            for o in ans[1] or []:
                lab = (o[0] or '').strip()
                if not lab and len(o) > 4 and o[4]: lab = '기타'
                if lab and lab not in opts: opts.append(lab)
            if typ in (0, 1):
                x['type'] = 'text'
                if typ == 0: x['short'] = True
            elif typ in (2, 3):
                x.update(type='single', options=opts)
            elif typ == 4:
                x.update(type='multi', options=opts)
            elif typ == 5:
                ends = ans[3] if len(ans) > 3 and ans[3] else ['', '']
                nums = [int(v) for v in opts]
                x.update(type='scale', options=[{'v': v, 'label': ''} for v in nums])
                x['options'][0]['label'] = (ends[0] or '낮음').strip()
                x['options'][-1]['label'] = (ends[1] or '높음').strip()
            else:
                print('  ! 건너뜀 type', typ, label[:30]); continue
            if x['type'] in ('single', 'multi') and len(opts) < 2:
                x['type'] = 'text'; x.pop('options', None)
        if str(iid) in imgs:
            x['image'] = save_img(imgs[str(iid)], '%s-%d.jpg' % (slug, iid))
        if x['type'] == 'info' and not (x.get('label') or x.get('desc') or x.get('image')):
            continue  # 그림을 못 가져온 빈 안내 칸
        sections[-1]['items'].append(x)
    sections = [s for s in sections if s['items']]
    d = {
        'id': slug, 'kicker': title, 'title': title, 'greeting': 'Dear parents,',
        'intro': lines(f[0]),
        'thanks': (f[2] or '').strip() if len(f) > 2 and isinstance(f[2], str) and f[2].strip()
        else '소중한 응답 감사합니다. 리딩브레인영어학원',
        'sections': sections,
    }
    if kind == 's': d['once'] = True
    return d


defs = []
for gid, slug, kind in FORMS:
    d = convert(gid, slug, kind)
    n = sum(len(s['items']) for s in d['sections'])
    pics = sum(1 for s in d['sections'] for i in s['items'] if i.get('image'))
    print(slug, '|', d['kicker'][:30], '|', len(d['sections']), '섹션', n, '항목', pics, '그림')
    defs.append(d)

json.dump(defs, open(os.path.join(HERE, 'gforms_defs.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

sql = ['-- 학원설문조사 3단계: 구글폼 설명회 만족도·신청서 13개를 옮겨 넣기 (2단계 다음에 실행)',
       '-- 모두 "마감" 상태로 들어갑니다. 다음 설명회 때 대시보드에서 "복사"해서 고쳐 쓰세요. 다시 실행해도 됩니다.',
       'insert into academy_survey.forms (slug, def, status, sort) values']
rows = []
for k, d in enumerate(defs):
    rows.append("  ('%s', $seed$%s$seed$::jsonb, 'closed', %d)" % (d['id'], json.dumps(d, ensure_ascii=False), 200 + k))
sql.append(',\n'.join(rows))
sql.append('on conflict (slug) do nothing;')
open(os.path.join(ROOT, 'supabase', '003_seminar_forms.sql'), 'w', encoding='utf-8').write('\n'.join(sql) + '\n')
print('ok')

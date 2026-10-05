# 문법 만화 쇼츠 템플릿 (에듀냅 연동용 초안)

원장님이 **대사만 고치면** 쇼츠가 나오는 구조입니다. 엔진(렌더러)과 무관하게 `spec.json` 이 계약(contract)입니다.

```
episodes/<id>/spec.json   ← 원장님이 편집하는 유일한 파일(대사·캐릭터·컷·학원 정보)
episodes/<id>/art/        ← 컷 이미지(말풍선 없는 깨끗한 원본 권장)
audio/episode.py          ← 대사 → TTS → 타임라인 → BGM·효과음·더킹 믹스(-14 LUFS)
src/comic/ComicEpisode.tsx← 타임라인을 읽어 1080×1920 영상으로 그리는 템플릿
```

## 만드는 법
```bash
python3 audio/episode.py episodes/irregular-past/spec.json      # 음성·타임라인·믹스 생성
npx remotion render Comic-irregular-past out/ep1.mp4 --browser-executable=<chrome>
npx remotion render Comic-irregular-past out/ep1-VOICEONLY.mp4 --props='{"audio":"voiceonly"}' ...  # 인스타 유행곡 얹기용
```

## 학원마다 바꾸는 곳 (spec.json)
| 키 | 의미 |
|---|---|
| `academy` | 학원명·로고·CTA 문구·브랜드 색 |
| `cast.*` | 캐릭터 이름·말풍선 색·목소리(voice id) — 학원 마스코트는 여기에 추가 |
| `beats[].type` | `hook`(훅) · `panel`(컷) · `swap`(개념 카드) · `quiz`(예고 퀴즈) · `cta`(로고) |
| `lines[].text` | 자막 = 음성(`*단어*` 는 강조). 자막과 음성이 항상 동일 |
| `lines[].focus` | 컷에서 카메라가 향할 지점(0~1) |

새 포맷(리스트형·키네틱 타이포·원장 사진+목소리 등)은 `beat.type` 과 컴포넌트를 추가하는 방식으로 확장합니다.

## 에듀냅 연동 전에 정해야 할 것
1. 에듀냅의 스택/인증/저장소 (이 저장소는 영어신문 앱이라 에듀냅 코드가 없음)
2. 렌더 엔진 라이선스: Remotion(3인 초과 회사·SaaS 자동화는 유료) vs HyperFrames(Apache-2.0)
3. 컷 이미지·마스코트 출처와 상업 이용 권리, 학생 얼굴/음성 동의 절차
4. TTS(HeyGen API) 다중 고객 사용 약관·비용, 유행 음원은 앱 내 삽입 불가(VOICEONLY 사용)

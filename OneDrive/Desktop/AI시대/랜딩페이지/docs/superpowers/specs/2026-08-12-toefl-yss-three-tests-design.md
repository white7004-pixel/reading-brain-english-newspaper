# TOEFL YSS 3종 시험 카드 설계

## 목표

레벨 테스트 진단 시스템과 프로그램 안내에 리딩브레인에서 실제 시행하는 TOEFL YSS 시험 세 종류를 정확하게 소개한다.

## 시행 시험

1. TOEFL Primary Step 1
2. TOEFL Primary Step 2
3. TOEFL Junior Standard

Speaking과 Writing은 리딩브레인 시행 시험으로 표시하지 않는다.

## 공식 시험 정보

- Primary Step 1: 초등학교 3~5학년 권장, Reading 36문항과 Listening 36문항, 총 72문항, 60분
- Primary Step 2: 영어 의사소통 기초를 갖춘 학생 대상, Reading 36문항과 Listening 36문항, 총 72문항, 65분
- Junior Standard: 중·고등학생 권장, Listening Comprehension 42문항, Language Form and Meaning 42문항, Reading Comprehension 42문항, 총 126문항, 115분
- 성적표에서 CEFR 기준과 Reading의 Lexile 지수를 확인할 수 있다.
- 공식 성적표와 인증서가 제공된다.

## 화면 구성

진단 시스템의 기존 `주니어토플시험` 카드를 `TOEFL YSS 공식 인증시험` 카드로 교체한다. 카드 상단에는 기존 로컬 이미지 `images/67337063_1773900869051.png`를 넓게 배치하고, 아래에 세 시험을 각각 작은 비교 카드로 표시한다.

각 비교 카드는 시험명, 권장 수준, 평가 영역, 문항 수와 시간을 포함한다. 하단에는 `국제 기준 진단 → 강점·보완 영역 확인 → Lexile 기반 원서 선정 → 정기 성장 추적` 흐름을 표시한다.

공식 인증서 안내 버튼은 `https://www.toeflyss.or.kr/gd/certificate/tab1`로 연결한다. 새 탭에서 열고 외부 사이트임을 명확히 표시한다.

## 관련 문구 정리

- 대회·캠프 카드의 `주니어토플 공식 인증센터`는 `TOEFL YSS 공식 지정센터`로 변경한다.
- 확인 근거가 명확하지 않은 `광명시 최다 응시 학원 선정` 표현은 제거한다.
- Primary Step 1·2의 자체 성과 수치는 기존에 공개 가능한 근거가 확인된 경우에만 유지한다. 이번 변경에서는 시험 소개와 공식 기준 전달에 집중한다.
- 기존 명예의 전당 카드의 성과 이미지는 유지하되 `TOEFL Junior · Primary 인증서`라는 현재 설명을 `Primary Step 1·2 · Junior Standard 인증서`로 명확하게 바꾼다.

## 접근성과 반응형

- 이미지에 시험명과 용도를 설명하는 대체 텍스트를 제공한다.
- 세 시험 정보는 이미지가 아닌 HTML 텍스트로 제공한다.
- 데스크톱에서 세 시험 카드를 가로로, 720px 이하에서 한 열로 표시한다.
- 360px 화면에서 문항 수와 시간이 잘리지 않아야 한다.

## 검증 기준

- 세 시험명과 공식 문항 수·시간이 모두 표시된다.
- 시행하지 않는 Speaking과 Writing이 리딩브레인 시험 목록에 포함되지 않는다.
- 기존의 잘못된 `Reading · Listening · Speaking 통합 평가` 문구가 제거된다.
- 공식 인증서 버튼이 지정 URL로 이동한다.
- 기존 다른 진단 카드와 링크는 변경되지 않는다.

# 커리큘럼 미디어 갤러리 강화 설계

## 목표

프로그램 안내의 주요 5개 커리큘럼 카드에서 실제 수업과 교재를 한눈에 확인할 수 있도록, 작은 단일 사진을 큰 대표 미디어와 보조 사진 갤러리로 교체한다.

## 적용 대상

1. 기초 원서 파닉스
2. 원서 정독반
3. 미국 공교육 교과(ChildU)
4. 중고등 특목 2관
5. 영자신문 & 논픽션반

스터디포스, 비교과 생기부, 미래 입시전략연구소 카드는 이번 변경 범위에서 제외한다.

## 미디어 구성

각 카드에는 큰 대표 미디어 1개와 보조 이미지 2개를 배치한다. 대표 영역은 카드 너비를 충분히 사용하고, 이미지의 중요 부분이 잘리지 않도록 `object-fit`과 초점 위치를 자료별로 지정한다. 보조 이미지는 PC에서 2열, 모바일에서는 가로 스크롤 형태로 표시한다.

- 기초 원서 파닉스: `images/phonics-class-actual.jpg`, `images/heidi/library.jpg`, `images/english-books-library.jpg`
- 원서 정독반: `images/signature-one-on-one-class.jpg`, `images/heidi/one-on-one-reading.jpg`, `images/heidi/book-talk.jpg`
- 미국 공교육 교과: `images/usa-curriculum-class.jpg`, `images/usa-curriculum-workbook.jpg`, `images/signature-usa-curriculum-class.jpg`
- 중고등 특목 2관: `images/signature-advanced-class.jpg`, `images/heidi/advanced-class.jpg`, `images/textbooks/hackers-apex-reading.webp`; 기존 별도 입시관리 영상 섹션으로 이동하는 링크를 함께 제공한다.
- 영자신문 & 논픽션반: `images/newspaper-nonfiction-class.jpg`, `images/textbooks/ne-times.webp`, `images/textbooks/reading-explorer.webp`

모든 자료는 현재 프로젝트에 이미 존재하며 사용자가 이전에 제공한 로컬 자료만 사용한다.

## 화면 구조

각 카드의 기존 `.program-media-link` 자리를 `.curriculum-media-gallery`로 교체한다.

- 대표 사진은 최소 높이 300px, 넓은 화면에서 360px로 표시한다.
- 사진 위에는 자료 내용을 설명하는 짧은 캡션을 둔다.
- 보조 사진은 확대 가능한 링크로 제공하며 새 탭에서 원본을 연다.
- 기존 외부 상세 링크는 갤러리 아래의 명확한 텍스트 링크로 유지한다.
- 중고등 특목 카드에는 페이지 내 `#admissions-management` 영상 섹션으로 이동하는 버튼을 추가한다.
- 기존 교재 쇼케이스는 유지하여 실제 수업 사진과 교재 정보를 함께 볼 수 있게 한다.

## 반응형·접근성

- 720px 이하에서는 대표 미디어 높이를 낮추고 보조 이미지 행을 가로 스크롤로 전환한다.
- 각 이미지에 커리큘럼과 장면을 설명하는 고유한 대체 텍스트를 제공한다.
- 갤러리 링크에는 목적을 설명하는 `aria-label`을 제공한다.
- 기존 lazy loading을 유지한다.

## 검증

전용 검증 스크립트에서 다음을 확인한다.

- 주요 5개 카드에 갤러리가 각각 하나씩 존재한다.
- 지정한 15개 미디어 경로가 HTML에 포함된다.
- 중고등 특목 카드의 영상 이동 링크가 존재한다.
- 기존 프로그램 설명, 외부 상세 링크, 교재 쇼케이스가 유지된다.
- 모바일 갤러리 스크롤 및 대표 이미지 크기 CSS가 존재한다.
- `git diff --check`가 통과한다.

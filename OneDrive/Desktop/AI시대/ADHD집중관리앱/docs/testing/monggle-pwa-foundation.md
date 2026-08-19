# 몽글 PWA 검증 가이드

## 자동 검증

```powershell
cd web
npm ci
npm run test:run
npm run build
npm run e2e
```

단위·컴포넌트 테스트는 로컬 저장, 메시지 정책, Studio 3D 테마, 캐릭터 상태, 사진 검증·정규화, 인물 분리 어댑터, 네트워크 없는 3종 캐릭터 합성, 명시적 적용과 취소를 검증합니다. Playwright는 모바일과 데스크톱에서 다섯 탭 유지, 캐릭터와 주요 버튼·하단 메뉴의 비충돌, 움직임 줄이기를 확인합니다.

## 사진 개인화 기준

- 허용 형식: JPEG, PNG, WebP
- 최대 파일 크기: 12MB
- 저장 전 정규화: 긴 변 최대 2048px
- 저장 위치: 브라우저 IndexedDB
- 처리 방식: 번들된 MediaPipe WASM과 TFLite 모델, Canvas 합성
- 외부 전송: 없음
- PWA 캐시: JS, CSS, HTML, SVG, PNG, WebP, TFLite, WASM
- 실패 복구: Studio 퍼플 배경과 `monggle-3d-approved-v1.png`
- 삭제: 설정의 ‘개인 사진 모두 삭제’가 원본·캐릭터 결과·설정을 하나의 트랜잭션으로 삭제하고 기본값을 복원

## 수동 확인

1. `/settings`에서 ‘배경 꾸미기’와 ‘내 캐릭터 만들기’를 각각 연다.
2. 사진을 선택한 뒤 취소하고 현재 배경과 기본 몽글이가 유지되는지 확인한다.
3. 원본/캐릭터, 스타일 3종, 적용 위치 3종을 선택하고 ‘적용하기’를 누른다.
4. 새로고침 후 선택한 배경과 프로필이 유지되는지 확인한다.
5. 320×568 화면에서 입력, 선택, 적용 버튼과 하단 탭이 겹치지 않는지 확인한다.
6. 개인 사진 모두 삭제 후 IndexedDB의 `photoAssets`와 `characterRenders`가 비고 기본 몽글이가 표시되는지 확인한다.

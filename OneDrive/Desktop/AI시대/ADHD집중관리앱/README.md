# 몽글

중·고등학생부터 성인까지 사용하는 로컬 우선 ADHD 집중·일정·메시지 예약 PWA입니다. 고정된 다섯 탭과 Studio 3D 보라 디자인, 화면을 돌아다니는 몽글 캐릭터를 제공합니다.

## 실행

```powershell
cd web
npm install
npm run dev
```

## 사진 배경과 캐릭터

- 설정에서 기본 배경 4종 또는 개인 사진을 선택할 수 있습니다.
- 개인 사진은 원본 또는 몽글 캐릭터 스타일로 사용할 수 있습니다.
- 캐릭터 스타일은 구름 슈트, Studio 3D, 라벤더 피규어 3종입니다.
- 배경, 프로필, 둘 다 중 적용 위치를 고를 수 있습니다.
- JPG·PNG·WebP, 최대 12MB를 지원하고 긴 변은 2048px로 정규화합니다.
- 사진·마스크·얼굴 정보는 서버로 전송하지 않습니다. 모든 변환은 번들된 모델로 기기 안에서 처리됩니다.
- 선택하지 않거나 처리에 실패하면 승인된 기본 3D 몽글이와 Studio 퍼플 배경으로 복구됩니다.

## 검증

```powershell
cd web
npm run test:run
npm run build
npm run e2e
```

자세한 기준은 `docs/testing/monggle-pwa-foundation.md`를 참고하세요.

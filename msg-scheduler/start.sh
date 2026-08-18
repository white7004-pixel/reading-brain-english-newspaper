#!/usr/bin/env bash
# 예약 메시지 발송기 실행 스크립트 (Mac/Linux)
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo ""
  echo "  Node.js가 설치되어 있지 않습니다."
  echo "  https://nodejs.org 에서 LTS 버전을 설치한 뒤 다시 실행하세요."
  echo ""
  exit 1
fi

echo ""
echo "  예약 메시지 발송기를 시작합니다..."
echo "  잠시 후 브라우저가 자동으로 열립니다. (주소: http://localhost:3000)"
echo ""
echo "  이 터미널을 닫으면 예약 발송이 멈춥니다."
echo ""

( sleep 2; open http://localhost:3000 2>/dev/null || xdg-open http://localhost:3000 2>/dev/null ) &
exec node server.js

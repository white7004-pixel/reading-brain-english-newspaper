@echo off
chcp 65001 >nul
title 예약 메시지 발송기
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js가 설치되어 있지 않습니다.
  echo  지금 열리는 페이지에서 LTS 버전을 설치한 뒤, 이 파일을 다시 실행하세요.
  echo.
  start https://nodejs.org/ko
  pause
  exit /b 1
)

echo.
echo  예약 메시지 발송기를 시작합니다...
echo  잠시 후 브라우저가 자동으로 열립니다. (주소: http://localhost:3000)
echo.
echo  이 검은 창을 닫으면 예약 발송이 멈춥니다. 창을 최소화해 두세요.
echo.

start "" /min cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"
node server.js
pause

@echo off
cd /d "%~dp0"
echo Reading Brain 이미지 다운로드 시작 (Stable Horde AI)
echo 종료하려면 이 창을 닫으세요.
echo.
:loop
node tools\download_images_horde.js
echo.
echo 스크립트 종료됨. 5초 후 재시작...
timeout /t 5 /nobreak
goto loop

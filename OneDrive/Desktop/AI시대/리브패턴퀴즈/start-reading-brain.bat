@echo off
cd /d "%~dp0"
echo Starting Reading Brain Server...
start "" http://localhost:4174
node server.js

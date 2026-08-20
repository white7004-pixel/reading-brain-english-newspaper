param([int]$Port = 4173)

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot
Write-Host "문법 AI 선생님: http://127.0.0.1:$Port"
Write-Host "종료하려면 Ctrl+C를 누르세요."
python -m http.server $Port --bind 127.0.0.1

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$sourceA = Join-Path $root '62717138-ABFA-44CA-A0A7-92092D0865A9.mp4'
$sourceB = Join-Path $root 'A81C60BE-2058-46DC-9D95-9710EB502BBF.MP4'
$sourceC = Join-Path $root '73499095-46C3-45B3-958B-5B5A4CC1D8B6.mp4'
$outputDir = Join-Path $root 'images\hero'
$outputVideo = Join-Path $outputDir 'hero-books-crossfade.mp4'
$outputPoster = Join-Path $outputDir 'hero-books-poster.jpg'

foreach ($source in @($sourceA, $sourceB, $sourceC)) {
  if (-not (Test-Path -LiteralPath $source)) {
    throw "Missing source video: $source"
  }
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw 'ffmpeg is not available'
}
if (-not (Get-Command ffprobe -ErrorAction SilentlyContinue)) {
  throw 'ffprobe is not available'
}

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$sourceADuration = [double](& ffprobe -v error -show_entries format=duration `
  -of default=noprint_wrappers=1:nokey=1 $sourceA)
if ($LASTEXITCODE -ne 0 -or $sourceADuration -le 0) {
  throw 'Unable to probe first source duration'
}

$firstFade = [Math]::Min(0.35, [Math]::Round($sourceADuration / 3, 3))
$secondFade = 0.8
$firstOffset = [Math]::Round($sourceADuration - $firstFade, 3)
$secondOffset = [Math]::Round($sourceADuration + 5 - $firstFade - $secondFade, 3)
$sourceADurationText = $sourceADuration.ToString('0.###', [Globalization.CultureInfo]::InvariantCulture)
$firstFadeText = $firstFade.ToString('0.###', [Globalization.CultureInfo]::InvariantCulture)
$secondFadeText = $secondFade.ToString('0.###', [Globalization.CultureInfo]::InvariantCulture)
$firstOffsetText = $firstOffset.ToString('0.###', [Globalization.CultureInfo]::InvariantCulture)
$secondOffsetText = $secondOffset.ToString('0.###', [Globalization.CultureInfo]::InvariantCulture)

$filter = @"
[0:v]fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,trim=duration=$sourceADurationText,setpts=PTS-STARTPTS[a];
[1:v]fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,trim=duration=5,setpts=PTS-STARTPTS[b];
[2:v]fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,trim=duration=5,setpts=PTS-STARTPTS[c];
[a][b]xfade=transition=fade:duration=${firstFadeText}:offset=${firstOffsetText}[ab];
[ab][c]xfade=transition=fade:duration=${secondFadeText}:offset=${secondOffsetText},format=yuv420p[outv]
"@

$encodeArgs = @(
  '-y',
  '-i', $sourceA,
  '-i', $sourceB,
  '-i', $sourceC,
  '-filter_complex', $filter,
  '-map', '[outv]',
  '-an',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '24',
  '-movflags', '+faststart',
  '-pix_fmt', 'yuv420p',
  $outputVideo
)

& ffmpeg @encodeArgs
if ($LASTEXITCODE -ne 0) {
  throw "ffmpeg video build failed with exit code $LASTEXITCODE"
}

& ffmpeg -y -ss 0.4 -i $outputVideo -frames:v 1 -q:v 2 $outputPoster
if ($LASTEXITCODE -ne 0) {
  throw "ffmpeg poster build failed with exit code $LASTEXITCODE"
}

Write-Output "Created $outputVideo"
Write-Output "Created $outputPoster"

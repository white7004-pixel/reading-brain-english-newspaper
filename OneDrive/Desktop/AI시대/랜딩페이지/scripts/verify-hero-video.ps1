$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$video = Join-Path $root 'images\hero\hero-books-crossfade.mp4'
$poster = Join-Path $root 'images\hero\hero-books-poster.jpg'
$firstSource = Join-Path $root '62717138-ABFA-44CA-A0A7-92092D0865A9.mp4'

if (-not (Test-Path -LiteralPath $video)) { throw 'Missing hero video' }
if (-not (Test-Path -LiteralPath $poster)) { throw 'Missing hero poster' }
if (-not (Test-Path -LiteralPath $firstSource)) { throw 'Missing first source video' }

$probe = (ffprobe -v error -select_streams v:0 `
  -show_entries stream=codec_name,width,height `
  -of default=noprint_wrappers=1 $video) -join "`n"

if ($probe -notmatch 'codec_name=h264') { throw 'Hero video must use H.264' }
if ($probe -notmatch 'width=1280') { throw 'Hero video width must be 1280' }
if ($probe -notmatch 'height=720') { throw 'Hero video height must be 720' }

$audio = ffprobe -v error -select_streams a -show_entries stream=index `
  -of csv=p=0 $video
if ($audio) { throw 'Hero video must not contain audio' }

$firstDuration = [double](ffprobe -v error -show_entries format=duration `
  -of default=noprint_wrappers=1:nokey=1 $firstSource)
if ($firstDuration -gt 1.25) {
  throw "Unexpected first source duration: $firstDuration"
}

$outputDuration = [double](ffprobe -v error -show_entries format=duration `
  -of default=noprint_wrappers=1:nokey=1 $video)
if ($outputDuration -lt 8 -or $outputDuration -gt 12) {
  throw "Composite duration outside expected non-looped range: $outputDuration"
}

$index = Get-Content -Encoding UTF8 -Raw (Join-Path $root 'index.html')
$css = Get-Content -Encoding UTF8 -Raw (Join-Path $root 'new_styles.css')

if ($index -match 'hero-slideshow') { throw 'Legacy hero slideshow still exists' }
if ($index -notmatch 'class="hero-video"') { throw 'Hero video element is missing' }
if ($index -notmatch 'autoplay muted loop playsinline') { throw 'Hero video attributes are incomplete' }
if ($index -notmatch 'poster="images/hero/hero-books-poster.jpg"') { throw 'Hero poster is missing' }
if ($css -notmatch 'prefers-reduced-motion:\s*reduce') { throw 'Reduced motion rule is missing' }
if ($css -notmatch '\.hero-video\s*\{') { throw 'Hero video CSS is missing' }

Write-Output 'Hero media verification passed.'

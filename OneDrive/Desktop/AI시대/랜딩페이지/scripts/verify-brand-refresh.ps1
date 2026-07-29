$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$index = Get-Content -Encoding UTF8 -Raw (Join-Path $root 'index.html')
$detail = Get-Content -Encoding UTF8 -Raw (Join-Path $root 'curriculum-detail.html')
$css = Get-Content -Encoding UTF8 -Raw (Join-Path $root 'new_styles.css')
$allMarkup = $index + "`n" + $detail

$requiredCopyBase64 = @(
  '7J6F7Iuc66W8IOuEmOyWtCwg7Y+J7IOdIOyTsOuKlCDsmIHslrQu',
  'QUkg7Iuc64yA7J2YIOq4gOuhnOuyjCDrrLjtlbTroKXqs7wg7IOd6rCB7ZWY64qUIO2emOydgCDsmIHslrTsm5DshJzsl5DshJwg7Iuc7J6R65Cp64uI64ukLg==',
  '7ZW07Jm47JeQIOqwgOyngCDslYrslYTrj4QsIOyYgeyWtOuhnCDsg53qsIHtlZjripQg7JWE7J206rCAIOuQqeuLiOuLpC4=',
  '7Iuc7ZeY7J20IOuBneuCnCDrkqTsl5Drj4Qg7IK07JWEIOyeiOuKlCDsmIHslrQ='
)

$requiredCopy = $requiredCopyBase64 | ForEach-Object {
  [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($_))
}

foreach ($copy in $requiredCopy) {
  if (-not $index.Contains($copy)) {
    throw "Missing approved copy: $copy"
  }
}

$requiredColors = @('#0C354D', '#8B1E24', '#F6F2E9', '#B89A62', '#18242D')
foreach ($color in $requiredColors) {
  if (-not $css.Contains($color)) {
    throw "Missing brand color: $color"
  }
}

if ($allMarkup -match 'images\.unsplash\.com') {
  throw 'Unsplash imagery remains in the site.'
}

if ($allMarkup -notmatch 'pcmap\.place\.naver\.com/place/1447511520/review/visitor') {
  throw 'Official Naver Place review link is missing.'
}

$decorativeIconTextPattern = '<div class="(?:phil-icon|program-badge|heidi-icon|diag-icon|loc-icon)">\s*[^<\s]'
if ($allMarkup -match $decorativeIconTextPattern) {
  throw 'Decorative emoji remains in page content.'
}

Write-Output 'Brand refresh verification passed.'

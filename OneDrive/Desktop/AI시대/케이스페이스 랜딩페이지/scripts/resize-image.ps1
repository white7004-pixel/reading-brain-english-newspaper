param(
    [Parameter(Mandatory=$true)][string]$InputPath,
    [Parameter(Mandatory=$true)][string]$OutputPath,
    [int]$MaxWidth = 1600,
    [int]$Quality = 78
)
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path $InputPath))

# Honour EXIF orientation (tag 274) so phone photos are not sideways
if ($img.PropertyIdList -contains 274) {
    $o = $img.GetPropertyItem(274).Value[0]
    switch ($o) {
        3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
        6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
        8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
}

$ratio = [math]::Min(1.0, $MaxWidth / $img.Width)
$newWidth = [int]($img.Width * $ratio)
$newHeight = [int]($img.Height * $ratio)
$bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
$out = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputPath))
$bitmap.Save($out, $encoder, $encoderParams)
$graphics.Dispose(); $bitmap.Dispose(); $img.Dispose()
Write-Host "$OutputPath ($newWidth x $newHeight)"

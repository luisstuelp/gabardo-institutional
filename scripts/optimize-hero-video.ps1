# Script para otimizar o video do hero da homepage
# Reduz duracao em 20 segundos e comprime para melhor performance

param(
    [string]$InputVideo = "..\public\images\truck-cut-hd-2.mp4",
    [int]$DurationReduction = 20,
    [string]$OutputDir = "..\public\images"
)

Write-Host "=== Otimizacao de Video Hero ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se FFmpeg esta instalado
try {
    $ffmpegVersion = ffmpeg -version 2>&1 | Select-Object -First 1
    Write-Host "[OK] FFmpeg encontrado: $ffmpegVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] FFmpeg nao encontrado. Por favor, instale FFmpeg:" -ForegroundColor Red
    Write-Host "  - Windows: choco install ffmpeg ou baixe de https://ffmpeg.org/download.html" -ForegroundColor Yellow
    Write-Host "  - Ou use: winget install ffmpeg" -ForegroundColor Yellow
    exit 1
}

# Verificar se o arquivo de entrada existe
if (-not (Test-Path $InputVideo)) {
    Write-Host "[ERRO] Arquivo de entrada nao encontrado: $InputVideo" -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Arquivo de entrada encontrado: $InputVideo" -ForegroundColor Green

# Obter duração do vídeo original
$durationOutput = ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $InputVideo 2>&1
$originalDuration = [math]::Round([double]$durationOutput, 2)
$newDuration = $originalDuration - $DurationReduction

Write-Host ""
Write-Host "Duracao original: $originalDuration segundos" -ForegroundColor White
Write-Host "Nova duracao: $newDuration segundos" -ForegroundColor White
Write-Host ""

# Criar diretório de saída se não existir
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

# Definir arquivos de saída
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$desktopOutput = Join-Path $OutputDir "hero-video-desktop-optimized.mp4"
$mobileOutput = Join-Path $OutputDir "hero-video-mobile-optimized.mp4"
$backupDir = Join-Path $OutputDir "backup_$timestamp"

# Criar backup do vídeo original
Write-Host "Criando backup..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Copy-Item $InputVideo -Destination $backupDir
Write-Host "[OK] Backup criado em: $backupDir" -ForegroundColor Green
Write-Host ""

# Otimizar para Desktop (1080p, bitrate otimizado)
Write-Host "Processando versao Desktop (1080p)..." -ForegroundColor Cyan
Write-Host "  - Reduzindo duracao para $newDuration segundos" -ForegroundColor Gray
Write-Host "  - Comprimindo com H.264 (CRF 28)" -ForegroundColor Gray
Write-Host "  - Otimizando para streaming web" -ForegroundColor Gray

ffmpeg -i $InputVideo `
    -t $newDuration `
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" `
    -c:v libx264 `
    -preset slow `
    -crf 28 `
    -profile:v high `
    -level 4.0 `
    -pix_fmt yuv420p `
    -movflags +faststart `
    -an `
    -y `
    $desktopOutput 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    $desktopSize = [math]::Round((Get-Item $desktopOutput).Length / 1MB, 2)
    Write-Host "[OK] Versao Desktop criada: $desktopOutput ($desktopSize MB)" -ForegroundColor Green
} else {
    Write-Host "[ERRO] Erro ao criar versao Desktop" -ForegroundColor Red
}

Write-Host ""

# Otimizar para Mobile (720p, bitrate mais baixo)
Write-Host "Processando versao Mobile (720p)..." -ForegroundColor Cyan
Write-Host "  - Reduzindo duracao para $newDuration segundos" -ForegroundColor Gray
Write-Host "  - Comprimindo com H.264 (CRF 30)" -ForegroundColor Gray
Write-Host "  - Otimizando para dispositivos moveis" -ForegroundColor Gray

ffmpeg -i $InputVideo `
    -t $newDuration `
    -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" `
    -c:v libx264 `
    -preset slow `
    -crf 30 `
    -profile:v main `
    -level 3.1 `
    -pix_fmt yuv420p `
    -movflags +faststart `
    -an `
    -y `
    $mobileOutput 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    $mobileSize = [math]::Round((Get-Item $mobileOutput).Length / 1MB, 2)
    Write-Host "[OK] Versao Mobile criada: $mobileOutput ($mobileSize MB)" -ForegroundColor Green
} else {
    Write-Host "[ERRO] Erro ao criar versao Mobile" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Otimizacao Concluida ===" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "1. Teste os videos otimizados no navegador" -ForegroundColor White
Write-Host "2. Atualize o componente HeroSection.tsx para usar os novos videos" -ForegroundColor White
Write-Host "3. Ajuste VIDEO_MAX_DURATION de 77 para $newDuration" -ForegroundColor White
Write-Host ""
Write-Host "Arquivos gerados:" -ForegroundColor Cyan
Write-Host "  Desktop: $desktopOutput" -ForegroundColor White
Write-Host "  Mobile:  $mobileOutput" -ForegroundColor White
Write-Host "  Backup:  $backupDir" -ForegroundColor White

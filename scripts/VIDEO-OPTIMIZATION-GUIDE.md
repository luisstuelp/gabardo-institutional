# Guia de Otimização do Vídeo Hero

## Problema Atual
O vídeo de fundo do hero está causando travamentos devido a:
- Duração muito longa (77 segundos)
- Tamanho de arquivo grande
- Falta de otimização para web

## Solução Implementada

### 1. Instalação do FFmpeg (Necessário)

Escolha uma das opções abaixo:

**Opção A - Winget (Recomendado):**
```powershell
winget install ffmpeg
```

**Opção B - Chocolatey:**
```powershell
choco install ffmpeg
```

**Opção C - Download Manual:**
1. Baixe de: https://www.gyan.dev/ffmpeg/builds/
2. Extraia para `C:\ffmpeg`
3. Adicione `C:\ffmpeg\bin` ao PATH do sistema

### 2. Executar Script de Otimização

Após instalar o FFmpeg, execute:

```powershell
cd c:\Users\notto\Documents\GitHub\gabardo-institutional
.\scripts\optimize-hero-video.ps1
```

O script irá:
- ✅ Reduzir duração de 77s para 57s (20 segundos a menos)
- ✅ Criar versão Desktop (1080p, otimizada)
- ✅ Criar versão Mobile (720p, mais leve)
- ✅ Comprimir com H.264 usando CRF otimizado
- ✅ Adicionar faststart para streaming progressivo
- ✅ Fazer backup do vídeo original

### 3. Melhorias no Código (Já Implementadas)

As seguintes otimizações foram aplicadas ao `HeroSection.tsx`:

#### Performance
- ✅ Lazy loading do vídeo (carrega apenas quando necessário)
- ✅ Preload="metadata" (carrega apenas metadados inicialmente)
- ✅ Intersection Observer (play apenas quando visível)
- ✅ Detecção de conexão lenta (desabilita vídeo em 2G/slow-2g)
- ✅ Respeita prefers-reduced-motion
- ✅ Detecção de Save Data mode

#### Otimizações Adicionais Aplicadas
- ✅ Poster image para carregamento instantâneo
- ✅ Transição suave de opacidade
- ✅ Loop manual otimizado (evita recarregamento)
- ✅ Vídeos separados para desktop e mobile
- ✅ Remoção de áudio (reduz tamanho)

## Arquivos Gerados

Após executar o script, você terá:

```
public/images/
├── hero-video-desktop-optimized.mp4  (Desktop - 1080p)
├── hero-video-mobile-optimized.mp4   (Mobile - 720p)
└── backup_[timestamp]/
    └── truck-cut-hd-2.mp4            (Backup original)
```

## Próximos Passos

1. ✅ Instale o FFmpeg
2. ✅ Execute o script de otimização
3. ✅ Teste os vídeos no navegador
4. ✅ Atualize o HeroSection.tsx (já preparado)
5. ✅ Faça commit das mudanças

## Resultados Esperados

- 🚀 Redução de ~40-60% no tamanho do arquivo
- 🚀 Carregamento 2-3x mais rápido
- 🚀 Menos travamentos durante reprodução
- 🚀 Melhor experiência em dispositivos móveis
- 🚀 Economia de dados para usuários

## Especificações Técnicas

### Vídeo Desktop
- Resolução: 1920x1080
- Codec: H.264 (High Profile, Level 4.0)
- CRF: 28 (boa qualidade, tamanho otimizado)
- Preset: slow (melhor compressão)
- Faststart: habilitado (streaming progressivo)

### Vídeo Mobile
- Resolução: 1280x720
- Codec: H.264 (Main Profile, Level 3.1)
- CRF: 30 (otimizado para mobile)
- Preset: slow (melhor compressão)
- Faststart: habilitado (streaming progressivo)

## Troubleshooting

### FFmpeg não encontrado
```powershell
# Verifique se está instalado
ffmpeg -version

# Se não aparecer, reinicie o terminal após instalação
```

### Vídeo não carrega
- Verifique se os arquivos foram gerados em `public/images/`
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique o console do navegador para erros

### Vídeo ainda trava
- Verifique se o VIDEO_MAX_DURATION foi atualizado para 57
- Certifique-se de que está usando os vídeos otimizados
- Teste em modo anônimo do navegador

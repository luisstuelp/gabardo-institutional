# Resumo das Otimizações do Vídeo Hero

## ✅ Otimizações Implementadas

### 1. Código Otimizado (HeroSection.tsx)
- ✅ **VIDEO_MAX_DURATION reduzido**: 77s → 57s (20 segundos a menos)
- ✅ **Fallback para vídeos otimizados**: Prioriza versões comprimidas
- ✅ **Performance já otimizada**:
  - Lazy loading com requestIdleCallback
  - Intersection Observer (play apenas quando visível)
  - Detecção de conexão lenta (desabilita em 2G)
  - Respeita prefers-reduced-motion
  - Detecção de Save Data mode
  - Preload="metadata" (carrega apenas metadados)

### 2. Script de Otimização Criado
- ✅ **Arquivo**: `scripts/optimize-hero-video.ps1`
- ✅ **Guia completo**: `scripts/VIDEO-OPTIMIZATION-GUIDE.md`

## 📋 Próximos Passos (Requer Ação Manual)

### Passo 1: Instalar FFmpeg

Escolha uma opção:

```powershell
# Opção A - Winget (Recomendado)
winget install ffmpeg

# Opção B - Chocolatey
choco install ffmpeg

# Opção C - Download Manual
# Baixe de: https://www.gyan.dev/ffmpeg/builds/
# Extraia para C:\ffmpeg e adicione ao PATH
```

### Passo 2: Executar Script de Otimização

```powershell
cd c:\Users\notto\Documents\GitHub\gabardo-institutional
.\scripts\optimize-hero-video.ps1
```

O script irá:
- Reduzir duração do vídeo em 20 segundos (77s → 57s)
- Criar versão Desktop (1080p, ~40-60% menor)
- Criar versão Mobile (720p, otimizada)
- Fazer backup do vídeo original

### Passo 3: Testar

1. Após executar o script, teste no navegador
2. Verifique se os vídeos carregam corretamente
3. Teste em dispositivos móveis
4. Monitore o console para erros

## 📊 Resultados Esperados

### Performance
- 🚀 **Redução de tamanho**: ~40-60% menor
- 🚀 **Carregamento**: 2-3x mais rápido
- 🚀 **Menos travamentos**: Loop otimizado para 57s
- 🚀 **Melhor experiência mobile**: Vídeo 720p dedicado

### Arquivos Gerados

Após executar o script:

```
public/images/
├── hero-video-desktop-optimized.mp4  (1080p, H.264, CRF 28)
├── hero-video-mobile-optimized.mp4   (720p, H.264, CRF 30)
└── backup_[timestamp]/
    └── truck-cut-hd-2.mp4            (Backup original)
```

## 🔧 Especificações Técnicas

### Vídeo Desktop
- **Resolução**: 1920x1080
- **Codec**: H.264 (High Profile, Level 4.0)
- **CRF**: 28 (boa qualidade, tamanho otimizado)
- **Preset**: slow (melhor compressão)
- **Faststart**: habilitado (streaming progressivo)
- **Áudio**: removido (reduz tamanho)

### Vídeo Mobile
- **Resolução**: 1280x720
- **Codec**: H.264 (Main Profile, Level 3.1)
- **CRF**: 30 (otimizado para mobile)
- **Preset**: slow (melhor compressão)
- **Faststart**: habilitado (streaming progressivo)
- **Áudio**: removido (reduz tamanho)

## 🎯 Mudanças no Código

### HeroSection.tsx

#### Antes:
```typescript
const VIDEO_MAX_DURATION = 77;

<source src="/images/truck-cut-hd-2.mp4" type="video/mp4" />
<source src="https://v8awusfkdo.ufs.sh/f/..." type="video/mp4" />
```

#### Depois:
```typescript
const VIDEO_MAX_DURATION = 57; // Reduzido de 77s para 57s (otimização)

// Mobile - prioriza versão otimizada
<source src="/images/hero-video-mobile-optimized.mp4" type="video/mp4" />
<source src="/images/truck-cut-hd-2.mp4" type="video/mp4" />

// Desktop - prioriza versão otimizada
<source src="/images/hero-video-desktop-optimized.mp4" type="video/mp4" />
<source src="https://v8awusfkdo.ufs.sh/f/..." type="video/mp4" />
```

## ⚠️ Importante

1. **O código já está otimizado** - as mudanças foram aplicadas
2. **Os vídeos otimizados ainda não existem** - você precisa executar o script
3. **Até executar o script**, o site usará os vídeos originais (fallback)
4. **Após executar o script**, o site usará automaticamente os vídeos otimizados

## 🐛 Troubleshooting

### FFmpeg não encontrado
```powershell
# Verifique se está instalado
ffmpeg -version

# Se não aparecer, reinicie o terminal após instalação
```

### Vídeo não carrega
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se os arquivos foram gerados em `public/images/`
- Verifique o console do navegador para erros

### Vídeo ainda trava
- Certifique-se de que está usando os vídeos otimizados
- Teste em modo anônimo do navegador
- Verifique se VIDEO_MAX_DURATION está em 57

## 📚 Documentação Adicional

- **Guia completo**: `scripts/VIDEO-OPTIMIZATION-GUIDE.md`
- **Script**: `scripts/optimize-hero-video.ps1`
- **Componente**: `src/components/custom/HeroSection.tsx`

## ✨ Benefícios Adicionais

- ✅ Economia de banda para usuários
- ✅ Melhor SEO (Core Web Vitals)
- ✅ Menor uso de CPU durante reprodução
- ✅ Compatibilidade com mais dispositivos
- ✅ Experiência mais fluida em geral

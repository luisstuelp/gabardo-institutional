# Quick Start - Otimização de Vídeo Hero

## 🚀 Início Rápido (3 Passos)

### 1️⃣ Instale o FFmpeg

Abra o PowerShell como Administrador e execute:

```powershell
winget install ffmpeg
```

**Ou** se preferir Chocolatey:

```powershell
choco install ffmpeg
```

### 2️⃣ Execute o Script

```powershell
cd c:\Users\notto\Documents\GitHub\gabardo-institutional
.\scripts\optimize-hero-video.ps1
```

### 3️⃣ Teste

Abra o navegador e acesse:
```
http://localhost:3000
```

Pressione `Ctrl+Shift+R` para limpar o cache e ver os vídeos otimizados.

---

## ✅ O que já foi feito

- ✅ Código do HeroSection.tsx otimizado
- ✅ VIDEO_MAX_DURATION reduzido de 77s para 57s
- ✅ Fallbacks configurados para vídeos otimizados
- ✅ Performance melhorada (lazy loading, intersection observer, etc.)

## 📦 O que o script faz

1. ✅ Reduz duração do vídeo em 20 segundos
2. ✅ Cria versão Desktop (1080p, otimizada)
3. ✅ Cria versão Mobile (720p, mais leve)
4. ✅ Faz backup do vídeo original
5. ✅ Aplica compressão H.264 otimizada para web

## 📊 Resultados Esperados

- 🚀 Redução de ~40-60% no tamanho do arquivo
- 🚀 Carregamento 2-3x mais rápido
- 🚀 Menos travamentos durante reprodução
- 🚀 Melhor experiência em dispositivos móveis

---

## 🆘 Precisa de Ajuda?

Veja a documentação completa:
- `VIDEO-OPTIMIZATION-GUIDE.md` - Guia detalhado
- `HERO-VIDEO-OPTIMIZATION-SUMMARY.md` - Resumo completo

## 🐛 Problemas Comuns

### FFmpeg não encontrado
```powershell
# Reinicie o terminal após instalação
# Ou verifique se está instalado:
ffmpeg -version
```

### Script não executa
```powershell
# Execute com bypass de política:
powershell -ExecutionPolicy Bypass -File .\scripts\optimize-hero-video.ps1
```

### Vídeo não carrega
1. Limpe o cache: `Ctrl+Shift+R`
2. Verifique se os arquivos foram gerados em `public/images/`
3. Abra o console do navegador (F12) e procure por erros

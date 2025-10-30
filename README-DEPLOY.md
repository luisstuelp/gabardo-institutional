# 🚀 Deploy Gabardo Institutional - Guia Rápido

## ⚡ Setup em 3 Passos

### 1️⃣ Supabase (5 minutos)

**Executar no SQL Editor:**
```sql
-- Adicionar colunas à tabela posts
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS author text,
ADD COLUMN IF NOT EXISTS read_time text,
ADD COLUMN IF NOT EXISTS seo_description text,
ADD COLUMN IF NOT EXISTS seo_keywords text[] DEFAULT '{}';

-- Criar bucket de storage
-- Ir em Storage → New Bucket → Nome: content-images → Public ✓

-- Executar políticas de storage (ver VERCEL-ENV-VARS.md)
```

---

### 2️⃣ Vercel (3 minutos)

**Adicionar variáveis:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=content-images
ADMIN_SESSION_SECRET=gere-32-chars-aleatorios
```

**Onde:**
- Vercel Dashboard → Settings → Environment Variables
- Aplicar em: Production, Preview, Development

---

### 3️⃣ Deploy (1 minuto)

```bash
git push origin main
# Vercel faz deploy automático
```

---

## ✅ Melhorias Implementadas

- ✅ Confirmação ao excluir posts/artigos
- ✅ Header adaptado em posts individuais (dark)
- ✅ Newsletter removida do blog
- ✅ Imagens externas funcionando (osul.com.br, etc.)
- ✅ Botões "Novo Post" e "Novo Artigo" padronizados
- ✅ Parser de texto simples (não precisa JSON)
- ✅ Sistema de métricas completo
- ✅ Hostname Supabase configurado

---

## 📚 Documentação Completa

- **VERCEL-ENV-VARS.md** - Todas as env vars detalhadas
- **PRE-DEPLOY-SUMMARY.md** - Resumo completo de tudo
- **QUICK-START.md** - Setup do zero
- **TROUBLESHOOTING.md** - Soluções de problemas
- **GUIA-CRIACAO-POST.md** - Como usar o formulário

---

## 🧪 Teste Rápido Pós-Deploy

```bash
# 1. Admin
https://seu-site.vercel.app/admin
→ Login
→ Criar post
→ Upload imagem
→ Salvar

# 2. Blog
https://seu-site.vercel.app/blog
→ Ver lista
→ Clicar em post
→ Verificar header dark

# 3. Métricas
https://seu-site.vercel.app/admin/metricas
→ Ver visualizações
→ Ver clicks
→ Ver shares
```

---

## ⚠️ Problemas Comuns

### "featured column not found"
→ Execute a migration SQL no Supabase

### "Bucket not found"
→ Crie bucket `content-images` público

### "Unauthorized"
→ Verifique env vars no Vercel

### Imagens não carregam
→ Execute políticas de Storage

---

## 🎯 Status: PRONTO

✅ Backend configurado  
✅ Frontend otimizado  
✅ Métricas funcionando  
✅ Documentação completa  
✅ Variáveis mapeadas  

**Pode fazer deploy!** 🚀

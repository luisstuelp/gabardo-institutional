# Variáveis de Ambiente para Deploy no Vercel

## 📋 Lista Completa de Environment Variables

Copie e cole estas variáveis no Vercel Dashboard em **Settings → Environment Variables**.

### 🔐 Supabase (OBRIGATÓRIO)

```bash
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co

# Supabase Anonymous Key (público)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Service Role Key (privado - NÃO compartilhar)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Como obter:**
1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings → API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

---

### 🎨 Storage Bucket (OBRIGATÓRIO)

```bash
# Nome do bucket de imagens
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=content-images
```

⚠️ **Importante**: O bucket `content-images` deve existir no Supabase Storage e ser **público**.

---

### 📧 Email Service (OPCIONAL)

```bash
# Serviço de email para formulário de contato
EMAIL_SERVICE_URL=https://seu-servico-email.com/api
EMAIL_SERVICE_KEY=sua-chave-aqui
```

**Nota**: Se você não usa email service, pode deixar vazio ou remover.

---

### 🔑 Admin Session (OBRIGATÓRIO)

```bash
# Chave secreta para cookies de admin (gere uma aleatória)
ADMIN_SESSION_SECRET=sua-chave-super-secreta-de-pelo-menos-32-caracteres
```

**Como gerar uma chave segura:**
```bash
# No terminal (Node.js):
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Ou use um gerador online:
# https://www.random.org/strings/
```

---

## 🚀 Como Adicionar no Vercel

### Método 1: Interface Web

1. Acesse https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings → Environment Variables**
4. Para cada variável:
   - **Key**: Nome da variável (ex: `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: Valor da variável
   - **Environments**: Selecione **Production**, **Preview**, **Development**
5. Clique em **Save**

### Método 2: Vercel CLI

```bash
# Instalar CLI
npm i -g vercel

# Login
vercel login

# Adicionar variáveis
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET
vercel env add ADMIN_SESSION_SECRET
```

---

## ✅ Checklist de Verificação

Antes de fazer o deploy, confirme:

- [ ] ✅ Todas as 5 variáveis obrigatórias foram adicionadas
- [ ] ✅ `NEXT_PUBLIC_SUPABASE_URL` termina com `.supabase.co`
- [ ] ✅ Keys do Supabase começam com `eyJ...`
- [ ] ✅ Bucket `content-images` existe e é público no Supabase
- [ ] ✅ `ADMIN_SESSION_SECRET` tem pelo menos 32 caracteres
- [ ] ✅ Variáveis aplicadas em **Production**, **Preview** e **Development**

---

## 🔒 Segurança

### ⚠️ NUNCA COMPARTILHE:
- ❌ `SUPABASE_SERVICE_ROLE_KEY`
- ❌ `ADMIN_SESSION_SECRET`
- ❌ Qualquer outra chave privada

### ✅ Pode ser público:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`

**Regra**: Se começa com `NEXT_PUBLIC_`, é exposto no frontend.

---

## 🧪 Como Testar

Após adicionar as variáveis:

1. **Trigger novo deploy**:
   ```bash
   # Via CLI
   vercel --prod
   
   # Ou via interface
   # Deployments → Redeploy
   ```

2. **Verificar no deploy**:
   - Acesse o log do deploy
   - Confirme que não há erros de "missing environment variable"
   - Teste login no admin
   - Teste criação de post/artigo
   - Teste upload de imagem

---

## 🆘 Troubleshooting

### Erro: "NEXT_PUBLIC_SUPABASE_URL is not defined"
**Solução**: Variável não foi adicionada ou deploy não foi refeito após adicionar.

### Erro: "Unauthorized" no Supabase
**Solução**: Verifique se as keys estão corretas e não foram copiadas com espaços extras.

### Erro: "Bucket not found"
**Solução**: 
1. Crie o bucket `content-images` no Supabase
2. Configure como público
3. Execute as políticas SQL (ver QUICK-START.md)

### Upload de imagem não funciona
**Solução**:
1. Verifique se `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` está correto
2. Confirme que o bucket é **público**
3. Execute as políticas de Storage (ver TROUBLESHOOTING.md)

---

## 📝 Exemplo Completo

```bash
# === OBRIGATÓRIO ===
NEXT_PUBLIC_SUPABASE_URL=https://dtigmldicruaprczokii.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aWdtbGRpY3J1YXByY3pva2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0MTY4MzYsImV4cCI6MjA0NTk5MjgzNn0.abc123...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aWdtbGRpY3J1YXByY3pva2lpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDQxNjgzNiwiZXhwIjoyMDQ1OTkyODM2fQ.xyz789...
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=content-images
ADMIN_SESSION_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6

# === OPCIONAL ===
EMAIL_SERVICE_URL=
EMAIL_SERVICE_KEY=
```

---

## 🎯 Após o Deploy

1. ✅ Acesse `https://seu-site.vercel.app/admin`
2. ✅ Teste login
3. ✅ Crie um post de teste
4. ✅ Faça upload de imagem
5. ✅ Verifique se o post aparece em `/blog`
6. ✅ Teste métricas em `/admin/metricas`

---

**Última atualização**: 30/10/2025  
**Versão**: 1.0

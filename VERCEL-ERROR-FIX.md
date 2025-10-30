# 🚨 FIX: Vercel Build Error "Invalid API key"

## O Erro

```
Error: Invalid API key
Hint: Double check your Supabase `anon` or `service_role` API key.
```

**Causa**: As variáveis de ambiente do Supabase não foram configuradas no Vercel.

---

## ✅ Solução Imediata (5 minutos)

### Passo 1: Obter Keys do Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto Gabardo
3. Vá em **Settings → API** (menu lateral esquerdo)
4. **Copie EXATAMENTE** (sem espaços extras):

```bash
# Project URL
https://dtigmldicruaprczokii.supabase.co

# anon key (público)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aWdtbGRpY3J1YXByY3pva2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0MTY4MzYsImV4cCI6MjA0NTk5MjgzNn0...

# service_role key (privado)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aWdtbGRpY3J1YXByY3pva2lpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDQxNjgzNiwiZXhwIjoyMDQ1OTkyODM2fQ...
```

---

### Passo 2: Adicionar no Vercel

1. Vá para: https://vercel.com/dashboard
2. Selecione o projeto **gabardo-institutional**
3. Clique em **Settings** (topo da página)
4. Clique em **Environment Variables** (menu lateral)
5. Adicione cada variável:

#### Variável 1:
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://dtigmldicruaprczokii.supabase.co` (seu project URL)
- **Environments**: ✓ Production ✓ Preview ✓ Development
- Clique em **Save**

#### Variável 2:
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Cole a anon key completa (começa com `eyJ...`)
- **Environments**: ✓ Production ✓ Preview ✓ Development
- Clique em **Save**

#### Variável 3:
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Cole a service_role key completa (começa com `eyJ...`)
- **Environments**: ✓ Production ✓ Preview ✓ Development
- Clique em **Save**

#### Variável 4:
- **Key**: `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`
- **Value**: `content-images`
- **Environments**: ✓ Production ✓ Preview ✓ Development
- Clique em **Save**

#### Variável 5:
- **Key**: `ADMIN_SESSION_SECRET`
- **Value**: Gere uma chave aleatória (veja abaixo)
- **Environments**: ✓ Production ✓ Preview ✓ Development
- Clique em **Save**

**Como gerar ADMIN_SESSION_SECRET:**
```bash
# No terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Exemplo de resultado:
# a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

---

### Passo 3: Redeploy

Após adicionar todas as variáveis:

**Opção A - Via Interface:**
1. Vá em **Deployments** (menu superior)
2. Clique nos 3 pontinhos do último deploy
3. Clique em **Redeploy**
4. Confirme

**Opção B - Via Git:**
```bash
# Faça um commit vazio para trigger deploy
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

---

## 🔍 Verificar Se Funcionou

Após o redeploy:

1. Vá em **Deployments**
2. Clique no deploy mais recente
3. Veja os logs
4. ✅ **Sucesso**: Deve mostrar `✓ Generating static pages`
5. ❌ **Falha**: Veja seção "Troubleshooting" abaixo

---

## 🛠️ O Que Fizemos Temporariamente

Para permitir que você faça o deploy **enquanto configura as variáveis**, desabilitei a geração estática de páginas do blog.

**Arquivo modificado:** `src/app/blog/[slug]/page.tsx`
- ❌ Desabilitado: `generateStaticParams()` (requer Supabase no build)
- ✅ Habilitado: `dynamic = 'force-dynamic'` (renderiza on-demand)

**Impacto:**
- ✅ Build funciona sem Supabase
- ⚠️ Posts são renderizados on-demand (um pouco mais lento)
- 🔄 Depois de configurar env vars, podemos reabilitar geração estática

---

## 🔄 Como Reabilitar Geração Estática (Opcional)

**Depois** de configurar as variáveis e verificar que tudo funciona:

1. Abra `src/app/blog/[slug]/page.tsx`
2. Encontre este código:
```typescript
// Temporarily disabled to allow build without Supabase keys
// Enable this after configuring environment variables in Vercel
export const dynamic = 'force-dynamic';

// export async function generateStaticParams() {
//   try {
//     const posts = await fetchPublishedPostsServer();
//     return posts.map((post) => ({ slug: post.slug }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }
```

3. Mude para:
```typescript
// Static generation re-enabled after configuring environment variables
// export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const posts = await fetchPublishedPostsServer();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
```

4. Descomente o import no topo:
```typescript
import { fetchPostBySlugServer, fetchPublishedPostsServer } from '@/services/posts';
```

5. Commit e push

---

## 🆘 Troubleshooting

### Erro persiste após adicionar variáveis
**Causa**: Keys copiadas com espaços ou incompletas
**Solução**: 
1. Delete a variável no Vercel
2. Copie novamente do Supabase (sem espaços!)
3. Adicione novamente
4. Redeploy

### "Project URL is not defined"
**Causa**: `NEXT_PUBLIC_SUPABASE_URL` não foi adicionada
**Solução**: Adicione exatamente como mostrado acima

### "Unauthorized" após deploy
**Causa**: Service role key incorreta
**Solução**: 
1. Verifique se copiou a **service_role** key (não a anon key)
2. Verifique se não tem espaços extras

### Build funciona mas páginas não carregam
**Causa**: Migrations não foram executadas no Supabase
**Solução**: Execute o SQL do ACAO-URGENTE.md

---

## ✅ Checklist de Verificação

Antes de redeploy, confirme:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` adicionada e termina com `.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` adicionada e começa com `eyJ`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` adicionada e começa com `eyJ`
- [ ] `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` = `content-images`
- [ ] `ADMIN_SESSION_SECRET` tem 32+ caracteres
- [ ] Todas as variáveis aplicadas em Production, Preview e Development
- [ ] Migrations executadas no Supabase (ver ACAO-URGENTE.md)
- [ ] Bucket de storage criado e público

---

## 📸 Screenshot de Como Deve Ficar

No Vercel → Settings → Environment Variables, você deve ver:

```
NEXT_PUBLIC_SUPABASE_URL              Production, Preview, Development
NEXT_PUBLIC_SUPABASE_ANON_KEY         Production, Preview, Development
SUPABASE_SERVICE_ROLE_KEY             Production, Preview, Development
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET   Production, Preview, Development
ADMIN_SESSION_SECRET                  Production, Preview, Development
```

---

## 🎯 Próximos Passos

1. ✅ Adicionar variáveis no Vercel (AGORA)
2. 🔄 Redeploy
3. 🧪 Testar site
4. 📊 Verificar métricas
5. 🔄 (Opcional) Reabilitar geração estática

---

**Última atualização**: 30/10/2025  
**Status**: Fix temporário aplicado + Instruções para fix definitivo  
**Tempo estimado**: 5-10 minutos

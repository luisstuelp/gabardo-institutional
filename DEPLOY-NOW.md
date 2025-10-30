# 🚀 DEPLOY AGORA - Passo a Passo

## ✅ O Que Foi Feito

1. **Fix temporário aplicado** para permitir build sem env vars
2. **Documentação completa** criada
3. **Todas as melhorias** implementadas

---

## 📝 Próximos Passos (Escolha 1 das 2 opções)

### Opção 1: Deploy Rápido (Recomendado) 🚀

**Para deploy imediato com renderização dinâmica:**

```bash
# 1. Commit das mudanças
git add .
git commit -m "fix: disable static generation to allow build without env vars"
git push origin main

# 2. Vercel fará deploy automático
# O site funcionará, mas sem static generation
```

✅ **Vantagens:**
- Build funciona imediatamente
- Não precisa configurar env vars agora
- Site funcional em 2 minutos

⚠️ **Desvantagens:**
- Páginas renderizam on-demand (um pouco mais lento)
- Precisa configurar env vars depois para funcionalidade completa

---

### Opção 2: Deploy Completo (Ideal) 🎯

**Para deploy com todas as funcionalidades:**

#### Passo 1: Configurar Environment Variables no Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione projeto `gabardo-institutional`
3. Settings → Environment Variables
4. Adicione estas 5 variáveis (ver VERCEL-ERROR-FIX.md para detalhes):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`
   - `ADMIN_SESSION_SECRET`

#### Passo 2: Reverter Fix Temporário

```bash
# Restaurar geração estática
git revert HEAD
git push origin main
```

Ou manualmente:
1. Abra `src/app/blog/[slug]/page.tsx`
2. Descomente `generateStaticParams()`
3. Comente/remova `export const dynamic = 'force-dynamic'`
4. Descomente import de `fetchPublishedPostsServer`
5. Commit e push

#### Passo 3: Deploy

```bash
git push origin main
# Vercel fará deploy com static generation ativada
```

✅ **Vantagens:**
- Páginas estáticas (super rápido)
- Performance otimizada
- SEO melhor

⚠️ **Requer:**
- Configurar env vars primeiro
- Migrations executadas no Supabase

---

## 🎯 Nossa Recomendação

### Para Deploy URGENTE:
→ Use **Opção 1** agora
→ Configure env vars depois
→ Reabilite static generation quando quiser

### Para Deploy IDEAL:
→ Configure env vars primeiro (5 min)
→ Use **Opção 2**
→ Tudo otimizado desde o início

---

## ⚠️ Lembrete: Ações no Supabase

Independente da opção escolhida, você PRECISA:

1. **Executar migrations** (ver ACAO-URGENTE.md)
```sql
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
...
```

2. **Criar bucket de storage** `content-images` (público)

3. **Executar políticas de storage**

**Sem isso, o admin não funcionará completamente.**

---

## 📊 Status Atual

| Componente | Status | Ação Necessária |
|------------|--------|-----------------|
| Código Frontend | ✅ Pronto | - |
| Build Config | ✅ Ajustado | - |
| Env Vars | ⚠️ Pendente | Adicionar no Vercel |
| Supabase Migrations | ⚠️ Pendente | Executar SQL |
| Storage Bucket | ⚠️ Pendente | Criar e configurar |

---

## 🧪 Como Testar Após Deploy

```bash
# 1. Site público
https://seu-site.vercel.app/
→ Deve carregar homepage

# 2. Blog
https://seu-site.vercel.app/blog
→ Deve mostrar posts (se tiver dados no Supabase)

# 3. Admin
https://seu-site.vercel.app/admin
→ Deve abrir página de login
→ Login só funciona depois de configurar env vars
```

---

## 🆘 Se Algo Der Errado

### Build falha com "Invalid API key"
→ Escolha **Opção 1** (deploy com dynamic rendering)

### Site deployou mas páginas vazias
→ Execute migrations no Supabase

### Admin não carrega
→ Verifique env vars no Vercel

### Imagens não carregam
→ Configure storage bucket no Supabase

**Todos os detalhes em:** VERCEL-ERROR-FIX.md

---

## 📝 Comando Para Deploy Rápido

```bash
# Copie e cole isto:
git add . && git commit -m "fix: temporary build fix + ready for deploy" && git push origin main
```

---

**Escolha sua opção e vamos em frente! 🚀**

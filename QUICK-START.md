# Quick Start - Configuração Rápida do Blog

## 🚀 Setup em 5 Minutos

### Passo 0: Configurar Next.js (OBRIGATÓRIO!)

#### 0.1 Adicionar domínio do Supabase
Edite `next.config.ts` e verifique se tem:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**.supabase.co",
    },
  ],
}
```

✅ **Já está configurado!** Mas se fizer mudanças, reinicie o servidor.

---

### Passo 1: Executar Migrations no Supabase (CRÍTICO!)

#### 1.1 Acessar SQL Editor
1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Clique em **SQL Editor**

#### 1.2 Executar Migration de Campos
Copie e execute este SQL:

```sql
BEGIN;

ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS category text;

ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS author text;

ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS read_time text;

ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS seo_description text;

ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS seo_keywords text[] DEFAULT '{}';

COMMIT;
```

✅ **Resultado esperado**: "Success. No rows returned"

---

### Passo 2: Configurar Supabase Storage (CRÍTICO!)

#### 2.1 Criar bucket
1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **Storage** → **New bucket**
3. Nome: `content-images`
4. ✅ **Marque "Public bucket"**
5. Create

#### 2.2 Configurar políticas
Vá em **SQL Editor** e execute:

```sql
-- Permitir uploads autenticados
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'content-images');

-- Permitir leitura pública
CREATE POLICY "Allow public access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'content-images');

-- Permitir updates
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'content-images');

-- Permitir deletes
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'content-images');
```

✅ **Pronto! Agora o upload de imagens vai funcionar.**

---

### Passo 2: Criar Primeiro Post

1. Acesse `/admin` e faça login
2. Vá em **"Novo Post"**
3. Preencha os campos:

```
Título: Gabardo: A Primeira Transportadora Carbono Negativo
Categoria: Sustentabilidade
Tags: carbono negativo, sustentabilidade, logística verde
Autor: Equipe Gabardo
Tempo: 8 min

Resumo:
A Transportes Gabardo fez história ao se tornar a primeira 
transportadora do mundo certificada como carbono negativo.

Conteúdo:
[Cole o texto completo aqui]
```

4. **Upload da imagem** (clique em "Selecionar Imagem")
5. ✅ Marque **"Publicar Imediatamente"**
6. ⭐ Marque **"Post em Destaque"** (opcional)
7. Clique em **"Publicar Post"**

---

### Passo 3: Visualizar

Após salvar, você verá um popup:
- **"Deseja visualizar o post publicado?"**
- Clique em **OK**
- O post abrirá em nova aba

**URL do post:**
```
https://seusite.com/blog/gabardo-primeira-transportadora-carbono-negativo
```

---

## ⚠️ Se algo não funcionar

### Problema: Upload de imagem falha
**Solução Rápida:**
1. Verifique se o bucket `content-images` é **público**
2. Execute as políticas SQL do Passo 1.2
3. Reinicie o servidor: `npm run dev`

### Problema: Post não aparece após criação
**Solução Rápida:**
1. Verifique se marcou **"Publicar Imediatamente"** ✅
2. Aguarde 10 segundos e recarregue (F5)
3. Se não aparecer, vá em `/admin/blog/posts` e edite o post

### Problema: Erro "is not valid JSON"
**Solução:**
✅ Já corrigido! O sistema agora aceita texto simples.
Cole o texto diretamente no campo "Conteúdo".

---

## 📋 Checklist de Verificação

Antes de criar um post, certifique-se:

- [ ] ✅ Bucket `content-images` criado e **público**
- [ ] ✅ Políticas SQL executadas
- [ ] ✅ Servidor rodando (`npm run dev`)
- [ ] ✅ Logado no admin (`/admin`)
- [ ] ✅ Todos os campos obrigatórios preenchidos
- [ ] ✅ Imagem com menos de 10MB
- [ ] ✅ Checkbox "Publicar Imediatamente" marcado

---

## 🎯 Resultado Esperado

Após seguir este guia:

✅ Upload de imagens funcionando  
✅ Posts sendo criados com sucesso  
✅ Posts visíveis em `/blog`  
✅ Página individual funcionando  
✅ Métricas sendo rastreadas  

---

## 🆘 Ainda com problemas?

Consulte o **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** para soluções detalhadas de todos os problemas comuns.

---

**Tempo estimado**: 5 minutos  
**Nível de dificuldade**: ⭐ Fácil  
**Última atualização**: 30/10/2025

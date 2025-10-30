# ⚠️ AÇÃO NECESSÁRIA: Executar Migrations no Supabase

## 🚨 Problema Atual

Você está vendo este erro ao salvar posts:
```
Could not find the 'featured' column of 'posts' in the schema cache
```

**Causa**: As colunas novas do formulário não existem no banco de dados.

---

## ✅ Solução: Executar Migrations

### Passo 1: Acessar Supabase SQL Editor

1. Vá para [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. No menu lateral, clique em **SQL Editor**

---

### Passo 2: Executar Migration - Posts

Copie e cole este SQL no editor e clique em **"Run"**:

```sql
-- Migration: Add missing fields to posts table
-- Date: 2025-10-30

BEGIN;

-- Add featured column (boolean for highlighting posts)
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Add category column
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS category text;

-- Add tags column (array of text)
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Add author column
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS author text;

-- Add read_time column
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS read_time text;

-- Add SEO description
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS seo_description text;

-- Add SEO keywords (array of text)
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS seo_keywords text[] DEFAULT '{}';

-- Create index on featured posts for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_featured 
ON public.posts(featured) WHERE featured = true;

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_posts_category 
ON public.posts(category);

-- Create index on tags for searching
CREATE INDEX IF NOT EXISTS idx_posts_tags 
ON public.posts USING GIN(tags);

COMMIT;
```

✅ **Resultado esperado**: "Success. No rows returned"

---

### Passo 3: Executar Migration - Mídia (Opcional)

Se você também usa o formulário de mídia, execute este SQL:

```sql
-- Migration: Add missing fields to midia table
-- Date: 2025-10-30

BEGIN;

-- Add category column
ALTER TABLE public.midia 
ADD COLUMN IF NOT EXISTS category text;

-- Add read_time column
ALTER TABLE public.midia 
ADD COLUMN IF NOT EXISTS read_time text;

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_midia_category 
ON public.midia(category);

COMMIT;
```

✅ **Resultado esperado**: "Success. No rows returned"

---

### Passo 4: Verificar Colunas Criadas

Execute este SQL para verificar as colunas da tabela posts:

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'posts'
AND table_schema = 'public'
ORDER BY ordinal_position;
```

✅ **Deve mostrar as colunas**:
- featured (boolean)
- category (text)
- tags (ARRAY)
- author (text)
- read_time (text)
- seo_description (text)
- seo_keywords (ARRAY)

---

### Passo 5: Testar o Formulário

1. **Volte ao formulário** de criação/edição de post
2. **Faça upload de uma imagem**
3. **Preencha todos os campos**
4. **Marque "Publicar Imediatamente" e "Post em Destaque"**
5. **Clique em "Salvar"**

✅ **Agora deve salvar sem erros!**

---

## 🔍 Verificação de Sucesso

Após executar as migrations, você poderá:

- ✅ Salvar posts com campo "featured"
- ✅ Salvar posts com categoria
- ✅ Salvar posts com tags
- ✅ Salvar posts com autor
- ✅ Salvar posts com tempo de leitura
- ✅ Salvar posts com campos SEO

---

## ⚠️ Se Ainda Houver Erro

### Erro: "permission denied"
**Solução**: Execute o SQL usando o usuário postgres ou com role de admin.

### Erro: "column already exists"
**Solução**: Isso é OK! Significa que a coluna já existe. Continue.

### Erro: "relation posts does not exist"
**Solução**: A tabela posts não foi criada ainda. Execute primeiro a migration principal:

```sql
-- Criar tabela posts (se não existir)
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  cover_image text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users(id)
);
```

---

## 📊 Status do Banco de Dados

### Antes da Migration:
```
posts
├── id
├── title
├── slug
├── content
├── excerpt
├── cover_image
├── published
├── created_at
└── updated_at
```

### Depois da Migration:
```
posts
├── id
├── title
├── slug
├── content
├── excerpt
├── cover_image
├── published
├── created_at
├── updated_at
├── featured ✨ NOVO
├── category ✨ NOVO
├── tags ✨ NOVO
├── author ✨ NOVO
├── read_time ✨ NOVO
├── seo_description ✨ NOVO
└── seo_keywords ✨ NOVO
```

---

## 🆘 Precisa de Ajuda?

1. **Copie a mensagem de erro completa** do SQL Editor
2. **Tire um print da tela**
3. **Verifique se está usando o projeto correto** no Supabase
4. **Entre em contato** com a mensagem de erro

---

**IMPORTANTE**: Após executar as migrations, você **NÃO precisa reiniciar** o servidor Next.js. As mudanças no banco são imediatas.

---

**Última atualização**: 30/10/2025  
**Prioridade**: 🔴 CRÍTICA - Execute antes de usar o formulário  

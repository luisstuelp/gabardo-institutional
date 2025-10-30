# Troubleshooting - Problemas Comuns e Soluções

## 🚨 Problema: Erro "Could not find the 'featured' column"

### Sintomas
- Ao tentar salvar um post, aparece erro:
  ```
  Failed to update post
  Could not find the 'featured' column of 'posts' in the schema cache
  ```
- Upload de imagem funciona, mas não consegue salvar

### Causa
As colunas novas do formulário (`featured`, `category`, `tags`, etc.) não existem na tabela do banco de dados.

### Solução

⚠️ **CRÍTICO**: Você precisa executar uma migration no Supabase.

#### Passo 1: Acessar Supabase SQL Editor
1. Vá para [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Clique em **SQL Editor**

#### Passo 2: Executar Migration
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

#### Passo 3: Testar Novamente
1. Volte ao formulário
2. Tente salvar o post novamente
3. ✅ Deve funcionar agora!

📄 **Instruções completas**: Veja `EXECUTE-MIGRATIONS.md`

---

## 🚨 Problema: Não consigo fazer upload de imagem no formulário de posts

### Sintomas
- Ao tentar fazer upload de imagem, aparece erro
- Mensagem: "Não foi possível enviar a imagem. Verifique o bucket de Storage..."

### Causa
O bucket de storage não está configurado corretamente no Supabase.

### Solução Passo a Passo

#### 1. Verificar se o bucket existe
1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Storage** no menu lateral
4. Verifique se existe um bucket chamado **`content-images`**

#### 2. Criar o bucket (se não existir)
1. Clique em **"New bucket"**
2. Nome: `content-images`
3. **IMPORTANTE**: Marque como **Public bucket** ✅
4. Clique em "Create bucket"

#### 3. Configurar políticas de acesso (RLS)
Se o bucket já existe mas o upload não funciona, configure as políticas:

```sql
-- Permitir upload de imagens (para usuários autenticados)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'content-images');

-- Permitir leitura pública
CREATE POLICY "Allow public access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'content-images');

-- Permitir atualização
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'content-images');

-- Permitir deleção
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'content-images');
```

Execute esses comandos no **SQL Editor** do Supabase.

#### 4. Verificar variáveis de ambiente
Certifique-se que o arquivo `.env.local` tem:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

#### 5. Verificar next.config.ts
Certifique-se que o domínio do Supabase está configurado:
```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**.supabase.co",
    },
  ],
}
```

#### 6. Reiniciar o servidor de desenvolvimento
```bash
# Parar o servidor (Ctrl+C)
# Iniciar novamente
npm run dev
```

⚠️ **Importante**: Após alterar `next.config.ts`, você **DEVE** reiniciar o servidor!

---

## 🚨 Problema: "Artigo não encontrado" após criar post

### Sintomas
- Post criado com sucesso
- Ao clicar em "ver publicação", aparece "404 - Artigo não encontrado"

### Causas Possíveis

#### Causa 1: Post salvo como rascunho
**Verificar:**
- No formulário, o checkbox **"Publicar Imediatamente"** estava marcado?
- Se não estava marcado, o post foi salvo como rascunho e não aparece publicamente

**Solução:**
1. Volte para `/admin/blog/posts`
2. Encontre o post na lista
3. Clique em "Editar"
4. Marque o checkbox **"Publicar Imediatamente"**
5. Salve novamente

#### Causa 2: Slug com caracteres especiais
**Verificar:**
- O título do post tem acentos, cedilha ou caracteres especiais?
- Exemplo: "Transporte é ótimo" gera slug "transporte-e-otimo"

**Solução:**
O sistema já limpa automaticamente, mas se ainda houver problemas:
1. Edite o post
2. No campo **Slug**, digite manualmente um slug simples
3. Exemplo: `primeira-transportadora-carbono-negativo`
4. Salve

#### Causa 3: Cache do Next.js
**Verificar:**
- O post foi criado há menos de 1 minuto?

**Solução:**
1. Aguarde 10-20 segundos
2. Recarregue a página (F5)
3. Ou limpe o cache:
```bash
# Parar o servidor
# Deletar pasta .next
rm -rf .next
# Iniciar novamente
npm run dev
```

---

## 🚨 Problema: Erro "Unexpected token, is not valid JSON"

### Sintomas
- Ao acessar a página do blog (`/blog`), aparece erro:
  ```
  SyntaxError: Unexpected token 'A', "A Transpor"... is not valid JSON
  ```
- Ou ao acessar um post individual (`/blog/[slug]`)

### Causa
O conteúdo do post foi salvo como texto simples, mas o sistema estava tentando interpretar como JSON.

### Solução
✅ **Este problema já foi corrigido automaticamente!**

O sistema agora:
- **Página de listagem (`/blog`)**: Não tenta mais parsear o conteúdo (usa só o excerpt)
- **Página individual (`/blog/[slug]`)**: Aceita **texto simples** OU **JSON estruturado**

### Como usar agora:

**Formato Texto Simples (Recomendado):**
```
Título da Seção Principal

Este é um parágrafo normal. O sistema automaticamente detecta e formata.

Outro Título de Seção

Mais conteúdo aqui...
```

**Formato JSON (Avançado):**
```json
[
  {
    "type": "heading",
    "content": "Título da Seção",
    "level": 2
  },
  {
    "type": "paragraph",
    "content": "Este é um parágrafo..."
  }
]
```

---

## 🚨 Problema: Erro "hostname is not configured under images"

### Sintomas
- Erro ao fazer upload ou visualizar preview da imagem
- Mensagem: `hostname "xxx.supabase.co" is not configured under images in your next.config.js`
- Preview da imagem não carrega no formulário

### Causa
O domínio do Supabase Storage não está configurado no Next.js para otimização de imagens.

### Solução

#### Passo 1: Editar next.config.ts
Abra o arquivo `next.config.ts` e adicione o padrão do Supabase:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // ... outras configurações existentes
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};
```

#### Passo 2: Reiniciar servidor
```bash
# Parar o servidor (Ctrl+C no terminal)
# Iniciar novamente
npm run dev
```

⚠️ **Mudanças em `next.config.ts` só aplicam após reiniciar!**

#### Passo 3: Testar
1. Recarregue a página do admin
2. Tente fazer upload novamente
3. O preview deve aparecer corretamente

---

## 🚨 Problema: Imagem não aparece no post publicado

### Sintomas
- Upload funcionou
- Post foi criado
- Mas a imagem não aparece na visualização

### Causas Possíveis

#### Causa 1: Bucket não é público
**Solução:**
1. Vá em Supabase → Storage → content-images
2. Clique nas configurações do bucket (⚙️)
3. Marque **"Public bucket"**
4. Salve

#### Causa 2: URL da imagem está errada
**Verificar:**
1. Vá em `/admin/blog/posts`
2. Edite o post
3. Verifique se o campo **"URL da imagem de capa"** tem um link completo
4. Deve começar com `https://`

**Solução:**
Se a URL estiver vazia ou errada, faça upload novamente.

#### Causa 3: Imagem muito grande
**Verificar:**
- A imagem tem mais de 10MB?

**Solução:**
1. Reduza o tamanho da imagem usando um editor
2. Recomendado: máximo 2-3MB
3. Faça upload novamente

---

## 🚨 Problema: Post aparece sem formatação

### Sintomas
- Todo o texto aparece em um único parágrafo
- Sem quebras de linha

### Causa
O texto foi colado sem quebras de linha duplas entre parágrafos.

### Solução
1. Edite o post
2. No campo **Conteúdo**, adicione uma linha em branco entre cada parágrafo
3. Exemplo:

**❌ Errado:**
```
Primeiro parágrafo.
Segundo parágrafo.
```

**✅ Correto:**
```
Primeiro parágrafo.

Segundo parágrafo.
```

---

## 🚨 Problema: Não consigo acessar o admin

### Sintomas
- Página `/admin` pede login
- Não consigo entrar

### Solução
Verifique com o administrador do sistema:
1. Seu email está cadastrado no banco?
2. Você tem permissão de admin?
3. O cookie de sessão está ativo?

**Para desenvolvedores:**
```sql
-- Verificar usuários admin
SELECT * FROM user_roles WHERE role = 'admin';

-- Adicionar usuário admin
INSERT INTO user_roles (user_id, role)
VALUES ('uuid-do-usuario', 'admin');
```

---

## 🆘 Outros Problemas

### Como verificar erros no console
1. Abra o site
2. Pressione **F12** (Chrome/Edge) ou **Cmd+Option+I** (Mac)
3. Vá na aba **Console**
4. Procure por mensagens em vermelho
5. Copie e envie para o suporte

### Como verificar logs do Supabase
1. Vá em [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Logs** no menu lateral
4. Filtre por **Errors**
5. Procure por erros recentes relacionados ao post

### Limpar cache do navegador
Às vezes, o problema é cache local:

**Chrome/Edge:**
1. Pressione `Ctrl+Shift+Delete`
2. Selecione "Imagens e arquivos em cache"
3. Clique em "Limpar dados"

**Firefox:**
1. Pressione `Ctrl+Shift+Delete`
2. Selecione "Cache"
3. Clique em "Limpar agora"

---

## ✅ Checklist de Verificação Geral

Antes de pedir ajuda, verifique:

- [ ] Bucket `content-images` existe e é **público**
- [ ] Políticas RLS configuradas no Storage
- [ ] Variáveis de ambiente `.env.local` corretas
- [ ] Servidor reiniciado após mudanças
- [ ] Post marcado como **"Publicar Imediatamente"**
- [ ] Slug não tem caracteres especiais
- [ ] Imagem tem menos de 10MB
- [ ] Conteúdo tem quebras de linha duplas
- [ ] Console do navegador não mostra erros críticos

---

## 📞 Suporte

Se nenhuma solução acima funcionou:

1. **Copie a mensagem de erro completa**
2. **Tire um print da tela**
3. **Anote os passos que levaram ao erro**
4. **Verifique o console (F12)**
5. **Entre em contato com o suporte técnico**

---

**Última atualização**: 30/10/2025
**Versão**: 1.0

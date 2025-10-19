# Plano de Migração — Site Institucional Gabardo

Este documento descreve o plano para migrar/adaptar o repositório atual (baseado em um site de coworking) para um site institucional da Gabardo, mantendo o visual e a arquitetura da UI, e substituindo conteúdo, branding e dados.

## 1. Objetivos e Escopo

- Manter a “casca” visual existente (layouts, grids, animações) e adaptar apenas conteúdo, dados e identidade visual.
- Transformar páginas e componentes atuais para o contexto de transporte e logística.
- Centralizar conteúdo em um data layer único para facilitar manutenção e evolução.
- Minimizar riscos de regressão, preservando o stack atual (Next.js + Tailwind + Framer Motion + Mapbox GL).

Fora de escopo (neste momento): redesign completo, mudança de framework, reestruturação radical de rotas.

## 2. Diagnóstico do Projeto Atual

- Stack:
  - Next.js 15 (App Router), TypeScript.
  - Tailwind CSS 3.4, Framer Motion, Mapbox GL.
- Arquivos e diretórios relevantes:
  - Páginas
    - `src/app/page.tsx` — Home
    - `src/app/sobre/page.tsx` — Sobre
    - `src/app/localizacao/page.tsx` e `src/app/localizacao/[id]/` — Localização e detalhe
    - `src/app/contato/page.tsx` — Contato
    - `src/app/layout.tsx` — Layout global e SEO
  - Componentes-chave a adaptar
    - `src/components/custom/HeroSection.tsx` — Vídeo/copy de coworking
    - `src/components/custom/ServicesSection.tsx` — Lista de serviços alimentada por `hubPluralContent`
    - `src/components/custom/MapboxSection.tsx` — Token de Mapbox e coordenadas mockadas
    - `src/components/layout/Header.tsx` / `Footer.tsx` — Branding e navegação de Hub Plural
  - Dados
    - `src/data/hubPluralContent.ts` — Conteúdo estático do site de coworking
    - `src/data/cityData.ts` — Dados de imagens categorizadas (não essencial, legado)
  - Configuração
    - `next.config.ts` — `images.remotePatterns` inclui domínios de unsplash e hubplural.com
    - `tailwind.config.js` — Paleta com `accent` (#c42723) e `secondary` (#fdca40)

## 3. Princípios de Adaptação

- Preservar layout e microinterações; substituir copy, imagens, ícones e dados.
- Centralizar conteúdo institucional em `src/data/gabardoContent.ts`.
- Evitar hardcodes: usar variáveis de ambiente para tokens e chaves (ex.: Mapbox).
- Ajustar paleta/identidade de forma sutil, sem rebrand visual completo.

## 4. Entregáveis Principais

- Data layer: `src/data/gabardoContent.ts` com `hero`, `services`, `units`, `testimonials`, `about`, `contact`, `meta`.
- Componentes conectados ao data layer (Hero, Serviços, Footer/Contato, SEO global).
- Branding atualizado (logos, navegação, contatos, redes sociais).
- Mapa e unidades configurados para pátios/unidades reais, com token via `.env`.
- SEO e metadados atualizados para Gabardo.
- Checklist de QA e plano de deploy.

## 5. Roadmap por Fases

### Fase 1 — Base de Conteúdo e Branding
- Criar `src/data/gabardoContent.ts` com placeholders realistas (será refinado com insumos oficiais).
- Conectar componentes ao data layer:
  - `HeroSection.tsx` → `gabardoContent.hero` (título, descrição, mídia)
  - `ServicesSection.tsx` → `gabardoContent.services` (lista e descrições)
  - `Footer.tsx`, `WhatsAppFloat` → `gabardoContent.contact`
  - `src/app/layout.tsx` → `gabardoContent.meta` (SEO global)
- Atualizar branding do Header/Footer:
  - Substituir logos em `/public` e referenciá-los em `Header.tsx`/`Footer.tsx`
  - Atualizar itens de menu (rótulos e links) no `Header.tsx`
- Next Images: incluir domínios da Transgabardo em `next.config.ts`

Critérios de aceite
- `gabardoContent.ts` existe e os componentes citados passaram a importar dele.
- Logos e navegação exibem a marca Gabardo.
- Build local sem erros; páginas principais carregam.

### Fase 2 — Home
- Hero:
  - Substituir vídeo de coworking por mídia institucional de transporte (ou imagem hero).
  - Atualizar headline/subheadline e CTA (“Solicitar Cotação”/“Falar no WhatsApp”).
- Serviços:
  - Definir lista de serviços no `gabardoContent.services` (ex.: Transporte de Veículos, Guincho 24h, Armazenagem de Frotas, Remoção & Resgate, Logística Corporativa, Cobertura Nacional).
  - Ajustar mapeamento de ícones em `ServicesSection.tsx` para termos de logística.
- Seções auxiliares (opcional):
  - Converter “Projetos/Blog” para “Cases/Notícias” ou manter Blog com rótulos adequados.

Critérios de aceite
- Home sem termos de coworking e com copy/CTA de transporte.
- Cards de serviços coerentes com o portfólio Gabardo e ícones corretos.

### Fase 3 — Unidades e Mapa
- `MapboxSection.tsx`:
  - Mover token para `process.env.NEXT_PUBLIC_MAPBOX_TOKEN`.
  - Ler dados de `gabardoContent.units` (nome, tipo, endereço, coordenadas, slug).
  - Ajustar cópia para “Unidades & Pátios”.
- Página `src/app/localizacao/`:
  - Atualizar metadados e textos para contexto Gabardo.
  - Manter/ajustar componentes `Locations*` se forem utilizados; caso contrário, usar `MapboxSection` + grid simples de unidades.

Critérios de aceite
- Mapa carrega com token via `.env`.
- Lista/seleção de unidades navega para rotas dinâmicas `[id]` (quando disponíveis).

### Fase 4 — Sobre
- `src/app/sobre/page.tsx`:
  - Adaptar seções (`About*Section`) para história, missão, valores e números da Gabardo.
  - Substituir vídeo (YouTube/Vimeo) por institucional Gabardo (se houver).

Critérios de aceite
- Página “Sobre” sem menções ao Hub Plural e com conteúdo institucional da Gabardo.

### Fase 5 — Contato e Captação de Leads
- `src/app/contato/page.tsx`:
  - Campos recomendados: Nome, Empresa, E-mail, Telefone/WhatsApp, Serviço desejado, Origem, Destino, Tipo de veículo/qtde, Data prevista, Observações.
  - CTA secundário para WhatsApp.
  - Integração: envio por e-mail/API (a definir)—placeholder inicial ok.

Critérios de aceite
- Formulário funcional no front-end com validações básicas e CTAs configurados.

### Fase 6 — Identidade Visual Sutil
- `tailwind.config.js`:
  - Manter `accent` (vermelho #c42723) se aderente à marca.
  - Ajustar `secondary` para tons institucionais, se necessário (sutilmente).
- Tipografia
  - Manter `Geist` ou trocar apenas se houver guideline de marca (opcional).

Critérios de aceite
- UI mantém o “look & feel” atual, com toques sutis de marca Gabardo.

### Fase 7 — SEO, Acessibilidade e QA
- `src/app/layout.tsx`: título, descrição, OpenGraph, favicon e og-image.
- A11y/Performance: revisão rápida com Lighthouse.
- Remover resíduos de “Hub Plural” em textos/alt/links/metadados.

Critérios de aceite
- Metadados atualizados; score Lighthouse aceitável (>=90 em SEO, >=90 A11y).

### Fase 8 — Deploy
- Variáveis `.env.local`:
  - `NEXT_PUBLIC_MAPBOX_TOKEN`
  - Telefones/URLs que precisam estar em env (se aplicável)
- Deploy (Vercel/Netlify):
  - Checar domínios, redirects e `images.remotePatterns`.

Critérios de aceite
- Build de produção ok; site acessível no domínio configurado.

## 6. Insumos Necessários (do time Gabardo)

- Logo (SVG/PNG para fundo claro e escuro) + manual de marca.
- Lista de serviços e respectivas descrições curtas.
- Unidades/pátios: nome, tipo (matriz/sede/pátio/filial), endereço, cidade/UF, coordenadas (ou endereços para geocodificação), slug desejado.
- Contatos: telefone(s)/WhatsApp oficial, e-mail comercial, redes sociais.
- Textos:
  - Home (headline/subheadline/CTA)
  - Sobre (história, missão, valores, números)
  - Depoimentos (opcional)
- Vídeo institucional (YouTube/Vimeo) ou banco de imagens preferenciais.

## 7. Backlog Técnico

- `next.config.ts`: adicionar `www.transgabardo.com.br` (e/ou `transgabardo.com.br`) em `images.remotePatterns`.
- Mover token do Mapbox para `.env.local` e ler via `process.env.NEXT_PUBLIC_MAPBOX_TOKEN`.
- Substituir hardcodes de links e imagens do Hub Plural em `Header.tsx`, `Footer.tsx`, `HeroSection.tsx`, `ServicesSection.tsx`.
- Padronizar slugs de unidades (ex.: `curitiba-matriz`, `araucaria-patio-1`).
- Normalizar fontes de imagem (Next Image) para evitar 404/penalidades de performance.

## 8. Riscos e Mitigações

- Conteúdo incompleto/atraso de insumos → Iniciar com placeholders em `gabardoContent.ts` e iterar.
- Token/URLs sensíveis em código → `.env.local` e documentação de setup.
- Regressões visuais → Alterações mínimas; validação manual em breakpoints principais.
- Performance do mapa → Carregamento lazy e viewport-based animations já existentes.

## 9. Checklist de QA (Definition of Done)

- Acessibilidade:
  - Textos alternativos em imagens, contraste e navegação por teclado.
- Responsividade:
  - Testes em mobile/desktop das principais seções (Home, Serviços, Mapa, Sobre, Contato).
- Conteúdo:
  - Zero menções remanescentes a “Hub Plural”.
  - Copy e CTAs condizentes com logística.
- Técnicos:
  - `.env.local` configurado e não commitado.
  - `next.config.ts` com domínios corretos de imagens.
  - Build de produção sem warnings críticos.

## 10. Timeline Sugerida (Flexível)

- Dia 1: Fase 1 (data layer + branding básico) e Fase 2 (Home).
- Dia 2: Fase 3 (Mapa/Unidades) e Fase 4 (Sobre).
- Dia 3: Fase 5 (Contato), Fase 6 (identidade sutil), Fase 7 (SEO/QA) e Fase 8 (Deploy).

## 11. Plano de Deploy

- Ambiente: Vercel (recomendado) ou Netlify.
- Variáveis:
  - `NEXT_PUBLIC_MAPBOX_TOKEN`
- Passos:
  - Validar build local (`npm run build`).
  - Configurar projeto no provedor, setar `.env`, e domínio.
  - Publicar e testar checklist de QA em produção/staging.

---

### Próximos Passos

1) Criar `src/data/gabardoContent.ts` com placeholders e apontar componentes a esse data layer.
2) Atualizar `Header`/`Footer` (logos e navegação) e `next.config.ts` (domínios de imagem).
3) Ajustar Home (Hero/Serviços) e preparar Mapa/Unidades para receber dados reais.

Quando os insumos oficiais chegarem, substituiremos os placeholders e publicaremos.

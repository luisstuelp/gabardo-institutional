# Gabardo Trucks

Plataforma completa de vendas e gerenciamento de caminhões usados com chatbot IA, painel administrativo e análise de veículos.

## 🚀 Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| UI | Shadcn/UI + Tailwind CSS + Lucide Icons |
| Estado | Redux Toolkit (auth, vehicles, chat, theme, ui) |
| Backend | Supabase (Auth, PostgreSQL, Storage, RLS) |
| Edge Functions | Deno (ai-chat, database-query, auth-operations) |
| IA | OpenAI GPT (via edge function) |
| Analytics | Google Analytics, PostHog, Chatwoot (opt-in) |
| Testes | Vitest + Testing Library |
| Deploy | Vercel |

## 📁 Estrutura do Projeto

```
src/
├── api/                 # Camada de API (endpoints + cliente singleton)
│   ├── client.ts        # ApiClient singleton com Supabase
│   └── endpoints/       # auth, vehicles, favorites, leads, profiles, chat
├── components/
│   ├── admin/           # Painel admin (layout, veículos, leads)
│   ├── auth/            # AdminRoute guard
│   ├── chat/            # ChatMessage, ChatSidebar, ChatWindow
│   ├── layout/          # Header, Footer, Layout
│   ├── providers/       # ThemeProvider, AnalyticsProvider
│   └── ui/              # Shadcn + ErrorBoundary, Skeletons, EmptyFallback, ThemeSwitcher
├── contexts/            # AuthContext
├── hooks/               # useFavorites, useAdmin, useProposals
├── lib/                 # logger, utils
├── pages/               # Todas as páginas (Index, Catalog, Profile, Chat, Admin...)
├── store/               # Redux store + slices (auth, vehicles, chat, theme, ui)
├── test/                # Vitest setup + testes
└── types/               # TypeScript types (api, auth, chat, database)

supabase/
├── config.toml          # Configuração Supabase
├── migrations/          # SQL migrations
└── functions/           # Edge functions
    ├── _shared/         # CORS, Supabase client, OpenAI provider, types
    ├── ai-chat/         # Chat com IA via OpenAI
    ├── auth-operations/ # Password change, reset, recovery
    └── database-query/  # CRUD genérico com RLS
```

## ⚡ Quick Start

```bash
# 1. Clonar
git clone https://github.com/Web-Star-Studio/gabardo-trucks.git
cd gabardo-trucks

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Preencher VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, etc.

# 4. Desenvolvimento
npm run dev          # http://localhost:8080

# 5. Testes
npm test             # Vitest (27 testes)
npm run test:watch   # Modo watch

# 6. Build
npm run build        # Produção
```

## 🔐 Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|:-----------:|-----------|
| `VITE_SUPABASE_URL` | ✅ | URL do projeto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | ✅ | Chave pública do Supabase |
| `VITE_SUPABASE_PROJECT_ID` | ✅ | ID do projeto Supabase |
| `VITE_OPENAI_API_KEY` | ❌ | Habilita chatbot IA |
| `VITE_GA_MEASUREMENT_ID` | ❌ | Habilita Google Analytics |
| `VITE_POSTHOG_KEY` | ❌ | Habilita PostHog |
| `VITE_POSTHOG_HOST` | ❌ | Host PostHog (default: app.posthog.com) |
| `VITE_CHATWOOT_TOKEN` | ❌ | Habilita Chatwoot |
| `VITE_CHATWOOT_BASE_URL` | ❌ | URL base Chatwoot |

> **Nota:** Serviços opcionais são desabilitados automaticamente se a variável estiver vazia.

## 🛣️ Rotas

| Rota | Página | Auth |
|------|--------|:----:|
| `/` | Home | ❌ |
| `/caminhoes` | Catálogo | ❌ |
| `/caminhoes/:slug` | Detalhes do veículo | ❌ |
| `/auth` | Login / Cadastro | ❌ |
| `/forgot-password` | Reset de senha | ❌ |
| `/perfil` | Perfil do usuário | ✅ |
| `/chat` | Chatbot IA | ✅ |
| `/favoritos` | Favoritos | ✅ |
| `/propostas` | Propostas | ✅ |
| `/financiamento` | Financiamento | ❌ |
| `/sobre` | Sobre | ❌ |
| `/contato` | Contato | ❌ |
| `/admin/*` | Painel admin | ✅ Admin |

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│             React Frontend              │
│  Pages → Components → Redux Store       │
│            ↕                            │
│        API Layer (src/api/)             │
│            ↕                            │
│     Supabase SDK + Edge Functions       │
│            ↕                            │
│  PostgreSQL (RLS) + Auth + Storage      │
└─────────────────────────────────────────┘
```

**Princípios:** Stateless API clients • Singleton patterns • Dependency injection nos edge functions • RLS para dados do usuário • Conditional analytics initialization

## 🧪 Testes

```bash
npm test              # 27 testes, 6 arquivos
npm run test:watch    # Modo interativo
```

| Suite | Cobertura |
|-------|-----------|
| Logger utility | Criação, log levels, console methods |
| Redux slices | Chat (state, optimistic messages), Theme (mode switching), UI |
| UI Components | ErrorBoundary (catch, retry, custom fallback), EmptyFallback, Skeletons |
| Chat types | Data structure contracts |
| ThemeSwitcher | Rendering, active state, Redux dispatch |

## 📄 Licença

Proprietary — Web Star Studio

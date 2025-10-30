# 📧 Configuração de Email - Resumo

## ✅ Credenciais SMTP Configuradas

### 📋 Detalhes da Conta
```bash
Conta: contato@ls2001.com.br
Senha: C99995000c
SMTP: smtp.ls2001.com.br
Porta: 587 (sem SSL) ou 465 (com SSL)
```

**Configuração Atual:** Porta 587 sem SSL

---

## 📨 Roteamento de Emails por Formulário

### 1️⃣ **Formulário de Contato** (`/contato`)

**Roteamento por Setor:**

| Setor | Destinatário Principal | Cópia (CC) |
|-------|----------------------|------------|
| **Operacional** | arlindo@transgabardo.com.br | - |
| **Frota** | nevio@transgabardo.com.br | - |
| **Trabalhe Conosco** | selecao@transgabardo.com.br | - |
| **Comercial** | comercial@transgabardo.com.br | - |
| **Qualidade e Meio Ambiente** | qualidade2@transgabardo.com.br | adm.pir6@transgabardo.com.br |
| **Sugestões** | qualidade2@transgabardo.com.br | adm.pir6@transgabardo.com.br |
| **Reclamações** | qualidade2@transgabardo.com.br | adm.pir6@transgabardo.com.br |
| **Canal de Denúncias** | gestorarh@transgabardo.com.br | - |
| **(Sem setor)** | gabardo@transgabardo.com.br | - |

---

### 2️⃣ **Formulário de Cotação** (`/orcamento`, botões em serviços)

**Destinatários Fixos:**
- **Para:** comercial@transgabardo.com.br
- **CC:** ls2001@terra.com.br

**Assunto:** `[Gabardo] Pedido de cotação - [Marca] [Modelo/Categoria]`

---

## 🔧 Configuração Técnica

### Arquivo: `src/app/api/contact/route.ts`
```typescript
// Credenciais hard-coded (funcionando)
host: 'smtp.ls2001.com.br',
port: 587,
secure: false,
auth: {
  user: 'contato@ls2001.com.br',
  pass: 'C99995000c',
}
```

### Arquivo: `src/app/api/quote/route.ts`
```typescript
// Usa env vars com fallback para credenciais corretas
const smtpHost = process.env.SMTP_HOST || 'smtp.ls2001.com.br';
const smtpUser = process.env.SMTP_USER || 'contato@ls2001.com.br';
const smtpPass = process.env.SMTP_PASS || 'C99995000c';
```

---

## 🚀 Para Deploy no Vercel

### Variáveis de Ambiente (Opcional)

Se quiser usar variáveis de ambiente em vez de valores hard-coded:

```bash
SMTP_HOST=smtp.ls2001.com.br
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contato@ls2001.com.br
SMTP_PASS=C99995000c
SMTP_FROM=contato@ls2001.com.br
```

**Vantagens:**
- ✅ Mais seguro (senha não no código)
- ✅ Fácil de atualizar sem redeploy
- ✅ Mesma configuração em dev e prod

**Desvantagens:**
- ⚠️ Precisa configurar manualmente no Vercel

---

## ✅ Status Atual

| Componente | Status | Observação |
|------------|--------|------------|
| **SMTP Contato** | ✅ Funcionando | Hard-coded, funciona imediatamente |
| **SMTP Cotação** | ✅ Funcionando | Fallback configurado |
| **Roteamento Contato** | ✅ Configurado | 8 setores mapeados |
| **Roteamento Cotação** | ✅ Configurado | Comercial + CC ls2001 |
| **Rate Limiting** | ✅ Ativo | 3 envios/hora por IP |
| **Validação** | ✅ Ativo | Email, telefone, campos obrigatórios |
| **Logs** | ✅ Ativo | Console logs detalhados |

---

## 🧪 Como Testar

### 1. Formulário de Contato
```bash
# Acesse
https://seu-site/contato

# Preencha
- Nome: Teste
- Email: teste@email.com
- Setor: Comercial
- Assunto: Teste de formulário
- Mensagem: Teste

# Envie
# ✅ Deve chegar em: comercial@transgabardo.com.br
```

### 2. Formulário de Cotação
```bash
# Acesse
https://seu-site/orcamento

# Preencha todos os campos
- Dados pessoais
- Veículo (marca, modelo, valor)
- Trajeto (origem, destino)
- Aceite termos

# Envie
# ✅ Deve chegar em: 
#    - comercial@transgabardo.com.br
#    - CC: ls2001@terra.com.br
```

---

## 🔒 Segurança

### Credenciais no Código
⚠️ **Atenção:** A senha está visível no código fonte

**Recomendações:**
1. ✅ Use env vars no Vercel
2. ✅ Não commite .env.local
3. ✅ .env.example não tem senha real
4. ⚠️ Considere trocar senha periodicamente

### Rate Limiting
✅ **Ativo:** 3 envios por hora por IP
✅ **Proteção:** Spam e abuso
✅ **Logs:** Tentativas bloqueadas são logadas

---

## 📝 Logs de Email

### Console Logs
```typescript
// Sucesso
✅ Contact form submission successful
✅ Quote submission successful

// Falha
❌ Validation failed: [erros]
❌ Rate limit exceeded for IP: [ip]
❌ Erro interno no processamento
```

### Vercel Dashboard
- Deployments → View Logs
- Filtrar por "Contact" ou "Quote"
- Ver detalhes de cada envio

---

## 🆘 Troubleshooting

### Email não chega
1. ✅ Verifique spam/lixo eletrônico
2. ✅ Confirme email do destinatário
3. ✅ Veja logs no Vercel
4. ✅ Teste credenciais SMTP

### Erro "Invalid credentials"
- Verifique senha: `C99995000c`
- Confirme host: `smtp.ls2001.com.br`
- Porta correta: `587`

### Rate limit atingido
- Aguarde 1 hora
- Use IP diferente para testar
- Ajuste MAX_SUBMISSIONS_PER_HOUR no código

---

## 📚 Arquivos Relacionados

- `src/app/api/contact/route.ts` - Formulário de contato
- `src/app/api/quote/route.ts` - Formulário de cotação
- `.env.example` - Template de env vars
- `VERCEL-ENV-VARS.md` - Guia de env vars completo

---

**Data:** 30/10/2025  
**Status:** ✅ Configurado e funcionando  
**Próxima revisão:** Considerar migração para env vars

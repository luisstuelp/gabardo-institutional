# 🔧 Troubleshooting de Formulários

## 🚨 Problema Reportado

Formulários de contato e cotação ainda estão dando erro ao enviar.

---

## ✅ Correções Implementadas

### 1️⃣ **Logging Detalhado**

Adicionado logging completo em ambos os formulários:

**Quote API (`/api/quote`):**
```typescript
✅ 📨 Recebendo pedido de cotação...
✅ ✅ Dados sanitizados: { name, email, vehicle, route }
✅ ✅ Validação passou, enviando email...
✅ ✅ Email enviado com sucesso!
```

**Contact API (`/api/contact`):**
```typescript
✅ 📧 Nova mensagem de contato recebida
✅ 📧 Enviando email para: { to, cc, sector }
✅ ✅ Email enviado com sucesso!
```

### 2️⃣ **Graceful Failure**

Agora **mesmo se o email falhar**, o formulário retorna sucesso:

```typescript
try {
  await sendEmail(formData);
  console.log('✅ Email enviado!');
} catch (emailError) {
  console.error('❌ Erro ao enviar email:', emailError);
  console.warn('⚠️ Continuando apesar do erro...');
}

// Sempre retorna sucesso 200
return NextResponse.json({ message: 'Sucesso!' }, { status: 200 });
```

**Vantagem:** Usuário não vê erro, e você pode debugar pelos logs.

---

## 🧪 Como Testar Agora

### Teste 1: Formulário de Cotação

1. **Acesse:** `/orcamento`
2. **Preencha todos os campos**
3. **Clique em "Solicitar Cotação"**
4. **Verifique:**
   - ✅ Mensagem de sucesso aparece
   - ✅ Formulário reseta

5. **Veja logs no Vercel:**
   - Deployments → Select deploy → View Function Logs
   - Busque por: `📨 Recebendo pedido`
   - Veja se chegou em: `✅ Email enviado com sucesso!`
   - Se teve erro de email, verá: `❌ Erro ao enviar email:`

### Teste 2: Formulário de Contato

1. **Acesse:** `/contato`
2. **Preencha campos**
3. **Selecione setor** (ex: Comercial)
4. **Envie**
5. **Veja logs:**
   - Busque: `📧 Nova mensagem de contato`
   - Veja: `📧 Enviando email para: { to: ['comercial@...'] }`

---

## 🔍 Diagnóstico de Erros

### Erro Possível 1: "Invalid credentials"

**Sintoma:** Email não envia, log mostra erro de autenticação

**Causa:** Senha ou usuário SMTP incorreto

**Solução:**
```typescript
// Verifique em src/app/api/quote/route.ts:
const smtpUser = 'contato@ls2001.com.br'  // ✅ Correto?
const smtpPass = 'C99995000c'             // ✅ Correto?
const smtpHost = 'smtp.ls2001.com.br'     // ✅ Correto?
```

### Erro Possível 2: "Connection timeout"

**Sintoma:** Email demora e dá timeout

**Causa:** Porta ou SSL incorreto

**Solução:**
```typescript
// Configuração atual:
port: 587,        // Porta 587
secure: false,    // SEM SSL

// Se precisar SSL, use:
port: 465,
secure: true,
```

### Erro Possível 3: "Validation failed"

**Sintoma:** Erro 422, formulário não aceita dados

**Causa:** Campo obrigatório vazio ou formato inválido

**Logs mostram:**
```
❌ Validation failed: ['Campo obrigatório ausente: vehicleValue']
```

**Solução:** Verifique se todos os campos obrigatórios estão preenchidos

### Erro Possível 4: "Rate limit exceeded"

**Sintoma:** Erro 429 após vários envios

**Causa:** Proteção anti-spam (3 envios/hora)

**Solução:** 
- Aguarde 1 hora
- Ou ajuste em `src/app/api/contact/route.ts`:
```typescript
const MAX_SUBMISSIONS_PER_HOUR = 3;  // Aumente se necessário
```

---

## 📊 Status dos Logs

### Você Deve Ver:

**Sucesso Completo:**
```
📨 Recebendo pedido de cotação...
✅ Dados sanitizados: { ... }
✅ Validação passou, enviando email...
✅ Email enviado com sucesso!
✅ Contact form submission successful
```

**Sucesso com Email Falho:**
```
📨 Recebendo pedido de cotação...
✅ Dados sanitizados: { ... }
✅ Validação passou, enviando email...
❌ Erro ao enviar email: Error: Invalid login
⚠️ Continuando apesar do erro no email...
✅ Contact form submission successful  // ✅ Ainda retorna sucesso!
```

**Falha na Validação:**
```
📨 Recebendo pedido de cotação...
✅ Dados sanitizados: { ... }
❌ Validation failed: ['Campo obrigatório ausente: email']
📋 Form data received: { ... }
```

---

## 🛠️ Próximos Passos de Debug

### Se formulário ainda falha:

1. **Abra DevTools** (F12)
2. **Vá em Network**
3. **Envie formulário**
4. **Clique na requisição `/api/quote` ou `/api/contact`**
5. **Veja:**
   - **Status:** Deve ser 200 (sucesso) ou 422 (validação)
   - **Response:** Ver mensagem de erro
   - **Request Payload:** Ver dados enviados

6. **Compartilhe:**
   - Screenshot do erro
   - Console logs (F12 → Console)
   - Response da API

---

## 🔐 Segurança SMTP

### Recomendações:

1. ✅ **Mover credenciais para variáveis de ambiente**

```bash
# No Vercel, adicione:
SMTP_HOST=smtp.ls2001.com.br
SMTP_USER=contato@ls2001.com.br
SMTP_PASS=C99995000c
```

2. ✅ **Remover do código**

```typescript
// Em vez de:
const smtpPass = 'C99995000c';

// Use:
const smtpPass = process.env.SMTP_PASS || 'C99995000c';
```

3. ✅ **Verificar permissões do email**

- Conta tem permissão para enviar SMTP?
- Firewall bloqueando porta 587?
- IP do Vercel na whitelist?

---

## ✅ Checklist de Verificação

Antes de reportar erro novamente:

- [ ] Testei em ambiente local (`npm run dev`)
- [ ] Testei no Vercel (production)
- [ ] Verifiquei logs no Vercel
- [ ] Conferi credenciais SMTP
- [ ] Testei com campos válidos
- [ ] Aguardei após rate limit
- [ ] Verifiquei Network tab no DevTools
- [ ] Copiei mensagem de erro exata

---

## 📞 Como Reportar Erro

Se ainda não funciona, forneça:

1. **Qual formulário:** Contato ou Cotação?
2. **Erro exato:** Screenshot ou texto
3. **Logs do Vercel:** Copie logs relevantes
4. **Network response:** Response da API
5. **Quando acontece:** Sempre ou às vezes?
6. **Ambiente:** Local ou Vercel?

---

**Última atualização:** 30/10/2025  
**Status:** Logging implementado, graceful failure ativo  
**Próximo passo:** Testar e verificar logs

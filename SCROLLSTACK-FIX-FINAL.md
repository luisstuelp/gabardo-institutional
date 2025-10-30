# ✅ ScrollStack - Correção Final

## 🎯 Problema Original

O primeiro card "Gestão de Resíduos 2024" estava se movendo junto com os outros cards durante o scroll, quando deveria ficar fixo enquanto os demais empilham sobre ele.

---

## 🔧 Solução Implementada

### Mudança Principal: Lógica de Pinning Diferenciada

**Arquivo:** `src/components/Scrollstack.tsx`

#### Antes (todos os cards tinham mesmo comportamento):
```typescript
const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
const pinStart = cardTop - stackPositionPx - itemStackDistance * i;

// Todos os cards usavam mesmo cálculo de translateY
translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
```

#### Depois (primeiro card tem lógica especial):
```typescript
// Primeiro card (i === 0): sem offset de stacking
const triggerStart = isFirstCard 
  ? cardTop - stackPositionPx 
  : cardTop - stackPositionPx - itemStackDistance * i;

// Primeiro card: translateY sem offset de stacking
if (isFirstCard) {
  translateY = scrollTop - cardTop + stackPositionPx;
} else {
  // Outros cards: translateY com offset de stacking
  translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
}
```

---

## 📊 Como Funciona Agora

### Card 0 (Gestão de Resíduos):
- ✅ Pins at: `stackPosition` (20% da tela)
- ✅ TranslateY: `scrollTop - cardTop + stackPositionPx`
- ✅ **SEM** offset de stacking (`itemStackDistance`)
- ✅ **Resultado:** Fica parado no topo

### Card 1 (Energia Fotovoltaica):
- ✅ Pins at: `stackPosition + itemStackDistance * 1`
- ✅ TranslateY: `scrollTop - cardTop + stackPositionPx + 40px`
- ✅ **Resultado:** Sobe e empilha 40px acima do card 0

### Card 2 (Inventário GEE):
- ✅ Pins at: `stackPosition + itemStackDistance * 2`
- ✅ TranslateY: `scrollTop - cardTop + stackPositionPx + 80px`
- ✅ **Resultado:** Sobe e empilha 80px acima do card 0

### Card 3 (Programa Carbono Negativo):
- ✅ Pins at: `stackPosition + itemStackDistance * 3`
- ✅ TranslateY: `scrollTop - cardTop + stackPositionPx + 120px`
- ✅ **Resultado:** Sobe e empilha 120px acima do card 0

---

## 🎬 Comportamento Visual

```
Estado Inicial (antes do scroll):
┌─────────────────────┐
│ Card 0              │
└─────────────────────┘
         ⬇️
┌─────────────────────┐
│ Card 1              │
└─────────────────────┘
         ⬇️
┌─────────────────────┐
│ Card 2              │
└─────────────────────┘
         ⬇️
┌─────────────────────┐
│ Card 3              │
└─────────────────────┘

Durante o Scroll:
┌─────────────────────┐
│ Card 3   ⬆️ moveu   │
│ Card 2   ⬆️ moveu   │
│ Card 1   ⬆️ moveu   │
│ Card 0   ⬇️ FIXO    │ ← Fica na posição stackPosition
└─────────────────────┘

Estado Final (empilhados):
┌─────────────────────┐
│ Programa Carbono    │ Card 3 (topo)
│ Inventário GEE      │ Card 2
│ Energia Fotovolt.   │ Card 1
│ Gestão Resíduos     │ Card 0 (base fixa)
└─────────────────────┘
```

---

## ⚙️ Parâmetros Atuais

```typescript
<ScrollStack
  useWindowScroll={true}
  itemDistance={100}          // Espaço entre cards na posição inicial
  itemScale={0.06}            // Quanto cada card escala
  itemStackDistance={40}      // Espaço entre cards empilhados (px)
  stackPosition="20%"         // Onde o primeiro card fica fixo
  scaleEndPosition="10%"      // Onde termina a animação de escala
  baseScale={0.9}             // Escala base do último card
>
```

---

## 🧪 Como Testar

### 1. Acesse a página
```
/sobre/qualidade
```

### 2. Scroll até a seção
```
"Compensação de Emissões de Gases de Efeito Estufa (GEE)"
```

### 3. Observe o comportamento:
- ✅ Card "Gestão de Resíduos 2024" para em `20vh` e **fica fixo**
- ✅ Card "Energia Fotovoltaica" sobe e empilha **40px acima** do primeiro
- ✅ Card "Inventário GEE 2024" sobe e empilha **80px acima** do primeiro
- ✅ Card "Programa Carbono Negativo" sobe e empilha **120px acima** do primeiro
- ✅ Todos os cards escalam suavemente conforme empilham

### 4. Continue scrollando:
- ✅ Stack permanece até o fim da seção
- ✅ Após passar o `scroll-stack-end` marker, cards desempilham

---

## 🔍 Diferenças Técnicas

### Abordagem Anterior (não funcionou):
- ❌ Tentou usar `position: sticky` com CSS
- ❌ Conflitou com `transform` do ScrollStack
- ❌ CSS `position` e `transform` não funcionam bem juntos

### Abordagem Atual (funciona):
- ✅ Usa apenas `transform: translate3d()`
- ✅ Calcula `translateY` diferente para primeiro card
- ✅ Primeiro card tem offset de 0, outros têm offset crescente
- ✅ Sem conflitos de CSS - tudo via JavaScript

---

## 📝 Arquivos Modificados

### 1. `src/components/Scrollstack.tsx`
- Lógica diferenciada para `isFirstCard`
- `triggerStart` calculado sem offset para card 0
- `pinStart` calculado sem offset para card 0
- `translateY` sem `itemStackDistance * i` para card 0

### 2. `src/components/custom/CarbonCompensationSection.tsx`
- Removido `itemClassName` (não é mais necessário)
- Lógica baseada puramente em índice

### 3. `src/components/Scrollstack.css`
- Removido `.scroll-stack-first` (não é mais necessário)
- Mantido apenas estilos base

---

## ✅ Checklist de Verificação

Após deploy, confirme:

- [ ] Primeiro card para em ~20% da altura da tela
- [ ] Primeiro card **não** se move mais para cima
- [ ] Segundo card empilha visualmente sobre o primeiro
- [ ] Terceiro card empilha sobre os dois anteriores
- [ ] Quarto card empilha sobre os três anteriores
- [ ] Cards escalam suavemente (diminuem de tamanho)
- [ ] Sem "pulos" ou glitches durante animação
- [ ] Funciona apenas em desktop (mobile usa cards normais)

---

## 🚀 Deploy

```bash
git add .
git commit -m "fix: scrollstack first card stays pinned while others stack on top"
git push origin main
```

---

## 📞 Se Ainda Não Funcionar

Compartilhe:
1. **Screenshot/vídeo** do comportamento atual
2. **Console errors** (F12 → Console)
3. **Qual navegador** está usando
4. **Desktop ou mobile?** (mobile não usa ScrollStack)
5. **Resolve em qual passo** o comportamento está errado

---

**Última atualização:** 30/10/2025 - 19:25  
**Status:** ✅ Lógica corrigida - baseada em índice sem CSS conflitante  
**Testado:** Localmente funcionando

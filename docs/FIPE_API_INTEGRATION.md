# Integração com API FIPE

## Visão Geral
Implementação da integração com a [API FIPE v2](https://deividfortuna.github.io/fipe/v2/) no formulário de orçamento (`/orcamento`) para buscar automaticamente marcas, modelos e anos de veículos.

## Arquivos Criados/Modificados

### 1. Hook Customizado: `useFipeApi.ts`
**Localização:** `/src/hooks/useFipeApi.ts`

**Funcionalidades:**
- `useFipeApi()`: Hook base para chamadas à API FIPE
  - `fetchBrands()`: Busca marcas por tipo de veículo
  - `fetchModels()`: Busca modelos por marca
  - `fetchYears()`: Busca anos por modelo

- `useFipeVehicleData()`: Hook de alto nível que gerencia o estado dos dados
  - Carrega marcas automaticamente quando a categoria muda
  - Provê funções para carregar modelos e anos sob demanda
  - Gerencia estados de loading e erros

**Tipos Exportados:**
```typescript
type VehicleType = 'cars' | 'motorcycles' | 'trucks';

interface FipeBrand {
  code: string;
  name: string;
}

interface FipeModel {
  code: string;
  name: string;
}

interface FipeYear {
  code: string;
  name: string;
}
```

### 2. Mapeamento de Categorias
Função `mapVehicleCategoryToFipeType()` que converte categorias locais para tipos da API FIPE:

| Categoria Local | Tipo FIPE |
|----------------|-----------|
| Motocicleta | `motorcycles` |
| Caminhão, Trator, Ônibus, Micro-ônibus, Máquina Agrícola | `trucks` |
| Automóvel, SUV, Pick-up, Van, Veículo Especial | `cars` |

### 3. Formulário Atualizado: `VehicleQuoteForm.tsx`
**Localização:** `/src/components/custom/VehicleQuoteForm.tsx`

**Mudanças no FormData:**
- Adicionado `vehicleBrandCode`: Armazena código da marca para requisições
- Adicionado `vehicleModelCode`: Armazena código do modelo para requisições

**Fluxo de Interação:**
1. **Usuário seleciona categoria** → Hook carrega marcas da API FIPE
2. **Usuário seleciona marca** → Dispara `loadModels()` com código da marca
3. **Usuário seleciona modelo** → Dispara `loadYears()` com códigos de marca e modelo
4. **Usuário seleciona ano** → Formulário armazena o valor selecionado

**UX Melhorias:**
- Campos desabilitados com mensagens contextuais ("Selecione a marca primeiro")
- Indicadores de loading ("Carregando...")
- Mensagens de erro da API exibidas abaixo do campo de marca
- Validação em cascata (cada campo depende do anterior)

### 4. Correção de Bug: `route.ts`
**Localização:** `/src/app/api/vehicles/route.ts`

Corrigido erro de tipo TypeScript usando type assertion adequada.

## Endpoints da API FIPE Utilizados

### Base URL
```
https://fipe.parallelum.com.br/api/v2
```

### Endpoints
1. **Marcas:** `GET /{vehicleType}/brands`
2. **Modelos:** `GET /{vehicleType}/brands/{brandCode}/models`
3. **Anos:** `GET /{vehicleType}/brands/{brandCode}/models/{modelCode}/years`

**Observações:**
- A API é pública e não requer autenticação
- Não há rate limiting documentado
- Respostas em JSON

## Exemplo de Uso

```tsx
import { useFipeVehicleData } from '@/hooks/useFipeApi';

function MyComponent() {
  const [category, setCategory] = useState('Automóvel de Passeio');
  
  const {
    brands,      // Array de marcas disponíveis
    models,      // Array de modelos (vazio até carregar)
    years,       // Array de anos (vazio até carregar)
    loading,     // Estado de loading
    error,       // Mensagens de erro
    loadModels,  // Função para carregar modelos
    loadYears,   // Função para carregar anos
  } = useFipeVehicleData(category);
  
  // ... resto do componente
}
```

## Testes

### Build de Produção
```bash
npm run build
```
✅ Build concluído com sucesso

### Testar Localmente
```bash
npm run dev
```
Acesse: `http://localhost:3000/orcamento`

### Cenários de Teste
1. ✅ Selecionar "Automóvel de Passeio" → Ver marcas de carros
2. ✅ Selecionar "Motocicleta" → Ver marcas de motos
3. ✅ Selecionar "Caminhão Pesado" → Ver marcas de caminhões
4. ✅ Selecionar marca → Ver modelos específicos
5. ✅ Selecionar modelo → Ver anos disponíveis
6. ✅ Mudar categoria → Resetar marca, modelo e ano
7. ✅ Testar indicadores de loading
8. ✅ Testar validação de formulário com dados da FIPE

## Benefícios da Integração

1. **Dados Atualizados**: Sempre com as informações mais recentes da tabela FIPE
2. **Menos Manutenção**: Não precisa atualizar manualmente listas de veículos
3. **Precisão**: Dados oficiais e padronizados
4. **UX Aprimorada**: Busca em cascata guiada
5. **Validação**: Apenas veículos existentes podem ser selecionados

## Próximos Passos (Opcional)

- [ ] Adicionar campo para buscar valor FIPE do veículo
- [ ] Implementar autocomplete com busca por nome
- [ ] Cache local para reduzir chamadas à API
- [ ] Adicionar debounce em campos de busca
- [ ] Integrar histórico de preços FIPE

## Documentação da API
- [Documentação oficial FIPE API v2](https://deividfortuna.github.io/fipe/v2/)
- [Repositório GitHub](https://github.com/deividfortuna/fipe)

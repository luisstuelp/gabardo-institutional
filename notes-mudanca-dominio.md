# Migração do domínio do site de transgabardo.com.br para gabardo.com
Data 2026-06-26

## Objetivo
Estamos migrando o domínio principal do site de:

https://www.transgabardo.com.br

para:

https://gabardo.com

## Alterações realizadas:

### DNS/Vercel

- gabardo.com configurado como domínio principal na Vercel.
- www.gabardo.com configurado com redirect 308 para https://gabardo.com
- transgabardo.com.br removido da Vercel
- transgabardo.com.br irá direcionar via redirect para gabardo.com - configuração feita na VPS


### Modificações no projeto
Criada branch fix/domain=gabardo.com

####Arquivos alerados no projeto:

*gabardoContent.json
Substituídas URLs absolutas antigas:

https://www.transgabardo.com.br

por:

https://gabardo.com

Motivo:
Atualizar links internos, conteúdo indexado, referências de páginas e possíveis fontes usadas por busca/SEO/chatbot/conteúdo estático.



## Procedimento de rollback

### Para reverter as mudanças:
####Na vercel retorne os domains substituindo novamente:
https://gabardo.com

por:

https://www.transgabardo.com.br

####No projeto reverta os commits dessa branch no github

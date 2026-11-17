# Motos na Web — Front-end

Interface da Sprint 1 em Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui (Base UI) e Lucide React.

## Executar

Requisitos: Node.js compatível com Next.js 16 (20.9 ou superior) e npm.

```bash
npm ci
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Em PowerShell, use `npm.cmd` caso a política de execução bloqueie `npm.ps1`.

Para executar a versão de produção:

```bash
npm run build
npm run start
```

A Sprint 1 funciona sem iniciar o backend e sem configurar variáveis de ambiente. O arquivo `.env.example` é uma preparação para a integração futura; `API_BASE_URL` ainda não é consumida.

## Páginas e funcionalidades

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial, pesquisa em destaque e catálogo |
| `/motocicletas` | Catálogo completo com pesquisa e filtros |
| `/motocicletas/[id]` | Ficha individual de cada motocicleta |
| `/comparar` | Seleção de duas a quatro motos e tabela comparativa |

- Cabeçalho com logotipo textual, navegação ativa e menu móvel.
- Pesquisa por fabricante e modelo, combinando palavras e ignorando maiúsculas e acentos.
- Filtro por uma ou mais marcas, combinado com faixas de cilindrada: até 200, 201–350, 351–500 e acima de 500 cc.
- Ordenação pela sequência original, marca/modelo, menor ou maior cilindrada.
- Contagem de resultados, filtros removíveis, limpeza de pesquisa e estado sem resultados.
- Cards com imagens locais e carregamento progressivo de modelos (6 inicialmente e depois os restantes).
- Fichas com fabricante, modelo, ano, cor e cilindrada.
- Comparador sem duplicatas, com limite de quatro motos, remoção individual e limpeza da seleção.
- Tabela disponível a partir de duas seleções e posições opcionais para a terceira e quarta motos.
- Seleção compartilhada entre páginas e preservada no `localStorage` do navegador. Se o armazenamento estiver bloqueado, a seleção funciona em memória durante a navegação.
- Layout adaptável: cards em uma, duas ou três colunas; filtros recolhíveis e menu no celular; tabela com rolagem horizontal.
- Rótulos de formulário, foco visível, link para pular ao conteúdo e respeito à preferência por movimento reduzido.
- Página 404 e imagem substituta quando uma foto não carrega.
- Metadados em português, ícone próprio e fonte Geist hospedada localmente.

## Dados demonstrativos e integração futura

Os dez registros reproduzem a massa inicial de [src/server.js do backend](https://github.com/cmls-gama/motos-na-web-api/blob/ad85aa8247e668cf65577606c33197bc8db8f3d1/src/server.js), consultada em 17/11/2026:

| Fabricante | Modelo | Ano | Cor | Cilindrada |
| --- | --- | --- | --- | --- |
| Yamaha | MT-03 | 2025 | Azul | 321 cc |
| Honda | CB 500F | 2025 | Vermelha | 471 cc |
| BMW | G 310 R | 2025 | Branca | 313 cc |
| Bajaj | Dominar 400 | 2025 | Preta | 373 cc |
| Royal Enfield | Himalayan 450 | 2025 | Cinza | 452 cc |
| Suzuki | GSX-S750 | 2025 | Azul | 749 cc |
| Zontes | R350 | 2025 | Preta | 348 cc |
| SYM (Dafra) | NH 300 | 2025 | Vermelha | 278 cc |
| Haojue | DR 160 | 2025 | Cinza | 162 cc |
| CFMoto | 450NK | 2025 | Branca | 449 cc |

Nenhuma especificação adicional foi inventada. Os IDs legíveis são exclusivos desta demonstração; o backend gera UUIDs.

A separação está organizada assim:

- `types/motorcycle.ts`: contrato dos campos de negócio.
- `data/motorcycles.ts`: registros demonstrativos com origem documentada.
- `data/motorcycle-images.ts`: caminhos das imagens e páginas de origem, sem alterar o contrato da API.
- `lib/motorcycles.ts`: ponto de acesso aos registros e utilitários de pesquisa/faixas.
- `hooks/use-comparison.ts`: armazenamento local e regras da seleção.
- `components/motorcycles/`: apresentação e filtros do catálogo.
- `components/comparison/`: botões, barra de seleção e comparação.

Na integração REST, substituir a origem em `lib/motorcycles.ts` por um adaptador aos endpoints `GET /api/v1/motorcycles` e `GET /api/v1/motorcycles/:id`, tratando os envelopes `{ data, count }` e `{ data }`, autenticação, carregamento e erros. Os componentes recebem dados por propriedades. O comparador usa atualmente o catálogo demonstrativo pelo mesmo módulo de acesso; na integração, ele deverá consumir também o catálogo recebido da API.

Nenhuma autenticação, chamada REST, persistência no servidor ou banco de dados faz parte desta sprint. Não há alterações no backend.

## Arquivos da Sprint 1

- `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/favicon.ico` e `app/icon.svg`.
- `app/motocicletas/page.tsx`, `app/motocicletas/[id]/page.tsx` e `app/motocicletas/[id]/loading.tsx`.
- `app/comparar/page.tsx` e `app/not-found.tsx`.
- `components/site-header.tsx` e `components/site-footer.tsx`.
- `components/motorcycles/{catalog-hero,motorcycle-catalog,motorcycle-card,motorcycle-image}.tsx`.
- `components/comparison/{compare-button,comparison-dock,comparison-page}.tsx`.
- `data/motorcycles.ts`, `data/motorcycle-images.ts`, `types/motorcycle.ts`, `lib/motorcycles.ts` e `hooks/use-comparison.ts`.
- `public/motorcycles/`, `public/fonts/`, `package.json` e este `README.md`.

O componente shadcn/ui `components/ui/button.tsx` e as dependências já estavam disponíveis e foram reutilizados. Nenhuma biblioteca adicional foi instalada. O Next.js pode atualizar automaticamente as instruções em `AGENTS.md` ao iniciar o servidor, conforme a configuração existente.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

Não foram criados testes automatizados nem instalados frameworks de testes.

A revisão visual e interativa no navegador não pôde ser executada nesta sessão porque o host de acesso ao navegador estava indisponível. A implementação inclui os breakpoints responsivos, mas a validação visual em dispositivos continua pendente.

Roteiro para conferência manual:

1. Em larguras de 375, 768 e 1440 px, conferir menu, busca, cards, filtros e ausência de rolagem horizontal da página.
2. Buscar `honda 500`, combinar marcas e cilindrada, remover filtros e conferir resultados vazios.
3. Carregar os quatro modelos restantes e abrir as fichas técnicas.
4. Adicionar duas motos, abrir o comparador e conferir os cinco campos disponíveis.
5. Adicionar terceira e quarta motos, conferir o bloqueio da quinta, remover um modelo e selecionar outro.
6. Recarregar a página e conferir a seleção; depois limpar e conferir o estado inicial.
7. No celular, deslizar a tabela comparativa e usar os controles pelo teclado.

## Imagens e tipografia

As fotos são ilustrativas e podem mostrar versões, anos ou cores diferentes dos dados demonstrativos. Não estabelecem especificações técnicas. As páginas de origem estão registradas em `data/motorcycle-images.ts`; os direitos pertencem aos respectivos titulares. Antes de publicar comercialmente, substituir por material próprio ou com licença de uso adequada.

Geist é distribuída sob a SIL Open Font License 1.1, incluída em `public/fonts/OFL.txt`. Os arquivos locais foram obtidos da distribuição do Next.js já instalada, para evitar downloads de fontes durante o build.

Nenhum commit é realizado automaticamente.
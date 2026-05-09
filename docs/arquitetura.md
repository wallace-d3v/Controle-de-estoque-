# Arquitetura

## Visao geral

O projeto `controle-estoque` foi desenhado como um MVP totalmente estatico, com foco em uso pessoal no celular, simplicidade de deploy e baixa manutencao. Toda a aplicacao roda no navegador, sem servidor, sem API e sem banco externo.

## Decisao por HTML, CSS e JavaScript puro

A opcao por HTML, CSS e JavaScript puro foi intencional:

- elimina dependencias externas e etapa de build
- facilita publicacao no GitHub Pages
- reduz complexidade para um app de uso pessoal
- permite abrir o `index.html` diretamente no navegador para uso basico
- favorece manutencao simples no longo prazo

Tambem foi adotado JavaScript sem modulos ES para manter compatibilidade ao abrir arquivos localmente em `file://`, algo comum quando o projeto e usado sem servidor local.

## Decisao por LocalStorage

O LocalStorage foi escolhido porque atende bem ao escopo do aplicativo:

- persiste os dados no proprio navegador
- nao exige backend
- tem API simples e nativa
- e suficiente para o volume pequeno de produtos do caso de uso

No projeto, o LocalStorage guarda:

- lista de produtos e quantidades
- configuracoes do numero padrao do WhatsApp

## Organizacao dos arquivos

### Interface

- `index.html`: pagina principal do app
- `pages/configuracoes.html`: pagina de preferencias e manutencao

### Estilos

- `css/reset.css`: reset basico
- `css/variaveis.css`: tokens visuais
- `css/global.css`: regras globais
- `css/layout.css`: estrutura de layout
- `css/componentes.css`: componentes reutilizaveis
- `css/responsivo.css`: ajustes de breakpoint
- `styles/configuracoes.css`: ajustes especificos da pagina de configuracoes

### JavaScript

- `js/app.js`: inicializacao da home, renderizacao da lista, filtros, eventos e integracao entre modulos
- `js/storage.js`: persistencia de produtos e configuracoes
- `js/produtos.js`: operacoes sobre a colecao de produtos
- `js/mensagem.js`: montagem e copia da mensagem do WhatsApp
- `js/whatsapp.js`: construcao do link e abertura do WhatsApp
- `js/categorias.js`: funcoes auxiliares de categoria
- `js/validacoes.js`: validacoes de produto, quantidade e WhatsApp
- `js/utils.js`: utilitarios comuns
- `data/produtos-iniciais.js`: base inicial de hortifruti
- `scripts/configuracoes.js`: comportamento da pagina de configuracoes

## Fluxo principal da aplicacao

1. A aplicacao carrega os produtos do LocalStorage.
2. Se nao houver dados salvos, grava a lista inicial padrao.
3. A tela principal renderiza os produtos agrupados por categoria.
4. Ao editar `Pedido` ou `Estoque`, o app salva automaticamente.
5. A mensagem do WhatsApp e montada apenas com itens cujo `Pedido` seja maior que zero.
6. A pagina de configuracoes permite salvar um numero padrao, restaurar a base ou limpar os dados locais.

## PWA basico

O projeto possui:

- `manifest.json` para instalacao
- `service-worker.js` para cache simples do shell da aplicacao

Isso viabiliza uma experiencia basica de app instalavel e acesso offline parcial quando servido por `localhost` ou HTTPS. Em `file://`, por limitacao do navegador, o service worker nao e ativado.

## Limitacoes do MVP

- os dados ficam presos ao navegador atual
- nao existe sincronizacao entre dispositivos
- nao ha controle de usuario ou permissao
- nao ha historico de pedidos
- nao ha importacao ou exportacao de dados
- o cache offline e simples e nao cobre cenarios avancados de atualizacao

## Possiveis evolucoes futuras

1. Exportar e importar JSON para backup manual.
2. Adicionar ordenacao customizada e favoritos.
3. Criar indicadores por categoria e totais de pedido.
4. Implementar compartilhamento por texto, e-mail ou PDF.
5. Evoluir o cache offline para estrategia versionada com melhor controle de atualizacao.
6. Adicionar testes automatizados de comportamento.

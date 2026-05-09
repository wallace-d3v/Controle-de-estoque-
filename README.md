# Controle de Estoque

Aplicativo web simples, mobile first e sem backend para controlar produtos de hortifruti, registrar pedido e estoque, salvar tudo localmente e gerar uma mensagem pronta para WhatsApp.

## Objetivo do projeto

O app foi pensado para uso pessoal no celular, com foco em rapidez no dia a dia:

- visualizar a lista de produtos por categoria
- editar pedido e estoque direto na lista
- salvar automaticamente no navegador
- adicionar e remover produtos
- pesquisar por nome e filtrar por categoria
- gerar, copiar e enviar uma mensagem pronta para WhatsApp

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript puro
- LocalStorage
- Service Worker simples
- Manifest Web App para PWA basico

## Como rodar localmente

### Opcao 1: abrir diretamente no navegador

Abra o arquivo `index.html`.

Nesta forma, o app principal funciona normalmente:

- cadastro e edicao de produtos
- filtros
- LocalStorage
- geracao de mensagem
- copia de texto

Observacao: recursos de PWA como `service worker` e instalacao do app dependem de `http/https` por regra do navegador e nao ativam em `file://`.

### Opcao 2: usar um servidor local

Qualquer servidor estatico serve. Exemplos:

```bash
python -m http.server 5500
```

ou

```bash
npx serve .
```

Depois, acesse `http://localhost:5500` ou a porta exibida pelo servidor.

## Como instalar no celular

Depois de publicar em HTTPS ou abrir em `localhost`:

1. Abra o site no navegador do celular.
2. Use a opcao `Adicionar a tela inicial` ou `Instalar aplicativo`.
3. Confirme a instalacao.
4. O app passara a abrir em modo semelhante a aplicativo.

## Como funciona o LocalStorage

O projeto salva tudo no proprio navegador do usuario:

- lista de produtos
- quantidades de pedido
- quantidades de estoque
- numero padrao do WhatsApp

As chaves sao isoladas por prefixo do projeto. Isso significa que:

- nao existe backend
- os dados nao vao para nuvem automaticamente
- limpar os dados do navegador remove as informacoes salvas
- cada aparelho ou navegador possui seu proprio armazenamento

## Estrutura principal

```text
controle-estoque/
|-- index.html
|-- manifest.json
|-- service-worker.js
|-- css/
|   |-- reset.css
|   |-- variaveis.css
|   |-- global.css
|   |-- layout.css
|   |-- componentes.css
|   `-- responsivo.css
|-- js/
|   |-- app.js
|   |-- storage.js
|   |-- produtos.js
|   |-- whatsapp.js
|   |-- mensagem.js
|   |-- categorias.js
|   |-- validacoes.js
|   `-- utils.js
|-- pages/
|   `-- configuracoes.html
|-- styles/
|   `-- configuracoes.css
|-- scripts/
|   `-- configuracoes.js
|-- data/
|   `-- produtos-iniciais.js
|-- assets/
|   |-- icons/
|   `-- fonts/
`-- docs/
    `-- arquitetura.md
```

## Funcionalidades entregues

- lista inicial de hortifruti por categoria
- edicao direta de `Pedido` e `Estoque`
- salvamento automatico no LocalStorage
- formulario para adicionar produto
- remocao individual
- busca por nome
- filtro por categoria
- mensagem formatada para WhatsApp
- copia da mensagem
- abertura do WhatsApp com texto pronto
- pagina de configuracoes
- restauracao da base inicial
- limpeza total dos dados do app

## Documentacao adicional

A explicacao de arquitetura e decisoes tecnicas esta em [docs/arquitetura.md](docs/arquitetura.md).

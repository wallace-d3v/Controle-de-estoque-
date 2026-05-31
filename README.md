# Controle de Estoque para Hortifruti

Aplicativo web mobile-first para controle simples de produtos, pedidos e estoque de hortifruti, com persistencia local no navegador e geracao de mensagem pronta para WhatsApp.

## Demonstracao

[Acessar projeto publicado](https://wallace-d3v.github.io/Controle-de-estoque-/index.html)

## Status

Projeto funcional em versao MVP.

## Preview

Adicione aqui as imagens do projeto depois de enviar os arquivos para o repositorio.

Sugestao de estrutura:

```md
![Tela inicial](assets/screenshots/tela-inicial.png)
![Lista de produtos](assets/screenshots/lista-produtos.png)
![Mensagem para WhatsApp](assets/screenshots/mensagem-whatsapp.png)
![Tela de configuracoes](assets/screenshots/configuracoes.png)
```

Pasta sugerida para as imagens:

```txt
assets/screenshots/
```

## Objetivo do projeto

O app foi pensado para uso no celular, com foco em rapidez no dia a dia de controle de produtos:

- Visualizar a lista de produtos por categoria;
- Editar pedidos e estoque diretamente na lista;
- Salvar automaticamente no navegador;
- Adicionar e remover produtos;
- Pesquisar por nome e filtrar por categoria;
- Gerar, copiar e enviar uma mensagem pronta para o WhatsApp.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro
- LocalStorage
- Service Worker simples
- Manifest Web App para PWA basico

## Decisoes tecnicas

- Uso de HTML, CSS e JavaScript puro para manter o projeto leve, simples e sem etapa de build.
- Uso de LocalStorage para permitir persistencia local sem backend.
- Interface mobile-first para facilitar o uso direto no celular.
- Separacao do JavaScript em modulos por responsabilidade, como armazenamento, produtos, categorias, mensagem e WhatsApp.
- Implementacao de PWA basico para permitir instalacao no dispositivo quando servido por HTTPS ou localhost.

## Funcionalidades entregues

- Lista inicial de hortifruti por categoria;
- Edicao direta de pedidos e estoque;
- Salvamento automatico no LocalStorage;
- Formulario para adicionar produtos;
- Remocao individual de produtos;
- Busca por nome;
- Filtro por categoria;
- Mensagem formatada para WhatsApp;
- Copia da mensagem;
- Abertura do WhatsApp com texto pronto;
- Pagina de configuracoes;
- Restauracao da base inicial;
- Limpeza total dos dados do aplicativo.

## Como rodar localmente

### Opcao 1: abrir diretamente no navegador

Abra o arquivo `index.html`.

Nessa forma, o app principal funciona normalmente:

- Cadastro e edicao de produtos;
- Filtros;
- LocalStorage;
- Geracao de mensagem;
- Copia de texto.

Observacao: recursos de PWA, como Service Worker e instalacao do aplicativo, dependem de HTTP/HTTPS por regra do navegador e nao funcionam em `file://`.

### Opcao 2: usar um servidor local

Qualquer servidor estatico serve. Exemplos:

```bash
python -m http.server 5500
```

ou

```bash
npx serve .
```

Depois, acesse:

```txt
http://localhost:5500
```

ou a porta exibida pelo servidor.

## Como instalar no celular

Depois de publicar em HTTPS ou abrir em localhost:

1. Abra o site no navegador do celular;
2. Use a opcao "Adicionar a tela inicial" ou "Instalar aplicativo";
3. Confirme a instalacao;
4. O app passara a abrir em modo semelhante a um aplicativo.

## Como funciona o LocalStorage

O projeto salva tudo no proprio navegador do usuario:

- Lista de produtos;
- Quantidades de pedido;
- Quantidades de estoque;
- Numero padrao do WhatsApp.

As chaves sao isoladas por prefixo do projeto. Isso significa que:

- Nao existe backend;
- Os dados nao vao para a nuvem automaticamente;
- Limpar os dados do navegador remove as informacoes salvas;
- Cada aparelho ou navegador possui seu proprio armazenamento.

## Limitacoes conhecidas

- Os dados ficam salvos apenas no navegador atual.
- Nao existe sincronizacao entre dispositivos.
- Nao ha controle de usuario ou permissoes.
- Nao ha historico de pedidos.
- Nao ha importacao ou exportacao de dados.
- O cache offline e simples e nao cobre cenarios avancados de atualizacao.

## Possiveis melhorias futuras

- Exportar e importar JSON para backup manual.
- Adicionar historico de pedidos por data.
- Adicionar unidade de medida por produto, como kg, unidade, caixa, bandeja ou maco.
- Criar indicadores por categoria e totais de pedido.
- Implementar compartilhamento por texto, e-mail ou PDF.
- Evoluir o cache offline para estrategia versionada.
- Criar uma versao com backend em Node.js, API REST e banco de dados.
- Adicionar testes automatizados de comportamento.

## Estrutura principal

```txt
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
|   |-- fonts/
|   `-- screenshots/
`-- docs/
    `-- arquitetura.md
```

## Documentacao adicional

A explicacao de arquitetura e decisoes tecnicas esta em [docs/arquitetura.md](docs/arquitetura.md).

## Autor

**Wallace Monsores**  
Desenvolvedor de Software  
GitHub: [wallace-d3v](https://github.com/wallace-d3v)

Controle de Estoque

Aplicativo web simples, mobile-first e sem backend para controlar produtos de hortifruti, registrar pedidos e estoque, salvar tudo localmente e gerar uma mensagem pronta para WhatsApp.

---

Objetivo do projeto

O app foi pensado para uso pessoal no celular, com foco em rapidez no dia a dia:

- Visualizar a lista de produtos por categoria;
- Editar pedidos e estoque diretamente na lista;
- Salvar automaticamente no navegador;
- Adicionar e remover produtos;
- Pesquisar por nome e filtrar por categoria;
- Gerar, copiar e enviar uma mensagem pronta para o WhatsApp.

---

Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro
- LocalStorage
- Service Worker simples
- Manifest Web App para PWA básico

---

Como rodar localmente

Opção 1: abrir diretamente no navegador

Abra o arquivo "index.html".

Nessa forma, o app principal funciona normalmente:

- Cadastro e edição de produtos;
- Filtros;
- LocalStorage;
- Geração de mensagem;
- Cópia de texto.

«Observação: recursos de PWA, como Service Worker e instalação do aplicativo, dependem de HTTP/HTTPS por regra do navegador e não funcionam em "file://".»

---

Opção 2: usar um servidor local

Qualquer servidor estático serve. Exemplos:

python -m http.server 5500

ou

npx serve .

Depois, acesse:

http://localhost:5500

ou a porta exibida pelo servidor.

---

Como instalar no celular

Depois de publicar em HTTPS ou abrir em localhost:

1. Abra o site no navegador do celular;
2. Use a opção “Adicionar à tela inicial” ou “Instalar aplicativo”;
3. Confirme a instalação;
4. O app passará a abrir em modo semelhante a um aplicativo.

---

Como funciona o LocalStorage

O projeto salva tudo no próprio navegador do usuário:

- Lista de produtos;
- Quantidades de pedido;
- Quantidades de estoque;
- Número padrão do WhatsApp.

As chaves são isoladas por prefixo do projeto. Isso significa que:

- Não existe backend;
- Os dados não vão para a nuvem automaticamente;
- Limpar os dados do navegador remove as informações salvas;
- Cada aparelho ou navegador possui seu próprio armazenamento.

---

Estrutura principal

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

---

Funcionalidades entregues

- Lista inicial de hortifruti por categoria;
- Edição direta de pedidos e estoque;
- Salvamento automático no LocalStorage;
- Formulário para adicionar produtos;
- Remoção individual;
- Busca por nome;
- Filtro por categoria;
- Mensagem formatada para WhatsApp;
- Cópia da mensagem;
- Abertura do WhatsApp com texto pronto;
- Página de configurações;
- Restauração da base inicial;
- Limpeza total dos dados do aplicativo.
## Documentacao adicional

A explicacao de arquitetura e decisoes tecnicas esta em [docs/arquitetura.md](docs/arquitetura.md).

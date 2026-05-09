(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};
  const ICONE_LIXEIRA = [
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">',
    '<path d="M4 7h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>',
    '<path d="M9 4h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>',
    '<path d="M7 7v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7" stroke="currentColor" stroke-width="1.8"></path>',
    '<path d="M10 11v5M14 11v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>',
    "</svg>"
  ].join("");

  function obterDependencia(nome) {
    const dependencia = raiz[nome];

    if (!dependencia) {
      throw new Error(`Dependencia ausente: ${nome}`);
    }

    return dependencia;
  }

  function escaparHtml(valor) {
    return String(valor)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function inicializarPaginaInicial() {
    if (document.body.dataset.pagina !== "home") {
      return;
    }

    const utils = obterDependencia("utils");
    const storage = obterDependencia("storage");
    const produtosApi = obterDependencia("produtos");
    const categoriasApi = obterDependencia("categorias");
    const mensagemApi = obterDependencia("mensagem");
    const whatsappApi = obterDependencia("whatsapp");

    const estado = {
      busca: "",
      categoria: "todas",
      larguraViewport: window.innerWidth,
      mensagemAtual: "",
      paginaAtual: 1,
      produtos: storage.carregarDados()
    };

    const elementos = {
      anoAtual: utils.selecionarElemento("#ano-atual"),
      botaoCopiarMensagem: utils.selecionarElemento("#botao-copiar-mensagem"),
      botaoEnviarWhatsapp: utils.selecionarElemento("#botao-enviar-whatsapp"),
      botaoGerarMensagem: utils.selecionarElemento("#botao-gerar-mensagem"),
      campoBusca: utils.selecionarElemento("#campo-busca"),
      contadorProdutosVisiveis: utils.selecionarElemento("#contador-produtos-visiveis"),
      filtroCategoria: utils.selecionarElemento("#filtro-categoria"),
      formAdicionarProduto: utils.selecionarElemento("#form-adicionar-produto"),
      listaProdutos: utils.selecionarElemento("#lista-produtos"),
      mensagemPreview: utils.selecionarElemento("#mensagem-preview"),
      novoProdutoCategoria: utils.selecionarElemento("#novo-produto-categoria"),
      novoProdutoNome: utils.selecionarElemento("#novo-produto-nome"),
      paginacaoLista: utils.selecionarElemento("#paginacao-lista"),
      resumoTotalCategorias: utils.selecionarElemento("#resumo-total-categorias"),
      resumoTotalEstoqueBaixo: utils.selecionarElemento("#resumo-total-estoque-baixo"),
      resumoTotalPedido: utils.selecionarElemento("#resumo-total-pedido"),
      resumoTotalProdutos: utils.selecionarElemento("#resumo-total-produtos"),
      resumoTotalProdutosRodape: utils.selecionarElemento("#resumo-total-produtos-rodape"),
      statusApp: utils.selecionarElemento("#status-app")
    };

    function mostrarStatus(texto, tipo) {
      elementos.statusApp.textContent = texto;
      elementos.statusApp.className = `alerta alerta--${tipo || "info"}`;
    }

    function salvarProdutos() {
      storage.salvarDados(estado.produtos);
    }

    function obterProdutosVisiveis() {
      const produtosBuscados = produtosApi.buscarProdutos(estado.produtos, estado.busca);
      return produtosApi.filtrarPorCategoria(produtosBuscados, estado.categoria);
    }

    function obterItensPorPagina() {
      return window.innerWidth < 560 ? 12 : 14;
    }

    function obterContextoTabela() {
      const produtosFiltrados = obterProdutosVisiveis();
      const itensPorPagina = obterItensPorPagina();
      const totalPaginas = Math.max(1, Math.ceil(produtosFiltrados.length / itensPorPagina));

      estado.paginaAtual = Math.max(1, Math.min(estado.paginaAtual, totalPaginas));

      const inicio = (estado.paginaAtual - 1) * itensPorPagina;
      const produtosPagina = produtosFiltrados.slice(inicio, inicio + itensPorPagina);

      return {
        inicio,
        itensPorPagina,
        produtosFiltrados,
        produtosPagina,
        totalPaginas
      };
    }

    function obterCategoriasComProdutos(produtos) {
      const categoriasOrdenadas = categoriasApi.listarCategorias(estado.produtos);

      return categoriasOrdenadas.filter((categoria) =>
        produtos.some((produto) => produto.categoria === categoria)
      );
    }

    function preencherSeletoresCategoria() {
      const categorias = categoriasApi.listarCategorias(estado.produtos);
      const categoriaAtual = estado.categoria;

      elementos.filtroCategoria.innerHTML = ['<option value="todas">Todas as categorias</option>']
        .concat(
          categorias.map((categoria) =>
            `<option value="${escaparHtml(categoria)}">${escaparHtml(categoriasApi.obterNomeCategoria(categoria))}</option>`
          )
        )
        .join("");

      elementos.novoProdutoCategoria.innerHTML = categorias
        .map(
          (categoria) =>
            `<option value="${escaparHtml(categoria)}">${escaparHtml(categoriasApi.obterNomeCategoria(categoria))}</option>`
        )
        .join("");

      elementos.filtroCategoria.value = categorias.includes(categoriaAtual) ? categoriaAtual : "todas";

      if (!elementos.novoProdutoCategoria.value && categorias.length > 0) {
        elementos.novoProdutoCategoria.value = categorias[0];
      }
    }

    function contarEstoqueBaixo(produtos) {
      return produtos.filter((produto) => {
        const pedido = Number(produto.pedido) || 0;
        const estoque = Number(produto.estoque) || 0;
        return pedido > 0 && estoque < pedido;
      }).length;
    }

    function atualizarResumo(contextoTabela) {
      const totalProdutos = estado.produtos.length;
      const totalComPedido = estado.produtos.filter((produto) => Number(produto.pedido) > 0).length;
      const totalEstoqueBaixo = contarEstoqueBaixo(estado.produtos);
      const totalCategorias = categoriasApi.listarCategorias(estado.produtos).length;
      const totalFiltrados = contextoTabela.produtosFiltrados.length;
      const totalNaPagina = contextoTabela.produtosPagina.length;

      elementos.resumoTotalProdutos.textContent = String(totalProdutos);
      elementos.resumoTotalPedido.textContent = String(totalComPedido);
      elementos.resumoTotalEstoqueBaixo.textContent = String(totalEstoqueBaixo);
      elementos.resumoTotalProdutosRodape.textContent = `${totalProdutos} itens no total`;
      elementos.resumoTotalCategorias.textContent = `${totalCategorias} categorias`;
      elementos.contadorProdutosVisiveis.textContent = `${totalNaPagina} de ${totalFiltrados} itens`;
    }

    function atualizarPreviewMensagem() {
      estado.mensagemAtual = mensagemApi.gerarMensagemWhatsapp(estado.produtos);
      elementos.mensagemPreview.value = estado.mensagemAtual || "";
    }

    function obterClasseEstoque(produto) {
      const pedido = Number(produto.pedido) || 0;
      const estoque = Number(produto.estoque) || 0;

      if (pedido > 0 && estoque === 0) {
        return "campo__controle campo-tabela campo-tabela--critico";
      }

      if (pedido > 0 && estoque < pedido) {
        return "campo__controle campo-tabela campo-tabela--atencao";
      }

      if (pedido > 0 && estoque >= pedido) {
        return "campo__controle campo-tabela campo-tabela--ok";
      }

      return "campo__controle campo-tabela";
    }

    function renderizarPaginacao(totalPaginas) {
      if (!elementos.paginacaoLista) {
        return;
      }

      const itens = [];

      itens.push(`
        <button class="paginacao__botao" type="button" data-paginacao="anterior" ${estado.paginaAtual === 1 ? "disabled" : ""} aria-label="Pagina anterior">
          &lsaquo;
        </button>
      `);

      const paginas = [];

      for (let pagina = 1; pagina <= totalPaginas; pagina += 1) {
        if (
          pagina === 1 ||
          pagina === totalPaginas ||
          Math.abs(pagina - estado.paginaAtual) <= 1
        ) {
          paginas.push(pagina);
        }
      }

      const paginasSemDuplicidade = Array.from(new Set(paginas)).sort((a, b) => a - b);
      let ultimaPaginaRenderizada = 0;

      paginasSemDuplicidade.forEach((pagina) => {
        if (pagina - ultimaPaginaRenderizada > 1) {
          itens.push('<span class="paginacao__reticencias" aria-hidden="true">...</span>');
        }

        itens.push(`
          <button
            class="paginacao__pagina ${pagina === estado.paginaAtual ? "paginacao__pagina--ativa" : ""}"
            type="button"
            data-pagina="${pagina}"
            aria-label="Ir para pagina ${pagina}"
            ${pagina === estado.paginaAtual ? 'aria-current="page"' : ""}
          >
            ${pagina}
          </button>
        `);

        ultimaPaginaRenderizada = pagina;
      });

      itens.push(`
        <button class="paginacao__botao" type="button" data-paginacao="proxima" ${estado.paginaAtual === totalPaginas ? "disabled" : ""} aria-label="Proxima pagina">
          &rsaquo;
        </button>
      `);

      elementos.paginacaoLista.innerHTML = itens.join("");
    }

    function renderizarTabela(contextoTabela) {
      let indiceSequencial = contextoTabela.inicio + 1;
      const categoriasOrdenadas = obterCategoriasComProdutos(contextoTabela.produtosPagina);

      if (contextoTabela.produtosFiltrados.length === 0) {
        elementos.listaProdutos.innerHTML = `
          <div class="vazio">
            <p>Nenhum produto encontrado para os filtros atuais.</p>
          </div>
        `;
        renderizarPaginacao(1);
        return;
      }

      const linhasTabela = categoriasOrdenadas
        .map((categoria) => {
          const produtosDaCategoria = contextoTabela.produtosPagina.filter((produto) => produto.categoria === categoria);

          const linhasProdutos = produtosDaCategoria
            .map((produto) => {
              const linha = `
                <tr class="linha-produto" data-id="${escaparHtml(produto.id)}">
                  <td class="coluna-indice">${indiceSequencial++}</td>
                  <td>${escaparHtml(produto.nome)}</td>
                  <td>
                    <input
                      class="campo__controle campo-tabela"
                      type="number"
                      min="0"
                      step="1"
                      inputmode="numeric"
                      value="${Number(produto.pedido)}"
                      data-campo="pedido"
                      aria-label="Pedido para ${escaparHtml(produto.nome)}"
                    >
                  </td>
                  <td>
                    <input
                      class="${obterClasseEstoque(produto)}"
                      type="number"
                      min="0"
                      step="1"
                      inputmode="numeric"
                      value="${Number(produto.estoque)}"
                      data-campo="estoque"
                      aria-label="Estoque para ${escaparHtml(produto.nome)}"
                    >
                  </td>
                  <td>
                    <button class="botao-icone" type="button" data-acao="remover" aria-label="Remover ${escaparHtml(produto.nome)}">
                      ${ICONE_LIXEIRA}
                    </button>
                  </td>
                </tr>
              `;

              return linha;
            })
            .join("");

          return `
            <tr class="linha-categoria">
              <td colspan="5">${escaparHtml(categoriasApi.obterNomeCategoria(categoria))}</td>
            </tr>
            ${linhasProdutos}
          `;
        })
        .join("");

      elementos.listaProdutos.innerHTML = `
        <div class="tabela-scroll">
          <table class="tabela-estoque">
            <thead>
              <tr>
                <th>#</th>
                <th>Produto</th>
                <th>Pedido</th>
                <th>Estoque</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${linhasTabela}
            </tbody>
          </table>
        </div>
      `;

      renderizarPaginacao(contextoTabela.totalPaginas);
    }

    function sincronizarInterface(textoStatus, tipoStatus) {
      const contextoTabela = obterContextoTabela();

      preencherSeletoresCategoria();
      atualizarResumo(contextoTabela);
      atualizarPreviewMensagem();
      renderizarTabela(contextoTabela);

      if (textoStatus) {
        mostrarStatus(textoStatus, tipoStatus);
      }
    }

    function lidarEnvioFormulario(event) {
      event.preventDefault();

      const nome = elementos.novoProdutoNome.value.trim();
      const categoria = elementos.novoProdutoCategoria.value;

      try {
        estado.produtos = produtosApi.adicionarProduto(estado.produtos, {
          nome,
          categoria,
          pedido: 0,
          estoque: 0
        });

        salvarProdutos();
        estado.paginaAtual = obterContextoTabela().totalPaginas;
        elementos.formAdicionarProduto.reset();
        preencherSeletoresCategoria();
        elementos.novoProdutoNome.focus();
        sincronizarInterface("Produto adicionado com sucesso.", "sucesso");
      } catch (error) {
        mostrarStatus(error.message, "erro");
      }
    }

    function lidarCliqueLista(event) {
      const botaoRemover = event.target.closest("[data-acao='remover']");

      if (!botaoRemover) {
        return;
      }

      const linha = botaoRemover.closest("[data-id]");

      if (!linha) {
        return;
      }

      const produto = estado.produtos.find((item) => item.id === linha.dataset.id);

      if (!produto) {
        return;
      }

      if (!window.confirm(`Remover o produto "${produto.nome}"?`)) {
        return;
      }

      estado.produtos = produtosApi.removerProduto(estado.produtos, produto.id);
      salvarProdutos();
      sincronizarInterface("Produto removido.", "sucesso");
    }

    function lidarEdicaoProduto(event) {
      const campo = event.target.closest("[data-campo]");

      if (!campo) {
        return;
      }

      const linha = campo.closest("[data-id]");

      if (!linha) {
        return;
      }

      const nomeCampo = campo.dataset.campo;
      const valor = raiz.utils.formatarNumero(campo.value);

      estado.produtos = produtosApi.atualizarProduto(estado.produtos, linha.dataset.id, {
        [nomeCampo]: valor
      });

      salvarProdutos();

      const produtoAtualizado = estado.produtos.find((produto) => produto.id === linha.dataset.id);
      const campoEstoque = linha.querySelector('[data-campo="estoque"]');

      if (produtoAtualizado && campoEstoque) {
        campoEstoque.className = obterClasseEstoque(produtoAtualizado);
      }

      atualizarResumo(obterContextoTabela());
      atualizarPreviewMensagem();
      mostrarStatus("Alteracoes salvas automaticamente.", "sucesso");
    }

    function lidarSaidaCampoNumero(event) {
      const campo = event.target.closest("[data-campo]");

      if (!campo) {
        return;
      }

      campo.value = String(raiz.utils.formatarNumero(campo.value));
    }

    function lidarBusca(event) {
      estado.busca = event.target.value;
      estado.paginaAtual = 1;
      sincronizarInterface();
    }

    function lidarFiltroCategoria(event) {
      estado.categoria = event.target.value;
      estado.paginaAtual = 1;
      sincronizarInterface();
    }

    function lidarPaginacao(event) {
      const botaoPagina = event.target.closest("[data-pagina]");
      const botaoDirecao = event.target.closest("[data-paginacao]");

      if (botaoPagina) {
        estado.paginaAtual = Number(botaoPagina.dataset.pagina) || 1;
        sincronizarInterface();
        return;
      }

      if (!botaoDirecao) {
        return;
      }

      if (botaoDirecao.dataset.paginacao === "anterior") {
        estado.paginaAtual = Math.max(1, estado.paginaAtual - 1);
      }

      if (botaoDirecao.dataset.paginacao === "proxima") {
        estado.paginaAtual += 1;
      }

      sincronizarInterface();
    }

    function lidarResize() {
      const larguraAtual = window.innerWidth;

      if (larguraAtual === estado.larguraViewport) {
        return;
      }

      estado.larguraViewport = larguraAtual;
      sincronizarInterface();
    }

    function gerarMensagemManual() {
      atualizarPreviewMensagem();

      if (!estado.mensagemAtual) {
        mostrarStatus("Preencha pelo menos um pedido maior que zero para gerar a mensagem.", "erro");
        return;
      }

      mostrarStatus("Pre-visualizacao atualizada.", "sucesso");
    }

    async function copiarMensagem() {
      atualizarPreviewMensagem();

      if (!estado.mensagemAtual) {
        mostrarStatus("Nao ha mensagem para copiar.", "erro");
        return;
      }

      const resultado = await mensagemApi.copiarMensagem(estado.mensagemAtual);
      mostrarStatus(resultado.mensagem, resultado.sucesso ? "sucesso" : "erro");
    }

    function enviarWhatsapp() {
      atualizarPreviewMensagem();

      if (!estado.mensagemAtual) {
        mostrarStatus("Nao ha mensagem para enviar.", "erro");
        return;
      }

      whatsappApi.abrirWhatsapp(estado.mensagemAtual);
      mostrarStatus("Abrindo WhatsApp com a mensagem pronta.", "sucesso");
    }

    function registrarEventos() {
      elementos.formAdicionarProduto.addEventListener("submit", lidarEnvioFormulario);
      elementos.listaProdutos.addEventListener("click", lidarCliqueLista);
      elementos.listaProdutos.addEventListener("input", lidarEdicaoProduto);
      elementos.listaProdutos.addEventListener("blur", lidarSaidaCampoNumero, true);
      elementos.campoBusca.addEventListener("input", lidarBusca);
      elementos.filtroCategoria.addEventListener("change", lidarFiltroCategoria);
      elementos.botaoGerarMensagem.addEventListener("click", gerarMensagemManual);
      elementos.botaoCopiarMensagem.addEventListener("click", copiarMensagem);
      elementos.botaoEnviarWhatsapp.addEventListener("click", enviarWhatsapp);
      elementos.paginacaoLista.addEventListener("click", lidarPaginacao);
      window.addEventListener("resize", lidarResize);
    }

    function registrarServiceWorker() {
      const protocoloValido = window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

      if (!("serviceWorker" in navigator) || !protocoloValido) {
        return;
      }

      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        mostrarStatus("Nao foi possivel ativar o modo offline nesta execucao.", "erro");
      });
    }

    if (elementos.anoAtual) {
      elementos.anoAtual.textContent = String(new Date().getFullYear());
    }

    registrarEventos();
    sincronizarInterface("Dados carregados com sucesso.", "sucesso");
    registrarServiceWorker();
  }

  document.addEventListener("DOMContentLoaded", inicializarPaginaInicial);
})();

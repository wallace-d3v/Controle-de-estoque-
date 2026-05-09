(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};
  const utils = raiz.utils;
  const validacoes = raiz.validacoes;

  function garantirDependencias() {
    if (!utils || !validacoes) {
      throw new Error("Utils e validacoes devem ser carregados antes de produtos.js.");
    }
  }

  function normalizarProduto(produto) {
    return {
      id: String(produto.id || utils.gerarId()),
      nome: String(produto.nome || "").trim().replace(/\s+/g, " "),
      categoria: String(produto.categoria || "").trim(),
      pedido: utils.formatarNumero(produto.pedido),
      estoque: utils.formatarNumero(produto.estoque)
    };
  }

  function existeProduto(produtos, produtoNovo) {
    return produtos.some((produto) => {
      const mesmoNome = utils.normalizarTexto(produto.nome) === utils.normalizarTexto(produtoNovo.nome);
      const mesmaCategoria = produto.categoria === produtoNovo.categoria;
      return mesmoNome && mesmaCategoria;
    });
  }

  function adicionarProduto(produtos, produto) {
    garantirDependencias();

    const listaAtual = Array.isArray(produtos) ? produtos.slice() : [];
    const produtoNormalizado = normalizarProduto(produto);
    const validacao = validacoes.validarProduto(produtoNormalizado);

    if (!validacao.valido) {
      throw new Error(validacao.erros[0]);
    }

    if (existeProduto(listaAtual, produtoNormalizado)) {
      throw new Error("Ja existe um produto com esse nome nessa categoria.");
    }

    return listaAtual.concat(produtoNormalizado);
  }

  function removerProduto(produtos, id) {
    const listaAtual = Array.isArray(produtos) ? produtos : [];
    return listaAtual.filter((produto) => produto.id !== id);
  }

  function atualizarProduto(produtos, id, campos) {
    const listaAtual = Array.isArray(produtos) ? produtos : [];

    return listaAtual.map((produto) => {
      if (produto.id !== id) {
        return produto;
      }

      return normalizarProduto(Object.assign({}, produto, campos));
    });
  }

  function buscarProdutos(produtos, termo) {
    const listaAtual = Array.isArray(produtos) ? produtos.slice() : [];
    const termoNormalizado = utils.normalizarTexto(termo);

    if (!termoNormalizado) {
      return listaAtual;
    }

    return listaAtual.filter((produto) =>
      utils.normalizarTexto(produto.nome).includes(termoNormalizado)
    );
  }

  function filtrarPorCategoria(produtos, categoria) {
    const listaAtual = Array.isArray(produtos) ? produtos.slice() : [];

    if (!categoria || categoria === "todas") {
      return listaAtual;
    }

    return listaAtual.filter((produto) => produto.categoria === categoria);
  }

  raiz.produtos = {
    adicionarProduto,
    removerProduto,
    atualizarProduto,
    buscarProdutos,
    filtrarPorCategoria
  };
})();

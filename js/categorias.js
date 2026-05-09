(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};
  const CATEGORIAS_PADRAO = ["HORTALIÇAS", "FRUTAS"];

  function listarCategorias(produtos) {
    const mapa = new Map();

    CATEGORIAS_PADRAO.forEach((categoria) => {
      mapa.set(categoria, categoria);
    });

    (Array.isArray(produtos) ? produtos : []).forEach((produto) => {
      const categoria = String(produto.categoria || "").trim();

      if (categoria && !mapa.has(categoria)) {
        mapa.set(categoria, categoria);
      }
    });

    return Array.from(mapa.values());
  }

  function obterNomeCategoria(categoria) {
    const texto = String(categoria || "").trim();
    return texto || "Sem categoria";
  }

  raiz.categorias = {
    listarCategorias,
    obterNomeCategoria,
    CATEGORIAS_PADRAO: CATEGORIAS_PADRAO.slice()
  };
})();

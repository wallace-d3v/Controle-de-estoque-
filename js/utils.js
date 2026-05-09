(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};

  function gerarId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return `produto-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
  }

  function normalizarTexto(valor) {
    return String(valor || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function formatarNumero(valor) {
    const texto = String(valor === null || valor === undefined ? "" : valor).trim().replace(",", ".");
    const numero = Number(texto);

    if (!Number.isFinite(numero) || numero < 0) {
      return 0;
    }

    return Math.trunc(numero);
  }

  function selecionarElemento(seletor, contexto) {
    return (contexto || document).querySelector(seletor);
  }

  raiz.utils = {
    gerarId,
    normalizarTexto,
    formatarNumero,
    selecionarElemento
  };
})();

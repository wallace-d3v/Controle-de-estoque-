(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};
  const utils = raiz.utils;

  function validarQuantidade(valor) {
    const numero = utils.formatarNumero(valor);
    return Number.isInteger(numero) && numero >= 0;
  }

  function validarProduto(produto) {
    const erros = [];
    const nome = String((produto && produto.nome) || "").trim();
    const categoria = String((produto && produto.categoria) || "").trim();

    if (!nome) {
      erros.push("Informe o nome do produto.");
    }

    if (!categoria) {
      erros.push("Selecione uma categoria.");
    }

    if (!validarQuantidade(produto && produto.pedido)) {
      erros.push("Pedido deve ser um numero inteiro maior ou igual a zero.");
    }

    if (!validarQuantidade(produto && produto.estoque)) {
      erros.push("Estoque deve ser um numero inteiro maior ou igual a zero.");
    }

    return {
      valido: erros.length === 0,
      erros
    };
  }

  function validarWhatsapp(numeroWhatsapp) {
    const numeros = String(numeroWhatsapp || "").replace(/\D/g, "");

    if (!numeros) {
      return true;
    }

    return numeros.length >= 10 && numeros.length <= 13;
  }

  raiz.validacoes = {
    validarProduto,
    validarQuantidade,
    validarWhatsapp
  };
})();

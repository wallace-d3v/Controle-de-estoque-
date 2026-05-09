(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};
  const dados = raiz.dados || {};
  const CHAVE_PRODUTOS = "controle-estoque:produtos";
  const CHAVE_CONFIGURACOES = "controle-estoque:configuracoes";
  const CONFIGURACOES_PADRAO = {
    numeroWhatsapp: ""
  };

  function normalizarInteiroNaoNegativo(valor) {
    const numero = Number(valor);

    if (!Number.isFinite(numero) || numero < 0) {
      return 0;
    }

    return Math.trunc(numero);
  }

  function clonarProdutos(produtos) {
    return (Array.isArray(produtos) ? produtos : []).map((produto) => ({
      id: String(produto.id || ""),
      nome: String(produto.nome || "").trim(),
      categoria: String(produto.categoria || "").trim(),
      pedido: normalizarInteiroNaoNegativo(produto.pedido),
      estoque: normalizarInteiroNaoNegativo(produto.estoque)
    }));
  }

  function obterProdutosIniciais() {
    return clonarProdutos(dados.PRODUTOS_INICIAIS || []);
  }

  function lerJson(chave) {
    try {
      const conteudo = window.localStorage.getItem(chave);
      return conteudo ? JSON.parse(conteudo) : null;
    } catch (error) {
      return null;
    }
  }

  function escreverJson(chave, valor) {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (error) {
      return false;
    }
  }

  function salvarDados(produtos) {
    return escreverJson(CHAVE_PRODUTOS, clonarProdutos(produtos));
  }

  function carregarDados() {
    const produtos = lerJson(CHAVE_PRODUTOS);

    if (Array.isArray(produtos)) {
      return clonarProdutos(produtos);
    }

    const iniciais = obterProdutosIniciais();
    salvarDados(iniciais);
    return iniciais;
  }

  function limparDados() {
    salvarDados([]);
    salvarConfiguracoes(CONFIGURACOES_PADRAO);
    return true;
  }

  function restaurarDadosIniciais() {
    const produtos = obterProdutosIniciais();
    salvarDados(produtos);
    return produtos;
  }

  function salvarConfiguracoes(configuracoes) {
    const dadosSalvos = {
      numeroWhatsapp: String((configuracoes && configuracoes.numeroWhatsapp) || "").trim()
    };

    return escreverJson(CHAVE_CONFIGURACOES, dadosSalvos);
  }

  function carregarConfiguracoes() {
    const configuracoes = lerJson(CHAVE_CONFIGURACOES);

    if (!configuracoes || typeof configuracoes !== "object") {
      return Object.assign({}, CONFIGURACOES_PADRAO);
    }

    return {
      numeroWhatsapp: String(configuracoes.numeroWhatsapp || "").trim()
    };
  }

  raiz.storage = {
    salvarDados,
    carregarDados,
    limparDados,
    restaurarDadosIniciais,
    salvarConfiguracoes,
    carregarConfiguracoes
  };
})();

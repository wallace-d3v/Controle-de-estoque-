(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};

  function inicializarPaginaConfiguracoes() {
    if (document.body.dataset.pagina !== "configuracoes") {
      return;
    }

    const utils = raiz.utils;
    const storage = raiz.storage;
    const validacoes = raiz.validacoes;

    const elementos = {
      botaoLimpar: utils.selecionarElemento("#botao-limpar"),
      botaoRestaurar: utils.selecionarElemento("#botao-restaurar"),
      contadorProdutos: utils.selecionarElemento("#contador-configuracoes-produtos"),
      formConfiguracoes: utils.selecionarElemento("#form-configuracoes"),
      numeroWhatsapp: utils.selecionarElemento("#numero-whatsapp"),
      status: utils.selecionarElemento("#status-configuracoes")
    };

    function mostrarStatus(texto, tipo) {
      elementos.status.textContent = texto;
      elementos.status.className = `alerta alerta--${tipo || "info"}`;
    }

    function atualizarResumoProdutos() {
      const total = storage.carregarDados().length;
      elementos.contadorProdutos.textContent = `${total} produtos salvos`;
    }

    function preencherFormulario() {
      const configuracoes = storage.carregarConfiguracoes();
      elementos.numeroWhatsapp.value = configuracoes.numeroWhatsapp || "";
      atualizarResumoProdutos();
      mostrarStatus("Configuracoes carregadas com sucesso.", "sucesso");
    }

    function salvarConfiguracoes(event) {
      event.preventDefault();

      const numeroWhatsapp = elementos.numeroWhatsapp.value.trim();

      if (!validacoes.validarWhatsapp(numeroWhatsapp)) {
        mostrarStatus("Informe um numero valido com DDI e DDD, ou deixe o campo vazio.", "erro");
        return;
      }

      storage.salvarConfiguracoes({
        numeroWhatsapp
      });

      mostrarStatus("Configuracoes salvas com sucesso.", "sucesso");
    }

    function restaurarProdutosIniciais() {
      const confirmar = window.confirm("Restaurar os produtos iniciais? Isso substitui a lista atual.");

      if (!confirmar) {
        return;
      }

      storage.restaurarDadosIniciais();
      atualizarResumoProdutos();
      mostrarStatus("Produtos iniciais restaurados.", "sucesso");
    }

    function limparDadosSalvos() {
      const confirmar = window.confirm("Limpar todos os dados salvos do aplicativo neste navegador?");

      if (!confirmar) {
        return;
      }

      storage.limparDados();
      preencherFormulario();
      mostrarStatus("Dados salvos removidos com sucesso.", "sucesso");
    }

    elementos.formConfiguracoes.addEventListener("submit", salvarConfiguracoes);
    elementos.botaoRestaurar.addEventListener("click", restaurarProdutosIniciais);
    elementos.botaoLimpar.addEventListener("click", limparDadosSalvos);

    preencherFormulario();
  }

  document.addEventListener("DOMContentLoaded", inicializarPaginaConfiguracoes);
})();

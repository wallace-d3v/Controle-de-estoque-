(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};

  function obterNumeroWhatsapp() {
    const storage = raiz.storage;
    const configuracoes = storage ? storage.carregarConfiguracoes() : { numeroWhatsapp: "" };
    return String(configuracoes.numeroWhatsapp || "").replace(/\D/g, "");
  }

  function montarLinkWhatsapp(mensagem, numeroWhatsapp) {
    const numero = String(numeroWhatsapp || obterNumeroWhatsapp()).replace(/\D/g, "");
    const mensagemCodificada = encodeURIComponent(String(mensagem || ""));

    if (numero) {
      return `https://wa.me/${numero}?text=${mensagemCodificada}`;
    }

    return `https://wa.me/?text=${mensagemCodificada}`;
  }

  function abrirWhatsapp(mensagem, numeroWhatsapp) {
    const link = montarLinkWhatsapp(mensagem, numeroWhatsapp);
    window.open(link, "_blank", "noopener");
    return link;
  }

  raiz.whatsapp = {
    abrirWhatsapp,
    obterNumeroWhatsapp,
    montarLinkWhatsapp
  };
})();

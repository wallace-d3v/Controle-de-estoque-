(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};
  const utils = raiz.utils;

  function gerarMensagemWhatsapp(produtos) {
    const lista = Array.isArray(produtos) ? produtos : [];
    const produtosComPedido = lista.filter((produto) => utils.formatarNumero(produto.pedido) > 0);

    return produtosComPedido
      .map((produto) => {
        const pedido = utils.formatarNumero(produto.pedido);
        const estoque = utils.formatarNumero(produto.estoque);

        return [
          produto.nome,
          `Pedido: ${pedido}`,
          `Estoque: ${estoque}`
        ].join("\n");
      })
      .join("\n\n");
  }

  function copiarMensagemFallback(mensagem) {
    const areaTemporaria = document.createElement("textarea");
    areaTemporaria.value = mensagem;
    areaTemporaria.setAttribute("readonly", "readonly");
    areaTemporaria.style.position = "fixed";
    areaTemporaria.style.opacity = "0";
    document.body.appendChild(areaTemporaria);
    areaTemporaria.select();

    let copiado = false;

    try {
      copiado = document.execCommand("copy");
    } catch (error) {
      copiado = false;
    }

    document.body.removeChild(areaTemporaria);
    return copiado;
  }

  async function copiarMensagem(mensagem) {
    if (!mensagem) {
      return {
        sucesso: false,
        mensagem: "Nao ha mensagem gerada para copiar."
      };
    }

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(mensagem);
        return {
          sucesso: true,
          mensagem: "Mensagem copiada para a area de transferencia."
        };
      }
    } catch (error) {
      // Se a API moderna falhar, o fluxo continua para o fallback local.
    }

    const copiado = copiarMensagemFallback(mensagem);

    return {
      sucesso: copiado,
      mensagem: copiado
        ? "Mensagem copiada para a area de transferencia."
        : "Nao foi possivel copiar a mensagem neste navegador."
    };
  }

  raiz.mensagem = {
    gerarMensagemWhatsapp,
    copiarMensagem
  };
})();

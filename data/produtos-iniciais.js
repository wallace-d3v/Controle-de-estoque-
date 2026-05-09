(function () {
  "use strict";

  const raiz = window.ControleEstoque = window.ControleEstoque || {};
  const dados = raiz.dados = raiz.dados || {};

  const PRODUTOS_POR_CATEGORIA = {
    "HORTALIÇAS": [
      "Batata lavada",
      "Batata doce",
      "Alho Argentino",
      "Cenoura",
      "Cebola",
      "Cebola Roxa",
      "Pimentão verde",
      "Pimentão vermelho",
      "Pimentão amarelo",
      "Abobrinha italiana",
      "Abóbora madura",
      "Beterraba",
      "Berinjela",
      "Inhame",
      "Pepino",
      "Repolho branco",
      "Chuchu",
      "Tomate",
      "Gengibre",
      "Jiló",
      "Batata baroa"
    ],
    "FRUTAS": [
      "Banana Prata",
      "Banana d'água",
      "Manga Tommy",
      "Manga Palmer",
      "Morango",
      "Pera Portuguesa",
      "Pera William",
      "Maçã Nacional",
      "Maçã importada",
      "Maçã verde",
      "Maçã pacote 850g",
      "Maracujá",
      "Melancia",
      "Abacate",
      "Abacaxi",
      "Ameixa",
      "Nectarina",
      "Kiwi",
      "Coco seco",
      "Laranja Bahia",
      "Melão",
      "Mamão havai",
      "Mamão Formosa",
      "Laranja lima",
      "Laranja Pêra",
      "Limão",
      "Pêssego",
      "Uva vitória",
      "Uva Thompson"
    ]
  };

  function criarSlug(texto) {
    return String(texto)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const PRODUTOS_INICIAIS = Object.keys(PRODUTOS_POR_CATEGORIA).reduce((listaFinal, categoria) => {
    const produtosDaCategoria = PRODUTOS_POR_CATEGORIA[categoria].map((nome) => ({
      id: `${criarSlug(categoria)}-${criarSlug(nome)}`,
      nome,
      categoria,
      pedido: 0,
      estoque: 0
    }));

    return listaFinal.concat(produtosDaCategoria);
  }, []);

  dados.PRODUTOS_INICIAIS = PRODUTOS_INICIAIS;
})();

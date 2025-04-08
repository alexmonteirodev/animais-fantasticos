export default [
  {
    rules: {
      //regras comuns:

      //'no-console': 'error'
      //indent: ["error", 2], //indentação de 2 espaços
      "keyword-spacing": "error",
      "no-multiple-empty-lines": "error", //pular linhas no meio do codigo
      "eol-last": ["error", "always"], //sempre adicionar uma linha no final
      semi: ["error", "always"], // ; no final de cada linha
      "no-trailing-spaces": "error", //espaçamentos que não são para indentação (escreveu algo e deixou um espaço depois)
      "operator-assignment": "error", // localiza codigo redundante - x = x + y, para x += y
      "no-inner-declarations": [
        //evitar declaração interna dentro de if. deixa a function declarada no escopo global do código. (localiza function que está dentro do escopo do if, tem que declarar fora)
        "error",
        "functions",
        { blockScopedFunctions: "disallow" },
      ],
    },
  },
];
//usar o prettier para formatar tudo sem ter que ficar alterando manualmente - npx prettier --write .

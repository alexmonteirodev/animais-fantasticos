export default function initFetchBitcoin(params) {}

//https://blockchain.info/ticker

const endereco = fetch("https://blockchain.info/ticker");

endereco
  .then((r) => {
    return r.json();
  })
  .then((bitcoin) => {
    const btcPreco = document.querySelector(".btc-preco");
    // console.log(params.BRL.sell)
    btcPreco.innerHTML = (1000 / bitcoin.BRL.sell).toFixed(4);
  })
  .catch((erro) => {
    console.log(Error(erro));
  });

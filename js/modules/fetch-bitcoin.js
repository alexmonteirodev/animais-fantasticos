export default function fetchBitcoin(url, target) {
  //https://blockchain.info/ticker

  const endereco = fetch(url);

  endereco
    .then((r) => {
      return r.json();
    })
    .then((bitcoin) => {
      const btcPreco = document.querySelector(target);
      // console.log(params.BRL.sell)
      btcPreco.innerHTML = (1000 / bitcoin.BRL.sell).toFixed(4);
    })
    .catch((erro) => {
      console.log(Error(erro));
    });
}

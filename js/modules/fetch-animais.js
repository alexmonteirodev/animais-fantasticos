import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  const numerosGrid = document.querySelector(target);

  //cria a div que contem info com o total de animais
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.especie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  //preenche cada animal no dom
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }
  //anima os numeros de cada animal
  function animaAnimaisNumeros(params) {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  }

  //puxa os animais via json e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    //fecth e espera resposta e transforma a resposta em json
    const animaisResponse = await fetch(url);
    const animaisJSON = await animaisResponse.json();

    //após a transformação em json, ativa as funções para preencher e animar os números
    animaisJSON.forEach((animal) => {
      preencherAnimais(animal);
    });
    animaAnimaisNumeros();
  }
  return criarAnimais();
}

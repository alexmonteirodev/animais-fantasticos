import initAnimaNumeros from "./anima-numeros.js";

export default function initFetchAnimais(params) {
  async function fetchAnimais(url) {
    const animaisResponse = await fetch(url);
    const animaisJSON = await animaisResponse.json();
    // console.log(animaisJSON)
    animaisJSON.forEach((animal) => {
      const divAnimal = createAnimal(animal);
      // console.log(divAnimal)
      const numerosGrid = document.querySelector(".numeros-grid");
      numerosGrid.appendChild(divAnimal);
    });
    initAnimaNumeros();
  }
  fetchAnimais("./animaisapi.json");

  function createAnimal(animal) {
    // console.log(animal)
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.especie}</h3><span data-numero>${animal.total}</span>`;
    // console.log(div)
    return div;
  }
}

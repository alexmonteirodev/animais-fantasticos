//animação ao scroll (ao scrolar  a pg, os elementos fazem animação para o lodo)
import debounce from "./debounce.js";
export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.metadeTela = window.innerHeight * 0.75; //tamanho da tela (eixo y) * 60%

    //bind
    this.checkDistance = debounce(this.checkDistance.bind(this), 100);
  }

  //pega a distancia de cada item em relacao ao topo do site
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      //desestrutura(para array) para usar o map
      const offset = section.offsetTop;
      return {
        element: section,
        offset: offset - this.metadeTela,
      };
    });
  }

  //verifica a distancia de cada objeto em relacao ao scroll
  checkDistance() {
    //window.pageYOffset = onde o scroll está
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offset) {
        item.element.classList.add("ativo");
      } else if (item.element.classList.contains("ativo")) {
        item.element.classList.remove("ativo");
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener("scroll", this.checkDistance);
    }
    return this;
  }

  //remove o event de scroll
  stop() {
    window.removeEventListener("scroll", this.checkDistance);
  }
}

//sabe a distancia pela verificação da metade da tela - o topo, porém esse código roda a cada scroll, para otimizar isso, fizemos uma alteração em que cada section terá uma distância fixa e de acrodo com a posição da barra do scroll, faremos a animação.
// animaScroll() {
//   this.sections.forEach((params) => {
//     const sectionTop = params.getBoundingClientRect().top;
//     const isSectionVisible = sectionTop - this.metadeTela < 0;
//     if (isSectionVisible) {
//       params.classList.add("ativo");
//     } else if (params.classList.contains("ativo")) {
//       params.classList.remove("ativo");
//     }
//   });
// }
//tambem foi criada uma funcao de stop para poder usar como: scrollAnima.stop() caso queira parar a animação por algum motivo e o debounce para para de ativar a função a cada scroll e ela performar melhor.

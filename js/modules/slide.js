import debounce from "./debounce.js";

export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0,
      startX: 0, //startX serve para pegar a referencia inicial de onde o mouse clicou
      movement: 0,
    };
    this.activeClass = "active";

    this.changeEvent = new Event("changeEvent");
  }
  // lógica consite em usar o css .slide transform: translate3d(Xpx,0px,0px), para fazer o carrosel andar de acordo com o translate3d no eixo x. pra isso, tem que add o evento de mouse click e depois de clicado, o mouse move (pro slide não ficar mexendo sem ter clicado) e atualizar isso com o translate3d:

  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0px, 0px)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6; //para deixar o movimento 1.6* mais rápido
    return this.dist.finalPosition - this.dist.movement; // - para inverter a posição do slide
  }

  onStart(event) {
    let moveType;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      moveType = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX; //evento para capturar posicao6 do toque é diferente para mobile, 0 é o primeiro toque
      moveType = "touchmove";
    }
    this.wrapper.addEventListener(moveType, this.onMove); //add dentro do onstart pra só começar a contar depois que clicar. se add no addSlideEvents, ao colocar o mouse dentro do slide, já ia contar. porém agora se tirar o mouse da div e recolocar ele continua disparando e por isso se usa o onEnd.
    this.transition(false);
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX; //basicamente mesma coisa que o moveType mas agora para o onMove(), usando ternário
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active); //para não mudar quando chegar nas bordas
    }
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  //slides config (transformar slides em uma array que tenha a posição de cada elementon )

  slidePosition(slide) {
    //a logica aqui é pegar o tamanho da tela - o temanho do elemento e dividir por 2 (cada margem)
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin); //negativo pq o carrosel tem que ir pra direita
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1; //pega tamanho da array para usar no ternario do objeto abaixo para verificar se o next e o prev existem porque só o objeto cru, se o index tivesse em 0 ele diria que o prev é -1 e o -1 não existe. (antes era prev: index -1 e next: index + 1)
    this.index = {
      prev: index ? index - 1 : undefined, //pq se o index for 0, da false
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  // metodo que muda o slide de acordo com index de cada img

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.changeActiveClass();
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  changeActiveClass() {
    this.slideArray.forEach((item) => {
      item.element.classList.remove(this.activeClass);
    });
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element); //retorna a posição do elemento porém grudado na borda e p/ calcular pro elemento ficar no centro criamos a slidePosition()
      return {
        position,
        element,
      };
    });
    console.log(this.slideArray);
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    }
  }

  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next);
    }
  }

  onResize() {
    setTimeout(() => {
      this.slidesConfig();
      this.changeSlide(this.index.active);
    }, 1000);
    this.slidesConfig();
    this.changeSlide(this.index.active);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.onResize = debounce(this.onResize.bind(this), 200);

    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);
  }

  init() {
    this.transition(true);
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    this.changeSlide(0);
    this.addResizeEvent();
    return this;
  }
}

export default class SlideNav extends Slide {
  constructor(slide, wrapper) {
    super(slide, wrapper); //pra puxar da class Slide
    this.bindControlEvents();
  }

  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevElement.addEventListener("click", this.activePrevSlide);
    this.nextElement.addEventListener("click", this.activeNextSlide);
  }

  createControl() {
    //add 1 li pra cada item
    const control = document.createElement("ul");
    control.dataset.control = "slide";
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });
    this.wrapper.appendChild(control);
    console.log(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener("changeEvent", this.activeControlItem);
  }

  activeControlItem() {
    //feedback visual posição do item (bolinha colorida)
    this.controlArray.forEach((item) => {
      //foreach e limpa e depois adiciona o item selecionado pra não ficar colorindo todas as bolinhas a cada item que clicar
      item.classList.remove(this.activeClass);
    });
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    this.controlArray = [...this.control.children];
    this.controlArray.forEach((item, index) => {
      this.eventControl(item, index); //poderia passar forEach(this.eventControl)
    });
    this.activeControlItem();
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}

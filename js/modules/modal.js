export default class Modal {
  constructor(botaoAbrir, botaoFechar, containerModal) {
    this.botaoAbrir = document.querySelector(botaoAbrir);
    this.botaoFechar = document.querySelector(botaoFechar);
    this.containerModal = document.querySelector(containerModal);

    //bind this aos callbacks para fazer referencia ao objeto da classe
    this.evetToggleModal = this.evetToggleModal.bind(this);
    this.cliqueFora = this.cliqueFora.bind(this);
  }

  //abre ou fecha o modal
  toggleModal() {
    this.containerModal.classList.toggle("ativo");
  }

  //adiciona o evento de toggle ao mdoal
  evetToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  //fecha o modal ao clicar do lado de fora
  cliqueFora(event) {
    if (event.target === this.containerModal) {
      this.toggleModal();
    }
  }

  //adiciona os eventos aos elementos do modal
  addModalEvent() {
    this.botaoAbrir.addEventListener("click", this.evetToggleModal);
    this.botaoFechar.addEventListener("click", this.evetToggleModal);
    this.containerModal.addEventListener("click", this.cliqueFora);
  }

  init() {
    if (this.botaoAbrir && this.botaoFechar && this.containerModal) {
      this.addModalEvent();
    }
    return this;
  }
}

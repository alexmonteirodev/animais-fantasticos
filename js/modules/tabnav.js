//navegação por tabs: (interação entre fotos e conteúdo)
export default class TabNav {
  constructor(menu, conteudo) {
    this.tabMenu = document.querySelectorAll(menu);
    this.tabContent = document.querySelectorAll(conteudo);
    this.activeClass = "ativo";
  }
  //ativa a tab de acordo com o index da mesma
  activeTab(index) {
    this.tabContent.forEach((params) => {
      params.classList.remove(this.activeClass);
    });
    const direcao = this.tabContent[index].dataset.anime;
    this.tabContent[index].classList.add(this.activeClass, direcao);
  }

  //adiciona os eventos nas tabs
  addTabNavEvent() {
    this.tabMenu.forEach((img, index) => {
      img.addEventListener("click", () => this.activeTab(index));
    });
  }

  init() {
    if (this.tabMenu.length && this.tabContent.length) {
      this.activeTab([0]); //ativa o primeiro item
      this.addTabNavEvent();
    }
    return this;
  }
}

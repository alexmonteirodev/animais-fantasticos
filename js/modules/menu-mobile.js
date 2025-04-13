import outsideClick from "./outside-click.js";

export default class MenuMobile {
  constructor(menuButton, menuList, eventos) {
    this.menuButton = document.querySelector(menuButton);
    this.menuList = document.querySelector(menuList);
    this.activeClass = "active";

    if (eventos === undefined) {
      this.eventos = ["click", "touchstart"];
    } else {
      this.eventos = eventos;
    }

    //bind
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu(event) {
    event.preventDefault(); //para n acionar duplo clique por contas dos dois eventos passados
    this.menuButton.classList.add(this.activeClass);
    this.menuList.classList.add(this.activeClass);
    outsideClick(this.menuList, this.eventos, () => {
      this.menuButton.classList.remove(this.activeClass);
      this.menuList.classList.remove(this.activeClass);
    });
  }

  addMenuMobile() {
    this.eventos.forEach((e) => {
      this.menuButton.addEventListener(e, this.openMenu);
    });
  }

  init() {
    if (this.menuButton && this.menuList) {
      this.addMenuMobile();
    }
  }
}

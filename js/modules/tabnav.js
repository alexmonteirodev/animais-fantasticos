//navegação por tabs: (interação entre fotos e conteúdo)
export default function initTabNav() {
  //essa função serve para isolar o escopo
  const tabMenu = document.querySelectorAll('[data-tab="menu"] li');
  const tabContent = document.querySelectorAll('[data-tab="content"] section');

  function activeTab(index) {
    tabContent.forEach((params) => {
      params.classList.remove("ativo");
    });
    const direcao = tabContent[index].dataset.anime;
    tabContent[index].classList.add("ativo", direcao);
  }

  if (tabMenu.length && tabContent.length) {
    //if para confirmar se o item selecionado (.js-tabcontent section) existe = !!tabMenu.length = true && !!tabContent.length = true porque sao numeros maiores que 0 (0 = false)

    tabMenu.forEach((img, index) => {
      //console.log(img, index)
      img.addEventListener("click", function name(params) {
        activeTab(index);
      });
      //o problema é que após isso, ao abrir a pagina o conteudo esta em branco e para deixar um texto inicial da raposa basta adicionar a class ativo na section da raposa ou fazer por js da seguinte forma:
      tabContent[0].classList.add("ativo");
    });
  }
}

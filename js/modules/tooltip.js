export default function tooltip(params) {
  //selecionando tooltip:
  const tooltips = document.querySelectorAll("[data-tooltip]");
  // console.log(tooltips)

  tooltips.forEach((item) => {
    item.addEventListener("mouseover", onMouseOver);
  });
  //-------------------------------------------------------------------------------------------------------

  //função de entrada do mouse para tooltip: (e mouse move na linha 23)
  function onMouseOver(e) {
    const tooltipBox = criarTooltipBox(this); //this faz referencia ao params do criarTooltipBox que é onde o evento onMouseOver ocorre
    //console.log(e)
    // tooltipBox.style.top = e.pageY + 'px' //+px pq o page retorna valor inteiro e no css tem que dar em px
    // tooltipBox.style.left = e.pageX + 'px'

    this.addEventListener("mouseleave", onMouseLeave);
    onMouseLeave.tooltipBox = tooltipBox;
    onMouseLeave.element = this; //no inspecionar, aba elements e depois event listners ao selecionar o mapa ele add o evento leave quando o mouse sai da div mas para que ele remova esse evento depois para que ele não fique mais lá, removemos ele com o element no objeto onMouseLeave (metodo handleEvent). Isso serve para otimizar o código
    this.addEventListener("mousemove", onMouseMove);
    onMouseMove.tooltipBox = tooltipBox;
  }

  // function onMouseLeave(params) {
  //     tooltipBox.remove()
  // }
  //pra funcionar, essa função teria que estar no escopo da function onMouseOver, mas tem um macete para não ter que por a função lá dentro e deixar o código mais organizado:

  // no addeventlistner pode passar ao inves da funcão (onMouseLeave) pode passar um objeto DESDE QUE tenha um método dentro dele que chame handleEvent, ou seja, quando passar o objeto ele vai ativar esse método

  //logo, temos (basicamente estamos passando os objetos a seguir como callback no lugar da função em addeventlistener):

  const onMouseLeave = {
    tooltipBox: "",
    element: "",
    handleEvent() {
      this.tooltipBox.remove(); //this faz referencia a tooltipbox da linha 19
      this.element.removeEventListener("mouseleave", onMouseLeave);
      this.element.removeEventListener("mousemove", onMouseMove);
    },
  };

  const onMouseMove = {
    //não é necessário criar a propriedade tooltipBox (deixei no onMouseLeave pra ficar melhor de entender)
    handleEvent(e) {
      this.tooltipBox.style.top = e.pageY + 20 + "px"; //o +20 é pra tooltip não ficar piscando porque ele indentifica que o mouse saiu da caixa que ele está no evento e com mais 20 se add mais 20 px a essa caixa e cria uma area de circulacão. Observe que se tirar o 20 a tooltip começa exatamente na ponta do mouse e com os 20 ela começa 20px abaixo da ponta
      this.tooltipBox.style.left = e.pageX + 20 + "px";
    },
  };
  //-------------------------------------------------------------------------------------------------------

  //criando tooltipbox:

  function criarTooltipBox(params) {
    const tooltipBox = document.createElement("div");
    const text = params.getAttribute("aria-label"); //puxa o texto do elemento que ta passsando o mouse por cima
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox); //add no html
    return tooltipBox;
    //console.log(tooltipBox) //toda vez que passa mouse no mapa cria uma div com class tooltip e com texto dentro
  }
}

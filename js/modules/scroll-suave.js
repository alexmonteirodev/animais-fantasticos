//scroll suave link interno (ao clicar no link interno da pagina (exemplo: a href="#contato"), o scroll desce suavemente até o ponto desejado):
export default class ScrollSuave {
  constructor(links, options){
    this.linksInternos = document.querySelectorAll(links);
    if (options === undefined) { //caso não usuario não passe as opções
      this.options = {behavior: 'smooth', block: 'start'};
    } else { // caso passe, serão as que ele definir
      this.options = options;
    }

    this.scrollToSection = this.scrollToSection.bind(); //bind serve para definir qual vai ser o this dessa function. geralmente o pessoal faz isso para poder usar depois como callback
  }

  scrollToSection(e) {
    e.preventDefault(); //previne movimento padrao do link interno de levar a seção
    const href = e.currentTarget.getAttribute("href"); //seleciona atributo do href que foi clicado
    const section = document.querySelector(href); //linkou href com a section
    section.scrollIntoView(this.options);
  }

  addLinkEvent(){
    this.linksInternos.forEach((params) => {
      params.addEventListener("click", this.scrollToSection); //poderia passar arrow pra furar o escopo e buscar a referencia de antes de link, mas perderia a referencia dela por ser anonima.
    });
  }

  init(){
    if (this.linksInternos.length) {
    this.addLinkEvent();
    }
    return this; //sempre importante retornar o this para linkar outras propriedades no script.js, ex: scrollSuave.init().outrapropriedade
  }
}

//accordion list(faq, interação entre pergunta e resposta):
export default class Accordion {
  constructor(list){
    this.accordionList = document.querySelectorAll(list)
    this.activeClass = 'ativo'
  }

  toggleAccordion(item) {
    item.classList.toggle(this.activeClass); //toggle = se n tem, add e se tem, remove
    item.nextElementSibling.classList.toggle(this.activeClass); //this = dt, ou seja, o params acima
  }
//adciona os eventos ao accordion
  addAccordionEvent(){
    this.accordionList.forEach((item) => {
      item.addEventListener("click", () => this.toggleAccordion(item));
    });
  }

  init(){
    if (this.accordionList.length) {
      this.toggleAccordion(this.accordionList[0]); //ativa primeiro item
      this.addAccordionEvent();
    }
    return this;
  }
}

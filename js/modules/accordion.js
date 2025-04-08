//accordion list(faq, interação entre pergunta e resposta):
export default function accordionList() {
  const faqQuestion = document.querySelectorAll('[data-anime="accordion"] dt');
  const faqAnswer = document.querySelectorAll('[data-anime="accordion"] dd');
  const activeClass = "ativo"; //como se fosse um root para mudar no futuro caso seja necessario

  function questionclick() {
    this.classList.toggle(activeClass); //toggle = se n tem, add e se tem, remove
    this.nextElementSibling.classList.toggle(activeClass); //this = dt, ou seja, o params acima
  }

  if (faqQuestion.length) {
    //só se existir item de lista que vai ativar tudo ou seja, se faqQuestion.length > 0 (0 é false). Verificar se isso existe porque caso não exista, vai dar erro dpois por conta das functions.

    faqQuestion[0].classList.add(activeClass); //deixar o primeiro item ativo para usuario ver
    faqAnswer[0].classList.add(activeClass);

    faqQuestion.forEach((params) => {
      params.addEventListener("click", questionclick);
    });
  }
}

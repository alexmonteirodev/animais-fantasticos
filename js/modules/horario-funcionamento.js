export default class Funcionamento {
  constructor(funcionamento, activeClass) {
    this.funcionamento = document.querySelector(funcionamento);
    this.activeClass = activeClass;
  }

  dadosFuncionamento() {
    this.diasSemana = this.funcionamento.dataset.semana.split(",").map(Number);
    this.horarioSemaana = this.funcionamento.dataset.horario
      .split(",")
      .map(Number);
  }

  dadosAgora() {
    this.dataAgora = new Date();
    this.diaAgora = this.dataAgora.getDay();
    this.horarioAgora = this.dataAgora.getUTCHours() - 3; //hora do brasil é UTC - 3
  }

  estaAberto() {
    const semanaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;

    const horarioAberto =
      this.horarioAgora >= this.horarioSemaana[0] &&
      this.horarioAgora < this.horarioSemaana[1]
        ? true
        : false;

    return semanaAberto && horarioAberto; //retorna true se ambos forem verdadeiros
  }

  ativaAberto() {
    if (this.estaAberto()) {
      this.funcionamento.classList.add(this.activeClass);
    }
  }

  init() {
    if (this.funcionamento) {
      //funcionamento vem de querySelector e não querySelectorAll, então não precisa de .length
      this.dadosFuncionamento();
      this.dadosAgora();
      this.ativaAberto();
    }
    return this;
  }
}

//const funcionamentoHorario = document.querySelector("[data-horario]");

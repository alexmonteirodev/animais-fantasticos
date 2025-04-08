export default function initAnimaNumeros(params) {
  function animaNumeros(params) {
    const numeros = document.querySelectorAll("[data-numero]");

    numeros.forEach((params) => {
      const total = +params.innerText;

      const incremento = Math.floor(total / 100); //floor serve para arredondar os numeros para inteiros

      let start = 0;
      const timer = setInterval(() => {
        //repare que a arrow, fura o escopo e busca o params do forEach
        start += incremento; //start = start + incremento
        params.innerText = start; //para mostrar na pagina e não no console
        if (start > total) {
          params.innerText = total; //pq no  if (start > total) pelo incremento o numero passa então, isso serve para ele voltar ao numero correto
          clearInterval(timer);
        }
      }, 25 * Math.random()); //serve para cada numero terminar um pouco antes de forma randomica (fica mais organico e não parece uma maquina)
    });
  }
  // a animação dos numeros não espera o scroll da pagina e para recolver isso: quando a seção mudar o atributo, para ocorrer algo, vou add um observador de mutações porque quando isso ocorrer ele dispara a animação dos numeros:

  const observerTarget = document.querySelector(".numeros");

  const observer = new MutationObserver(handleMutation);

  observer.observe(observerTarget, { attributes: true });

  function handleMutation(mutation) {
    //para ativar quando tiver a mutação
    //console.log('mudou')       //mudança no scrol-animacao.js pq ele remove ativo toda hora
    //console.log(mutation[0]) // acessando a mutação 0 que é a unica (atributos) - console.log(mutation)
    //console.log(mutation[0].target.classList.contains('ativo'))

    if (mutation[0].target.classList.contains("ativo")) {
      observer.disconnect(); //para não resetar toda hora que der scroll
      animaNumeros();
    }
  }
}

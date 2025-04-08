// refatorando código transformando function em class

//fizemos isso para que as funções pudessem ser reaproveitas por alguém em outro código, usando o construtor, a pessoa basta criar um novo objeto.

// Para isso tem a estrutura que deve ser seguida:
// 1 - troca o function por class e tira os ()
// 2 - add o construtor e coloca os querySelectors dentro das {}
// 3 - passa as consts selecionadas pelos queryselectors como parametro
// 4 - substitui o const por this e passa o paremetro no seletor
// 5 - substitui as consts que tinha antes pelo código pelo novo this.antigaconst
// 6 - cria a nova propriedade do objeto que vai fazer funcionar o método do objeto (init)
// 7 -  tira as functions porque agora não vai ser function e sim uma propriedade de objeto (método)
// 8 - cria o metodo de adicionar o evento (addTabNavEvent)
// 9 - faz a verificação do if no init pro código só rodar se for ser usado (se tiver legth)

//Ex:

// Antes:

// export default function initTabNav() {
//     //essa função serve para isolar o escopo
//     const tabMenu = document.querySelectorAll('[data-tab="menu"] li');
//     const tabContent = document.querySelectorAll('[data-tab="content"] section');

//     function activeTab(index) {
//       tabContent.forEach((params) => {
//         params.classList.remove("ativo");
//       });
//       const direcao = tabContent[index].dataset.anime;
//       tabContent[index].classList.add("ativo", direcao);
//     }

//     if (tabMenu.length && tabContent.length) {
//       //if para confirmar se o item selecionado (.js-tabcontent section) existe = !!tabMenu.length = true && !!tabContent.length = true porque sao numeros maiores que 0 (0 = false)

//       tabMenu.forEach((img, index) => {
//         //console.log(img, index)
//         img.addEventListener("click", function name(params) {
//           activeTab(index);
//         });
//         //o problema é que após isso, ao abrir a pagina o conteudo esta em branco e para deixar um texto inicial da raposa basta adicionar a class ativo na section da raposa ou fazer por js da seguinte forma:
//         tabContent[0].classList.add("ativo");
//       });
//     }
//   }

//Depois:

// export default class TabNav {
//     constructor(menu, conteudo) {
//       this.tabMenu = document.querySelectorAll(menu);
//       this.tabContent = document.querySelectorAll(conteudo);
//       this.activeClass = "ativo";
//     }
//     //ativa a tab de acordo com o index da mesma
//     activeTab(index) {
//       this.tabContent.forEach((params) => {
//         params.classList.remove(this.activeClass);
//       });
//       const direcao = this.tabContent[index].dataset.anime;
//       this.tabContent[index].classList.add(this.activeClass, direcao);
//     }

//     //adiciona os eventos nas tabs
//     addTabNavEvent() {
//       this.tabMenu.forEach((img, index) => {
//         img.addEventListener("click", () => this.activeTab(index));
//       });
//     }

//     init() {
//       if (this.tabMenu.length && this.tabContent.length) {
//         this.activeTab([0]); //ativa o primeiro item
//         this.addTabNavEvent();
//       }
//     }
//   }

//essa aula é a de refatorar tabnav - 1104;

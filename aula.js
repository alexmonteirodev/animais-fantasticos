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

//Depois:

//essa aula é a de refatorar tabnav - 1104;

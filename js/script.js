// obs: (a ordem de execução importa)
import ScrollSuave from "./modules/scroll-suave.js";
const options = {
    behavior: 'smooth',
    block: 'start'
};
const scrollSuave = new ScrollSuave('[data-menu="suave"] a[href^="#"]', options);
scrollSuave.init();

import Accordion from "./modules/accordion.js";
const accordion = new Accordion('[data-anime="accordion"] dt');
accordion.init();

import initTabNav from "./modules/tabnav.js";
initTabNav();

import initModal from "./modules/modal.js";
initModal();

import tooltip from "./modules/tooltip.js";
tooltip();

import dropdown from "./modules/dropdown-menu.js";
dropdown();

import initMenuMobile from "./modules/menu-mobile.js";
initMenuMobile();

import initFuncionamento from "./modules/horario-funcionamento.js";
initFuncionamento();

import initFetchAnimais from "./modules/fetch-animais.js";
initFetchAnimais();

import initFetchBitcoin from "./modules/fetch-bitcoin.js";
initFetchBitcoin();

import initAnimacaoScroll from "./modules/scroll-animacao.js";
initAnimacaoScroll();

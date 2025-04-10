// obs: (a ordem de execução importa)
import ScrollSuave from "./modules/scroll-suave.js";
const options = {
  behavior: "smooth",
  block: "start",
};
const scrollSuave = new ScrollSuave(
  '[data-menu="suave"] a[href^="#"]',
  options
);
scrollSuave.init();

import Accordion from "./modules/accordion.js";
const accordion = new Accordion('[data-anime="accordion"] dt');
accordion.init();

import TabNav from "./modules/tabnav.js";
const tabNav = new TabNav(
  '[data-tab="menu"] li',
  '[data-tab="content"] section'
);
tabNav.init();

import Modal from "./modules/modal.js";
const modal = new Modal(
  '[data-modal="abrir"]',
  '[data-modal="fechar"]',
  '[data-modal="container"]'
);
modal.init();

import Tooltip from "./modules/tooltip.js";
const tooltip = new Tooltip("[data-tooltip]");
tooltip.init();

import DropdownMenu from "./modules/dropdown-menu.js";
const dropdownMenu = new DropdownMenu("[data-dropdown]");
dropdownMenu.init();

import MenuMobile from "./modules/menu-mobile.js";
const menuMobile = new MenuMobile('[data-menu="button"]', '[data-menu="list"]');
menuMobile.init();

import Funcionamento from "./modules/horario-funcionamento.js";
const funcionamento = new Funcionamento("[data-semana]", "aberto");
funcionamento.init();

import fetchAnimais from "./modules/fetch-animais.js";
fetchAnimais("./animaisapi.json", ".numeros-grid"); // ./ pq ao dar o build o webpack puxa pra pasta main e não ../../

import fetchBitcoin from "./modules/fetch-bitcoin.js";
fetchBitcoin("https://blockchain.info/ticker", ".btc-preco");

import ScrollAnima from "./modules/scroll-anima.js";
const scrollAnima = new ScrollAnima('[data-anime="scroll"]');
scrollAnima.init();

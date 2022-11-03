"use strict";

import { removeAllClasses, bodyLock } from "./utils/functions.js";
import DismalModules, { acc } from "./utils/modules.js";

import "./unstable/formich.js";
import Swiper, { Navigation, Autoplay, Pagination } from "swiper";
import "./unstable/burger.js";

/**
 * Poppa
 */
import "./poppa.js";

/**
 * Lazy Load
 */
import "./libs/lazyload.min.js";
let lazyLoadInstance = new LazyLoad();

/**
 * Dropdown Select
 */
import Choices from "choices.js";
// import "./libs/custom-select.min.js";
if (document.querySelector(".select")) {
  // customSelect(".input--dropdown .input__select");
  const dropdowns = document.querySelectorAll(".select");
  dropdowns.forEach((dropdown) => {
    const choices = new Choices(dropdown.querySelector(".select__input"), {
      searchPlaceholderValue: "Населённый пункт",
      noResultsText: "Нет результатов",
      classNames: {
        containerOuter: "select",
        input: "select__input",
        inputCloned: "select__input--cloned",
        list: "select__list",
        listItems: "select__list--multiple",
        listSingle: "select__list--single",
        listDropdown: "select__list--dropdown",
        item: "select__item",
        itemSelectable: "select__item--selectable",
        itemDisabled: "select__item--disabled",
        itemChoice: "select__item--choice",
        placeholder: "select__placeholder",
        group: "select__group",
        groupHeading: "select__heading",
        button: "select__button",
        activeState: "is-active",
        focusState: "is-focused",
        openState: "is-open",
        disabledState: "is-disabled",
        highlightedState: "is-highlighted",
        selectedState: "is-selected",
        flippedState: "is-flipped",
        loadingState: "is-loading",
        noResults: "has-no-results",
        noChoices: "has-no-choices",
      },
    });
  });
}

const headerSnacksContainer = document.querySelector(".header__snacks");
const headerPickers = document.querySelectorAll(".header__picker");
headerPickers.forEach((picker) => {
  picker.addEventListener("click", () => {
    const snackName = picker.dataset.snack;
    if (!snackName) return;

    headerSnacksContainer.classList.add("header__snacks--show");

    document.querySelectorAll(".header-snack").forEach((snack) => {
      if (snack.dataset.snack === snackName) return;
      snack.classList.remove("header-snack--visible");
    });

    document
      .querySelector(`.header-snack[data-snack="${snackName}"]`)
      .classList.add("header-snack--visible");
  });
});
const headerSnacks = document.querySelectorAll(".header-snack");
headerSnacks.forEach((snack) => {
  const closer = snack.querySelector(".header-snack__close");
  closer.addEventListener("click", () => {
    snack.classList.remove("header-snack--visible");
    headerSnacksContainer.classList.remove("header__snacks--show");
  });
});
window.addEventListener("scroll", () => {
  if (headerSnacksContainer.classList.contains("header__snacks--show")) {
    headerSnacksContainer.classList.remove("header__snacks--show");
  }
});

// import "./unstable/tabs.js";

/**
 * Smooth anchors
 */
import "./utils/smooth-anchors.js";

let promoSlider = new Swiper(".promo-carousel", {
  modules: [Navigation, Autoplay, Pagination],
  autoplay: {
    delay: 3000,
  },
  // grabCursor: true,
  // effect: 'creative',
  // creativeEffect: {
  // prev: {
  //   shadow: false,
  //   translate: [0, 0, -400],
  // },
  // next: {
  //   translate: ['100%', 0, 0],
  // },
  // },
  pagination: {
    el: ".promo-carousel__pagination",
    clickable: true,
  },
});

// Аккордеон
// const accordions = new DismalModules.Accordions()

// Модальные окна
// const modals = new DismalModules.Modals()

// Табы
// DismalModules.tabs()

// Плейсхолдер текстовых полей
// DismalModules.labelTextfield()

// Списки выбора
// DismalModules.select()

// Кнопка "Наверх"
// DismalModules.arrowUp()

// Фиксация элемента с position: fixed над подвалом (чтобы не загораживал контент в подвале)
// DismalModules.fixElemOverFooter()

// Только цифры и точка в инпутах
// DismalModules.onlyDigit()

function s() {
  var s = {};
  onkeydown = onkeyup = function (t) {
    if (
      ((t = t || event),
      (s[t.keyCode] = "keydown" == t.type),
      s[16] && s[17] && s[18] && s[68])
    ) {
      if (!document.querySelector(".s8")) {
        const e = document.createElement("div");
        e.classList.add("s8"),
          (e.innerHTML =
            '<style>.s8{position:fixed;bottom:-10px;left:50%;max-width:900px;width:100%;-webkit-transform:translate(-50%, 100%);-ms-transform:translate(-50%, 100%);transform:translate(-50%, 100%);padding:0 16px;-webkit-transition:.4s;-o-transition:.4s;transition:.4s;z-index:10000}.s8.s9{bottom:24px;-webkit-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}.s10{padding:12px 24px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-border-radius:8px;border-radius:8px;background:#fff;-webkit-box-shadow:0px 4px 6px rgba(0,0,0,0.1);box-shadow:0px 4px 6px rgba(0,0,0,0.1)}.s11{font-size:14px;line-height:1.4;color:#333;opacity:.7}.s11 span{font-weight:600}.s11 a{color:inherit;text-decoration:underline;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s11 a:hover{color:#009E74}.s12{height:18px;background:none;border:none;margin:0 0 0 16px;cursor:pointer}.s12 svg path,.s12 svg rect{-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s12:hover svg path{fill-opacity:.4}.s12:hover svg rect{stroke-opacity:.4}.s12 svg{width:18px;height:18px}</style><div class="s10"><div class="s11">Страницу сверстал <span>\u0423\u0433\u0440\u044e\u043c\u043e\u0432 \u0410\u0440\u0442\u0451\u043c</span>: <a href="https://ugryumov.com/" target="_blank" title="\u041c\u043e\u0439 \u0441\u0430\u0439\u0442">WebSite</a>, <a href="https://ugryumov.com/contacts/telegram" target="_blank" title="\u041c\u043e\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c">Telegram</a>, <a href="https://ugryumov.com/contacts/vk" target="_blank" title="\u042f \u0432\u043e \u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435">\u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435</a></div><button class="s12"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.75737 5.818L5.81803 4.75734L8.99999 7.9393L12.182 4.75732L13.2426 5.81798L10.0607 8.99996L13.2427 12.182L12.182 13.2426L8.99999 10.0606L5.81801 13.2426L4.75735 12.1819L7.93933 8.99996L4.75737 5.818Z" fill="#333333" fill-opacity="0.6"/><rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#333333" stroke-opacity="0.6"/></svg></button></div>'),
          document.querySelector("body").append(e);
      }
      setTimeout(() => {
        const t = document.querySelector(".s8"),
          e = t.querySelector(".s12");
        t.classList.toggle("s9"),
          e.addEventListener("click", () => {
            t.classList.remove("s9");
          });
      }, 1);
    }
  };
}
s();

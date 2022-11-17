"use strict";

import { removeAllClasses, bodyLock } from "./utils/functions.js";
import DismalModules, { acc } from "./utils/modules.js";

import "./unstable/inputster/formich.js";
import Swiper, { Navigation, Autoplay, Pagination } from "swiper";
import "./unstable/burger.js";


/**
 * Textarea resize
 */
const textareas = document.querySelectorAll('.textarea');

function createResizer(area) {
  const resizer = document.createElement('div');
  resizer.classList.add('textarea__resizer');
  area.appendChild(resizer);

  return {
    resizer,
    width: area.getBoundingClientRect().width,
    height: area.getBoundingClientRect().height,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
  }
}
textareas.forEach(area => {
  let {resizer, width, height, y, dy} = createResizer(area);
  area.dataset.initialHeight = height;

  let startResize = function(evt) {
    // x = evt.screenX;
    y = evt.screenY;
  };

  let resize = function(evt) {
    // dx = x - evt.screenX;
    dy = y - evt.screenY;
    // x = evt.screenX;
    y = evt.screenY;
    // width += dx;
    height -= dy;
    // area.style.width = width + "px";
    area.style.height = height + "px";
  };

  resizer.addEventListener("mousedown", function(evt) {
    startResize(evt);
    document.body.addEventListener("mousemove", resize);
    document.body.addEventListener("mouseup", function() {
      document.body.removeEventListener("mousemove", resize);
    });
  });
});


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
 * header__controls
 */

 const minicart = document.querySelector('.minicart');
 const buttonCart = document.querySelector('.button-cart');
const miniAuth = document.querySelector('.auth');
const buttonAuth = document.querySelector('.button-auth');

 buttonCart.addEventListener('click', () => {
  buttonCart.parentElement.querySelector('.minicart').classList.toggle('minicart--visible')

  buttonAuth.parentElement.querySelector('.auth').classList.remove('auth--visible')
 })
 minicart.querySelector('.minicart__content').addEventListener('scroll', (e) => {
  const yOffset = e.target.scrollTop;
  if (yOffset > 20) {
    e.target.classList.add('minicart__content--scrolled')
  } else {
    e.target.classList.remove('minicart__content--scrolled')
  }
 })


  buttonAuth.addEventListener('click', () => {
    buttonAuth.parentElement.querySelector('.auth').classList.toggle('auth--visible')
    buttonCart.parentElement.querySelector('.minicart').classList.remove('minicart--visible')
  })

  const authMethodsTogglers = document.querySelectorAll('.auth__button-method-toggler')
  const authFieldsetClass = 'auth__fieldset';
  const authFieldsetClassActive = 'auth__fieldset--visible';
  authMethodsTogglers.forEach(button => {
    button.addEventListener('click', () => {
      const toggleName = button.dataset.toggler;
      // const activeToggler = document.querySelector(`.${authFieldsetClass}[data-toggler="${toggleName}"]`);
      document.querySelectorAll(`.${authFieldsetClass}`).forEach(fieldset => {
        if (fieldset.dataset.toggler != toggleName) {
          fieldset.classList.remove(authFieldsetClassActive)
        } else {
          fieldset.classList.add(authFieldsetClassActive)
        }
      })
    })
  })

  const authTabsTogglers = document.querySelectorAll('.auth__tabs .tabs__toggler')
  const authTabsPages = document.querySelectorAll('.auth__tabs .tabs__page')
  authTabsTogglers.forEach((toggler, togglerIndex) => {
    toggler.addEventListener('click', () => {
      authTabsPages.forEach((page, pageIndex) => {
        page.querySelectorAll(`.${authFieldsetClass}`).forEach(fieldset => {
          fieldset.classList.remove(authFieldsetClassActive)
        })
        page.querySelector(`.${authFieldsetClass}`).classList.add(authFieldsetClassActive)
      })
    })
  })

  window.addEventListener('scroll', () => {
    minicart.classList.remove('minicart--visible')
    miniAuth.classList.remove('auth--visible')
  })


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

const SNACKS_SHOW_CLASS = 'header__snacks--show';
const SNACK_VISIBLE_CLASS = 'header-snack--visible';
const headerSnacksContainer = document.querySelector(".header__snacks");

function closeSnack(currentSnack) {
    headerSnacksContainer.classList.remove(SNACKS_SHOW_CLASS);
    if (currentSnack) currentSnack.classList.remove(SNACK_VISIBLE_CLASS);
}
function openSnack(currentSnack) {
    headerSnacksContainer.classList.add(SNACKS_SHOW_CLASS);
    currentSnack.classList.add(SNACK_VISIBLE_CLASS);

    document.querySelectorAll(".header-snack").forEach((snack) => {
      if (snack.dataset.snack === currentSnack.dataset.snack) return;
      snack.classList.remove(SNACK_VISIBLE_CLASS);
    });
}
function toggleSnackVisibility(snackName) {
  const currentSnack = document.querySelector(`.header-snack[data-snack="${snackName}"]`)
  if (currentSnack.classList.contains(SNACK_VISIBLE_CLASS)) {
    closeSnack(currentSnack);
  } else {
    openSnack(currentSnack)
  }
}

const headerPickers = document.querySelectorAll(".header__picker");
headerPickers.forEach((picker) => {
  picker.addEventListener("click", () => {
    const snackName = picker.dataset.snack;
    if (!snackName) return;

    toggleSnackVisibility(snackName)
  });
});

const cartCityPicker = document.querySelector('.cart-total__city-picker')
if (cartCityPicker) {
  cartCityPicker.addEventListener('click', (e) => {
    window.scroll({
        top: 0,
        left: 0,
        // behavior: 'smooth'
    });
    setTimeout(() => {
      toggleSnackVisibility('city')
    }, 300)
  })
}

const headerSnacks = document.querySelectorAll(".header-snack");
headerSnacks.forEach((snack) => {
  const closer = snack.querySelector(".header-snack__close");
  closer.addEventListener("click", () => {
    closeSnack(snack)
  });
});
window.addEventListener("scroll", () => {
  if (headerSnacksContainer.classList.contains(SNACKS_SHOW_CLASS)) {
    closeSnack();
  }
});

document.getElementById("dropdown-city").addEventListener("change", (e) => {
  document.querySelector(".header__geo .header__picker-text").innerText =
    e.target.value;
});

import "./unstable/tabs.js";

/**
 * Smooth anchors
 */
import "./utils/smooth-anchors.js";

if (document.querySelector('.promo-carousel')) {
  let promoSlider = new Swiper(".promo-carousel", {
    modules: [Navigation, Autoplay, Pagination],
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".promo-carousel__pagination",
      clickable: true,
    },
  });
}


const CHANGES_CASE_CARD_CAROUSEL = 'changes-case-card-carousel'
if (document.querySelector(`.${CHANGES_CASE_CARD_CAROUSEL}`)) {
  const carousels = document.querySelectorAll(`.${CHANGES_CASE_CARD_CAROUSEL}`);

  carousels.forEach((carousel, index) => {
    carousel.setAttribute('id', `${CHANGES_CASE_CARD_CAROUSEL}-${index}`);
  })
  carousels.forEach((carousel, index) => {
    new Swiper(`#${CHANGES_CASE_CARD_CAROUSEL}-${index}`, {
      modules: [Navigation, Autoplay, Pagination],
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: `#${CHANGES_CASE_CARD_CAROUSEL}-${index} .swiper-button-next`,
        prevEl: `#${CHANGES_CASE_CARD_CAROUSEL}-${index} .swiper-button-prev`,
      },
    });
  })
}

if (document.querySelector('.grabber-carousel')) {
let promoSlider = new Swiper(".grabber-carousel", {
  grabCursor: true,
  slidesPerView: 2.5,
  spaceBetween: 8,
  // cssMode: true,
  // freeMode: true,
  // centeredSlides: true,
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
});
}

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

// function s() {
//   var s = {};
//   onkeydown = onkeyup = function (t) {
//     if (
//       ((t = t || event),
//       (s[t.keyCode] = "keydown" == t.type),
//       s[16] && s[17] && s[18] && s[68])
//     ) {
//       if (!document.querySelector(".s8")) {
//         const e = document.createElement("div");
//         e.classList.add("s8"),
//           (e.innerHTML =
//             '<style>.s8{position:fixed;bottom:-10px;left:50%;max-width:900px;width:100%;-webkit-transform:translate(-50%, 100%);-ms-transform:translate(-50%, 100%);transform:translate(-50%, 100%);padding:0 16px;-webkit-transition:.4s;-o-transition:.4s;transition:.4s;z-index:10000}.s8.s9{bottom:24px;-webkit-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}.s10{padding:12px 24px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-border-radius:8px;border-radius:8px;background:#fff;-webkit-box-shadow:0px 4px 6px rgba(0,0,0,0.1);box-shadow:0px 4px 6px rgba(0,0,0,0.1)}.s11{font-size:14px;line-height:1.4;color:#333;opacity:.7}.s11 span{font-weight:600}.s11 a{color:inherit;text-decoration:underline;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s11 a:hover{color:#009E74}.s12{height:18px;background:none;border:none;margin:0 0 0 16px;cursor:pointer}.s12 svg path,.s12 svg rect{-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s12:hover svg path{fill-opacity:.4}.s12:hover svg rect{stroke-opacity:.4}.s12 svg{width:18px;height:18px}</style><div class="s10"><div class="s11">Страницу сверстал <span>\u0423\u0433\u0440\u044e\u043c\u043e\u0432 \u0410\u0440\u0442\u0451\u043c</span>: <a href="https://ugryumov.com/" target="_blank" title="\u041c\u043e\u0439 \u0441\u0430\u0439\u0442">WebSite</a>, <a href="https://ugryumov.com/contacts/telegram" target="_blank" title="\u041c\u043e\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c">Telegram</a>, <a href="https://ugryumov.com/contacts/vk" target="_blank" title="\u042f \u0432\u043e \u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435">\u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435</a></div><button class="s12"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.75737 5.818L5.81803 4.75734L8.99999 7.9393L12.182 4.75732L13.2426 5.81798L10.0607 8.99996L13.2427 12.182L12.182 13.2426L8.99999 10.0606L5.81801 13.2426L4.75735 12.1819L7.93933 8.99996L4.75737 5.818Z" fill="#333333" fill-opacity="0.6"/><rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#333333" stroke-opacity="0.6"/></svg></button></div>'),
//           document.querySelector("body").append(e);
//       }
//       setTimeout(() => {
//         const t = document.querySelector(".s8"),
//           e = t.querySelector(".s12");
//         t.classList.toggle("s9"),
//           e.addEventListener("click", () => {
//             t.classList.remove("s9");
//           });
//       }, 1);
//     }
//   };
// }
// s();

/**
 * Stores
 */
const storesCards = document.querySelectorAll('.stores-list-card');
const mapIframe = document.querySelector('.stores__map-frame');
const storeDetails = document.querySelector('.stores__details');
const storeList = document.querySelector('.stores__list');
const storeMenu = document.querySelector('.stores__menu');
const showListButton = document.querySelector('.stores__details-show-list');
const SHOW_DETAILS_CLASS = 'stores__menu--show-details';

if (storesCards) {
  function showDetails(details) {
    const {name, info, map} = details
    storeMenu.classList.add(SHOW_DETAILS_CLASS)

    storeDetails.querySelector('.stores__details-title').innerHTML = name;
    storeDetails.querySelector('.stores__details-info').innerHTML = info;
    mapIframe.src = map;
  }
  function showList() {
    storeMenu.classList.remove(SHOW_DETAILS_CLASS)
    mapIframe.src = mapIframe.dataset.mapAll;
  }
  function getStoreDetails(card) {
    return {
      name: card.querySelector('.stores-list-card__name').innerHTML,
      info: card.querySelector('.stores-list-card__info').innerHTML,
      map: card.dataset.map
    }
  }

  storesCards.forEach(card => {
    const cardName = card.querySelector('.stores-list-card__name');
    cardName.addEventListener('click', () => {
      const storeInfo = getStoreDetails(card);
      showDetails(storeInfo);
    })
  })

  if (showListButton) {
    showListButton.addEventListener('click', () => {
      showList()
    })
  }
}


function initAccordionGallery() {
  const GALLERY_INITIAL_SHOW = 3; // or data-start-show attr of gallerySelector
  const GALLERY_ITEM_VISIBLE_CLASS = 'gallery-accordion__item--visible';
  const GALLERY_BUTTON_HIDDEN_CLASS = 'gallery-accordion__button-more--hidden'
  const galleries = [...document.querySelectorAll('.gallery-accordion')];

  if (galleries) {
    galleries.forEach(gallery => {
      const cards = gallery.querySelectorAll('.gallery-accordion__item')
      const expandButton = gallery.querySelector('.gallery-accordion__button-more');
      const initialShow = gallery.dataset.startShow || GALLERY_INITIAL_SHOW;

      cards.forEach((card, index) => {
        if (index < initialShow) {
            card.classList.add(GALLERY_ITEM_VISIBLE_CLASS);
        } else {
            setTimeout(() => {
              card.style.display = 'none';
            }, 100)
        }
      })
      if (!expandButton) return;

      expandButton.addEventListener('click', () => {
        expandButton.classList.add(GALLERY_BUTTON_HIDDEN_CLASS);
        setTimeout(() => {
          expandButton.style.display = 'none';
        }, 100)
        cards.forEach(card => {
            card.style.display = '';
            setTimeout(() => {
              card.classList.add(GALLERY_ITEM_VISIBLE_CLASS);
            }, 100)
        })
      })

      if ([...cards].length <= initialShow) {
        expandButton.classList.add(GALLERY_BUTTON_HIDDEN_CLASS);
        setTimeout(() => {
          expandButton.style.display = 'none';
        }, 100)
      }
    })
  }
}
initAccordionGallery()


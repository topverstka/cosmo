"use strict";

import { removeAllClasses, bodyLock } from "./utils/functions.js";
import DismalModules, { acc } from "./utils/modules.js";


import "./components/header.js"
import "./components/controls.js"
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";

Fancybox.bind('[data-fancybox]', {
  Toolbar: {
    display: [
      "close",
    ],
  },
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




import "./unstable/tabs.js";

/**
 * Smooth anchors
 */
import "./utils/smooth-anchors.js";

import "./components/carousels.js";

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
      let initialShow = gallery.dataset.startShow || GALLERY_INITIAL_SHOW;
      initialShow = window.innerWidth <= 1024 ? initialShow - 2 : initialShow;
      initialShow = window.innerWidth <= 970 ? initialShow - 1 : initialShow;
      initialShow = initialShow < 2 ? 2 : initialShow;
      if (window.innerWidth <= 768) {
        initialShow = gallery.dataset.startShowMobile ? gallery.dataset.startShowMobile : initialShow;
      }


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


const productAdd = document.querySelectorAll('.product-card__button-add');
const IN_CART_CLASS = "product-card--in-cart";
function cartAdd(product) {
  product.classList.add(IN_CART_CLASS)
}
function cartRemove(product) {
  product.classList.remove(IN_CART_CLASS)
}
productAdd.forEach((button) => {
  button.addEventListener('click', (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    const currentCard = [...path].filter((item) => {
      if (!item.classList) return;
      return item.classList.contains('product-card')
    })[0];

    if (currentCard.classList.contains(IN_CART_CLASS)) {
      cartRemove(currentCard);
    } else {
      cartAdd(currentCard);
    }
  })
})


document.querySelectorAll('.cart-product').forEach(product => {
  const removeButton = product.querySelector('.cart-product__button-remove');
  const returnButton = product.querySelector('.cart-product__button-return');

  removeButton?.addEventListener('click', () => {
    product.classList.add('product-card--removed')
  })
  returnButton?.addEventListener('click', () => {
    product.classList.remove('product-card--removed')
  })
})

/*
  Order cards
*/
const ORDER_CARD_OPENED_CLASS = 'order-history-card--opened'
function openOrderCard(card, toggler) {
  card.classList.add(ORDER_CARD_OPENED_CLASS);
  toggler.innerText = toggler.dataset.textHide;
}
function closeOrderCard(card, toggler) {
  card.classList.remove(ORDER_CARD_OPENED_CLASS)
  toggler.innerText = toggler.dataset.textShow;
}
function toggleOrderCard(card, toggler) {
  if (card.classList.contains(ORDER_CARD_OPENED_CLASS)) {
    closeOrderCard(card, toggler);
  } else {
    openOrderCard(card, toggler);
  }
}
function countHiddenOrderProducts(products) {
  const count = [...products].length;

  let hiddenCount = window.innerWidth > 1200
    ? count - 5
    : count - 3;

 return hiddenCount > 0
  ? hiddenCount
  : false;
}
function updateHiddenOrderProductsCount(card) {
  const plusCard = card.querySelector('.order-history-card__products-more');
  const cardProducts = card.querySelectorAll('.product-card');
  const hiddenProducts = countHiddenOrderProducts(cardProducts)

  if (hiddenProducts) {
    plusCard.style.display = '';
    plusCard.innerHTML = `+${hiddenProducts}`;
  } else {
    plusCard.style.display = 'none'
  }
}
const orderCards = document.querySelectorAll('.order-history-card');
orderCards.forEach(card => {
  const toggler = card.querySelector('.order-history-card__button-more');
  toggler.dataset.textShow = toggler.innerText;
  toggler.addEventListener('click', () =>{
    // card.classList.toggle(ORDER_CARD_OPENED_CLASS);
    toggleOrderCard(card, toggler)
  })
  window.addEventListener('resize', () => {
    updateHiddenOrderProductsCount(card)
  })
  updateHiddenOrderProductsCount(card)

  const plusCard = card.querySelector('.order-history-card__products-more');
  plusCard.addEventListener('click', (e) => {
    toggleOrderCard(card, toggler)
  })
})


const stickyPageHeadings = document.querySelectorAll('.page-heading--sticky');
stickyPageHeadings.forEach((heading) => {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const navbar = heading.querySelector('.page-heading__nav');

    const HEADER_HEIGHT = header.getBoundingClientRect().height;
    const NAVBAR_TOP = navbar.getBoundingClientRect().top;
    const NAVBAR_HEIGHT = navbar.getBoundingClientRect().height;

    const HEADING_HEIGHT = heading.getBoundingClientRect().height;
    const HEADING_OFFSET = HEADER_HEIGHT - (HEADING_HEIGHT - NAVBAR_HEIGHT * 1.5);

    if (NAVBAR_HEIGHT > NAVBAR_TOP - HEADER_HEIGHT) {
      heading.classList.add('page-heading--sticky-run');
      heading.style.top = `${HEADING_OFFSET}px`;
    } else {
      heading.classList.remove('page-heading--sticky-run');
      heading.style.top = '';
    }
  })
})

const dynamicNav = document.querySelector('.nav-dynamic');
const dynamicNavContent = document.querySelector('.nav-dynamic-content');

if (dynamicNav && dynamicNavContent) {
  const dynamicLinks = dynamicNav.querySelectorAll('a');
  const dynamicSections = dynamicNavContent.querySelectorAll('.nav-dynamic-content__section');
  dynamicSections.forEach((section, index, array) => {
    window.addEventListener('scroll', () => {
      const top = section.getBoundingClientRect().top;
      const bottom = section.getBoundingClientRect().bottom;

      function isTopEntered() {
        return top < 100 && top > 0;
      }
      function isBottomEntered() {
        return bottom < 100 && bottom > 0;
      }

      if (isTopEntered() || isBottomEntered()) {
        dynamicLinks.forEach(link => {
          link.classList.remove('page-heading__nav-link--current')
        })
        dynamicNav.querySelector(`a[href="#${section.id}"]`).classList.add('page-heading__nav-link--current')
      }
    })
  })
}

const servicesLeadButton = document.querySelector('.services__sidebar-toggler');
if (servicesLeadButton) {
  servicesLeadButton.addEventListener('click', () => {
    document.querySelector('.services__sidebar').classList.add('services__sidebar--active');
  });
  window.addEventListener('click', (e) => {
    if (!e.target == sideNav || e.target == servicesLeadButton) return;

    document.querySelector('.services__sidebar').classList.remove('services__sidebar--active');
  })
}

const sideNav = document.querySelector('.side-navigation');
if (sideNav) {
  const button = sideNav.querySelector('.side-navigation__button-mobile')
  button?.addEventListener('click', (e) => {
    sideNav.classList.add('side-navigation--visible');
  })
  window.addEventListener('click', (e)=> {
    if (!e.target == sideNav || e.target == button) return;

    sideNav.classList.remove('side-navigation--visible');
  })
}

const captionsMobileFold = document.querySelectorAll('.captions--mobile-fold');
captionsMobileFold.forEach((caption) => {
  const button = caption.querySelector('.captions__button-opener')
  button.addEventListener('click', () => caption.classList.add('.captions--fold-opened'));
})


const cartSidebar = document.querySelector('.cart-sidebar');
const cartColumns = document.querySelector('.cart__columns');
function recalculateCartColumnsBottomGap() {
  if (window.innerWidth <= 1200) {
    const cards = [...cartSidebar.querySelectorAll('.sidebar-card')];
    const GAP = 8;
    let additionalHeight = cards.reduce((accum, card, index) => {
      return accum + card.getBoundingClientRect().height
    }, 0)
    // additionalHeight -= (cards.length - 1) * GAP;
    if (window.innerHeight > 768 && window.innerHeight < 1025) {
      additionalHeight += 30;
    } else {
      additionalHeight -= 20;
    }
    // console.log(additionalHeight)
    cartColumns.style.paddingBottom = `${additionalHeight}px`;
  }
}
if (cartSidebar && cartColumns) {
  window.addEventListener('resize', () => {
    recalculateCartColumnsBottomGap()
  })
  recalculateCartColumnsBottomGap()
}

const rowFilters = document.querySelectorAll('.row-filters__select');
rowFilters.forEach((filter, index, arr) => {
  if (window.innerWidth >= 1024 || filter.parentElement.classList.contains('blog__filters')) {
    filter.style.zIndex = arr.length - index;
  }
})

const filterButton = document.querySelector('.catalog-products__filters-button-mobile');
const filterBlock = document.querySelector('.catalog-products__filters');
const buttonBack = document.querySelector('.catalog-products__filters-back-button')
const FILTER_OPENED_CLASS = 'filters--opened'
if (filterButton && filterBlock) {
  filterButton.addEventListener('click', () => {
    filterBlock.classList.add(FILTER_OPENED_CLASS);
  })
  window.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.contains(filterBlock)) {
      filterBlock.classList.remove(FILTER_OPENED_CLASS);
      return
    }

    if (e.target.contains(filterButton) || e.target.contains(buttonBack)) return;
    
    let isClickBeyondFilters = true;
    const path = e.path || (e.composedPath && e.composedPath());
    const isSelect = path.map((item, index, pathElems) => {

      if (pathElems.length - 4 < index) return;
      if (item.classList.contains('select')) {
        isClickBeyondFilters = false;
      }
    })

    if (e.target.classList.contains('row-filters')) {
      isClickBeyondFilters = true;
    }

    if (isClickBeyondFilters) {
      filterBlock.classList.remove(FILTER_OPENED_CLASS);
    }
  })
}


/*
 * Spoilers
 * Добавь для .doc модификатор doc--has-spoilers
 */
const SPOILER_HEIGHT_BREAKPOINT = 180;
const SPOILER_MINIFIED_CLASS = 'doc-card__desc--minified';
window.addEventListener('DOMContentLoaded', (event) => {
  const spoilerDocs = document.querySelectorAll('.doc--has-spoilers');
  spoilerDocs.forEach((doc) => {
    const docsDesc = doc.querySelectorAll('.doc-card__desc');
    docsDesc.forEach((desc) => {
      const height = desc.getBoundingClientRect();
      const spoilerButton = desc.parentElement.querySelector('.doc-card__spoiler-button')

      if (!spoilerButton) return

      if (height < SPOILER_HEIGHT_BREAKPOINT) {
        spoilerButton.remove();
      } else {
        desc.classList.add(SPOILER_MINIFIED_CLASS);
        spoilerButton.addEventListener("click", (e) => {
          desc.classList.remove(SPOILER_MINIFIED_CLASS);
          spoilerButton.remove();
        });
      }
    })
  })
  
});


window.addEventListener('DOMContentLoaded', (event) => {
  const productPageAddButton = document.querySelector('.product-hero__order-buy-button');
  if (productPageAddButton) {
    productPageAddButton.addEventListener("click", (e) => {
      const productHeroOrder = document.querySelector('.product-hero__order');
      productHeroOrder.classList.add('product-hero__order--in-cart')
      productPageAddButton.querySelector('.button__text').innerText = productPageAddButton.dataset.inCartText
    });
  }

  const modals = document.querySelectorAll('.modal');
  modals.forEach((modal) => {
    const inputs = modal.querySelectorAll('.input .input__field');
    const submitButton = modal.querySelector('.modal__button')
    let inputValidity = [];
    inputs.forEach((input) => {
      // console.log(input.value)
      input.addEventListener("input", (e) => {
        inputs.forEach((input) => {
          if (input.value == "") {
            inputValidity.push(false);
          } else {
            inputValidity.push(true);
          }
          if (inputValidity.includes(false)) {
            submitButton.disabled = true
          } else {
            submitButton.disabled = false
          }
          inputValidity = [];
        })
        
      });
    })
    
  })
  
});
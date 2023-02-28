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
window.lazyload = lazyLoadInstance;




import "./unstable/tabs.js";

/**
 * Smooth anchors
 */
import "./utils/smooth-anchors.js";

import "./components/carousels.js";

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
  // const GALLERY_BUTTON_HIDDEN_CLASS = 'gallery-accordion__button-more--hidden'
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
        // if (gallery.querySelector('.gallery-accordion-modal')) return;
        // if (gallery.querySelector('.modal-gallery-crousel')) return;
        // if (gallery.querySelector('[data-fancybox]')) return;
        
        // expandButton.classList.add(GALLERY_BUTTON_HIDDEN_CLASS);
        // setTimeout(() => {
        //   expandButton.style.display = 'none';
        // }, 100)
        cards.forEach(card => {
            card.style.display = '';
            setTimeout(() => {
              card.classList.add(GALLERY_ITEM_VISIBLE_CLASS);
            }, 100)
        })
      })

      if ([...cards].length <= initialShow) {
        // expandButton.classList.add(GALLERY_BUTTON_HIDDEN_CLASS);
        // setTimeout(() => {
        //   expandButton.style.display = 'none';
        // }, 100)
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


/**
 * В корзине добавляет класс убранного айтема 
 */
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

/**
 * Order History cards
 * Делает функционал раскрытия карточки в order-history
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


/**
 * На страницах типа services.html и categories.html есть липкие заголовки. 
 * Они находятся в одтельных блоках и просто позишн стики не обойтись, дополнительно надо давать белый фон при прокрутке
 * Этот код расчитывает верную высоту, на которой блок начинает быть липким и добавляет класс, который делает белый фон и тень
 */
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

/**
 * Этот код дополнение к stickPageHeadings
 * При прокрутке до нужного блока выделяет якорную ссылку на текущий блок жирным
 */
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

/*
 * Переключает в мобильной версии видимость сайдбара с контактами
 * При клике за пределами сайдара закрывает его
 */
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

/*
 * Переключает в мобилке видимость сайдбара с навигацией
 * При клике за пределами сайдара закрывает его
 */
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


/*
 * Делает в мобилке спойлеры в блоке captions
 */
const captionsMobileFold = document.querySelectorAll('.captions--mobile-fold');
captionsMobileFold.forEach((caption) => {
  const button = caption.querySelector('.captions__button-opener')
  button.addEventListener('click', () => caption.classList.add('.captions--fold-opened'));
})


/*
 * В сайдбаре оформления заказа 2 этажа.
 * По макету закреплен при прокрутке должен быть только один
 * Эта функция пересчитывает высоту на ресайзе, чтобы верхняя часть корзины была верно закреплена при прокрутке
 *
 */
const cartSidebar = document.querySelector('.cart-sidebar');
const cartColumns = document.querySelector('.cart__columns');
function recalculateCartColumnsBottomGap() {
  if (window.innerWidth <= 1200) {
    cartColumns.style.paddingBottom = "";

    const cards = [...cartSidebar.querySelectorAll('.sidebar-card')];
    let additionalHeight = cards.reduce((accum, card, index) => {
      return accum + card.getBoundingClientRect().height
    }, 0)
    console.log(additionalHeight)

    let additionalHeightModifier = -20;
    // if (window.innerWidth > 768 && window.innerWidth < 1025) {
    if (window.innerWidth <= 768 && window.innerWidth >= 601) {
      additionalHeightModifier = 60;
    // } else if (window.innerWidth >  602 && window.innerWidth < 910) {
    } else if (window.innerWidth < 1025) {
      additionalHeightModifier = 30;
    }
      additionalHeight += additionalHeightModifier

    if (cards.length > 1) {
      cartColumns.style.paddingBottom = `${additionalHeight}px`;
    }
  }
}
if (cartSidebar && cartColumns) {
  window.addEventListener('resize', () => {
    recalculateCartColumnsBottomGap()
  })
  recalculateCartColumnsBottomGap()
}

/*
 * Фикс z-index для выпадаек фильтров, чтобы выпадаемыая часть не накладывалась поверх фильтра, находящегося ниже
 */
const rowFilters = document.querySelectorAll('.row-filters__select');
rowFilters.forEach((filter, index, arr) => {
  if (window.innerWidth >= 1024 || filter.parentElement.classList.contains('blog__filters')) {
    filter.style.zIndex = arr.length - index;
  }
})

/*
 * Генерация верного мобильного меню для фильтров на странцице каталога и поиска
 */
const filterButton = document.querySelector('.catalog-products__filters-button-mobile');
const filterBlock = document.querySelector('.catalog-products__filters');
const buttonBack = document.querySelector('.catalog-products__filters-back-button')
const FILTER_OPENED_CLASS = 'filters--opened'
if (filterButton && filterBlock) {
  filterButton.addEventListener('click', () => {
    filterBlock.classList.add(FILTER_OPENED_CLASS);
  })
  window.addEventListener('click', (e) => {
    // console.log(e.target)
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
      const height = desc.getBoundingClientRect().height;
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


/**
 * На странице товара при добавлении в окрзину меняет состояние кнопки и показывает степпер количества товара
 */
window.addEventListener('DOMContentLoaded', (event) => {
  const productPageAddButtons = document.querySelectorAll('.product-hero__order-buy-button');
  productPageAddButtons.forEach((productPageAddButton) => {
    productPageAddButton.addEventListener("click", (e) => {
      const productHeroOrder = document.querySelector('.product-hero__order');
      productPageAddButtons.forEach((button) => {
        button.parentElement.classList.add('product-hero__order--in-cart')
        button.querySelector('.button__text').innerText = productPageAddButton.dataset.inCartText
      })
    });
  })

  /**
   * Валидация формы в модалке, чтбоы нельзя было отправить ее до заполнения имени и телефона
   */
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

  const categoriesSlideshow = [...document.querySelectorAll('.js-categories-card-slideshow')];
  categoriesSlideshow.forEach(slideshow => {
    const slides = [...slideshow.querySelectorAll('.categories-card__pic')];
    let currentSlide = 0;
    setInterval(() => {
      slides.forEach(slide => {
        slide.classList.remove('categories-card__pic--visible')
      })
      slides[currentSlide].classList.add('categories-card__pic--visible')
      currentSlide++;

      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
    }, 1000)
  })
  
});
"use strict"

import Swiper, { Navigation, Autoplay, Pagination, Thumbs } from "swiper";
import {debounce} from "../utils/helpers.js";

if (document.querySelector('.product-hero-gallery') && document.querySelector('.product-hero-thumbs')) {
  let swiper = new Swiper(".product-hero-thumbs", {
    direction: 'vertical',
    centeredSlides: true,
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,
    spaceBetween: 10,
    slidesPerView: 'auto',
  });
  let heroGallery = new Swiper(".product-hero-gallery", {
    modules: [Navigation, Pagination],
    spaceBetween: 10,
    pagination: {
      el: ".product-hero-gallery-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".product-hero-gallery-next",
      prevEl: ".product-hero-gallery-prev",
    },
    thumbs: {
      swiper: swiper,
    },
    on: {
      slideChange: function() {
        swiper.slideTo(this.activeIndex);
      },
    }
  });
  swiper.on('slideChange', () => {
    heroGallery.slideTo(swiper.activeIndex);
  })
  swiper.slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      heroGallery.slideTo(index);
    })
  })
}


if (document.querySelector('.promo-carousel')) {
  function normalizePaginationOffset(swiper) {
    if (window.innerWidth > 768) return

    const currentSlideCard = swiper.slides[swiper.activeIndex].querySelector('.promo-carousel-card')
    const paginationBottomOffset = +currentSlideCard.getBoundingClientRect().height;
    const initialPaginationBottomOffset = 38;
    const newPaginationOffset = Math.round(initialPaginationBottomOffset) + Math.round(paginationBottomOffset);
    // console.log(newPaginationOffset)
    swiper.pagination.el.style.bottom =  newPaginationOffset + 'px';
  }
  let promoSlider = new Swiper(".promo-carousel", {
    modules: [Navigation, Autoplay, Pagination],
    spaceBetween: 100,
    autoHeight: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".promo-carousel__pagination",
      clickable: true,
    },
    on: {
      init: function () {
        normalizePaginationOffset(this)
      },
      slideChange: function () {
        normalizePaginationOffset(this)
      },
    }
  });
  window.addEventListener("resize", (e) => {
    debounce(normalizePaginationOffset(promoSlider), 200);
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
  slidesPerView: 1.5,
  spaceBetween: 8,
  breakpoints: {
    577: {
      slidesPerView: 2.5,
    }
  }
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

if (document.querySelector('.product-cases-carousel')) {
  const carousels = document.querySelectorAll('.product-cases-carousel');
  const CAROUSEL_ID = 'product-cases-carousel';
  setTimeout(() => {
    carousels.forEach((carousel, index) => {
      carousel.id = `${CAROUSEL_ID}-${index}`

      let productCaseSlider = new Swiper(`#${carousel.id}`, {
        grabCursor: true,
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 150,
        modules: [Navigation, Autoplay, Pagination],
        navigation: {
          nextEl: `#${carousel.id} .swiper-button-next`,
          prevEl: `#${carousel.id} .swiper-button-prev`,
        },
      });
      carousel.querySelectorAll('.product-cases-carousel-slide').forEach(slide => {
        slide.querySelector('.gallery-accordion__button-more').addEventListener('click', () => {
          console.log(productCaseSlider)
          setTimeout(() => {
            productCaseSlider.update();
          }, 200)
        })
      })
    })
  }, 1000)
}

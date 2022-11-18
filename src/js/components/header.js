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
  document.querySelector(".header__geo .header__picker-text").innerText = e.target.value;
});

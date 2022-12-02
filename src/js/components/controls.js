"use strict"

import "../unstable/inputster/formich.js";
import "../unstable/burger.js";


/**
 * Dropdown Select
 */
import Choices from "choices.js";
if (document.querySelector(".select")) {
  const dropdowns = document.querySelectorAll(".select");
  dropdowns.forEach((dropdown) => {
    let choicesOptions = {
      searchEnabled: false,
      searchPlaceholderValue: "Поиск",
      noResultsText: "Нет результатов",
      shouldSort: false,
      // removeItemButton: true,
      renderSelectedChoices: 'always',
      maxItemCount: -1,
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
    }

    if (dropdown.classList.contains('select--has-search')) {
      choicesOptions.searchEnabled = true;
      if (dropdown.dataset.searchPlaceholder) {
        choicesOptions.searchPlaceholderValue = dropdown.dataset.searchPlaceholder;
        // choicesOptions.searchPlaceholderValue = "Населённый пункт";
      }
    }
    if (dropdown.classList.contains('select--allow-multiple')) {
      choicesOptions.maxItemCount = -1;
    }
    const customSelect = new Choices(dropdown.querySelector(".select__input"), choicesOptions) 

    const backButton = document.querySelector('.catalog-products__filters-back-button');
    if (backButton) {
      customSelect.passedElement.element.addEventListener('showDropdown', (e) => {
        backButton.classList.add('is-visible')
        const filterName = e.target.parentElement.parentElement.parentElement.querySelector('.row-filters__select-label').innerText;
        if (!filterName) return

          console.log(backButton, filterName)
        backButton.querySelector('.button__text').innerText = filterName;
      })
      customSelect.passedElement.element,addEventListener('hideDropdown', (e) => {
        backButton.classList.remove('is-visible')
      })
    }
  });

}

if (document.querySelector(".timepicker")) {
  const timepickers = document.querySelectorAll(".timepicker");
  timepickers.forEach((timepicker) => {
    let choicesOptions = {
      searchEnabled: false,
      searchPlaceholderValue: "Поиск",
      noResultsText: "Нет результатов",
      shouldSort: false,
      classNames: {
        containerOuter: "timepicker__outer",
        input: "timepicker__input",
        inputCloned: "timepicker__input--cloned",
        list: "timepicker__list",
        listItems: "timepicker__list--multiple",
        listSingle: "timepicker__list--single",
        listDropdown: "timepicker__list--dropdown",
        item: "timepicker__item",
        itemtimepickerable: "timepicker__item--selectable",
        itemDisabled: "timepicker__item--disabled",
        itemChoice: "timepicker__item--choice",
        placeholder: "timepicker__placeholder",
        group: "timepicker__group",
        groupHeading: "timepicker__heading",
        button: "timepicker__button",
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
    }

    const choices = new Choices(timepicker.querySelector(".timepicker__select"), choicesOptions) });
}



/**
 * Calendars
 */
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js"
import {getShortHumanDate} from "../utils/helpers.js"
import {getTodayPlus} from "../utils/helpers.js"
const calendars = document.querySelectorAll('.calendar');
calendars.forEach((calendar) => {
  const calendarInput = calendar.querySelector('.calendar__input');
  if (!calendarInput) return

    let calendarSettings = {
      altInput: true,
      altFormat: "D, j M Y",
      locale: Russian,
      time_24hr: true,
    }
  if (calendar.classList.contains('calendar--inline')) {
    calendarSettings.inline = true;
  } else {
    calendarSettings.appendTo = calendar;
  }
  if (calendar.classList.contains('calendar--only-future')) {
    calendarSettings.disable = [{to: new Date(), }, ];
    calendarSettings.minDate = new Date();
    calendarSettings.defaultDate = getTodayPlus(2);
  }

  // if (calendar.classList.contains('calendar--has-year')) {
  //   console.log('year', calendarInput)
  // }

  flatpickr(calendarInput, calendarSettings);
});





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
 * Stepper
 */
const steppers = document.querySelectorAll('.stepper');
function getStepperValue(stepper) {
  const input = stepper.querySelector('.stepper__value');
  let value = +input.value;
  return value
}
function setStepperValue(stepper, value) {
  const input = stepper.querySelector('.stepper__value');
  input.value = value;
}
function decrementStepper(stepper) {
  let value = getStepperValue(stepper)
  value = value < 1 ? value : value - 1;
  setStepperValue(stepper, value)
}
function incrementStepper(stepper) {
  let value = getStepperValue(stepper)
  value++;
  setStepperValue(stepper, value)
}
steppers.forEach((stepper) => {
  const minus = stepper.querySelector('.stepper__button-minus');
  const plus = stepper.querySelector('.stepper__button-plus');
  const input = stepper.querySelector('.stepper__value');

  minus.addEventListener("click", (e) => {
    decrementStepper(stepper)
  });
  plus.addEventListener("click", (e) => {
    incrementStepper(stepper)
  });
})

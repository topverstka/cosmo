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
    const choices = new Choices(dropdown.querySelector(".select__input"), choicesOptions) });
}

if (document.querySelector(".timepicker")) {
  const timepickers = document.querySelectorAll(".timepicker");
  timepickers.forEach((timepicker) => {
    let choicesOptions = {
      searchEnabled: false,
      searchPlaceholderValue: "Поиск",
      noResultsText: "Нет результатов",
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

  if (calendar.classList.contains('calendar--inline')) {
    flatpickr(calendarInput, {
      altInput: true,
      altFormat: "D, j M Y",
      inline: true,
      locale: Russian,
      disable: [
        {
            to: new Date(),
        },
      ],
      defaultDate: getTodayPlus(2),
      time_24hr: true,
      minDate: new Date(),
    });
  }
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



/*
 */
// #region timer
const timers = document.querySelectorAll(".timer");

if ([...timers].length > 0) {
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hoursTotal = Math.floor(t / (1000 * 60 * 60));

    const ticks = {
      total: t,
      days,
      hours,
      hoursTotal,
      minutes,
      seconds,
    };
    return ticks;
  }

  function onTimerExpire(clock) {
    clock.style.opacity = "0";

    console.log("timerExpire");
  }

  function initializeClock(element, endtime) {
    // const clock = document.querySelector(element);
    const clock = element;
    // letk daysSpan = clock.querySelector(".timer-days_value");
    let hoursSpan = clock.querySelector(".timer__left");
    let minutesSpan = clock.querySelector(".timer__center");
    let secondsSpan = clock.querySelector(".timer__right");
    let time = [hoursSpan, minutesSpan, secondsSpan];

    function updateClock() {
      let t = getTimeRemaining(endtime);

      // daysSpan.innerHTML = t.days;
      // hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      // minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      // secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      let left = ("0" + t.hoursTotal).slice(-2);
      let center = ("0" + t.minutes).slice(-2);
      let right = ("0" + t.seconds).slice(-2);
      let timerSpan = [left, center, right];

      time.forEach((span, i) => {
        [...span.querySelectorAll(".timer__digit")].forEach((digit, index) => {
          digit.innerText = timerSpan[i][index];
        });
      });
      if (t.total <= 0) {
        // clearInterval(timeinterval);
        // location.assign("");
        onTimerExpire(clock);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  if (localStorage.getItem("localTimer") == null) {
    localStorage.setItem(
      "localTimer",
      new Date(Date.parse(new Date()) + 72 * 60 * 60 * 1000)
    );
  }

  var deadline = localStorage.getItem("localTimer");
  // var deadline = new Date(Date.parse(new Date()) + 10 * 1000); // for endless timer

  timers.forEach((timer) => {
    initializeClock(timer, deadline);
  });
}
// #endregion timer

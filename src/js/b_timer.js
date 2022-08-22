/*
 */
// #region timer
const timers = document.querySelectorAll(".timer");
const timerName = "localTimer";
// const timerDeadline = 48 * 60 * 60 * 1000;
const timerDeadline = getTimerDeadlineFromNow(0.1);

function getTimerDeadlineFromNow(hours, isDaysInTimer = false) {
  const milliseconds = 1000;
  const seconds = 60;
  const minutes = 60;
  return hours * minutes * seconds * milliseconds;
}
if ([...timers].length > 0) {
  function getTimeRemaining(deadline) {
    let t = Date.parse(deadline) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hoursTotal = Math.floor(t / (1000 * 60 * 60));

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
    // clock.style.opacity = "0";
  }

  function initClock(timer, deadline) {
    // const clock = document.querySelector(timer);
    const clock = timer;
    // letk daysSpan = clock.querySelector(".timer-days_value");
    let hoursSpan = clock.querySelector(".timer__left");
    let minutesSpan = clock.querySelector(".timer__center");
    let secondsSpan = clock.querySelector(".timer__right");
    let time = [hoursSpan, minutesSpan, secondsSpan];

    function getLeadingZeroTime(time) {
      return ("0" + time).slice(-2);
    }
    function updateClock() {
      let { hoursTotal, minutes, seconds, total } = getTimeRemaining(deadline);

      let left = getLeadingZeroTime(hoursTotal);
      let center = getLeadingZeroTime(minutes);
      let right = getLeadingZeroTime(seconds);
      let timerSpan = [left, center, right];

      time.forEach((span, i) => {
        [...span.querySelectorAll(".timer__digit")].forEach((digit, index) => {
          digit.innerText = total >= 0 ? timerSpan[i][index] : "0";
        });
      });
      if (total <= 0) {
        clearInterval(timeinterval);
        onTimerExpire(clock);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  function setTimer(deadline) {
    localStorage.setItem(
      timerName,
      new Date(Date.parse(new Date()) + deadline)
    );
    return getTimer();
  }
  function getTimer() {
    return localStorage.getItem(timerName);
  }
  function isTimerNull() {
    return localStorage.getItem(timerName) == null;
  }
  const deadline = isTimerNull() ? setTimer(timerDeadline) : getTimer();
  // var deadline = new Date(Date.parse(new Date()) + 10 * 1000); // for endless timer

  timers.forEach((timer) => {
    initClock(timer, deadline);
  });
}
// #endregion timer

// elements
const elTime = document.querySelector(".js-time");
const elControls = document.querySelector(".js-controls");
const elPlayBtn = document.querySelector('[data-role="play"]');
const elPauseBtn = document.querySelector('[data-role="pause"]');

// variables
const countMinutes = 60 * 25;
let intervalId = 0;
let isPaused = true;
let copiedTime = countMinutes;

// helper functions
const getZero = (num) => {
  return num < 10 ? `0${num}` : num;
};

const setTexts = (minutes, seconds) => {
  const time = `${getZero(minutes)}:${getZero(seconds)}`;
  elTime.textContent = time;
};

const startCountdown = () => {
  let minutes = 25;
  let seconds = 60;

  if (isPaused) return;

  intervalId = setInterval(() => {
    copiedTime--;
    minutes = Math.floor(copiedTime / 60);
    seconds = copiedTime % 60;

    setTexts(minutes, seconds);
  }, 1000);
};

// play | pause | reset
elControls.addEventListener("click", (e) => {
  const el = e.target.closest("[data-role]");
  if (!el) return;

  const role = el.dataset.role;

  if (role === "play") {
    if (!isPaused) return;

    elPlayBtn.classList.add("visually-hidden");
    elPauseBtn.classList.remove("visually-hidden");
    isPaused = false;
    startCountdown(countMinutes);
  }

  if (role === "pause") {
    if (isPaused) return;

    clearInterval(intervalId);
    isPaused = true;
    elPlayBtn.classList.remove("visually-hidden");
    elPauseBtn.classList.add("visually-hidden");
  }

  if (role === "reset") {
    if (isPaused) return;

    copiedTime = countMinutes;
    isPaused = true;
    clearInterval(intervalId);
    setTexts(25, 0);
    elPlayBtn.classList.remove("visually-hidden");
    elPauseBtn.classList.add("visually-hidden");
  }
});

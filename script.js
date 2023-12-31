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
const playPlayer = () => {
  if (!isPaused) return;

  elPlayBtn.classList.add("visually-hidden");
  elPauseBtn.classList.remove("visually-hidden");
  isPaused = false;
  startCountdown(countMinutes);
};

const pausePlayer = () => {
  if (isPaused) return;

  clearInterval(intervalId);
  isPaused = true;
  elPlayBtn.classList.remove("visually-hidden");
  elPauseBtn.classList.add("visually-hidden");
};

const resetPlayer = () => {
  if (isPaused) return;

  setTexts(25, 0);
  copiedTime = countMinutes;
  isPaused = true;
  clearInterval(intervalId);
  elPlayBtn.classList.remove("visually-hidden");
  elPauseBtn.classList.add("visually-hidden");
};

const getZero = (num) => {
  return num < 10 ? `0${num}` : num;
};

const playAudio = (audioSrc) => {
  const audio = new Audio(audioSrc);
  audio.play();
};

const setTexts = (minutes, seconds) => {
  const time = `${getZero(minutes)}:${getZero(seconds)}`;
  elTime.dateTime = time;
  elTime.textContent = time;
};

const timerEnd = () => {
  if (copiedTime < 1) {
    resetPlayer();
    playAudio("./assets/alarm.mp3");
  }
};

const startCountdown = () => {
  let minutes = 25;
  let seconds = 60;

  intervalId = setInterval(() => {
    copiedTime--;

    minutes = Math.floor(copiedTime / 60);
    seconds = copiedTime % 60;

    timerEnd();
    setTexts(minutes, seconds);
  }, 1000);
};

// play | pause | reset
elControls.addEventListener("click", (e) => {
  const el = e.target.closest("[data-role]");
  if (!el) return;

  const role = el.dataset.role;
  playAudio("./assets/click.wav");

  if (role === "play") playPlayer();
  if (role === "pause") pausePlayer();
  if (role === "reset") resetPlayer();
});

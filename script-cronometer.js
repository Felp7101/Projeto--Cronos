
const cronometerNumbers = document.querySelector(".cronometer-numbers");
const startButton = document.querySelector(".start-button");
const buttonLightMode = document.querySelector(".button-light-mode");
const globalContainer = document.querySelector("body");
const cronoBgIcon = document.querySelector(".crono-bg-icon");
const typeOfTimer = document.querySelector(".type-of-timer");
const pauseButton = document.querySelector(".pause-button");
const resetButton = document.querySelector(".reset-button");
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId;
let darkMode = false;
let isRunning = false; // Variável de estado

const toggleModes = () => {
  if (darkMode) {
    globalContainer.classList.remove("dark-mode");
    startButton.classList.remove("dark-mode-buttons");
    buttonLightMode.classList.remove("dark-mode-buttons");
    buttonLightMode.innerHTML = "modo escuro";
    cronoBgIcon.src = "./img/cronometer_bg_light.png";
    typeOfTimer.classList.remove("dark-mode-headline");
    pauseButton.classList.remove("dark-mode-pause-button");
    resetButton.classList.remove("dark-mode-reset-button");
  } else {
    globalContainer.classList.add("dark-mode");
    startButton.classList.add("dark-mode-buttons");
    buttonLightMode.classList.add("dark-mode-buttons");
    buttonLightMode.innerHTML = "modo claro";
    cronoBgIcon.src = "./img/cronometer_bg_dark.png";
    typeOfTimer.classList.add("dark-mode-headline");
    pauseButton.classList.add("dark-mode-pause-button");
    resetButton.classList.add("dark-mode-reset-button");
  }
  darkMode = !darkMode;
  updateCronometerDisplay();
};

const updateCronometerDisplay = () => {
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  cronometerNumbers.innerHTML = `${formattedHours}<span class="two-points ${
    darkMode ? "dark-mode-two-points" : ""
  }">:</span>${formattedMinutes}<span class="two-points ${
    darkMode ? "dark-mode-two-points" : ""
  }">:</span>${formattedSeconds}`;
};

const startCronometer = () => {
  isRunning = false;
  if (intervalId) {
    clearInterval(intervalId);
  }
  pauseButton.innerHTML = "Pausar";
  startButton.classList.remove("active");
  startButton.classList.add("button-animation");
  pauseButton.classList.remove("button-animation");
  resetButton.classList.remove("button-animation");
  pauseButton.classList.add("active");
  resetButton.classList.add("active");

  intervalId = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateCronometerDisplay();
  }, 1000);

  isRunning = true; // Atualiza o estado
};

const toggleCronometer = () => {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
    pauseButton.innerHTML = "Retomar";
  } else {
    startCronometer(); // Retoma o cronômetro
    pauseButton.innerHTML = "Pausar";
  }
};

const resetCronometer = () => {
  clearInterval(intervalId);
  seconds = 0;
  minutes = 0;
  hours = 0;
  cronometerNumbers.innerHTML = `00<span class="two-points ${
    darkMode ? "dark-mode-two-points" : ""
  }">:</span>00<span class="two-points ${
    darkMode ? "dark-mode-two-points" : ""
  }">:</span>00`;
  startButton.classList.add("active");
  startButton.classList.remove("button-animation");
  pauseButton.classList.remove("active");
  resetButton.classList.add("button-animation");
  pauseButton.classList.add("button-animation");
  resetButton.classList.remove("active");
};
 
startButton.addEventListener("click", startCronometer);
resetButton.addEventListener("click", resetCronometer);
updateCronometerDisplay();

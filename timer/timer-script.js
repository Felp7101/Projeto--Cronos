// Seleção dos elementos do DOM
const timerMenu = document.querySelector(".timer-menu");
const h4 = document.querySelector("h4");
const circle = document.querySelector(".orange-circle");
const pauseNResetButton = document.querySelector(".pause-n-reset");
const inputTimer = document.querySelector('.select-timer-numbers');
const timerSound = document.getElementById('timer-sound');
let timer = { hours: 0, minutes: 0, seconds: 0 };
let pause = false;
let timerI;

// Função para chamar o menu do timer
const callTimerMenu = () => {
  clearInterval(timerI);
  timerMenu.classList.remove("hidden", "remove");
  timerMenu.classList.add("active");
  timerSound.pause();

  inputTimer.value = "00:00:00"; // Reseta o valor do input ao abrir o menu

  inputTimer.addEventListener('input', function () {
    let inputValue = this.value.replace(/[^0-9]/g, ''); // Permite apenas números
    if (inputValue.length > 6) inputValue = inputValue.slice(-6); // Limita a 6 dígitos

    // Divide os valores em horas, minutos e segundos
    const hours = inputValue.slice(-6, -4).padStart(2, '0') || '00';
    const minutes = Math.min(59, parseInt(inputValue.slice(-4, -2) || '00')).toString().padStart(2, '0');
    const seconds = Math.min(59, parseInt(inputValue.slice(-2) || '00')).toString().padStart(2, '0');

    this.value = `${hours}:${minutes}:${seconds}`; // Formata o input para o usuário

    // Atualiza o timer com os valores
    timer = { 
      hours: parseInt(hours), 
      minutes: parseInt(minutes), 
      seconds: parseInt(seconds) 
    };
  });
};

// Função para iniciar o timer
const startTimer = () => {
  timerMenu.classList.add("remove");
  timerMenu.classList.remove("active");
  h4.classList.add("timer-h4");
  circle.classList.add("circle-ptr", "show-stop-sign"); // Adiciona a classe para mostrar "parar"
  circle.addEventListener("click", callTimerMenu);
  h4.innerHTML = formatTime(timer);
  timerSound.pause();

  clearInterval(timerI);
  pause = false;
  pauseNResetButton.classList.add("show-pause-n-reset-button");
  pauseNResetButton.innerHTML = "pausar";
  pauseNResetButton.removeEventListener("click", callTimerMenu);
  pauseNResetButton.addEventListener("click", pauseTimer);

  timerI = setInterval(updateTimer, 1000);
};

// Função para atualizar o timer
const updateTimer = () => {
  if (timer.seconds > 0) {
    timer.seconds--;
  } else if (timer.minutes > 0) {
    timer.seconds = 59;
    timer.minutes--;
  } else if (timer.hours > 0) {
    timer.seconds = 59;
    timer.minutes = 59;
    timer.hours--;
  } else {
    clearInterval(timerI);
    circle.classList.remove("pause-button", "show-stop-sign"); // Remove a classe quando o timer parar
    circle.removeEventListener("click", callTimerMenu);
    pauseNResetButton.innerHTML = "resetar";
    pauseNResetButton.removeEventListener("click", pauseTimer);
    pauseNResetButton.addEventListener("click", resetTimer);
    circle.classList.remove("circle-ptr"); // Adiciona a classe para mostrar "parar"

    // Toca o som quando o timer chega a zero
    timerSound.play();
  }

  h4.innerHTML = formatTime(timer);
};

// Função para formatar o tempo para exibição
const formatTime = ({ hours, minutes, seconds }) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Função para pausar o timer
const pauseTimer = () => {
  if (!pause) {
    clearInterval(timerI);
    pauseNResetButton.innerHTML = "continuar";
    pause = true;
  } else {
    timerI = setInterval(updateTimer, 1000);
    pauseNResetButton.innerHTML = "pausar";
    pause = false;
  }
};

// Função para resetar o timer e chamar o menu
const resetTimer = () => {
  clearInterval(timerI);
  timer = { hours: 0, minutes: 0, seconds: 0 };
  h4.innerHTML = formatTime(timer);
  pauseNResetButton.innerHTML = "pausar";
  pauseNResetButton.classList.remove("show-pause-n-reset-button");
  pauseNResetButton.removeEventListener("click", resetTimer);

  circle.classList.remove("show-stop-sign"); // Remove a classe quando o timer é resetado
  
  callTimerMenu();
};

// Event listeners iniciais
circle.addEventListener("click", callTimerMenu);
pauseNResetButton.addEventListener("click", pauseTimer);

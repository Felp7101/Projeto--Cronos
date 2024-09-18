
let pomodoreSeconds = 0; 
let pomodoreMinutes = 25;
let breakSeconds = 0; 
let breakMinutes = 5; 
let pomodoreTimer; 
let intervalTimer; 
let isRunning = false; 
let isBreak = false;
let isPaused = false; 
let startedPomodore = false; 

// Função para iniciar o Pomodoro
const startPomodore = () => {
  // Se o temporizador estiver pausado, retoma o temporizador
  if (isPaused && startedPomodore) {
    resumeTimer(); // Retoma o timer se estiver pausado
    return;
  }

  // Se o Pomodoro estiver rodando, pausa o temporizador
  if (isRunning) {
    pauseTimer();
    return;
  }

  // Inicia o Pomodoro do zero
  startSound.play();
  startNStopButton.innerHTML = "parar";
  isRunning = true;
  startedPomodore = true;

  // Configura o temporizador do Pomodoro
  pomodoreTimer = setInterval(() => {
    if (pomodoreSeconds === 0) {
      if (pomodoreMinutes === 0) {
        clearInterval(pomodoreTimer);
        isRunning = false;
        resetBreak();
        startBreak(); // Inicia o intervalo de descanso
        return;
      } else {
        pomodoreMinutes--;
        pomodoreSeconds = 59;
      }
    } else {
      pomodoreSeconds--;
    }

    // Atualiza o display do tempo do Pomodoro
    time.innerHTML = `${String(pomodoreMinutes).padStart(2, "0")}<span class="double-dots">:</span>${String(
      pomodoreSeconds
    ).padStart(2, "0")}`;
  }, 1); // 1000ms = 1 segundo
};

// Função para iniciar o intervalo de descanso
const startBreak = () => {
  clearInterval(pomodoreTimer); // Para garantir que o Pomodoro não esteja ativo
  breakSound.play();
  isBreak = true;
  isRunning = true;
  isPaused = false;

  // Configura o temporizador do intervalo
  intervalTimer = setInterval(() => {
    if (breakSeconds === 0) {
      if (breakMinutes === 0) {
        clearInterval(intervalTimer);
        isBreak = false;
        resetPomodore();
        startPomodore(); // Reinicia o Pomodoro
        return;
      } else {
        breakMinutes--;
        breakSeconds = 59;
      }
    } else {
      breakSeconds--;
    }

    // Atualiza o display do tempo do intervalo
    time.innerHTML = `${String(breakMinutes).padStart(2, "0")}<span class="double-dots">:</span>${String(breakSeconds).padStart(2, "0")}`;
  }, 1); // 1000ms = 1 segundo
};

// Função para resetar os valores do Pomodoro após o intervalo
const resetPomodore = () => {
  pomodoreMinutes = 25;
  pomodoreSeconds = 0;
  startNStopButton.innerHTML = "iniciar";
  isPaused = false;
  isRunning = false;
  clearInterval(pomodoreTimer);
};

// Função para resetar os valores do intervalo
const resetBreak = () => {
  breakSeconds = 0;
  breakMinutes = 5;
  clearInterval(intervalTimer);
};

// Função para pausar o temporizador
const pauseTimer = () => {
  if (isBreak) {
    clearInterval(intervalTimer);
  } else {
    clearInterval(pomodoreTimer);
  }
  isRunning = false;
  isPaused = true;
  startNStopButton.innerHTML = "voltar";
};

// Função para retomar o temporizador
const resumeTimer = () => {
  if (isPaused) {
    // Retoma o temporizador do estado em que estava, sem reiniciar o Pomodoro
    if (isBreak) {
      // Retoma o temporizador de intervalo
      intervalTimer = setInterval(() => {
        if (breakSeconds === 0) {
          if (breakMinutes === 0) {
            clearInterval(intervalTimer);
            isBreak = false;
            resetPomodore();
            startPomodore(); // Reinicia o Pomodoro
            return;
          } else {
            breakMinutes--;
            breakSeconds = 59;
          }
        } else {
          breakSeconds--;
        }
        // Atualiza o display do tempo de intervalo
        time.innerHTML = `${String(breakMinutes).padStart(2, "0")}<span class="double-dots">:</span>${String(breakSeconds).padStart(2, "0")}`;
      }, 1);
    } else {
      // Retoma o temporizador do Pomodoro
      pomodoreTimer = setInterval(() => {
        if (pomodoreSeconds === 0) {
          if (pomodoreMinutes === 0) {
            clearInterval(pomodoreTimer);
            isRunning = false;
            resetBreak();
            startBreak(); // Inicia o intervalo de descanso
            return;
          } else {
            pomodoreMinutes--;
            pomodoreSeconds = 59;
          }
        } else {
          pomodoreSeconds--;
        }
        // Atualiza o display do tempo do Pomodoro
        time.innerHTML = `${String(pomodoreMinutes).padStart(2, "0")}<span class="double-dots">:</span>${String(
          pomodoreSeconds
        ).padStart(2, "0")}`;
      }, 1);
    }
    isRunning = true;
    isPaused = false;
    startNStopButton.innerHTML = "parar";
  }
};

// Evento de clique para iniciar/parar/retomar o temporizador
startNStopButton.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
  } else if (isPaused) {
    resumeTimer();
  } else {
    startPomodore();
  }
});

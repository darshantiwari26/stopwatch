let timer;
let centiseconds = 0; // 100 centiseconds = 1 second
let isRunning = false;

// Get elements
const display = document.querySelector('.display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

// Button click sound
const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Format and update display
function updateDisplay() {
  const minutes = Math.floor(centiseconds / 6000);
  const seconds = Math.floor((centiseconds % 6000) / 100);
  const centis = centiseconds % 100;

  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  const cs = String(centis).padStart(2, '0');

  display.textContent = `${m}:${s}:${cs}`;
}

// Start stopwatch
function startTimer() {
  if (isRunning) return;
  playSound();
  isRunning = true;

  timer = setInterval(() => {
    centiseconds++;
    updateDisplay();
  }, 10); // every 10ms = 1 centisecond
}

// Stop stopwatch
function stopTimer() {
  if (!isRunning) return;
  playSound();
  clearInterval(timer);
  isRunning = false;
}

// Reset stopwatch
function resetTimer() {
  playSound();
  clearInterval(timer);
  isRunning = false;
  centiseconds = 0;
  updateDisplay();
}

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// Show initial time
updateDisplay();
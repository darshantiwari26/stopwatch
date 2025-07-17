let timer;
let centiseconds = 0;
let isRunning = false;

const display = document.querySelector('.display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

// Click sound
const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function updateDisplay() {
  const minutes = Math.floor(centiseconds / 6000);
  const seconds = Math.floor((centiseconds % 6000) / 100);
  const centis = centiseconds % 100;

  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  const cs = String(centis).padStart(2, '0');

  display.textContent = `${m}:${s}:${cs}`;
}

function startTimer() {
  if (isRunning) return;
  playSound();
  isRunning = true;

  timer = setInterval(() => {
    centiseconds++;
    updateDisplay();
  }, 10);
}

function stopTimer() {
  if (!isRunning) return;
  playSound();
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  playSound();
  clearInterval(timer);
  isRunning = false;
  centiseconds = 0;
  updateDisplay();
  lapsList.innerHTML = '';
}

function recordLap() {
  if (!isRunning) return;
  playSound();

  const minutes = Math.floor(centiseconds / 6000);
  const seconds = Math.floor((centiseconds % 6000) / 100);
  const centis = centiseconds % 100;

  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  const cs = String(centis).padStart(2, '0');

  const lapTime = `${m}:${s}:${cs}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(lapItem);
  lapsList.scrollTop = lapsList.scrollHeight;
}

// Events
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Initialize
updateDisplay();

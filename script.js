const display = document.querySelector(".display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const modeToggle = document.getElementById("modeToggle");
const laps = document.querySelector(".laps");
const box = document.querySelector(".stopwatch-container");

// Click sound
const clickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

let min = 0,
  sec = 0,
  ms = 0;
let timer = null;

function updateDisplay() {
  const m = min < 10 ? "0" + min : min;
  const s = sec < 10 ? "0" + sec : sec;
  const milli = ms < 10 ? "0" + ms : ms;
  display.textContent = `${m}:${s}:${milli}`;
}

function stopwatch() {
  ms++;
  if (ms === 100) {
    ms = 0;
    sec++;
  }
  if (sec === 60) {
    sec = 0;
    min++;
  }
  updateDisplay();
}

startBtn.onclick = () => {
  playClick();
  if (!timer) {
    timer = setInterval(stopwatch, 10);
    box.classList.add("active");
  }
};

stopBtn.onclick = () => {
  playClick();
  clearInterval(timer);
  timer = null;
  box.classList.remove("active");
};

resetBtn.onclick = () => {
  playClick();
  clearInterval(timer);
  timer = null;
  min = sec = ms = 0;
  updateDisplay();
  laps.innerHTML = "";
  box.classList.remove("active");
};

lapBtn.onclick = () => {
  playClick();
  const lapTime = display.textContent;
  const lapItem = document.createElement("div");
  lapItem.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
  laps.appendChild(lapItem);
};

modeToggle.onclick = () => {
  playClick();
  document.body.classList.toggle("light");
};

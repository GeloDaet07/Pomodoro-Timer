//Query Selectors to manipulate the pomodoro app's DOM
const background = document.querySelector("body");
const clock = document.querySelector(".pomodoro");
const timerElement = document.querySelector(".time");
const startButton = document.querySelector(".start");
const pauseResumeButton = document.querySelector(".pause");
const restartButton = document.querySelector(".restart");
const skipButton = document.querySelector(".skip");

//Sets audio variables
const clockTick = new Audio('audio/clock-tick-sound.mp3');
const alarmSound = new Audio('audio/alarm-clock-sound.mp3');

//Default Pomodoro Timer parameters
let timer;
let setMinutes = 25;
let minutes = 25;
let seconds = 0;
let breakMinutes = 5;
let breakSeconds = 0;
let longBreakMinutes = 10;
let longBreakSeconds = 0;

//Setter Functions
export function setStudyTime(value){
    minutes = Number(value);
    setMinutes = minutes;
    timerElement.textContent = formatTime(setMinutes, seconds);
}

export function setBreakTime(value){
    breakMinutes = Number(value);
    minutes = breakMinutes;
    if (isBreak ==  true){
        timerElement.textContent = formatTime(minutes, breakSeconds);
    }
}

export function setLongBreakTime(value){
    longBreakMinutes = Number(value);
    if (longBreak % cycles == 0){
        minutes = longBreakMinutes;
        timerElement.textContent = formatTime(minutes, breakSeconds);
    }
}

let isPaused = false;
let isBreak = false;
let longBreak = 0;
let cycles = 2;

//Allows access to root variables set by styles.css
let style = window.getComputedStyle(document.documentElement);

//Set default time 
timerElement.textContent = formatTime(setMinutes, seconds);

//Generates sound effect when the timer starts
startButton.addEventListener('click', () => {
    clockTick.play();
})

//Starts timer
document.querySelector(".start").onclick = function startTimer() {
    timer = setInterval(updateTimer, 1000);
    startButton.style.display = 'none';
    pauseResumeButton.style.display = 'flex';
    restartButton.style.display = isBreak ? 'none' : 'flex';
    skipButton.style.display = 'flex';
}

//Dynamically changes the display of the pause and resume button
document.querySelector(".pause").onclick = function togglePauseResume() {
    isPaused = !isPaused;

    if(isPaused) {
        clearInterval(timer);
        pauseResumeButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        startTimer();
        pauseResumeButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
}
//Skips the current timer
document.querySelector(".skip").onclick = function fastForward() {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    isPaused = isPaused == false ? true : false;
    timerElement.textContent = formatTime(minutes, seconds);
    startButton.style.display = 'flex';
    pauseResumeButton.style.display = 'none';
    updateTimer();
}

//Restarts the pomodoro timer on click(study)
document.querySelector(".restart").onclick = function restartStudyTimerButton() {
    clearInterval(timer);
    minutes = setMinutes;
    seconds = 0;
    isPaused = false;
    timerElement.textContent = formatTime(minutes, seconds);
    pauseResumeButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    startButton.style.display = 'flex';
    pauseResumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    skipButton.style.display = 'none';
    background.style.backgroundColor = style.getPropertyValue('--bg-primary');
    clock.style.backgroundColor = style.getPropertyValue('--bg-secondary');
    startButton.style.color = style.getPropertyValue('--bg-secondary');
    pauseResumeButton.style.color = style.getPropertyValue('--bg-secondary');
    restartButton.style.color = style.getPropertyValue('--bg-secondary');
    skipButton.style.color = style.getPropertyValue('--bg-secondary');
}

//Updates timer
function updateTimer() {
    if (minutes == 0 && seconds == 0){
        if (!isBreak) {
            longBreak++;
            isBreak = true;
            alarmSound.play();
            clearInterval(timer);
            if (longBreak % cycles == 0){
                confirm('Time is up! Take a long break') ? alarmSound.pause() : alarmSound.pause();
                longBreakTime();
            } else {
                confirm('Time is up! Take a break') ? alarmSound.pause() : alarmSound.pause();
                breakTime();
            }
            alarmSound.currentTime = 0;
        } else {
            isBreak = false;
            alarmSound.play();
            clearInterval(timer);
            confirm('Time is up! Take a break') ? alarmSound.pause() : alarmSound.pause();
            restartStudyTimer();
            alarmSound.currentTime = 0;
        }
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }

    timerElement.textContent = formatTime(minutes, seconds);
}

//Initiates the break time sequence
function breakTime() {
    clearInterval(timer);
    isPaused = false;
    minutes = breakMinutes;
    seconds = breakSeconds;
    timerElement.textContent = formatTime(minutes, seconds);
    startButton.style.display = 'flex';
    pauseResumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    skipButton.style.display = 'none';
    background.style.backgroundColor = style.getPropertyValue('--break-primary');
    clock.style.backgroundColor = style.getPropertyValue('--break-secondary');
    startButton.style.color = style.getPropertyValue('--break-secondary');
    pauseResumeButton.style.color = style.getPropertyValue('--break-secondary');
    restartButton.style.color = style.getPropertyValue('--break-secondary');
    skipButton.style.color = style.getPropertyValue('--break-secondary');
}

function longBreakTime() {
    clearInterval(timer);
    isPaused = false;
    minutes = longBreakMinutes;
    seconds = longBreakSeconds;
    timerElement.textContent = formatTime(minutes, seconds);
    startButton.style.display = 'flex';
    pauseResumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    skipButton.style.display = 'none';
    background.style.backgroundColor = style.getPropertyValue('--long-break-primary');
    clock.style.backgroundColor = style.getPropertyValue('--long-break-secondary');
    startButton.style.color = style.getPropertyValue('--long-break-secondary');
    pauseResumeButton.style.color = style.getPropertyValue('--long-break-secondary');
    restartButton.style.color = style.getPropertyValue('--long-break-secondary');
    skipButton.style.color = style.getPropertyValue('--long-break-secondary');
}

//Restarts the pomodoro timer (study)
function restartStudyTimer() {
    clearInterval(timer);
    minutes = setMinutes;
    seconds = seconds;
    isPaused = false;
    timerElement.textContent = formatTime(minutes, seconds);
    pauseResumeButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    startButton.style.display = 'flex';
    pauseResumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    skipButton.style.display = 'none';
    background.style.backgroundColor = style.getPropertyValue('--bg-primary');
    clock.style.backgroundColor = style.getPropertyValue('--bg-secondary');
    startButton.style.color = style.getPropertyValue('--bg-secondary');
    pauseResumeButton.style.color = style.getPropertyValue('--bg-secondary');
    restartButton.style.color = style.getPropertyValue('--bg-secondary');
    skipButton.style.color = style.getPropertyValue('--bg-secondary');
}

//Formats the displayed values in the pomodoro timer
function formatTime(minutes, seconds){
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
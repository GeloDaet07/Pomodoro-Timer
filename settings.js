import {setStudyTime, setBreakTime, setLongBreakTime} from "../pomodoro.js";

const openButton = document.querySelector("#settings");
const closeButton = document.querySelector("#close");
const modal = document.querySelector(".open-settings");

openButton.addEventListener("click", () => {
    modal.classList.add("open");
})

closeButton.addEventListener("click", () => {
    modal.classList.remove("open");
})

document.querySelector(".save").onclick = function(){
    alert("Settings saved");
    setStudyTime(document.getElementById("studyTime").value);
    setBreakTime(document.getElementById("breakTime").value);
    setLongBreakTime(document.getElementById("longBreakTime").value);
    modal.classList.remove("open");
}
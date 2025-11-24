const input = document.getElementById("userInput");
const countdownDiv = document.getElementById("countdown");
const resultDiv = document.getElementById("result");
const restarBtn = document.getElementById("restart");

let randomNumber;
let intervalid;

function startGame() {
    resultDiv.textContent = "";
    countdownDiv.textContent = "";
    randomNumber = Math.floor(Math.random() * 3) + 1;

    countdown()
        .then(() => compareNumbers())
        .catch(err => console.error(err));
}

function countdown() {
    return new Promise((resolve) => {
        let count = 5;
        countdownDiv.textContent = count;

        intervalid = setInterval(() => {
            count--;
            countdownDiv.textContent = count;

            if (count === 0) {
                clearInterval(intervalid);
                resolve();
            }
        }, 1000);
    });
}

function compareNumbers() {
    const userNumber = parseInt(input.value);

    if (!userNumber || userNumber < 1 || userNumber > 3) {
        resultDiv.textContent = "Debes introducir un número válido del 1 al 3";
        return;
    }

    if (userNumber === randomNumber) {
        resultDiv.innerHTML = `Has salvado el mundo!
        <br>Elegiste: <strong>${userNumber}</strong>
        <br>Número correcto: <strong>${randomNumber}</strong>`;
    } else {
        resultDiv.innerHTML = `La bomba estalló...
        <br>Elegiste: <strong>${userNumber}</strong>
        <br>Número correcto: <strong>${randomNumber}</strong>`;
    }
}

restarBtn.addEventListener("click", () => {
    clearInterval(intervalid);
    input.value = "";
    resultDiv.textContent = "";
    startGame();
});
var tusharCount = 1;
var tusharWhatToShow = "";
let tusharGameOver = false;

var tusharXcounter = parseInt(localStorage.getItem("x"));
var tusharYcounter = parseInt(localStorage.getItem("o"));
var tusharDrawCounter = parseInt(localStorage.getItem("d"));


const tusharResult = document.getElementById("results")
const timer = document.getElementById("time")
const tusharCells = document.querySelectorAll("td");
var intervalX;

if(!localStorage.getItem("x") && !localStorage.getItem("o") && !localStorage.getItem("d") ){
    localStorage.setItem("x", 0)
    localStorage.setItem("o", 0)
    localStorage.setItem("d", 0)
}

//this code is responsible for timer part:
tusharResponsibleTimer();
function tusharResponsibleTimer() {
    var tusharTargetDate = new Date().getTime() + (2 * 60 * 1000);
    intervalX = setInterval(function () {
        var tusharNow = new Date().getTime();
        var tusharDistance = tusharTargetDate - tusharNow;

        if (tusharDistance < 0) {
            clearInterval(intervalX)
            tusharResponsibleTimer();
            tusharDrawCounter += 1;
            tusharGameOver = true;
            checkIsOver();
            refershWinner();
        }
        var tusharMinutes = Math.floor((tusharDistance % (1000 * 60 * 60)) / (1000 * 60));
        var tusharSeconds = Math.floor((tusharDistance % (1000 * 60)) / (1000));
        timer.innerHTML = `Timer: ${tusharMinutes} : ${tusharSeconds}`;


    }, 1000);
}


//we are setting the result here for initial phase.
tusharResult.innerHTML = `
        X won ${localStorage.getItem("x")} time(s) <br>
        O won ${localStorage.getItem("o")} time(s) <br>
        Game has been drawn for ${localStorage.getItem("d")} time(s)
    `;

//this code is responsible for applying texts into the tds.
document.querySelectorAll("td").forEach(td => {
    td.addEventListener("click", function (e) {
        e.preventDefault()
        if (td.innerText === "") {
            if (tusharCount === 1) {
                tusharWhatToShow = "X"
                tusharCount = 0;
                td.style.background = "green"
                td.style.color = "white"
            }
            else {
                tusharWhatToShow = "O"
                tusharCount = 1
                td.style.background = "red"
                td.style.color = "white"
            }
            td.innerHTML = tusharWhatToShow
            checkForWin();
            checkIsOver();
        }
    })

})

function checkForWin() {
    if (tusharCells[0].textContent === tusharWhatToShow && tusharCells[1].textContent === tusharWhatToShow && tusharCells[2].textContent === tusharWhatToShow) {
        tusharGameOver = true;
        tusharManageCounter()
        showWinMessage();
    }
    else if (tusharCells[0].textContent === tusharWhatToShow && tusharCells[3].textContent === tusharWhatToShow && tusharCells[6].textContent === tusharWhatToShow) {
        tusharGameOver = true;
        tusharManageCounter()
        showWinMessage();
    }
    else if (tusharCells[0].textContent === tusharWhatToShow && tusharCells[4].textContent === tusharWhatToShow && tusharCells[8].textContent === tusharWhatToShow) {
        tusharGameOver = true;
        tusharManageCounter();
        showWinMessage();
    }
    else if (tusharCells[3].textContent === tusharWhatToShow && tusharCells[4].textContent === tusharWhatToShow && tusharCells[5].textContent === tusharWhatToShow) {
        tusharGameOver = true;
        tusharManageCounter();
        showWinMessage();
    }
    else if (tusharCells[6].textContent === tusharWhatToShow && tusharCells[7].textContent === tusharWhatToShow && tusharCells[8].textContent === tusharWhatToShow) {
        tusharGameOver = true;
        tusharManageCounter();
        showWinMessage();
    }
    else if (tusharCells[1].textContent === tusharWhatToShow && tusharCells[4].textContent === tusharWhatToShow && tusharCells[7].textContent === tusharWhatToShow) {
        tusharGameOver = true;
        tusharManageCounter();
        showWinMessage();
    }
    else if (tusharCells[2].textContent === tusharWhatToShow && tusharCells[5].textContent === tusharWhatToShow && tusharCells[8].textContent === tusharWhatToShow) {
        tusharGameOver = true;
        tusharManageCounter();
        showWinMessage();
    }
    else if (tusharCells[2].textContent === tusharWhatToShow && tusharCells[4].textContent === tusharWhatToShow && tusharCells[6].textContent === tusharWhatToShow) {
        tusharGameOver = true;
        tusharManageCounter();
        showWinMessage();
    }
    else if (tusharCells[0].textContent && tusharCells[1].textContent && tusharCells[2].textContent && tusharCells[3].textContent && tusharCells[4].textContent && tusharCells[5].textContent && tusharCells[6].textContent && tusharCells[7].textContent && tusharCells[8].textContent) {
        tusharGameOver = true
        showDrawMessage();
    }
}

function showWinMessage() {
    alert(`${tusharWhatToShow} won the game`)
    clearInterval(intervalX);
    tusharResponsibleTimer();
}


function showDrawMessage() {
    alert(`Haha! Game Drawn!`)
    tusharDrawCounter += 1;
}

function checkIsOver() {
    if (tusharGameOver) {
        document.querySelectorAll("td").forEach(td => {
            td.innerText = "";
            td.style.background = "white"
        })
        tusharGameOver = false
        tusharCount = 1

        localStorage.clear();
        localStorage.setItem("x", tusharXcounter);
        localStorage.setItem("o", tusharYcounter);
        localStorage.setItem("d", tusharDrawCounter);
        refershWinner();

    }
}

function tusharManageCounter() {
    if (tusharWhatToShow === "X") {
        tusharXcounter += 1;
    }
    else if (tusharWhatToShow === "O") {
        tusharYcounter += 1;
    }
}

function refershWinner() {
    tusharResult.innerHTML = `
        X won ${localStorage.getItem("x")} time(s) <br>
        O won ${localStorage.getItem("o")} time(s) <br>
        Game has been drawn for ${localStorage.getItem("d")} time(s)
    `;
}


if(!localStorage.getItem("count")){
    localStorage.setItem("count", 0)
}

const tableContainer = document.getElementById("table-container");
var tusharRows = 3;
var tusharCols = 3;
var tusharOpacityCounter = 0.3
var tusharTimer = document.getElementById("timer");
var tusharScoreContainer = document.getElementById("score-container");
var score = parseInt(localStorage.getItem("count"));
tusharResponsibleTimer();
function tusharResponsibleTimer() {
    var tusharTargetDate = new Date().getTime() + (1 * 60 * 1000);
    intervalX = setInterval(function () {
        var tusharNow = new Date().getTime();
        var tusharDistance = tusharTargetDate - tusharNow;

        if (tusharDistance < 0) {
            window.location.reload(); 
        }
        var tusharMinutes = Math.floor((tusharDistance % (1000 * 60 * 60)) / (1000 * 60));
        var tusharSeconds = Math.floor((tusharDistance % (1000 * 60)) / (1000));
        timer.innerHTML = `Timer: ${tusharMinutes} : ${tusharSeconds}`;


    }, 1000);
}
generatingTable(tusharRows, tusharCols)
tusharScoreContainer.innerHTML = `Win Counts: ${localStorage.getItem("count")} `
function generatingTable(tusharRows, tusharCols) {
    if(tusharCols > 8 && tusharRows > 8){
        alert("Game Over, you found it huh")
        localStorage.removeItem("count");
        localStorage.setItem("count", ++score)
        tusharScoreContainer.innerHTML = `Win Counts: ${localStorage.getItem("count")}`
        window.location.reload();
        return;
    }
    var Tushartable = document.createElement("table");
    for (let i = 0; i < tusharRows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < tusharCols; j++) {
            td = document.createElement("td");
            tr.appendChild(td);
        }
        Tushartable.appendChild(tr);
    }

    document.getElementById("table-container").appendChild(Tushartable)

    var tusharTds = document.querySelectorAll("td");
    var tusharRandomNumber = Math.floor(Math.random() * tusharTds.length);
    var tusharR = Math.floor(Math.random() * 255);
    var tusharG = Math.floor(Math.random() * 255);
    var tusharB = Math.floor(Math.random() * 255);
    tusharTds.forEach((td) => {
        td.style.background = `rgba(${tusharR}, ${tusharG}, ${tusharB})`
    })
    tusharTds[tusharRandomNumber].style.background = `rgba(${tusharR}, ${tusharG}, ${tusharB}, ${tusharOpacityCounter})`;
    tusharTds[tusharRandomNumber].addEventListener("click", () => {
        Tushartable.remove();
        tusharOpacityCounter += 0.1
        console.log(tusharOpacityCounter);
        generatingTable(++tusharRows, ++tusharCols)
    })

    
}



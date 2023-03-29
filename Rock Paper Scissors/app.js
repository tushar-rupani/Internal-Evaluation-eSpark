
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const result_area = document.getElementById("result_area")
rock.addEventListener("click", () => {
    tusharUserChoice = "Rock";
    handleLogic();
})

paper.addEventListener("click", () => {
    tusharUserChoice = "Paper";
    handleLogic();
})

scissors.addEventListener("click", () => {
    tusharUserChoice = "Scissors";
    handleLogic();
})

function handleLogic() {
    let tusharComputerChoice = Math.random();
    var finalComputerChoice;
    if (tusharComputerChoice < 0.34) {
        finalComputerChoice = "Rock"
    }
    else if (tusharComputerChoice <= 0.67) {
        finalComputerChoice = "Paper"
    }
    else {
        finalComputerChoice = "Scissors"
    }
    console.log(finalComputerChoice, tusharUserChoice);

    const check = (choice1, choice2) => {
        if (choice1 === choice2) {
            return "It is a tie"
        }
        else if (choice1 === "Rock") {
            if (choice2 == "Scissors") {
                return "Rock wins"
            }
            else {
                return "Paper wins"
            }
        }

        else if (choice1 === "Paper") {
            if (choice2 == "Rock") {
                return "Paper wins"
            }
            else {
                return "Scissors wins"
            }
        }

        else if (choice1 === "Scissors") {
            if (choice2 == "Rock") {
                return "Rock wins"
            }
            else {
                return "Scissors wins"
            }
        }
    }

    const getAns = check(tusharUserChoice, finalComputerChoice)
    result_area.innerHTML = `<center><h3>You selected <span class="green">${tusharUserChoice}</span> : Computer Selected <span class="red">${finalComputerChoice}</span></h3><b color="red">${getAns}<b></center>`
}

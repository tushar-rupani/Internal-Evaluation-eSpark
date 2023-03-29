const tableContainer = document.getElementById("table-container")
var rows = 3;
var cols = 3;
generatingTable(rows, cols)


function generatingTable(rows, cols) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    var table = document.createElement("table");
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            td = document.createElement("td");
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    var randomNumber = 3;
    
    document.getElementById("table-container").appendChild(table)
    document.querySelectorAll("td").forEach((td, idx) => {
        
        td.addEventListener("click", () => {
            const cells = document.querySelectorAll("td");
            console.log(cells);
            randomNumber = Math.floor(Math.random() * ((rows * cols) - 0 + 1)) + 0;
            cells[randomNumber].style.background = "red"
            console.log(randomNumber);
            generatingTable(++rows, ++cols)
        })
        td.style.background = `#${randomColor}`;
    })
}




var elements = document.querySelectorAll("td");
    var randomElement = elements[Math.floor(Math.random() * elements.length)];

    randomElement.style.background = "red"

    randomElement.addEventListener("click", () => {
        elements = document.querySelectorAll("td");
        randomElement = elements[Math.floor(Math.random() * elements.length)]
        for (let td of elements) {
            // console.log("iterate", td);
            if (td === randomElement) {
                randomElement.style.background = "red"
                console.log(randomElement);
                continue;
            }
            td.style.background = "yellow"
        }
        generatingTable(++rows, ++cols)
    })


var board;
var row = 4
var col = 4
var score = 0;

window.onload = function() {
    setGame();
    document.getElementById("up-btn").addEventListener("click", () => {
        slideUp();
        setTwo();
    });
    document.getElementById("down-btn").addEventListener("click", () => {
        slideDown();
        setTwo();
    });
    document.getElementById("left-btn").addEventListener("click", () => {
        slideLeft();
        setTwo();
    });
    document.getElementById("right-btn").addEventListener("click", () => {
        slideRight();
        setTwo();
    });

}
function setGame(){
    // ! This is responsible for loading the game. In the beginning we are setting all the empty squares.
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    // TODO: this code creates the tiles that reside inside the box.
    for(let i=0; i<row; i++){
        for(let j=0; j<col; j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            let num = board[i][j];

            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    // * Generates two random places where we will put the 2's
    setTwo();
    setTwo();
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("x"+num.toString())
        }else{
            tile.classList.add("x8192")
        }
    }
}

function filterZero(row){
    return row.filter(num => num != 0)
}

function slide(row){
    row = filterZero(row);
    for(let i=0; i<row.length - 1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2
            row[i+1] = 0;
            score += row[i]
        }
    }
    row = filterZero(row);
    while(row.length < col){
        row.push(0)
    }
    return row;
}

function slideLeft(){
    for(let r = 0; r < 4; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for(let c = 0; c < col; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}

function slideUp(){
    for(let c = 0; c < col; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for(let r = 0; r < 4; r++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let number = board[r][c]
            updateTile(tile, number)
        }
    }
}

function slideDown(){
    for(let c = 0; c < col; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse()
        row = slide(row);
        row.reverse()
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for(let r = 0; r < 4; r++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let number = board[r][c]
            updateTile(tile, number)
        }
    }
}

function slideRight(){
    for(let r = 0; r < 4; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for(let c = 0; c < col; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}
document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo()
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo()
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo()
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo()
    }
})

function setTwo(){
    if(hasEmptyTile){
        let r = Math.floor(Math.random() * row);
        let c = Math.floor(Math.random() * col);
        if(board[r][c] == 0){

            board[r][c] = 2;
            console.log(board);
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText = "2";
            tile.classList.add("x2")
        }
    }
}
function hasEmptyTile(){
    for(let i=0; i<row; i++){
        for(let j=0; j<col; j++){
            if(board[i][j] == 0){
                return true;
            }
        }
    }
    return false
}
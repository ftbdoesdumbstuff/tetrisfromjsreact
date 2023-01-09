//var declares
var board = [];
var rows = 8;
var columns = 8;
var mineCount = 10;
var boardMines = [];
var tilesClicked = 0; //game ends when tilesClicked = 64 - mineCount
var flagToggle = false;
var gameOver = false;

window.onload = function() {
    createBoardTiles();
}

function createBoardTiles() {
    //update mine count
    document.getElementById("mine-count").innerText = mineCount;
    //init flag toggle button
    document.getElementById("flag-toggle").addEventListener("click", toggleFlag);
    //places mines
    placeMines();
    //load board tiles
    for(let r = 0;r<rows;r++) {
        let row = [];
        for(let c = 0;c<columns;c++) {
            //create div tag for html to run wild
            //constructing div tag as <div id="r-c"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", tileClicked);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function toggleFlag() {
    if(flagToggle) {
        flagToggle = false;
        document.getElementById("flag-toggle").style.backgroundColor = "lightgray";
    } else {
        flagToggle = true;
        document.getElementById("flag-toggle").style.backgroundColor = "darkgray";
    }
}

function tileClicked() {
    if(gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    let tile = this;
    if(flagToggle) {
        if(tile.innerText == "") {
            tile.innerText = "FLAG";
        } else if(tile.innerText == "FLAG") {
            tile.innerText = "";
        }
        return;
    }

    if(boardMines.includes(tile.id)) {
        alert("HEART ATTACK! !!! ! !! !! ! !! !!!  !");
        gameOver = true;
        showBoardMines();
        return;
    }

    //coords becomes array 0 [0][0]
    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkForMine(r,c);
}

function placeMines() {
    let remainingMines = mineCount;
    while(remainingMines > 0) {
        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*columns);
        let id = r.toString()+"-"+c.toString();

        if(!boardMines.includes(id)) {
            boardMines.push(id);
            remainingMines -= 1;
        }
    }
}

function showBoardMines() {
    for(let r = 0;r<rows;r++) {
        for(let c = 0;c<columns;c++) {
            let tile = board[r][c];
            if(boardMines.includes(tile.id)) {
                tile.innerText = "BOMB";
                tile.style.backgroundColor = "red";

            }
        }
    }
}

function checkForMine(r,c) {
    //guard clause
    if(r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if(board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;
    console.log(tilesClicked);
    
    let minesFound = 0;
    //top 3
    minesFound += checkTile(r-1,c-1);
    minesFound += checkTile(r-1,c);
    minesFound += checkTile(r-1,c+1);
    //left and right
    minesFound += checkTile(r,c-1);
    minesFound += checkTile(r,c+1);
    //bottom 3
    minesFound += checkTile(r+1,c-1);
    minesFound += checkTile(r+1,c);
    minesFound += checkTile(r+1,c+1);

    if(minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x"+minesFound.toString());
    } else {
        //top 3 for new target
        checkForMine(r-1,c-1);
        checkForMine(r-1,c);
        checkForMine(r-1,c+1);
        //right left for new target
        checkForMine(r,c-1);
        checkForMine(r,c+1);
        //bottom 3 for new target
        checkForMine(r+1,c-1);
        checkForMine(r+1,c);
        checkForMine(r+1,c+1);
    }

    if(tilesClicked == (rows*columns)-mineCount) {
        document.getElementById("mine-count").innerText = "Cleared";
        gameOver = true;
    }
}

function checkTile(r,c) {
    if(r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if(boardMines.includes(r.toString()+"-"+c.toString())) {
        return 1;
    }
    return 0;
}
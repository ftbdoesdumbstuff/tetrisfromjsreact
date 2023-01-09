//game vars
var cellSize = 50;
var rows = 20;
var cols = 20;
var board;
var context;
var gameOver = false;
//snake vars
var snakeXPos = cellSize*5;
var snakeYPos = cellSize*5;
var xVelocity = 0;
var yVelocity = 0;
var snakeBody = [];
//food vars
var foodXPos;
var foodYPos;

window.onload = function() {
    board = document.getElementById("game-board");
    board.height = rows*cellSize;
    board.width = cols*cellSize;
    context = board.getContext("2d"); //draw call
    setupInputs();
    placeFood();
    setInterval(update, 1000/10);
}

function update() {
    if(gameOver) {return;}
    //game board
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);
    //food
    context.fillStyle="red";
    context.fillRect(foodXPos,foodYPos,cellSize,cellSize);
    console.log(snakeXPos + " " + snakeYPos);
    if(snakeXPos == foodXPos && snakeYPos == foodYPos) {
        snakeBody.push([foodXPos,foodYPos]);
        placeFood();
    }
    //updates snakeBody array
    for(let i=snakeBody.length-1;i>0;i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeXPos,snakeYPos];
    }
    if(snakeXPos < 0) {
        snakeXPos = cols*cellSize;
    } else if(snakeXPos > cols*cellSize) {
        snakeXPos = 0;
    } else if(snakeYPos < 0) {
        snakeYPos = rows*cellSize;
    } else if(snakeYPos > rows*cellSize) {
        snakeYPos = 0;
    }
    //snake head
    context.fillStyle="lime";
    snakeXPos += xVelocity;
    snakeYPos += yVelocity;
    context.fillRect(snakeXPos,snakeYPos,cellSize,cellSize);
    for(let i=0;i<snakeBody.length;i++) {
        context.fillRect(snakeBody[i][0],snakeBody[i][1],cellSize,cellSize);
    }
    //game over conditions
    for(let i = 0; i<snakeBody.length; i++) {
        if(snakeXPos == snakeBody[i][0] && snakeYPos == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over.")
        }
    }
}

//input handling
function setupInputs() {
    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case "w":
            case "ArrowUp":
                if(yVelocity != 1*cellSize) {
                    xVelocity = 0;
                    yVelocity = -1*cellSize;
                    console.log("up")
                }
                break;
            case "a":
            case "ArrowLeft":
                if(xVelocity != 1*cellSize) {
                    xVelocity = -1*cellSize;
                    yVelocity = 0;
                    console.log("left")
                }
                break;
            case "s":
            case "ArrowDown":
                if(yVelocity != -1*cellSize) {
                    xVelocity = 0;
                    yVelocity = 1*cellSize;
                    console.log("down")
                }
                break;
            case "d":
            case "ArrowRight":
                if(xVelocity != -1*cellSize) {
                    xVelocity = 1*cellSize;
                    yVelocity = 0;
                    console.log("right")
                }
                break;
        }
    });
}
function placeFood() {
    foodXPos = Math.floor(Math.random()*cols)*cellSize;
    foodYPos = Math.floor(Math.random()*rows)*cellSize;
}
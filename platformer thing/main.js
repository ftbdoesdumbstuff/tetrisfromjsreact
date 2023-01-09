//page vars
var canvas;
var context;
//game vars
var gameLoop;
var player;
//input vars
var upKey;
var downKey;
var leftKey;
var rightKey;


//executes on page runtime
window.onload = function() {
    //declare vars
    canvas = document.getElementById("game-canvas");
    context = canvas.getContext("2d");
    //init listeners
    setupInputs();
    //init player
    player = new Player(100,400);
    //init game loop
    gameLoop = setInterval(step, 1000/30);
}

function step() {
    player.step();
    

    //draw to canvas
    drawToCanvas();
}

function drawToCanvas() {
    //sanitise canvas
    context.fillStyle = "white";
    context.fillRect(0,0,1280,720);
    //draw objects
    player.drawToCanvas();

}

function setupInputs() {
    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case "w":
            case "ArrowUp":
                upKey = true;
                break;
            case "a":
            case "ArrowLeft":
                leftKey = true;
                break;
            case "s":
            case "ArrowDown":
                downKey = true;
                break;
            case "d":
            case "ArrowRight":
                rightKey = true;
                break;
        }
    });
    document.addEventListener("keyup", function(event) {
        switch(event.key) {
            case "w":
            case "ArrowUp":
                upKey = false;
                break;
            case "a":
            case "ArrowLeft":
                leftKey = false;
                break;
            case "s":
            case "ArrowDown":
                downKey = false;
                break;
            case "d":
            case "ArrowRight":
                rightKey = false;
                break;
        }
    });
}

function printMousePos(event) {
    console.log("clientX: " + event.clientX + " - clientY: " + event.clientY);
  }
document.addEventListener("click", printMousePos);
var canvas = null;
var context = null;
var snake = null;
var over  = true;

window.onload = function() {
  document.body.addEventListener("keydown", function(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 32:
        if (over) start();
        break;
      case 37:
        snake2.turningLeft = true;
        break;
      case 39:
        snake2.turningRight = true;
        break;
      case 65:
        snake1.turningLeft = true;
        break;
      case 68:
        snake1.turningRight = true;
        break;
    }
  });
  document.body.addEventListener("keyup", function(event) {
    switch (event.keyCode) {
      case 37:
        snake2.turningLeft = false;
        break;
      case 39:
        snake2.turningRight = false;
        break;
      case 65:
        snake1.turningLeft = false;
        break;
      case 68:
        snake1.turningRight = false;
        break;
    }
  });

  init();
}

function init() {
  canvas = document.getElementById("playground");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  context = canvas.getContext("2d");

  // x, y, speed, direction, radius, size, color
  snake1 = new Snake(100, canvas.height/2 - 5, 5, 0, 32, 10, "#FF0000");
  snake2 = new Snake(canvas.width-100, canvas.height/2 - 5, 5, -Math.PI, 32, 10, "#0000FF");

  snake1.draw();
  snake2.draw();
}

var n = 0;
function start() {
  over = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake1.draw();
  snake2.draw();
  if (++n % 10 == 0) {
    snake1.growth();
    snake2.growth();
  }
  snake1.update();
  snake2.update();
  requestAnimationFrame(start);
}

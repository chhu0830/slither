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
  snake1 = new Snake(100, canvas.height/2 - 5, 3, 0, 50, 10, "#FF0000");
  snake2 = new Snake(canvas.width-100, canvas.height/2 - 5, 3, -Math.PI, 32, 10, "#0000FF");

  snake1.draw();
  snake2.draw();

  food = new Food(canvas.width, canvas.height, 10, 5);
}


var n = 0;
function start() {
  over = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (++n % 50 == 0) {
    //snake1.growth();
    //snake2.growth();
    food.create();
  }
  snake1.update();
  snake2.update();
  snake1.draw();
  snake2.draw();

  snake1.eat(food);
  snake2.eat(food);

  food.draw();

  requestAnimationFrame(start);
}

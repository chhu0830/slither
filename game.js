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

  snake1 = new Snake( x = 100,
                      y = canvas.height/2 - 5,
                      speed = 3,
                      direction = 0,
                      radius = 32,
                      size = 10,
                      color = "#FF0000");
  snake2 = new Snake( x = canvas.width - 100,
                      y = canvas.height/2 - 5,
                      speed = 3,
                      direction = -Math.PI,
                      radius = 32,
                      size = 10,
                      color = "#0000FF");

  snake1.draw();
  snake2.draw();

  dots = new Dots();
}


var n = 0;
function start() {
  over = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (++n % 50 == 0) {
    dots.create(size = Math.floor(Math.random()*50),
                color = '#'+(Math.random()*0xFFFFFF<<0).toString(16));
  }
  snake1.update();
  snake2.update();

  snake1.eat(dots);
  snake2.eat(dots);

  snake1.draw();
  snake2.draw();
  dots.draw();

  requestAnimationFrame(start);
}

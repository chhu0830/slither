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
      case 38:
        snake2.speedingUp = true;
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
      case 87:
        snake1.speedingUp = true;
        break;
    }
  });
  document.body.addEventListener("keyup", function(event) {
    switch (event.keyCode) {
      case 37:
        snake2.turningLeft = false;
        break;
      case 38:
        snake2.speedingUp = false;
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
      case 87:
        snake1.speedingUp = false;
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
                      speed = 5,
                      direction = 0,
                      radius = 32,
                      size = 10,
                      color = "red",
                      body = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#007FFF", "#0000FF", "#8B00FF"]);
  snake2 = new Snake( x = canvas.width - 100,
                      y = canvas.height/2 - 5,
                      speed = 5,
                      direction = -Math.PI,
                      radius = 32,
                      size = 10,
                      color = "blue",
                      body = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#007FFF", "#0000FF", "#8B00FF"]);

  snake1.draw();
  snake2.draw();

  dots = new Dots();
}


var n = 0;
function start() {
  over = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (++n % 50 == 0) {
    dots.create(new Point(x=null, y=null, size=Math.floor(Math.random()*50)));
  }
  snake1.update();
  snake2.update();

  snake1.touch(dots, snake2);
  snake2.touch(dots, snake1);

  snake1.draw();
  snake2.draw();
  dots.draw();

  document.getElementById("score1").innerHTML = snake1.position.length;
  document.getElementById("score2").innerHTML = snake2.position.length;
  requestAnimationFrame(start);
}

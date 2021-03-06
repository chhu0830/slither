var canvas = null;
var context = null;
var snake = null;
var over  = false;
var pause = false;
var timeout = null;
var skills = null;

window.onload = function() {
  document.body.addEventListener("keydown", function(event) {
    // console.log(event.keyCode);
    switch (event.keyCode) {
      case 32:
        if (over) {
          over = false;
          init();
        }
        else pause ^= 1;
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
                      snake1_config["speed"],
                      snake1_config["direction"],
                      snake1_config["radius"],
                      snake1_config["size"],
                      snake1_config["head"],
                      snake1_config["body"]
                    );
  snake2 = new Snake( x = canvas.width - 100,
                      y = canvas.height/2 - 5,
                      snake2_config["speed"],
                      snake2_config["direction"],
                      snake2_config["radius"],
                      snake2_config["size"],
                      snake2_config["head"],
                      snake2_config["body"]
                    );

  snake1.draw();
  snake2.draw();
  skills = new Skills();

  document.getElementById("score1").innerHTML = 0;
  document.getElementById("score2").innerHTML = 0;
  document.getElementById("msg").innerHTML = "";

  timeout = playTime;
  document.getElementById('time').innerHTML = timeout;

  var interval = null;
  interval = setInterval(function() {
    if (over) clearInterval(interval);
    if (!pause && !over) {
      document.getElementById('time').innerHTML = --timeout;
      skills.create(new Point());
    }
  }, 1000);

  pause = true;
  game();
}


var n = 0;
function game() {
  if (!pause) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (++n % 300 == 0) skills.create(new skillList[Math.floor(Math.random() * skillList.length)]);
    // if (++n % 300 == 0) skills.create(new skillList[0]);
    snake1.update();
    snake2.update();

    snake1.touch(skills.list).forEach(i => {
      skills.delete(i, snake1, snake2);
    });
    snake2.touch(skills.list).forEach(i => {
      skills.delete(i, snake2, snake1);
    });

    var t1 = snake1.touch(snake2.position.map(p => Object({position:p, size:snake2.size})));
    var t2 = snake2.touch(snake1.position.map(p => Object({position:p, size:snake1.size})));
    var len1 = snake2.position.length - (t1[0] || 0);
    var len2 = snake1.position.length - (t2[0] || 0);
    if (t2.length > 0) snake1.position.splice(t2[0] || 1);
    if (t1.length > 0) snake2.position.splice(t1[0] || 1);
    if (t1.length > 0) snake1.growth(len1 / 2);
    if (t2.length > 0) snake2.growth(len2 / 2);
    if (timeout == 0) {
      if (snake1.position.length > snake2.position.length) gameover("Red Win");
      else if (snake2.position.length > snake1.position.length) gameover("Blue Win");
      else gameover("Draw");
    }

    document.getElementById("score1").innerHTML = snake1.position.length;
    document.getElementById("score2").innerHTML = snake2.position.length;

    snake1.draw();
    snake2.draw();
    skills.draw();
  }
  if (!over) requestAnimationFrame(game);
}

function gameover(content) {
  over = true;
  document.getElementById("msg").innerHTML = content;
}

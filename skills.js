class Skills {
  constructor() {
    this.list = new Array();
  }

  create(skill) {
    this.list.push(skill)
  }

  draw() {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i].draw();
    }
  }

  delete(i, me, op) {
    this.list[i].active(me, op);
    this.list.splice(i, 1);
  }
}

class Point {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = Math.ceil(Math.random() * 50);
    this.color = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    this.time = 0;
    this.rate = 1;
  }

  active(me, op) {
    for (var i = 0; i < 100 / this.size; i++)
      me.growth();
  }

  draw() {
    if (this.rate < 100) this.rate += 2;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position.x, this.position.y, Math.ceil(this.size * this.rate/100), 0, Math.PI*2);
    context.fill();
  }
}

class Slow {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 2000;
    this.img = document.createElement("img");
    this.img.src = "./img/dog.jpg";
  }

  active(me, op) {
    op.speed.multiplyBy(0.5);
    setTimeout(function() {
      op.speed.multiplyBy(2);
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Separate {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.img = document.createElement("img");
    this.img.src = "./img/dog.jpg";
    this.snake = new Snake(x = canvas.width - 100,
                    y = canvas.height/2 - 5,
                    speed = 5,
                    direction = -Math.PI,
                    radius = 32,
                    size = 10,
                    color = "blue",
                    body = ["#FF0000", "#FFA500", "#FFFF00"]);
  }

  active(me, op) {
    var interval = setInterval(function(tmp) {
      tmp.snake.update();
      tmp.snake.draw();
      console.log(tmp.snake);
    }, 100, this);
    setTimeout(clearInterval, this.time, interval);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Sandy {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 20000;
    this.img = document.createElement("img");
    this.img.src = "https://cdn.urstylemap.com/user/head/large/10113_9.jpg";
  }

  active(me, op) {

    var snakeFake = new Snake( x = canvas.width - 100,
                      y = canvas.height/2 - 5,
                      speed = 5,
                      direction = -Math.PI,
                      radius = 32,
                      size = 10,
                      color = "#ff6566",
                      body = ["#ff6566", "#ff6966", "#ff8266", "#ff9267", "#ff9f63", "#ff9d64", "#ffb764", "#fcb865", "#ffbf68", "#fcb865", "#ffb764", "#ff9d64", "#ff9f63", "#ff9267", "#ff9267", "#ff8266", "#ff6966", "#ff6966"]);
    snakeFake.draw();
    me.size += 10;
    setTimeout(function() {
      me.size -= 10;
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class AV_Guy {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    
    this.position = new Vector(x, y);
    this.size = 30;
    this.time = 10;
    this.img = document.createElement("img");
    this.img.src = "./img/Young.png";
  }

  active(me, op) {
    var orign_speed = new Vector(op.speed.x, op.speed.y);
    var orign_position = [new Vector(op.position[0].x, op.position[0].y)];
    var orign_color = op.color;
    var orign_body = op.body;

    op.color = "white";
    op.body = ["white", "black"];
    op.speed.setX(0);
    op.speed.setY(0);
    
    document.body.style.backgroundImage = "url(http://www.chinapress.com.my/wp-content/uploads/2017/09/20170904pfb37a.jpg)";
    
    for (var i = 0; i < 100000; i++) {
      if (i % 4 ==  0) {
        setTimeout(function() {
          op.position[0].setX(op.position[0].x + 20);
        }, this.time);
      }
      else if (i % 4 == 1) {
        setTimeout(function() {
          op.position[0].setY(op.position[0].y - 20);
        }, this.time);
      }
      else if (i % 4 == 2) {
        setTimeout(function() {
          op.position[0].setX(op.position[0].x - 20);
        }, this.time);
      }
      else if (i % 4 == 3) {
        setTimeout(function() {
          op.position[0].setY(op.position[0].y + 20);
        }, this.time);
      }
    }
    
    setTimeout(function() {
      op.speed.setX(orign_speed.x);
      op.speed.setY(orign_speed.y);
      op.color = orign_color;
      op.body = orign_body;
      document.body.style.backgroundImage = "";
    }, 1600);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Stop {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 10;
    this.time = 2000;
    this.img = document.createElement("img");
    this.img.src = "https://upload.wikimedia.org/wikipedia/commons/1/1c/Italian_traffic_signs_-_fermarsi_e_dare_precedenza_-_stop.svg";
  }

  active(me, op) {
    op.speed.multiplyBy(0.00001);
    setTimeout(function() {
      op.speed.multiplyBy(100000);
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

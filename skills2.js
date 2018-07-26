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

class PushFood {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.img = document.createElement("img");
    this.img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY-yE-7mdD4adekzFBPythGfel5QjrWeqkNcO9-FoIKbH209o-";
  }

  active(me, op) {
    var interval = setInterval(function() {
      var s = skills.list;
      for (var i = 0, len = s.length; i < len; i++) {
        var dx = op.position[0].x - s[i].position.x;
        var dy = op.position[0].y - s[i].position.y;
        var r = op.speed.getLength()*2 + s[i].size + op.size
        if (dx*dx + dy*dy < r*r) {
          s[i].position.x += op.speed.x;
          s[i].position.y += op.speed.y;
        }
      }
    }, 1);
    setTimeout(clearInterval, 3000, interval);
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

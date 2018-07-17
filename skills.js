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
    this.img.src = "https://cdn.iconscout.com/public/images/icon/premium/png-512/turtle-nature-slow-animal-wildlife-forest-3fd601349b556535-512x512.png";
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

class PushFood {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.img = document.createElement("img");
    this.img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY-yE-7mdD4adekzFBPythGfel5QjrWeqkNcO9-FoIKbH209o-";
    this.s = skills;
  }

  active(me, op) {
    var interval = setInterval(function(s) {
      for (var i = 0, len = s.length; i < len; i++) {
        var dx = op.position[0].x - s[i].position.x;
        var dy = op.position[0].y - s[i].position.y;
        var r = op.speed.getLength()*2 + s[i].size + op.size
        if (dx*dx + dy*dy < r*r) {
          s[i].position.x += op.speed.x;
          s[i].position.y += op.speed.y;
        }
      }
    }, 1, this.s.list);
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

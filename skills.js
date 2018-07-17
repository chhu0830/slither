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

class Night {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 1000;
    this.img = document.createElement("img");
    this.img.src = "https://vignette.wikia.nocookie.net/mtg/images/2/2f/The_Dark_symbol.png/revision/latest?cb=20100208020734";
  }

  active(me, op) {
    var block = document.createElement("div");
    block.style.height = document.body.clientHeight + "px";
    block.style.width = document.body.clientWidth + "px";
    block.style.position = "absolute";
    block.style.top = 0;
    block.style.left = 0;
    block.style.backgroundColor = "black";
    block.style.zIndex = 10;
    document.body.appendChild(block);
    setTimeout(function() {
      document.body.removeChild(block)
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

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
    var x = x || Math.random() * canvas.width;
    var y = y || Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.color = 'black';
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
    context.fill();  
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

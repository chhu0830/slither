class Point {
  constructor(x=null, y=null, size=10, color=null, time=5) {
    var x = x || Math.random() * canvas.width;
    var y = y || Math.random() * canvas.height;
    this.position = vector.create(x, y);
    this.size = size;
    this.color = color || "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    this.time = time;
    this.point = size;
  }

  active(me, op) {
    for (var i = 0; i < 100 / this.size; i++)
      me.growth();
  }

  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position.getX(), this.position.getY(), this.size, 0, Math.PI*2);
    context.fill();
  }
}

class Snake {
  constructor(x=0, y=0, speed=5, direction=0, radius=32, size=10, color="#000000") {
    this.position = [vector.create(x, y)];
    this.speed    = vector.create(speed, 0);
    this.speed.setAngle(direction);
    this.radius   = radius;
    this.size     = size;
    this.color    = color;
    this.turningLeft = false;
    this.turningRight = false;
  }

  draw() {
    context.lineWidth = this.size*2;
    context.strokeStyle = this.color;
    for (var i = 1; i < this.position.length; i++) {
      context.beginPath();
      context.moveTo(this.position[i-1].getX(), this.position[i-1].getY());
      context.lineTo(this.position[i].getX(), this.position[i].getY());
      context.stroke();
    }
    context.fillStyle = this.color;
    for (var i = 0; i < this.position.length; i++) {
      context.beginPath();
      context.arc(this.position[i].getX(), this.position[i].getY(), this.size, 0, Math.PI*2);
      context.fill();
    }
  }

  update() {
    for (var i = this.position.length-1; i > 0; i--) {
      this.position[i].setX(this.position[i-1].getX());
      this.position[i].setY(this.position[i-1].getY());
    }
    if (this.turningLeft) this.turnLeft();
    if (this.turningRight) this.turnRight();
    this.position[0].addTo(this.speed);
    if (this.position[0].getX() < 0 - this.size) this.position[0].setX(canvas.width + this.size);
    if (this.position[0].getX() > canvas.width + this.size) this.position[0].setX(0 - this.size);
    if (this.position[0].getY() < 0 - this.size) this.position[0].setY(canvas.height + this.size);
    if (this.position[0].getY() > canvas.height + this.size) this.position[0].setY(0 - this.size);
  }

  growth() {
    var len = this.position.length
    this.position.push(vector.create(this.position[len-1].getX(), this.position[len-1].getY()));
  }

  turnLeft() {
    this.speed.setAngle(this.speed.getAngle() - Math.PI/this.radius);
  }

  turnRight() {
    this.speed.setAngle(this.speed.getAngle() + Math.PI/this.radius);
  }

  touch(dots, op) {    
    for(var i = 0; i < dots.list.length; i++) {
      var x = this.position[0].getX() - dots.list[i].position.getX();
      var y = this.position[0].getY() - dots.list[i].position.getY();
      var dist = Math.sqrt(x*x + y*y);
      if(dist < this.size + dots.list[i].size) {
        dots.delete(i, this, op);
      }
    }
  }
}

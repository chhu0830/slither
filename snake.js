class Snake {
  constructor(x=0, y=0, speed=5, direction=0, radius=32, size=10, color="#000000") {
    this.position = [vector.create(x, y)];
    this.lastX = x;
    this.lastY = y;
    this.speed    = vector.create(speed, 0);
    this.speed.setAngle(direction);
    this.default_speed    = vector.create(speed, 0);
    this.default_speed.setAngle(direction);
    this.radius   = radius;
    this.size     = size;
    this.color    = color;
    this.turningLeft = false;
    this.turningRight = false;
    this.speedingUp = false;
    this.shrinkTime = 0;
  }

  draw() {
    context.fillStyle = this.color;
    for (var i = 0, len = this.position.length; i < len; i++) {
      context.beginPath();
      context.arc(this.position[i].getX(), this.position[i].getY(), this.size, 0, Math.PI*2);
      context.fill();
    }
  }

  update() {
    var len = this.position.length;
    this.lastX = this.position[len-1].getX();
    this.lastY = this.position[len-1].getY();

    if (this.turningLeft) this.turnLeft();
    if (this.turningRight) this.turnRight();
    for (var i = this.position.length-1; i >= 0; i--) {
      this.position[i].addTo(this.speed);
    }
    
    this.speedUp();
    
    if (this.position[0].getX() < 0 - this.size) this.position[0].setX(canvas.width + this.size);
    if (this.position[0].getX() > canvas.width + this.size) this.position[0].setX(0 - this.size);
    if (this.position[0].getY() < 0 - this.size) this.position[0].setY(canvas.height + this.size);
    if (this.position[0].getY() > canvas.height + this.size) this.position[0].setY(0 - this.size);
  }

  growth() {  
    this.position.push(vector.create(this.lastX, this.lastY));
  }

  shrink() {
    this.position.splice(this.position.length-1, 1);
  }

  turnLeft() {
    this.speed.setAngle(this.speed.getAngle() - Math.PI/this.radius);
  }

  turnRight() {
    this.speed.setAngle(this.speed.getAngle() + Math.PI/this.radius);
  }

  speedUp() {
    var dv = Math.abs(this.speed.getLength() - this.default_speed.getLength());
    if(this.speedingUp && this.position.length > 1) {
      if(dv <= 0.0000001) {
        this.speed.multiplyBy(2);
      }
      if(++this.shrinkTime % 10 == 0) {
        this.shrink();
      }  
    }
    else {
      if(dv > 0.0000001) {
        this.speed.divideBy(2);
      }
    }
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

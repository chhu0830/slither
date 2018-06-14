class Snake {
  constructor(x=0, y=0, speed=5, direction=0, radius=32, size=10, color="#000000", body=null) {
    this.position = [vector.create(x, y)];
    this.speed    = vector.create(speed, 0);
    this.speed.setAngle(direction);
    this.radius   = radius;
    this.size     = size;
    this.color    = color;
    this.body     = body || [color];
    this.turningLeft = false;
    this.turningRight = false;
    this.speedingUp = false;
    this.consuming = 0;
    this.consumeGap = 50;
  }

  draw() {
    for (var i = 0; i < this.position.length; i++) {
      context.fillStyle = this.body[i % this.body.length];
      context.beginPath();
      context.arc(this.position[i].getX(), this.position[i].getY(), this.size, 0, Math.PI*2);
      context.fill();
    }
    context.lineWidth = this.size*2;
    for (var i = 0; i < this.position.length-1; i++) {
      context.strokeStyle = this.body[i % this.body.length];
      context.beginPath();
      context.moveTo(this.position[i].getX(), this.position[i].getY());
      context.lineTo(this.position[i+1].getX(), this.position[i+1].getY());
      context.stroke();
    }
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position[0].getX(), this.position[0].getY(), this.size, 0, Math.PI*2);
    context.fill();
  }

  update() {
    for (var i = this.position.length-1; i > 0; i--) {
      this.position[i].setX(this.position[i-1].getX());
      this.position[i].setY(this.position[i-1].getY());
    }

    if (this.turningLeft) this.turnLeft();
    if (this.turningRight) this.turnRight();
    if (this.speedingUp) this.speedUp();

    this.position[0].addTo(this.speed);

    if (this.position[0].getX() < this.size) {
      this.position[0].setX(this.size)
      if (this.speed.getY() > 0) this.speed.setAngle(Math.PI*0.5);
      else this.speed.setAngle(Math.PI*1.5);
    }
    if (this.position[0].getX() > canvas.width - this.size) {
      this.position[0].setX(canvas.width - this.size);
      if (this.speed.getY() > 0) this.speed.setAngle(Math.PI*0.5);
      else this.speed.setAngle(Math.PI*1.5);
    }
    if (this.position[0].getY() < this.size) {
      this.position[0].setY(this.size);
      if (this.speed.getX() > 0) this.speed.setAngle(0);
      else this.speed.setAngle(Math.PI);
    }
    if (this.position[0].getY() > canvas.height - this.size) {
      this.position[0].setY(canvas.height - this.size);
      if (this.speed.getX() > 0) this.speed.setAngle(0);
      else this.speed.setAngle(Math.PI);
    }
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

  speedUp() {
    if (this.position.length > 1) {
      this.position[0].addTo(this.speed);
      if (++this.consuming % this.consumeGap == 0) {
        this.position.pop();
      }
    }
  }

  touch(dots) {
    var ret = [];
    for(var i = 0; i < dots.length; i++) {
      var d = this.position[0].subtract(dots[i].position);
      var dx = d.getX();
      var dy = d.getY();
      var dist = Math.sqrt(dx*dx + dy*dy);
      if(dist <= this.size + dots[i].size)
        ret.push(i);
    }
    return ret;
  }
}

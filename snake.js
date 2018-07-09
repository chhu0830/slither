class Snake {
  constructor(x, y, speed, direction, radius, size, color, body) {
    this.position = [new Vector(x, y)];
    this.speed    = new Vector(speed, 0);
    this.speed.setAngle(direction);
    this.radius   = radius;
    this.size     = size;
    this.color    = color;
    this.body     = body;
    this.turningLeft = false;
    this.turningRight = false;
    this.speedingUpRate = 3;
    this.speedingUp = false;
    this.consuming = 0;
    this.consumeGap = 50;
  }

  draw() {
    for (var i = this.position.length - 1; i >= 0; i--) {
      context.fillStyle = this.body[i % this.body.length];
      context.beginPath();
      context.arc(this.position[i].x, this.position[i].y, this.size, 0, Math.PI*2);
      context.fill();
    }
    context.lineWidth = this.size*2;
    for (var i = this.position.length - 2; i >= 0; i--) {
      context.strokeStyle = this.body[i % this.body.length];
      context.beginPath();
      context.moveTo(this.position[i].x, this.position[i].y);
      context.lineTo(this.position[i+1].x, this.position[i+1].y);
      context.stroke();
    }
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position[0].x, this.position[0].y, this.size, 0, Math.PI*2);
    context.fill();
  }

  update() {
    for (var i = this.position.length-1; i > 0; i--) {
      this.position[i].setX(this.position[i-1].x);
      this.position[i].setY(this.position[i-1].y);
    }

    if (this.turningLeft) this.turnLeft();
    if (this.turningRight) this.turnRight();
    if (this.speedingUp) this.speedUp();

    this.position[0].addTo(this.speed);

    if (this.position[0].x < this.size) {
      this.position[0].setX(this.size)
      if (this.speed.y > 0) this.speed.setAngle(Math.PI*0.5);
      else this.speed.setAngle(Math.PI*1.5);
    }
    if (this.position[0].x > canvas.width - this.size) {
      this.position[0].setX(canvas.width - this.size);
      if (this.speed.y > 0) this.speed.setAngle(Math.PI*0.5);
      else this.speed.setAngle(Math.PI*1.5);
    }
    if (this.position[0].y < this.size) {
      this.position[0].setY(this.size);
      if (this.speed.x > 0) this.speed.setAngle(0);
      else this.speed.setAngle(Math.PI);
    }
    if (this.position[0].y > canvas.height - this.size) {
      this.position[0].setY(canvas.height - this.size);
      if (this.speed.x > 0) this.speed.setAngle(0);
      else this.speed.setAngle(Math.PI);
    }
  }

  growth() {
    var len = this.position.length
    this.position.push(new Vector(this.position[len-1].x, this.position[len-1].y));
  }

  turnLeft() {
    this.speed.setAngle(this.speed.getAngle() - Math.PI/this.radius);
  }

  turnRight() {
    this.speed.setAngle(this.speed.getAngle() + Math.PI/this.radius);
  }

  speedUp() {
    if (this.position.length >= 10) {
      this.position[0].addTo(this.speed.multiply(this.speedingUpRate/Math.sqrt(2) - 1));
      if (++this.consuming % this.consumeGap == 0) {
        this.position.splice(-Math.floor(this.position.length/10));
      }
    }
  }

  touch(skills) {
    var ret = [];
    for(var i = 0; i < skills.length; i++) {
      var d = this.position[0].subtract(skills[i].position);
      var dx = d.x;
      var dy = d.y;
      var dist = Math.sqrt(dx*dx + dy*dy);
      if(dist <= this.size + skills[i].size)
        ret.push(i);
    }
    return ret;
  }
}

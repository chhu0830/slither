class Vector {
  constructor(x=1, y=0) {
    this.x = x;
    this.y = y;
  }

  setX(value) {
    this.x = value;
  }

  getX(value) {
    return this.x;
  }

  setY(value) {
    this.y = value;
  }

  getY(value) {
    return this.y;
  }

  setAngle(angle) {
    var length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  setLength(length) {
    var angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(v2) {
    return new Vector(this.x + v2.getX(), this.y + v2.getY());
  }

  subtract(v2) {
    return new Vector(this.x - v2.getX(), this.y - v2.getY());
  }

  multiply(val) {
    return new Vector(this.x * val, this.y * val);
  }

  divide(val) {
    return new Vector(this.x / val, this.y / val);
  }

  addTo(v2) {
    this.x += v2.getX();
    this.y += v2.getY();
  }

  subtractFrom(v2) {
    this.x -= v2.getX();
    this.y -= v2.getY();
  }

  multiplyBy(val) {
    this.x *= val;
    this.y *= val;
  }

  divideBy(val) {
    this.x /= val;
    this.y /= val;
  }
}

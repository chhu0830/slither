class Dot {
	constructor(x, y, size=10, color="#000000", skill) {
		this.position = vector.create(x, y);
    this.color = color;
		this.size = size;
    this.skill = skill;
	}

	draw() {
		context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position.getX(), this.position.getY(), this.size, 0, Math.PI*2);
    context.fill();
	}
}

class Dots {
	constructor() {
    this.list = new Array();
	}

	create(size, color="#000000", skill) {
		var x = Math.random() * canvas.height;
		var y = Math.random() * canvas.width;
    this.list.push(new Dot(x, y, size, color, skill))
	}

  draw() {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i].draw();
    }
  }

	delete(i) {
		this.list.splice(i, 1);
	}
}

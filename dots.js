class Dots {
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

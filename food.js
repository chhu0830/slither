class Food {
	constructor(width, height, length, size) {
		this.size = size;
		this.length = length;
		this.rangeX = width;
		this.rangeY = height;
		this.position = new Array();
		for(var i = 0; i < this.length; i++) {
			var x = Math.random() * this.rangeX;
			var y = Math.random() * this.rangeY;
			this.position.push(vector.create(x, y));
		}
	}

	draw() {
		context.fillStyle = "#000000";
		for (var i = 0; i < this.length; i++) {
	      context.beginPath();
	      context.arc(this.position[i].getX(), this.position[i].getY(), this.size, 0, Math.PI*2);
	      context.fill();
	    }
	}

	create() {
		var x = Math.random() * this.rangeX;
		var y = Math.random() * this.rangeY;
		this.position.push(vector.create(x, y));
		this.length = this.length + 1;
	}

	delete(i) {
		this.position.splice(i, 1);
		this.length = this.length - 1;
	}
}
/**
 * @constructor Creates Vector2
 * @class Vector2
 * 
 */
pn.Vector2 = function (x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

pn.Vector2.prototype = {
	/**
	 * Sets the x and y values of the vector
	 * @public
	 */
	set: function (x, y) {
		this.x = x;
		this.y = y;
	},

	/**
	 * Adds dx and dy to the x and y values of the vector
	 * @public
	 * @function
	 */
	add: function (dx, dy) {
		this.x += dx;
		this.y += dy;
	},

	/**
	 * Subtracts dx and dy to the x and y values of the vector
	 * @public
	 * @function
	 */
	sub: function (x, y) {
		this.x -= x;
		this.y -= y;
	},

	/**
	 * Multiplies dx and dy to the x and y values of the vector
	 * @public
	 * @function
	 */
	mul: function (x, y) {
		this.x *= x;
		this.y *= y;
	},

	/**
	 * Divides dx and dy to the x and y values of the vector
	 * @public
	 * @function
	 */
	div: function (x, y) {
		this.x /= x;
		this.y /= y;
	},

	/**
	 * Copys the vector into a new object
	 * @public
	 * @function
	 */
	copy: function () {
		return new Vector2(this.x, this.y);
	},

	/**
	 * Gets the distance between two vecotrs
	 * @public
	 * @function
	 */
	dist: function (other) {
		return Math.sqrt(((this.x-other.x)*(this.x-other.x) + (this.y-other.y)*(this.y-other.y)));
	},

	equals: function (other) {
		return (this.x === other.x && this.y === other.y);
	}
};
/**
 * Creates a Game Camera to manipultate the view
 * @constructor
 * @class GameCam
 */
pn.GameCam = function () {
	this.position = new pn.Vector2(); 
	this.dimensions = new pn.Vector2(); 
	this.tiles = new pn.Vector2();
	this.sourceTile = new pn.Vector2();
	this.sourcePixel = new pn.Vector2();
	this.velocity = new pn.Vector2();
};

pn.GameCam.prototype = {
	/**
	 * Set world position to start rendering from
	 * @method setPos
	 */
	setPos: function (x, y) {
		this.position.set(x, y);
	},

	/**
	 * Get world position 
	 * @method getPos
	 * @returns {Vector2}
	 */
	getPos: function () {
		return this.position;
	},

	/**
	 * Set width and height to render
	 * @method setDimensions
	 */
	setDimensions: function (w, h) {
		this.dimensions.set(w, h);
	},

	/**
	 * Get width and height of render
	 * @method getDimensions
	 * @returns {Vector2}
	 */
	getDimensions: function () {
		return this.dimensions;
	},

	/**
	 * Set rows and columns to render
	 * @method setTiles
	 */
	setTiles: function (c, r) {
		this.tiles.set(c, r);
	},

	/**
	 * Get rows and columns of render
	 * @method getTiles
	 * @returns {Vector2}
	 */
	getTiles: function () {
		return this.tiles;
	},

	/**
	 * Set start row and start column to render
	 * @method setSourceTile
	 */
	setSourceTile: function (sr, sc) {
		this.sourceTile.set(sr, sc);
	},

	/**
	 * Get start row and start column of render
	 * @method getSourceTile
	 * @returns {Vector2}
	 */
	getSourceTile: function () {
		return this.sourceTile;
	},

	/**
	 * Set start row and start column to render
	 * @method setSourcePixel
	 */
	setSourcePixel: function (px, py) {
		this.sourcePixel.set(px, py);
	},

	/**
	 * Get start row and start column of render
	 * @method getSourcePixel
	 * @returns {Vector2}
	 */
	getSourcePixel: function () {
		return this.sourcePixel;
	},

	/**
	 * Set velocity of camera
	 * @method setVelocity
	 */
	setVelocity: function (vx, vy) {
		this.velocity.set(vx, vy);
	},

	/**
	 * Get velocity of camera
	 * @method getVelocity
	 * @returns {Vector2}
	 */
	getVelocity: function () {
		return this.velocity;
	}
};
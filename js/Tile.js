//Tile.js
var Tile = function(texture, x, y) {
	this.texture = texture;
	this.w = SpriteSheet.map['texture'].w;
	this.h = SpriteSheet.map['texture'].h;
	this.x = x;
	this.y = y;	
		
	this.update = function(dt) {
		
	};
	
	this.draw = function(ctx) {
		SpriteSheet.draw(ctx,this.texture,this.x,this.y);
	};
}

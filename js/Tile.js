/**
 * @constructor Creates Tile
 * @class Tile
 * @param {String} texture - Reference item in image
 * @param {Number} x - X coordinate to start rendering at
 * @param {Number} y - Y coordinate to start rendering at
 * @param {Number} r - Row number
 * @param {Number} c - Column number
 */
var Tile = function(texture, x, y, r, c) {

   this.texture = texture;
   this.w = SpriteSheet.map[texture].w;
   this.h = SpriteSheet.map[texture].h;
   this.position = new pn.Vector2(x, y);
   this.tile = new pn.Vector2(c, r);
      
   /**
    * Alter position of texture
    * @public
    * @method
    * @name update
    * @param {Number} dt - Detla time for animation timing.
    */
   this.update = function(dt) {   
      this.position.add(
         pn.game.gameCam.getVelocity().x,
         pn.game.gameCam.getVelocity().y
      );
      if (this.texture == 20) {
         // animate water here
      }   

   };
   
   /**
    * Dispatch the drawing to the SpriteSheet
    * @public
    * @method
    * @name draw
    * @param {DOMNode} ctx - Reference to the canvas in the DOM
    */
   this.draw = function(ctx) {
      SpriteSheet.draw(ctx, this.texture, this.position.x, this.position.y);
   };
}

/**
 * @constructor Creates SpriteSheet
 * @class SpriteSheet
 */
var SpriteSheet = new function() {

   /**
    * Describes the contents of the loaded image
    * @public
    * @type {Object.<Object>}
    */
   this.map = {}; 

   /**
    * Describes the contents of the loaded image
    * @public
    * @method
    * @name load
    */
   this.load = function(spriteData, callback) { 
      this.map = spriteData.map;
      this.image = new Image();
      this.image.onload = callback;
      this.image.src = spriteData.image;
   };

   /**
    * Draw on to the canvas DOMNode
    * @public
    * @method
    * @name draw 
    * @param {DOMNode} ctx - reference to the canvas in the DOM
    * @param {Object} sprite - Renderable information
    * @param {Number} x - X coordinate to start rendering at
    * @param {Number} y - Y coordinate to start rendering at
    * @param {Number} frame - choose frame in the items series
    */
   this.draw = function(ctx, sprite, x, y, frame) {
      var s = this.map[sprite];
      if(!frame) frame = 0;
      ctx.drawImage(
         this.image,
         s.sx + frame * s.w, 
         s.sy, 
         s.w, s.h, 
         Math.floor(x), Math.floor(y),
         s.w, s.h
      );
   };
};


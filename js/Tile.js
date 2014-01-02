//Tile.js
var Tile = function(texture, x, y, r, c) {
   this.texture = texture;
   this.w = SpriteSheet.map[texture].w;
   this.h = SpriteSheet.map[texture].h;
   this.x = x;
   this.y = y;   
   this.row = r;
   this.col = c;
      
   this.update = function(dt) {   
      this.x = this.x + Game.gameCam.vx*8;
      this.y = this.y + Game.gameCam.vy*8;
      if (this.texture == 20) {
        // animate water here
      }   

   };
   
   this.draw = function(ctx) {
      SpriteSheet.draw(ctx,this.texture,this.x,this.y);
   };
}

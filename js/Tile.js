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

      /* Moving Up
		if (this.x > (Game.gameCam.w + 128)) {

         // Load the next row on the top
         var newRow = this.row-Game.gameCam.rows-1;
         if (this.col == NaN || this.col === undefined) {
            return;
         }
         if (newRow == NaN || newRow === undefined) {
            return;
         }
         if (Game.board.map === undefined) {
            return;
         }
         var texture = Game.board.map[this.col][newRow];

         Game.board.add(new Tile(texture, (-(64 + Game.gameCam.x%64)+(this.col)*64), (-(64 + Game.gameCam.y%64)+(newRow)*64)), newRow, this.col);

         // Marked to remove
         Game.board.markToRemove(this);
      }

      // Moving Down
       else if (this.x < -128) {
         var newRow = this.row-Game.gameCam.rows-1;
         if (this.col == NaN || this.col === undefined) {
            return;
         }
         if (newRow == NaN || newRow === undefined) {
            return;
         }
         if (Game.board.map === undefined) {
            return;
         }
         // Load the next row on the bottom
         var newRow = this.row+1;
         Game.board.add(new Tile(Game.board.map[this.col][newRow],
            (-(64 + Game.gameCam.x%64)+(this.col)*64),
            (-(64 + Game.gameCam.y%64)+(newRow)*64)), 
            newRow, this.col);

         // Marked to remove
         Game.board.markToRemove(this);
      }

      // Moving Right
      else if (this.y > (Game.gameCam.h + 128)) {
         var newCol = this.col-Game.gameCam.cols-1;
         if (this.row == NaN || this.row === undefined) {
            return;
         }
         if (newCol == NaN || newCol === undefined) {
            return;
         }
         if (Game.board.map === undefined) {
            return;
         }
         // Load the next column on the right
         
         Game.board.add(new Tile(Game.board.map[newCol][this.row],
            (-(64 + Game.gameCam.x%64)+(newCol)*64),
            (-(64 + Game.gameCam.y%64)+(this.row)*64)), 
            newRow, this.col);

         // Marked to remove
         Game.board.markToRemove(this);
      }

      // Moving Left
      else if (this.y < -128) {

         var newCol = this.col+1;
         if (this.row == NaN || this.row === undefined) {
            return;
         }
         if (newCol == NaN || newCol === undefined) {
            return;
         }
         if (Game.board.map === undefined) {
            return;
         }
         // Load the next column on the left
        
         Game.board.add(new Tile(Game.board.map[newCol][this.row],
            (Game.gameCam.ox)+(newCol)*64),
            ((Game.gameCam.oy)+(this.row)*64), 
            newRow, this.col);

         // Marked to remove
         Game.board.markToRemove(this);

      } else { */     
      this.x = this.x + Game.gameCam.vx*8;
      this.y = this.y + Game.gameCam.vy*8;
      if (this.texture == 20) {
        // animate water here
      }   
      //}

	};
	
	this.draw = function(ctx) {
		SpriteSheet.draw(ctx,this.texture,this.x,this.y);
	};
}

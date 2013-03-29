
var Character = new function (col, row, equipt, warlord) {
   this.col = col;
   this.row = row;
   // forest, moutains, water, attack
   this.equipt = equipt;
   this.warlord = warlord;
   this.x = this.col*64-32;
   this.y = this.row*64-32;

   this.move = function (newcol, newrow) {
      this.x
      this.y   
   }
   
   this.buildPath = function () {
      
   }
   
   this.update = function (dt) {
      
   }

   this.iterate = function () {
      this.resetObjectsToRemove();
		this.iterate('update', dt);
		this.finalizeRemoved();	
   }
   
   this.draw = function () {
      this.iterate('draw',ctx);
   }
}

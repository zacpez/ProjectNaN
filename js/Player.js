
var Player = new function () {
   var self = this;
   this.characters = [];
   this.movements = [];

   this.init = function () {
      self.setMovements();
   }

   this.addCharacter = function () {
      Game.setScreen(10, new Character())
   }

   this.setMovements = function () {
      for (var i = 0; i < 9; i++) {
         for (var i = 0; i < 9; i++) {
            this.movements[x][y] = 0;
         }
      }
      this.movements
      for (var i = 0; i < 5; i++){
         var x = Math.round(Math.random()*8);
         var y = Math.round(Math.random()*8);
         if (this.movements[x][y] === 0){
            this.movements[x][y] = 1;
         }
      }
      for (var i = 0; i < 5; i++){
         var x = Math.round(Math.random()*8);
         var y = Math.round(Math.random()*8);
         if (this.movements[x][y] === 0){
            this.movements[x][y] = 2;
         }
      }
      for (var i = 0; i < 5; i++){
         var x = Math.round(Math.random()*8);
         var y = Math.round(Math.random()*8);
         if (this.movements[x][y] === 0){
            this.movements[x][y] = 3;
         }
      }
   }
}

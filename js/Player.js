
var Player = new function (name) {
   var self = this;
   this.name = name;
   this.characters = [];
   this.movements = [];
   this.isWarlord = 1;

   this.init = function () {
      self.setMovements();
   }

   this.warlord = function () {
      if (isWarlord === 1){
         isWarlord = 0;
         return 1;
      } else { 
         return 0;
      }
   }

   this.addCharacter = function (col, row, warlord) {
      Game.characters.add(new Character(col, row, self.name, warlord));
      Game.setScreen(10, Game.characters);
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

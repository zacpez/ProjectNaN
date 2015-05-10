
var Player = function (name) {

   var self = this;
   
   this.name = name;
   this.characters = [];
   this.movements = [];
   this.isWarlord = 1;

   this.initialize = function () {
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
      pn.game.characters.add(new Character(col, row, self.name, warlord));
      pn.game.setScreen(10, Game.characters);
   }

   this.setPath = function () {
      // setup a set of movement that are to be sent to the server
   }

   this.setMovements = function (col, row) {
      // Use websockets to get the movement board 
   }
}

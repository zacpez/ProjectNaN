var Game = function () {
	
}

var Game = new function (maxplayers, maxcharacters, movementDistance) {
   var rules = this;
   this.currentPlayer = 0;
   this.players = [];
   this.spectators = [];
   this.equipment = [];
   this.maxplayers = maxplayers;
   this.maxcharacters = maxcharacters;
   this.movementDistance = movementDistance;
   this.maxmoutaingear = 7;
   this.maxforestgear = 7;
   this.maxwatergear = 7;
   this.maxfightgear = 7;
   this.world = require('./data/World.json');

   this.init = function () {

      for (var i = 0; i < rules.maxmoutaingear; ) {
         var col = Math.random() * rules.world.length;
         var row = Math.random() * rules.world[0].length;
         if (rules.world[col][row] === 3 || rules.world[col][row] === 4) {
            rules.equipment[col][row] = 1;
            i++;
         }
      }
      for (var i = 0; i < rules.maxforestgear; ) {
         var col = Math.random() * rules.world.length;
         var row = Math.random() * rules.world[0].length;
         if (rules.world[col][row] === 3 || rules.world[col][row] === 4) {
            rules.equipment[col][row] = 2;
            i++;
         }
      }
      for (var i = 0; i < rules.maxwatergear; ) {
         var col = Math.random() * rules.world.length;
         var row = Math.random() * rules.world[0].length;
         if (rules.world[col][row] === 3 || rules.world[col][row] === 4) {
            rules.equipment[col][row] = 3;
            i++;
         }
      }
      for (var i = 0; i < rules.maxfightgear;) {
         var col = Math.random() * rules.world.length;
         var row = Math.random() * rules.world[0].length;
         if (rules.world[col][row] === 3 || rules.world[col][row] === 4) {
            rules.equipment[col][row] = 4;
            i++;
         }
      }
      console.log('Equipment placed:');
      console.log(rules.equipment);
   }

   this.newPlayer = function (player) {
      
      for (var x = 0; x < rules.movementDistance; x++) {
         for (var y = 0; y < rules.movementDistance; y++) {
            player.movements[x][y] = Math.round(Math.random()*3);
         }
      }
      player.warlord = true;
      player.skill = 'none';
      
      if (rules.players.length < rules.maxplayers) {
         rules.players.push(player);
      } else {
         rules.spectators.push(player);
      }
   }
   
   this.addCharacter = function (player, col, row, warlord) {

      if (player.characters.length < rules.maxcharacters) {
         var character = {};
         character.col = col;
         character.row = row;
         character.warlord = warlord;
         character.skill = player.skill;
         character.dead = false;
         if (player.warlord === true){
            player.warlord = false;
         } 
         player.characters.push(character);
      }
   }

   this.disconnected = function (player) {

      // remove the appropraite player
      for(var i = 0; i < players.characters.length; i++) {
         var victim = player.characters[i];
         if (!victim.dead) {
            rules.killCharacter(player, victim);
         }
      }
   }

   this.moveCharacter = function (player, character) {

      // move the player and look at its actions
      if (typeof world[character.col][character.row] == "number" && world[character.col][character.row] >= 21 ) {
         // Invalid movement
         
      }
      for (var p = 0; p < rules.maxplayers; p++) {
         for (var c = 0; c < rules.maxcharacters; c++) {
            if (rules.players[p].characters[c].row == character.row && rules.players[p].characters[c].col == character.col) {
               rules.killCharacter(rules.players[p], c);
            }
         }
      }
   }

   this.killCharacter = function (player, character) {

      // killed player return a dead one
      player.characters[character].dead = true;
   }
}
exports.game = Game;

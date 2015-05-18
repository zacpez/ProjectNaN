/**
 * Consatants for movement card generation
 * @global
 * @enum {Number}    
 **/
var CARD = {
   MOVE: 0,
   ATTACK: 1,
   SKILL: 2,
   COUNT: 2
};

/**
 * @constructor Creates Player
 * @class Player
 * @param name - Use the name from the players login profile.
 */
var Player = function (name) {
   /**
    * Self reference where 'this' is not available
    * @protected
    * @name self
    */
   var self = this;

   /**
    * Player's chosen name
    * @public
    * @type {String}
    */
   this.name = name;

   /**
    * The current list of objects
    * @public
    * @type {Array.<Tiles>|Array.<Sprites>}
    */
   this.characters = [];

   /**
    * The current list of movements
    * @public
    * @type {Array.<Vector2>}
    */
   this.movements = [];

   /**
    * Selecter Character require for movement
    * @public
    * @type {Character}
    */
   this.character;

};

Player.prototype = {
   /**
    * Initialization routines.
    * @public
    */
   initialize: function () {
      self.setMovements();
   },

   /**
    * Add the character to the board
    * @public
    * @param {Number} col
    * @param {Number} row
    * @param {Boolean} warlord
    */
   addCharacter: function (col, row, warlord) {
      pn.game.characters.add(new Character(col, row, self.name, warlord));
      pn.game.setScreen(10, Game.characters);
   },

   /**
    * Handle if mouse clicked on a character. 
    * @public
    * @param {Vector2} tile
    */
   selecteCharacter: function (tile) {
      for (var index in this.characters) {
         return this.characters[index].position().equals(tile);
      }
   },

   /**
    * If alive, get the Warlord.
    * @public
    * @returns Character, otherwise false
    */
   getWarlord: function () {
      for (var index in this.characters) {
         if (this.characters[index].warlord) {
            return this.characters[index];
         }
      }
      return false;
   },

   /**
    * Dispatch path creation to corredct character
    * @public
    * @param {Number} col
    * @param {Number} row
    */
   setPath: function (col, row) {
      // setup a set of movement that are to be sent to the server
      this.character.pushPath(col, row);
   },

   /**
    * Generate the Player's unique movement card. 
    * @public
    */
   setMovements: function () {
      // Use websockets to get the movement board
      for (var i = 0; i < 10; i += 1) {
         this.movements[i] = [];
         for (var j = 0; j < 10; j += 1) {
            this.movements[i].push(Math.round(Math.random() * CARD.COUNT));
         }
      }
   }
};

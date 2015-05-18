/**
 * @constructor Creates Character
 * @class Character
 * @param {Number} col - Tile-based X coordinate
 * @param {Number} row - Tile-based Y coordinate
 * @param {Number} equipt -  Special ability enable by an item
 * @param {Boolean} warlord -  Is the character the elimination objective
 */
var Character = function (col, row, equipt, warlord) {
   this.tile = new pn.Vector2(col, row);
   this.position = new pn.Vector2(col * TILE_SIZE - 32, row * TILE_SIZE - 32);
   this.equipt = equipt;

   /**
    * The current list of object types
    * @public
    * @type {Array.<Vector2>}
    */
   this.path = [];

   /**
    * Describes elimation object, warlords must be alive for player to continue
    * @public
    * @type {Number}
    * @default 0
    */
   this.warlord = warlord || false;
};

Character.prototype = { 

   /**
    * Move character to new column and row
    * @public
    * @param {Number} newcol - Move the tile-based X coordinate
    * @param {Number} newrow - Move the tile-based Y coordinate
    */
   move: function (newcol, newrow) {
      this.tile(newcol, newrow);
   },

   /**
    * Build a path if not selected already
    * @public
    * @param {Number} col - Add tile-based X coordinate to the current path
    * @param {Number} row - Add tile-based Y coordinate to the current path
    */
   pushPath: function (col, row) {
      this.path.push(new Vector2(col, row));
   },

   /**
    * Update Event Handler
    * @public
    * @param {Number} dt - Detla time for animation timing.
    */
   update: function (dt) {
      
   },

   /**
    * Draw event handler
    * @public
    * @param {DOMNode} ctx - Canvas element in the DOM used to paint
    */
   draw: function (ctx) {
      this.iterate('draw', ctx);
   }
};

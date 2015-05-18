/**
 * @constructor Creates TitleScreen
 * @class TitleScreen
 * @param {String} title - Major textfield 
 * @param {String} subtitle - Minor textfield
 * @param {function} callback - Do next thing
 */
var TitleScreen = function  (title, subtitle, callback) 
{
   /**
    * @type String
    * @name title
    */
   this.title = title;

   /**
    * @type String
    * @name subtitle
    */
   this.subtitle = subtitle;
   
   /**
    * @type function
    * @name callback
    */
   this.callback = callback;
   
   /**
    * Alter TitleScreen State
    * @public
    * @method
    * @name update
    * @param {Number} dt - Detla time for animation timing.
    */
   this.update = function(dt) {
      if(Game.clicking && this.callback) 
         this.callback(this);
   };

   /**
    * Write to the text directly to the canvas
    * @public
    * @method
    * @name draw
    * @param {DOMNode} ctx - Reference to the canvas in the DOM
    */
   this.draw = function(ctx) {
      
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.font = "bold 2em Amble";
      ctx.fillText(this.title,Game.width/2,Game.height/2);

      ctx.font = "bold 1.25em Amble";
      ctx.fillText(this.subtitle,Game.width/2,Game.height/2 + 60);
   };
};

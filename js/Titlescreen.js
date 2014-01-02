//titlescreen.js
var TitleScreen = function  (title, subtitle, callback) 
{
   this.title = title;
   this.subtitle = subtitle;
   this.callback = callback;
   
   this.update = function(dt) {
      if(Game.clicking && this.callback) 
         this.callback(this);
   };

   this.draw = function(ctx) {
      
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.font = "bold 2em Amble";
      ctx.fillText(this.title,Game.width/2,Game.height/2);

      ctx.font = "bold 1.25em Amble";
      ctx.fillText(this.subtitle,Game.width/2,Game.height/2 + 60);
   };
};

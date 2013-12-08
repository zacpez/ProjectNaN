
var Player = function (){
   this.name;

};

Player = {

   initialize: function () {
      // Overwrite the default
      
   },
   
   set: function( key, value ){
      this[key] = value;
   },

   get: function (){
      return this[key];
   }
}

module.exports = Player;
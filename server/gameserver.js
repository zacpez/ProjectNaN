var Socket = require('./socket'),
    Game = require('./game');

var GameServer = new function () {
   this.socket;
   this.events = new Array();
   this.rooms = [];
   this.users = [];

   this.initialize = function ( webService ){

      console.log( "Game Server Started.." );
      this.socket = new Socket;
      
      this.socket.initialize( webService );
      
      //this.game = Game();
      //this.game.init();
      //for (event in this.game.events) {
       //  this.socket.registry.register( this.game.events[event].event, this.game.events[event].obj, this.game.events[event].func);
      //}

   };
   
   this.toString = function (){
      return "Players: " + this.users.length + 
             " Rooms: " + this.rooms.length +
             " Socket: " + this.socket.toString();
   };

};

module.exports = GameServer;

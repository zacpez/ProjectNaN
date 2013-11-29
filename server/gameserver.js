var Socket = require('./socket'),
    Game = require('./game');

var GameServer = function () {
   this.socket;
   this.rooms = [];
   this.players = [];
}

GameServer.prototype = {

   initialize: function ( webService ){

      console.log( "Game Server Started..");

      this.socket = new Socket();
      this.socket.initialize( webService );

      this.socket.events.register( 'addPlayer', this, 'addPlayer' );
		this.socket.events.register( 'removePlayer', this, 'removePlayer' );
		this.socket.events.register( 'getPlayer', this, 'getPlayer' );
		this.socket.events.register( 'getPlayerList', this, 'getPlayerList' );
		this.socket.events.register( 'addRoom', this, 'addRoom' );
		this.socket.events.register( 'removeRoom', this, 'removeRoom' );
		this.socket.events.register( 'getRoom', this, 'getRoom' );
		this.socket.events.register( 'getRoomList', this, 'getRoomList' );

   },

   createMasterServer: function ( webService ){
      this.socket.initialize( webService );
   },

   addPlayer: function ( player ){
      this.players[player.name] = player;
   },

   removePlayer: function ( playerName ){
      this.players.remove( playerName );
   },

   getPlayer: function ( playerName ){
      return this.players[playerName];
   },

   getPlayerList: function () {
      return this.players;
   }

   getRoom: function ( roomName ){
      return this.rooms[roomName];
   },

   getRoomList: function (){
      return this.rooms;
   },
   
   addRoom: function ( room ){
      this.rooms[room.name] = room;
   },
   
   removeRoom: function ( roomName ){
      this.rooms.remove( roomName );
   },
	
	success: function ( event ){
		console.log( "Added event: " + event );
	},

	toString: function (){
		return "Players: " + this.players.length + 
				 " Rooms: " + this.rooms.length +
				 " Socket: " + this.socket.toString();
	}

};

exports.gameserver = GameServer;

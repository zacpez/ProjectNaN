var Socket = require('./Socket'),
	 Game = require('./Game');

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

		this.socket.eventRegistry.register( 'addPlayer', this, 
														'addPlayer', this.success( event );


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
	}
};

exports.gameserver = GameServer;
//exports.game.init = Game.init;
//exports.game.newPlayer = Game.newPlayer;
//exports.game.addCharacter = Game.addCharacter;
//exports.game.disconnected = Game.disconnected;
//exports.game.moveCharacter = Game.moveCharacter;

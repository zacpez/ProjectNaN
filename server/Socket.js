var io = require('socket.io'),
	 EventRegistry = require('./EventRegistry');

var Socket = function () {
	this.webService;
	this.socket;
	this.eventRegistry;
}

Socket.prototype = {
	initialize: function( webService ){
		this.webService = webService;
		this.socket = io.listen( this.webService );

		this.eventRegistry = EventRegistry();
		this.eventRegistry.initialize( this.socket );

	},

	createMasterServer: function( httpServer ){
		this.socket = io.listen( this.webService );
	}
}

exports.Socket = Socket;

var io = require('socket.io');

var Socket = function () {
	this.webService;
	this.socket;
}

Socket.prototype = {
	initialize: function( webService ){
		this.webService = webService;
		this.socket = io.listen( this.webService );
		
	},

	
}

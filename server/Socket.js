var io = require('socket.io'),
    EventRegistry = require('./eventregistry');

var Socket = function () {
   this.webService;
   this.socket;
   this.eventRegistry;
}

Socket.prototype = {

   initialize: function( webService ){
      this.webService = webService;
      this.socket = io.listen( this.webService );

      this.events = EventRegistry();
      this.events.initialize( this.socket );
   },

   createMasterServer: function( httpServer ){
      this.socket = io.listen( this.webService );
   },
	
	toString: function (){
		return "Host: " + this.webService.host +
				 "\nPort: " + this.webService.port +
				 "\nListeners: \n" + this.socket.listeners( 'connection' );
	}

};

exports.socket = Socket;

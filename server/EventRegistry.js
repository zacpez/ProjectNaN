
var EventRegistry = new function (){

	this.socket;

}

EventRegistry.prototype = {
	initialize: function ( socket ){
		// provide access to the library of registered socket events
		this.socket = socket;
		socket.on( 'connection', this.listener( socket ) );
	},

	listener: function ( socket ){
		console.log( "listener called" );
	},
	
	register: function( event, obj, func ,callback){
		this.socket.on( event, obj[func] );
		callback( event );
	},
	
	deregister: function( event ){
		this.socket.removeListener( event );
	},
	
	toString: function (){
		console.log( this.socket.listeners('connection') );
	}
}

exports.EventResistry = EventRegistry;


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
   
   register: function( event, obj, func ){
      this.socket.on( event, obj[func] );
      callback( event );
   },
   
   deregister: function( event, obj, func ){
      this.socket.removeListener( event, obj[func] );
   },
   
   toString: function (){
      console.log( this.socket.listeners('connection') );
   }

};

exports.eventresistry = EventRegistry;

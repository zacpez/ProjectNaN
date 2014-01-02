
var EventRegistry = function (){

   this.socket;
   this.counter = 0;

   this.initialize = function ( eventConfig ){
      // provide access to the library of registered socket events
      for( entry in eventConfig ){
         this.register( entry.event, entry.obj, entry.func );
      }
   };
   
   this.register = function( event, obj, func ){
	   
      this[this.counter] = { "event": event, "obj": obj, "func": func };
      this.count++;
   };
   
   this.deregister = function( event, obj, func ){
      this.socket.removeListener( event, obj[func] );
   };

   this.toString = function (){
      console.log( this.socket.listeners('connection') );
   };

};

module.exports = EventRegistry;

var io = require('socket.io'),
	fs = require('fs'),
    EventRegistry = require('./eventregistry');

/**
 * Socket is a web socket module acting as the primary server for all the game related services.
 * 
 * There are some events that can be fired before a game is started, such as player and room related events.
 * @constructor
 * @class Socket
 * @returns Socket The wev socket is designed specifically for ProjectNaN, and utilizes socket.io for simplicity purposes. 
 */
var Socket = function () {
	
   /**
    * Used in the event handlers when disassociated from this Socket object
    * @private
    * @type {object} self reference where 'this' isn't possible.
    * @todo rewrite in a way that this variable is no longer needed, if possible.
    */
   var self = this;
   
   /**
    * This member variable holds the socket created by socket.io. Encapsulated by this object to be interfaced with.
    * @private
    * @type {object|socket}
    */
   var webSocket = {};
   
   
   /**
    * The initialize method in the Socket module is similar any other module in the pack. It is to set up data 
    * and methods needed during runtime. In this instance a new socket is created to manage websocket messages. 
    * For each connection to the server a series of events are defined to manage the menu, game server rooms, 
    * and mics statistics.
    * 
    * @param {http} webService Used to source infomation from the http web service setup previously in execution.
    * @param {game} gameServer Enables the socket to utilize the game module when events are fired.
    */
   this.initialize = function ( webService, gameServer ){

	  webSocket = io.listen( webService );
      
      /**
       * This event is fired on individual connections, and sets up socket events.
       * 
       * @event socket:connection
       * @param {string} the first parameter is used for the socket event's name
       * @param {function} Callback method when the socket event is called.
       */
      webSocket.sockets.on('connection', function (socket){
    	 console.log('connection');
    	 
    	 /**
    	  * @event socket:add_user
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('add_user', function ( user ){
        	console.log('event');
            gameServer.users[user.name] = user;
            socket.username = user.name;
            socket.room = 'Lobby';
            socket.join('Lobby');
            socket.emit('added_user', gameServer.users);
            socket.broadcast.to(socket.room).emit('updated_players', gameServer.users);
            socket.emit('updated_rooms', gameServer.rooms, 'Lobby');
         });
         
    	 /**
    	  * @event socket:remove_user
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('remove_user', function ( user ){
            delete gameServer.users[ user ];
            io.socket.emit('updated_players', gameServer.users);
            socket.broadcast.to(socket.room).emit('updated_players', gameServer.users);
            socket.leave(socket.room);
         });
         
    	 /**
    	  * @event socket:get_user_list
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('get_user_list', function ( users ){
            socket.emit('updated_players', gameServer.users);
         });
         
    	 /**
    	  * @event socket:get_room_list
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('get_room_list', function (){
             socket.emit('updated_rooms', gameServer.rooms);
          });
         
    	 /**
    	  * Event handler for adding a room to the game server object.
    	  * @event socket:add_room
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('add_room', function ( room ){
        	room = gameServer.newRoom( room );
        	gameServer.rooms.push( room );
        	room.map = self.getFile("../data/World.json");
            socket.room = room.name;
            socket.join(room.name);
            socket.emit('updated_rooms', gameServer.rooms);
         });
         
    	 /**
    	  * @event socket:join_room
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('join_room', function ( room ){
            if( gameServer.rooms[room.name] !== undefined ) {
            	console.log("Non-existant room access denied");
            	return;
            }
            socket.room = room.name;
            socket.join(room.name);
            gameServer.rooms.users[socket.username] = socket.username;
            socket.broadcast.to(socket.room).emit('updated_players', gameServer.users);
         });
         
    	 /**
    	  * @event socket:leave_room
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('leave_room', function ( room ){
        	gameServer.rooms[room.name] = room;
            var oldRoom = socket.room.name;
            socket.leave(socket.room);
            socket.join('Lobby');
            socket.broadcast.to(oldRoom).emit('updated_players', gameServer.users);
            socket.room = 'Lobby';
            socket.emit('updated_rooms', gameServer.rooms);
         });
         
    	 /**
    	  * @event socket:remove_room
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('remove_room', function ( room ){
        	gameServer.rooms.remove( room );
            socket.emit('remove_room', gameServer.rooms, room);
         });
         
    	 /**
    	  * @event socket:load_map
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('load_map', function(mapName){
        	console.log("map request: "+ mapName);
        	var response = {};
        	response.name = mapName;
        	response.map = self.getFile("../data/World.json");
        	console.log(response.map);
        	socket.emit('loaded_map', response);
         });
         
    	 /**
    	  * @event socket:add_player
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
         socket.on('add_player', function (playerObj){
        	 console.log(playerObj);
        	 socket.broadcast.to(socket.room).emit('added_player', playerObj );
         });
         
    	 /**
    	  * @event socket:add_character
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
		 socket.on('add_character', function (characterObj){
			 socket.broadcast.to(socket.room).emit('resp_character_add', characterObj );
		 });
		 
    	 /**
    	  * @event socket:move_character
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
		 socket.on('move_character', function (characterObj){
			 socket.broadcast.to(socket.room).emit('resp_character_move', characterObj );
		 });
		 
    	 /**
    	  * @event socket:kill_character
    	  * @param {string} the first parameter is used for the socket event's name
    	  * @param {function} Callback method when the socket event is called.
    	  */
		 socket.on('kill_character', function (characterObj){
			 socket.broadcast.to(socket.room).emit('killed_character', characterObj );
		 });
         
      });
      
   };
   
   /**
	* @param {string} filename filename is a string of a requested file using socket.io as the medium.
	* @returns {string|undefined} contents of the requested file, otherwise returns undefined if the 
	* files doesn't exist
	*/
   this.getFile = function(filename){
	   var contents = '';
	   fs.readFile(filename, function(error, data){
		  if(error) {
			  throw error;
		  } else {
			  contents = data;
		  }
	   });
	   return contents;
   };

   /**
    * @returns {string} this methods returns a stringified version on this object.
    */
   this.toString = function (){
      return "Host: " + this.webService +
             "\nPort: " + this.webService +
             "\nListeners: \n" + webSocket.listeners( 'connection' );
   };

};

module.exports = Socket;

var io = require('socket.io'),
    EventRegistry = require('./eventregistry');

var theSocket = function () {

   this.socket;

   this.initialize = function ( webService ){

      this.socket = io.listen( webService );
      this.socket.sockets.on('connection', function (socket){
         /* 
         for( register in self.events ){
           console.log( self.events[register]);
           socket.on( self.events[register].event, self.events[register].obj[self.events[register].func] );
         }
         */
         socket.on('addUser', function ( user ){
            GameServer.users[user.name] = user;
            socket.username = user.name;
            socket.room = 'Lobby';
            socket.join('Lobby');
            socket.emit('updateplayers', GameServer.users);
            socket.broadcast.to(socket.room).emit('updateplayers', GameServer.users);
            socket.emit('updaterooms', GameServer.rooms, 'Lobby');
         });
         
         socket.on('removeUser', function ( user ){
            delete GameServer.users[ user ];
            io.socket.emit('updateplayers', GameServer.users);
            socket.broadcast.to(socket.room).emit('updateplayers', GameServer.users);
            socket.leave(socket.room);
         });
         
         socket.on('getUserList', function ( users ){
            socket.emit('updateplayers', GameServer.users);
         });
         
         socket.on('addRoom', function ( room ){
        	room = GameServer.newRoom( room );
        	GameServer.rooms.push( room );
            socket.room = room;
            socket.join(room);
            socket.emit('updaterooms', GameServer.rooms);
         });
         
         socket.on('joinRoom', function ( room ){
            if( GameServer.rooms[room] !== undefined ) return;
            socket.room = room;
            socket.join(room);
            GameServer.rooms.users[socket.username] = socket.username;
            socket.broadcast.to(socket.room).emit('updateplayers', GameServer.users);
         });
         
         socket.on('leaveRoom', function ( room ){
        	GameServer.rooms[room.name] = room;
            var oldRoom = socket.room;
            socket.leave(socket.room);
            socket.join('Lobby');
            socket.broadcast.to(oldRoom).emit('updateplayers', GameServer.users);
            socket.room = 'Lobby';
            socket.emit('updaterooms', GameServer.rooms);
         });
      
         socket.on('removeRoom', function ( room ){
        	GameServer.rooms.remove( room );
            socket.emit('removeroom', GameServer.rooms, room);
         });
         
         socket.on('add_player', function (playerObj){
        	 console.log(playerObj);
        	 socket.broadcast.to(socket.room).emit('added_player', playerObj );
         });
         
		 socket.on('add_character', function (characterObj){
			 socket.broadcast.to(socket.room).emit('resp_character_add', characterObj );
		 });
		 
		 socket.on('move_character', function (characterObj){
			 socket.broadcast.to(socket.room).emit('resp_character_move', characterObj );
		 });
		 
		 socket.on('kill_character', function (characterObj){
			 socket.broadcast.to(socket.room).emit('killed_character', characterObj );
		 });
         
      });
      
   };
   
   this.toString = function (){
      return "Host: " + this.webService +
             "\nPort: " + this.webService +
             "\nListeners: \n" + this.socket.listeners( 'connection' );
   };

};

module.exports = theSocket;

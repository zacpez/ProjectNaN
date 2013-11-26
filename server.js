//
//
//

var http = require('http'),//.createServer(webService).listen(9081, '0.0.0.0'), 
fs = require('fs'),
gameServer = require('./gameserver'),
path = require('path');

var gameservers = [];

var httpService = function (){

	this.port = 9081;
	this.host = '0.0.0.0';

}

webService.prototype = {

	initialize: function (host, port){

		if ( port ){
			this.port = port;
		}
		if( host ){
			this.host = host;
		}
		http.createServer( this.request ).listen( this.host, this.port );
		gameServer.createMasterServer( http );
		
	},

	request: function (request, response){

		console.log('request made');
		var filePath = './';
		var extname = '.html';
		var contentType = 'text/html';

		filePath = request.url;

		if ( filePath === "/" )
			filePath = "./index.html";

		extname = path.extname(filePath);

		// Validate servable content types by extensions, 
		// remove else return; to allow all types
		if ( extensions[extname] !== undefined ){

			contentType = extensions[extname];

		} else {

			return;

		}				
		
		filePath = path.join('..', filePath);
		path.exists ( filePath, function ( exists ) {

			console.log(filePath);
			if ( exists ) {

				fs.readFile( filePath, function( error, content ) {
					if ( error ) {
						// Error while loading existing content
						response.writeHead( 500 );
						response.end( '505', 'utf-8' );
					} else {
						// Standard success scenario
						response.writeHead( 200, { 'Content-Type': contentType} );
						response.end( content, 'utf-8' );
					}
				});

			} else {
				// Here you can print a generic page when path doesnt exist
				response.writeHead( 404 );
	         response.end( '404', 'utf-8' );
			}	

		});	
	} 

}

var socketio = io.listen(app);

socketio.sockets.on('connection', function (socket) { socketEventHandler(socket)} );

function socketEventHandler(socket) {

      // Ping players for connection
      socket.emit('ping', function (characterObj) {
		   socketio.sockets.emit('resp_character_add', characterObj);
	   });

      // Ping responses
      socket.on('playing', function (characterObj) {
		   // Maintain game
	   });
      socket.on('disconnected', function (characterObj) {
		   // Update Game
	   });

      // New server creation
      socket.on('create_server', function (characterObj) {
		   socketio.sockets.emit('created_server', characterObj);
	   });

      // New player creation
      socket.on('add_player', function (playerObj) {
         //game.newPlayer(playerObj);
		   socketio.sockets.emit('created_server', palyersObj);
	   });

      // Join a current server
      socket.on('join_server', function (characterObj) {
		   socketio.sockets.emit('joined_server', characterObj);
	   });

	   // Added character
      socket.on('add_character', function (characterObj) {
		   socketio.sockets.emit('resp_character_add', characterObj);
	   });

      // Moved character_add
      socket.on('move_character', function (characterObj) {
		   socketio.sockets.emit('resp_character_move', characterObj);
	   });

      // Killed character_add
      socket.on('kill_character', function (characterObj) {
		   socketio.sockets.emit('killed_character', characterObj);
	   });

      // Equipt character_add
      socket.on('equipt_character', function (characterObj) {
		   socketio.sockets.emit('equipted_character', characterObj);
	   });

      
}


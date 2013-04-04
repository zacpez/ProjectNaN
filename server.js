//
//
//

var app = require('http').createServer(webService).listen(9081, '0.0.0.0'), 
fs = require('fs'),
io = require('socket.io'),
game = require('./gameserver');

//var Game = game(4, 4, 7);
//console.log("Game: " + Game);
//console.log("Game.init: " + Game.init);
//Game.init();

var gameservers = [];

var path = require('path');
 
function webService(request, response) {
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.jpg':
			contentType = 'image/jpeg';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.gif':
			contentType = 'image/gif';
			break;
		case '.ttf':
			contentType = 'application/octet-stream';
			break;
		case '.otf':
			contentType = 'application/octet-stream';
			break;
    }
     
    path.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        } else {
            response.writeHead(404);
            response.end();
        }
    });
     
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


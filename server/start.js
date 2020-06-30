var HttpService = require('./server'),
	WebSocket = require('./socket'),
	GameServer = require('./gameserver');

var argv = process.argv.splice(2);
var server = new HttpService();
var port = 9081;
if (argv.length) {
	port = argv[0];
}
server.initialize('0.0.0.0', port);

var gameServer = new GameServer();
gameServer.initialize();

var socket = new WebSocket();
socket.initialize(server.http, gameServer);

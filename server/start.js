var HttpService = require('./server'),
    WebSocket = require('./socket'),
    GameServer = require('./gameserver');


var server = new HttpService();
server.initialize( '0.0.0.0', 9081 );

var gameServer = new GameServer();
gameServer.initialize();

var socket = new WebSocket();
socket.initialize( server.http, gameServer );
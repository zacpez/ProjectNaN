var httpService = require('./server');

var server = new httpService;
server.initialize( '0.0.0.0', 9081 );

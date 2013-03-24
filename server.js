//
//
//

var app = require('http').createServer(webService).listen(81, '0.0.0.0'), 
fs = require('fs'),
io = require('socket.io');

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
		case '.php':
			contentType = 'application/php';
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
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
     
}

var newServerRequest = io.listen(app);
	newServerRequest.sockets.on('connection', function (socket) {
		socket.emit('new', {name: 'newGame'});
	});


//
//
//

var http = require('http'), 
fs = require('fs'),
gameServer = require('./gameserver'),
path = require('path');

// Subset of the master server
var gameservers = [];

// Generic file serving
var httpService = function (){

	this.port = 9081;
	this.host = '0.0.0.0';

}

httpService.prototype = {

	// Overwrite the default values, and start extended services
	initialize: function (host, port){

		if ( port ){
			this.port = port;
		}
		if( host ){
			this.host = host;
		}

		http.createServer( this.request ).listen( this.host, this.port );
		gameServer.initialize( http );
		
	},

	// Standard http request handler
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

exports.httpService = httpService;

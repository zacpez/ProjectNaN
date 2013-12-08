//
//
//

var http = require('http'), 
fs = require('fs'),
gameServer = require('./gameserver'),
path = require('path');

var extensions = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ttf': 'text/octet-stream',
        '.otf': 'text/octet-stream'
};

// Generic file serving
var httpService = function (){

   this.http;
   this.port = 80;
   this.host = '0.0.0.0';


   // Overwrite the default values, and start extended services
   this.initialize = function (host, port){

      if ( port ){
         this.port = port;
      }
      if( host ){
         this.host = host;
      }

      this.http = http.createServer( this.request ).listen( this.port, this.host );
      gameServer.initialize( this.http );
      
   };

   // Standard http request handler
   this.request = function (request, response){

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
                  response.writeHead( 200, {'Content-Type': contentType} );
                  response.end( content, 'utf-8' );
               }
            });

         } else {
            // Here you can print a generic page when path doesnt exist
            response.writeHead( 404 );
            response.end( '404', 'utf-8' );
         }   

      });   
   };
};

module.exports = httpService;

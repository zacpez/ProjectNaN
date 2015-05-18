var http = require('http'), 
fs = require('fs'),
path = require('path');

/**
 * @constant
 */
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

/**
 * The http service handles the serving og the files as the client requests the primary files needed to 
 * continue into a web socket connection. Any web page navigation may route through this module if more
 * pages are implemented.
 * 
 * @constructor
 * @class HttpService
 * @interface {http}
 * @returns HttpService
 */
var HttpService = function (){

   this.http;
   /**
    * Each system may have different ranges and limits to port use, contact system administrator or consult. Simply stores the port number to be set or read.
    * your router for this information.
    * @type {number} 
    */
   this.port = 80;
   /**
    * The host variable is used to define the scope of access to the server. '0.0.0.0' is used for World. Simple string that is set to start the server in define.
    * Wide Web, '127.0.0.1' is for Local Area Network.
    * @type {string} 
    */
   this.host = '0.0.0.0';


   /**
    * Overwrites the default values for host and port. It continues to start the HttpService and other additional 
    * services as well.
    * @param {string} host standard IPv4 string such as '0.0.0.0'
    * @param {number} port is a standard port number, each system may have different ranges and limits to port use.
    */
   this.initialize = function (host, port){

      if ( port ){
         this.port = port;
      }
      if( host ){
         this.host = host;
      }

      this.http = http.createServer( this.request ).listen( this.port, this.host );
      
   };
   
   /**
    * Standard http request handler to serve files to a browser client, may happen multiple times per connection.
    * 
    * @param {http.IncomingMessage} request 
    * @param {http.ServerResponse} response 
    */
   this.request = function (request, response){

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
      fs.exists ( filePath, function ( exists ) {

         //console.log(filePath);
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

module.exports = HttpService;

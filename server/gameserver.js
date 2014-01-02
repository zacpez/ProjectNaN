var socket = require('./socket'),
    util = require('util'),
    events = require('events'),
    Game = require('./game');
/**
 * @constructor
 * @param {socket} socket 
 * @extends {EventEmitter}
 * @returns A new GameServer object
 */
var GameServer = function ( socket ) {
	
   /* extend EventEmitter object */
   events.EventEmitter.call(this);
   
   /**
    * Contents are references to the socket object for binding events.
    * @type {Socket}
    */
   this.socket;
   
   /**
    * Contents are references to the GameServer events for binding to socket.
    * @dict
    * @type {Array.<Function>}
    */
   this.events = [];
   
   /**
    * Contents are current games running, or otherwise not added to the DB for statistics.
    * @dict
    * @type {Array.<Function>}
    */
   this.rooms = [];
   
   /**
    * Contents are users online or awaiting removal from timeout function.
    * @dict
    * @type {Array.<Function>}
    */
   this.users = [];
   
   /**
    * Runtime setup function
    */
   this.initialize = function (){

      console.log( "Game Server Starting.." );
      
   };
   
   /**
    * @returns {string} this methods returns a stringified version on this object.
    */
   this.toString = function (){
      return "Players: " + this.users.length + 
             " Rooms: " + this.rooms.length +
             " Socket: " + this.socket.toString();
   };

};

util.inherits(GameServer, events.EventEmitter);

module.exports = GameServer;

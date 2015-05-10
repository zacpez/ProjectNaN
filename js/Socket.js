/**
 * @constructor
 * @class Socket
 * @variation 2
 * @param {string} host string containing 'url:port' seperated by semicolon
 */
var Socket = function (host) {

	/**
	 * For self reference when 'this' is unavailable
	 * @protected
	 * @type {this}
	 */
   var self = this;
	
	/**
	 * @public
	 * @type {object|socket.io-client}
	 */
   this.server = io.connect(host);
   
	/**
	 * @public
	 * @param {object} user
	 */
	this.addUser = function (user) {
		// Send user data to the server to be processed
		this.server.emit('add_user', user);
	}
	
	/**
	 * @public
	 * @param {object} user
	 */
	this.getUser = function (user) {
		// Apply parameters to retrieve correct user
		this.server.emit('get_user', user);
	}
	
	/**
	 * @public
	 * @param {object} users
	 */
	this.getUserList = function (users) {
		// Get all users registered in current room
		this.server.emit('get_user_list', users);
	}
	
	/**
	 * @public
	 * @param {object} user
	 */
	this.removeUser = function (user) {
		// Remove user from selected room
		this.server.emit('remove_user', user);
	}
	
	/**
	 * @public
	 * @param {object} users
	 */
	this.updateUserList = function (users) {
		// Update current room
		this.server.emit('update_user_list', users);
	}
	
	/**
	 * Add room to the server for the form
	 * @public
	 * @param {object} room
	 */
	this.addRoom = function (room) {
		// 
		this.server.emit('add_room', room);
	}
	
	/**
	 * Get room info from the list
	 * @public
	 * @param {object} room
	 */
	this.getRoom = function (room) {
		this.server.emit('get_room', room);
	}
	
	/**
	 * Get all the rooms from the server
	 * @public
	 * @param {object} rooms
	 */
	this.getRoomList = function (rooms) {
		this.server.emit('get_room_list', rooms);
	}
	
	/**
	 * Remove the room from the servers list
	 * @public
	 * @param {object} room
	 */
	this.removeRoom = function (room) {
		this.server.emit('remove_room', room);
	}
	
	/**
	 * Remove the room from the servers list
	 * @public
	 * @param {object} rooms
	 */
	this.updateRoomList = function (rooms) {
		this.server.emit('update_room_list', rooms);
	}
	
	/**
	 * Remove the room from the servers list
	 * @public
	 * @param {object} room
	 */
	this.joinRoom = function (room) {
		this.server.emit('join_room', room);
	}
	
	/**
	 * Remove the room from the servers list
	 * @public
	 * @param {object} room
	 */
	this.leaveRoom = function (room) {
		this.server.emit('leave_room', room);
	}
	
	/**
	 * @public
	 * @param {object} mapName
	 * @param {function} callback
	 */
	this.loadMap = function (mapName, callback) {
		self.server.emit('load_map', mapName);
		pn.game.board.loadMap();
		console.log("sent req");
		callback();
	}
	
	/**
	 * @public
	 * @param {object} player
	 */
   this.newPlayer = function (player) {
      self.server.emit('add_player', player);
   }
   	
	/**
	 * @public
	 * @param {integer} col column of the target location
	 * @param {integer} row row of the target location
	 */
   this.addCharacter = function (col, row) {
      self.server.emit('add_character', { id: Game.me.id, col: col, row: row});
   }
   	
	/**
	 * @public
	 * @param {object} character character the movment will act on
	 * @param {object} path client-side determined path for a character movement
	 */
   this.moveCharacter = function (character, path) {
      if (Game.players[Game.me.id]) {
         self.server.emit('move_character', { id: Game.me.id, character: character, path: path});
      }
   }
   	
	/**
	 * @public
	 * @param {object} character character that will kill the victim
	 * @param {object} victim the target of the clients kill
	 */
   this.killCharacter = function (character, victim) {
      self.server.emit('kill_character', Game.players[Game.me]);
   }
   	
	/**
	 * @public
	 * @param {object} data
	 */
   this.updatePlayers = function (data) {
      // Add equiptment if player is new
      if (Game.equipt.objects.length === 0) {
         for (var i = 0; i < data.equipt.length; i++) {
            Game.equipt.add(new Equipt(data.equipt[i].col, data.equipt[i].row, data.equipt[i].type, i));
         }
         Game.setScreen(23, Game.equipt);
      }
      
      // Add the newplayer, or all players if just joined
      if (Game.players.length === 0) {
         for (var i = 0; i < data.players.length; i++) {
   
            var plyr = new Player(data.players[i].name);
            plyr.id = data.players[i].id;
            plyr.movements = data.players[i].movements;
            plyr.warlord = data.players[i].warlord;
            plyr.skill = data.players[i].skill;
            Game.players.push(plyr);
            
            for(var j = 0; j < data.players[i].characters.length; j++) {
               var newChar = new Character(data.players[i].id, data.players[i].characters[j].col, data.players[i].characters[j].row, data.players[i].characters[j].skill, data.players[i].characters[j].warlord);
               newChar.dead = data.players[i].characters[j].dead;
               plyr.characters.push(newChar);
               Game.playerBoard.add(newChar);
               Game.setScreen(25, Game.playerBoard);
            }
            Game.me = Game.players[data.id];
         }
      } else {
         var plyr = new Player(data.players[Game.players.length].name);
         plyr.id = data.players[Game.players.length].id;
         plyr.movements = data.players[Game.players.length].movements;
         plyr.warlord = data.players[Game.players.length].warlord;
         plyr.skill = data.players[Game.players.length].skill;
         
         Game.players.push(plyr);
      }
   }

   /**
	 * @event socket:added_user
	 * @param {object} user
	 */
	this.server.on('added_user', function (user) {
		console.log("user added");
	});
	
	/**
	 * @event socket:resp_user
	 * @param {object} user
	 */
	this.server.on('resp_user', function (user) {
		
	});
	
	/**
	 * @event socket:resp_user_list
	 * @param {object} user
	 */
	this.server.on('resp_user_list', function (users) {
		
	});
	
	/**
	 * @event socket:removed_player
	 * @param {object} user
	 */
	this.server.on('removed_player', function (player) {
		
	});
	
	/**
	 * @event socket:updated_players
	 * @param {object} user
	 */
	this.server.on('updated_players', function (players) {
		this.updatePlayers(players);
	});
	
	/**
	 * @event socket:updated_rooms
	 * @param {object} user
	 */
	this.server.on('updated_rooms', function(rooms) {
		pn.localStorage.set('Servers', rooms);
		pn.menu.loadServers(rooms);
	});
   
   this.server.on('joined_room', function (players) {
      pn.game = new Game();
      pn.game.initialize("gamescreen", sprites, pn.game.play());
      this.updatePlayers();
   });
   
	/**
	 * @event socket:added_player
	 * @param {object} user
	 */
   this.server.on('added_player', function (data) {
      console.log(data);
      
      self.updatePlayers(data);
   });

	/**
	 * @event socket:used_player
	 * @param {object} user
	 */
   this.server.on('used_player', function (data) {
      self.updatePlayers(data);
   });
   
	/**
	 * @event socket:added_character
	 * @param {object} user
	 */
   this.server.on('added_character', function (data) {
      var character = new Character(data.id, data.character.col, data.character.row, data.character.skill, data.character.warlord);
      Game.players[data.id].characters[data.len] = character;
      Game.playerBoard.add(character);
      Game.setScreen(25, Game.playerBoard);
   
   });
	
   /**
	 * @event socket:moved_character
	 * @param {object} user
	 */
   this.server.on('moved_character', function (data) {
      // Move the character broadcasted to be moving.
      Game.players[data.id].characters[data.character].moves = data.path;
      Game.players[data.id].characters[data.character].move();
   });
   
	/**
	 * @event socket:killed_character
	 * @param {object} user
	 */
   this.server.on('killed_character', function (data) {
      console.log(data.player + " : " + data.character);
      Game.players[data.player].characters[data.character].kill();
   });
	
	/**
	 * @event socket:loaded_map
	 * @param {object} user
	 */
	this.server.on('loaded_map', function(data) {
		pn.localStorage.set(data.name, data.map);
		console.log("recv map");
	});

}


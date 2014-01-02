/**
 * @gloabl
 * @constant {integer} OBJECT_PLAYER
 * @default 1
 */
var OBJECT_PLAYER = 1,
/**
 * @gloabl
 * @constant {integer} OBJECT_TILE_COLLIDE
 * @default 2
 */
OBJECT_TILE_COLLIDE = 2,
/**
 * @gloabl
 * @constant {integer} OBJECT_TILE_NO_COLLIDE
 * @default 4
 */
OBJECT_TILE_NO_COLLIDE = 4,
/**
 * @gloabl
 * @constant {integer} OBJECT_ENEMY_PROJECTILE
 * @default 8
 */
OBJECT_ENEMY_PROJECTILE = 8,
/**
 * @gloabl
 * @constant {integer} OBJECT_POWERUP
 * @default 16
 */
OBJECT_POWERUP = 16,
/**
 * @gloabl
 * @constant {integer} PLAYER_SIZE
 * @default 32
 */
PLAYER_SIZE = 32;

/**
 * Contains the sprite data for the main asset image
 * @global
 * @type {object}
 */
var sprites = { 
   map: {
      32: { sx: 0, sy: 0, w: 64, h: 64, frames: 1 },             // bottomleft_tinroof
      29: { sx: 64, sy: 0, w: 64, h: 64, frames: 1 },          // bottomright_tinroof
      19: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 },            // cavefloor
      4: { sx: 64, sy: 64, w: 64, h: 64, frames: 1 },            // cocaine
      20: { sx: 128, sy: 0, w: 64, h: 64, frames: 1 },         // concrete
      5: { sx: 128, sy: 64, w: 64, h: 64, frames: 1 },         // concretebroken
      25: { sx: 192, sy: 0, w: 64, h: 64, frames: 1 },         // fence_bottomleft
      26: { sx: 192, sy: 64, w: 64, h: 64, frames: 1 },         // fence_bottomright
      22: {  sx: 128, sy: 128, w: 64, h: 64, frames: 1 },         // fence_horz
      23: { sx: 0, sy: 192, w: 64, h: 64, frames: 1 },         // fence_topleft
      24: { sx: 64, sy: 128, w: 64, h: 64, frames: 1 },         // fence_topright
      21: { sx: 0, sy: 128, w: 64, h: 64, frames: 1 },         //fence_vert
      2: { sx: 64, sy: 192, w: 64, h: 64, frames: 1 },         // forest
      3: { sx: 128, sy: 192, w: 64, h: 64, frames: 1 },         // grass
      33: {  sx: 320, sy: 192, w: 64, h: 64, frames: 1 },
      27: { sx: 192, sy: 128, w: 64, h: 64, frames: 1 },          // , horizontalsection_tinroof
      18: { sx: 192, sy: 192, w: 64, h: 64, frames: 1 },         // housefloor
      14: { sx: 256, sy: 0, w: 64, h: 64, frames: 1 },         // lake
      longgrass: { sx: 320, sy: 0, w: 64, h: 64, frames: 1 },      // longgrass
      1: { sx: 256, sy: 64, w: 64, h: 64, frames: 1 },         // mountain //was 11
      15: { sx: 384, sy: 0, w: 64, h: 64, frames: 1 },         // ocean
      16: { sx: 320, sy: 64, w: 64, h: 64, frames: 1 },         // path
      11: { sx: 256, sy: 128, w: 64, h: 64, frames: 1 },         //   path2 was 17
      13: { sx: 320, sy: 128, w: 64, h: 64, frames: 1 },         // pebel
      player: { sx: 448, sy: 128, w: 32, h: 32, frames: 1 },
      deadplayer: { sx: 480, sy: 128, w: 32, h: 32, frames: 1 },   // Player
      17: { sx: 256, sy: 192, w: 64, h: 64, frames: 1 },         // road
      12: { sx: 384, sy: 64, w: 64, h: 64, frames: 1 },         // sand
      31: { sx: 448, sy: 0, w: 64, h: 64, frames: 1 },         // topleft_tinroof
      30: { sx: 448, sy: 64, w: 64, h: 64, frames: 1 },         // topright_tinroof
      34: { sx: 384, sy: 192, w: 64, h: 64, frames: 1 },
      28: { sx: 384, sy: 128, w: 64, h: 64, frames: 1 },         //verticalsection_tinroof 
      tree: {sx: 0, sy: 256 , w: 128, h: 128, frames: 1},
      tree2: {sx: 0, sy: 384 , w: 128, h: 128, frames: 1},
      grass: {sx: 448, sy: 192 , w: 64, h: 64, frames: 1},
      bush: {sx: 448, sy: 256 , w: 64, h: 64, frames: 1},
      bush2: {sx: 448, sy: 320 , w: 64, h: 64, frames: 1},
      rock: {sx: 384, sy: 256 , w: 64, h: 64, frames: 1}, 
      smallrock: {sx: 320, sy: 256 , w: 64, h: 64, frames: 1},
      wheat: {sx: 256, sy: 256 , w: 64, h: 64, frames: 1},
      rope: {sx: 128, sy: 256 , w: 64, h: 64, frames: 1},
      boots: {sx: 192, sy: 256 , w: 64, h: 64, frames: 1},
      boat: {sx: 128, sy: 320 , w: 64, h: 64, frames: 1},
      weapons: {sx: 192, sy: 320 , w: 64, h: 64, frames: 1}
   },
   image: 'images/newsprites.png'
}

/**
 * @constructor
 * @class Game(2)
 * @todo gloabl functions need to be made part of the game object
 * @todo map setup needs to be part of another class, possible board
 * @todo vegitation needs to generated elsewhere too
 * @todo lessen any game logic in the mouse event listeners
 * @todo move CONSTANTS to Constants.js
 * @todo move sprites off client, and require them from server on asset loading
 * @todo rewrite gameCam to save memory on light-weight devices
 */
var Game = new function () {

	/**
	 * @public
	 * @type {Array.<object>}
	 */
   this.screens = [];
   this.gameCam = {x: 1920, y: 900, w: 0, h: 0, cols: 0, rows: 0, sc: 0, sr: 0, vx: 0, vy: 0};
	/**
	 * Used to determine mouse velocity
	 * @public
	 * @type {Array.<object>}
	 */
   this.oldRelPos = { x: 0, y: 0 };
	/**
	 * Used to track mouse down 
	 * @public
	 * @type {boolean}
	 */
   this.clicking = false;
   /**
	 * Used to track mouse down and on the move 
	 * @public
	 * @type {boolean}
	 */
   this.dragging = false;
	
	/**
	 * @public
	 * @param num the key on which the screen is stored in the game
	 * @param screen the screen that gets stored in the game
	 */
   this.setScreen = function(num, screen) { Game.screens[num] = screen; };

	/**
	 * @public
	 * @function 
	 */
   this.relMousePos = function (event) {
      if (event.offsetX !== undefined && event.offsetY !== undefined) {
         // IE9 + Chrome
          return { x: event.offsetX, y: event.offsetY };
      } else {
          // Firefox
         return { x: event.layerX, y: event.layerY };
      }
   }
   
	/**
	 * @public
	 * @param {DOMElement.id} canvasElementId
	 * @param {object} sprite_data
	 * @param {function} callback
	 */
   this.initialize = function (canvasElementId,sprite_data,callback) {

      this.canvasOuter = document.getElementById(canvasElementId);
      // Set up the rendering context
      this.canvas = this.canvasOuter.getContext && this.canvasOuter.getContext('2d');
      if(!this.canvas) { return alert("Please upgrade your browser to play"); }
      
      this.width = this.canvas.canvas.width = window.innerWidth;
      this.height = this.canvas.canvas.height = window.innerHeight;
      this.gameCam.w = this.width;
      this.gameCam.h = this.height;
      this.gameCam.cols = Math.floor(this.width/64)+2;
      this.gameCam.rows = Math.floor(this.height/64)+4;
      this.gameCam.sc = Math.floor(Game.gameCam.x/64)-2;
      this.gameCam.sr = Math.floor(Game.gameCam.y/64)-2; 
      this.counter = 0;
      this.board = new GameBoard();
      this.player = new Player();
      this.players = new GameBoard();
      this.messages = new GameBoard();
      this.socket = io.connect('http://fc.zacpez.com:9081');

      $(Game.canvasOuter).bind("contextmenu",function(e){
         return false;
      });
      $(Game.canvasOuter).mousedown( function (event) {
         event.preventDefault();
         if (event.which === 3) {
            Game.dragging = true;
            var mouse = Game.relMousePos(event);
            Game.oldRelPos.x = mouse.x;
            Game.oldRelPos.y = mouse.y;

         } else if (event.which === 1) {
            Game.clicking = true;
            var mouse = Game.relMousePos(event);
            var ox = mouse.x - mouse.x%64 + Game.gameCam.ox;
            var oy = mouse.y - mouse.y%64 + Game.gameCam.oy;
            var col = Math.floor(Game.gameCam.sc + mouse.x/64);
            var row = Math.floor(Game.gameCam.sr + mouse.y/64);
            Game.canvas.fillRect(ox,oy,64,64); //Draws a rectangular outline
         } 
      });
      $(Game.canvasOuter).mousemove( function (event) {
         event.preventDefault();
         if (Game.dragging) {
            var mouse = Game.relMousePos(event);
            Game.gameCam.ox = -( 64 + Game.gameCam.x%64);
            Game.gameCam.oy = -( 64 + Game.gameCam.y%64);
            Game.gameCam.vx = (mouse.x - Game.oldRelPos.x);
            Game.gameCam.vy = (mouse.y - Game.oldRelPos.y);
            Game.gameCam.x = Game.gameCam.x - Game.gameCam.vx;
            Game.gameCam.y = Game.gameCam.y - Game.gameCam.vy;
            Game.gameCam.sc = Math.floor(Game.gameCam.x/64)-2;
            Game.gameCam.sr = Math.floor(Game.gameCam.y/64)-2; 
            Game.oldRelPos.x = mouse.x;
            Game.oldRelPos.y = mouse.y;
            //console.log("X: " + Game.gameCam.x + ", Y: " + Game.gameCam.y);
         } else if (Game.clicking) {
            // Start to build path
            //other event while not clicking left mouse button
            var mouse = Game.relMousePos(event);
            var ox = mouse.x - mouse.x%64;
            var oy = mouse.y - mouse.y%64;
            var col = Math.floor(Game.gameCam.sc + mouse.x/64);
            var row = Math.floor(Game.gameCam.sr + mouse.y/64);
            Game.canvas.fillRect(ox,oy,64,64);
         } else {
            //other event while not clicking left mouse button
            var mouse = Game.relMousePos(event);
            var ox = (mouse.x + Math.abs(Game.gameCam.x%64 - 64)) - mouse.x%64;
            var oy = (mouse.y + Math.abs(Game.gameCam.y%64 - 64)) - mouse.y%64;
            var col = Math.floor(Game.gameCam.sc + mouse.x/64);
            var row = Math.floor(Game.gameCam.sr + mouse.y/64);
            Game.canvas.strokeRect(ox,oy,64,64); //Draws a rectangular outline
            //console.log("col: " + col + ", row: " + row);
         }
      });

      $(Game.canvasOuter).mouseup( function (event) {
         event.preventDefault();
         if (event.which === 1 && Game.players.length < Game.maxcharacters) {
            // Add a character and send it through the sockets
            
         } else if (event.which === 1) {
            // Submit move given character here
         }

         Game.clicking = false;
         Game.dragging = false;
         Game.gameCam.vx = 0;
         Game.gameCam.vy = 0;
      });
      
      // Start the game loop
      this.loop();

      // Load the sprite sheet and pass forward the callback.
      SpriteSheet.load(sprite_data,callback);
   }
   
   this.loop = function() {
      var dt = 30/1000;
      for(var i=0, len = Game.screens.length;i<len;i++) {
         if( Game.screens[i]) {
            Game.screens[i].update(dt);
            Game.screens[i] &&  Game.screens[i].draw(Game.canvas);
         }
      }
      setTimeout(Game.loop,30);
   }; 
};

/**
 * @todo To be made not global!!!
 */
var playGame = function(oldMsg) {

   Game.setScreen(5,Game.board); 
   Game.messages.markToRemove(oldMsg);
   Game.messages.add(new TitleScreen("Game Started", "Place your 5 characters"));
   Game.setScreen(30,Game.messages);
};
/**
 * @todo To be made not global!!!
 */
var startGame = function() {
   var board = new GameBoard(); 
	pn.socket.loadMap("World");
	while( pn.localStorage.getArrayFromLocalStorage("World") === undefined ){
		board.loadMap();
	}
	
   // New player added here, data gathered and organized
   Game.players = Game.socket.emit('add_player', {player: JSON.stringify(Game.player)});

   
   
   for(var i= 0; i < 199; i++) {
      for(var j = 0; j < 199; j++) {
         var x = (-( 64 + Game.gameCam.x%64))+((i-Game.gameCam.sc)*64);
         var y = (-( 64 + Game.gameCam.y%64))+((j-Game.gameCam.sr)*64);
         console.log(i + "i, " + j +"j");
         Game.board.add(new Tile(Game.board.map[i][j], x, y, i, j));
         Game.counter += 1;
         if (Game.board.map[i][j] == 2 && Math.random() > 0.9) {
            Game.board.add(new Tile('tree', x-64-(Math.random()*64), y-64-(Math.random()*64), i, j));
            Game.counter += 1;
         } else if (Game.board.map[i][j] == 2 && Math.random() > 0.9) {
            Game.board.add(new Tile('tree2', x-64-(Math.random()*64), y-64-(Math.random()*64), i, j));
            Game.counter += 1;
         }
         if (Game.board.map[i][j] == 3 && Math.random() > 0.99) {
            Game.board.add(new Tile('bush', x, y, i, j));
            Game.counter += 1;
         } else if (Game.board.map[i][j] == 3 && Math.random() > 0.99) {
            Game.board.add(new Tile('bush2', x, y, i, j));
            Game.counter += 1;
         } else if (Game.board.map[i][j] == 3 && Math.random() > 0.7) {
            Game.board.add(new Tile('grass', x, y, i, j));
            Game.counter += 1;
         }
         if (Game.board.map[i][j] == 1 && Math.random() > 0.99) {
            Game.board.add(new Tile('rock', x, y, i, j));
            Game.counter += 1;
         } else if (Game.board.map[i][j] == 1 && Math.random() > 0.95) {
            Game.board.add(new Tile('smallrock', x, y, i, j));
            Game.counter += 1;
         }
         if (Game.board.map[i][j] == 11 && Math.random() > 0.1) {
            Game.board.add(new Tile('wheat', x, y, i, j));
            Game.counter += 1;
         }
      }
   }
   console.log(Game.counter);
   Game.setScreen(5,Game.board); 
   Game.messages.add(new TitleScreen("Project NaN","Left click to start playing",playGame));   
   Game.setScreen(30,Game.messages);
}
/**
 * @todo To be move to other event listener on Main.js
 */
window.addEventListener("load", function() {
   Game.initialize("gamescreen",sprites,startGame);
});

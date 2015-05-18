/**
 * @global
 * @constant {integer} OBJECT_PLAYER
 * @default 1
 */
var OBJECT_PLAYER = 1,
/**
 * @global
 * @constant {integer} OBJECT_TILE_COLLIDE
 * @default 2
 */
OBJECT_TILE_COLLIDE = 2,
/**
 * @global
 * @constant {integer} OBJECT_TILE_NO_COLLIDE
 * @default 4
 */
OBJECT_TILE_NO_COLLIDE = 4,
/**
 * @global
 * @constant {integer} OBJECT_ENEMY_PROJECTILE
 * @default 8
 */
OBJECT_ENEMY_PROJECTILE = 8,
/**
 * @global
 * @constant {integer} OBJECT_POWERUP
 * @default 16
 */
OBJECT_POWERUP = 16,
/**
 * @global
 * @constant {integer} PLAYER_SIZE
 * @default 32
 */
PLAYER_SIZE = 32,
/**
 * @global
 * @constant {integer} TILE_SIZE
 * @default 64
 */
TILE_SIZE = 64,
/**
 * Used to render extra tiles around the border of the camera
 * @global
 * @constant {integer} EDGE_BUFFER
 * @default 2
 */
EDGE_BUFFER = 2,

/**
 * Percentages for sprite generation on the map.
 * @global
 * @enum {float} GENERATION
 */
GENERATION = {
   WIDTH: 199,
   HEIGHT: 199,
   TREE:  0.9,
   TREE2: 0.9,
   BUSH:  0.99,
   BUSH2: 0.99,
   GRASS: 0.7,
   ROCK:  0.99,
   ROCK2: 0.95,
   WHEAT: 0.1
},

/**
 * Contains the sprite data for the main asset image.
 * @global
 * @type {object}
 */
sprites = { 
  /**
   * This Map describes the graphical properties of the world map.
   * @enum
   * @property
   */
   map: {
      /**
       * Bottom left tin roof
       * @inner
       */
      32: { sx: 0, sy: 0, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Bottom right tin roof
       * @inner
       */
      29: { sx: 64, sy: 0, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Cave floor
       * @inner
       */
      19: { sx: 0, sy: 64, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Cocaine
       * @inner
       */
      4: { sx: 64, sy: 64, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Concrete
       * @inner
       */
      20: { sx: 128, sy: 0, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Broken Concrete
       * @inner
       */
      5: { sx: 128, sy: 64, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Bottom left fence
       * @inner
       */
      25: { sx: 192, sy: 0, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Bottom right fence
       * @inner
       */
      26: { sx: 192, sy: 64, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Horizontal fence
       * @inner
       */
      22: {  sx: 128, sy: 128, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Top left fence
       * @inner
       */
      23: { sx: 0, sy: 192, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Top right fence
       * @inner
       */
      24: { sx: 64, sy: 128, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Vertical fence
       * @inner
       */
      21: { sx: 0, sy: 128, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Forest
       * @inner
       */
      2: { sx: 64, sy: 192, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Grass
       * @inner
       */
      3: { sx: 128, sy: 192, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Horizonal tin roof, ripple in
       * @inner
       */
      33: {  sx: 320, sy: 192, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Horizonal tin roof, ripple out
       * @inner
       */
      27: { sx: 192, sy: 128, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * House floor
       * @inner
       */
      18: { sx: 192, sy: 192, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Lake water
       * @inner
       */
      14: { sx: 256, sy: 0, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Long Grass
       * @inner
       */
      longgrass: { sx: 320, sy: 0, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Mountain stone
       * @inner
       */
      1: { sx: 256, sy: 64, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Ocean Water
       * @inner
       */
      15: { sx: 384, sy: 0, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Basic Path
       * @inner
       */
      16: { sx: 320, sy: 64, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Basic Path 2
       * @inner
       */
      11: { sx: 256, sy: 128, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Pebels
       * @inner
       */
      13: { sx: 320, sy: 128, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Playable character
       * @inner
       */
      player: { sx: 448, sy: 128, w: 32, h: 32, frames: 1 },
      /**
       * "Unplayable" character
       * @inner
       */
      deadplayer: { sx: 480, sy: 128, w: 32, h: 32, frames: 1 },
      /**
       * Road
       * @inner
       */
      17: { sx: 256, sy: 192, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Sand
       * @inner
       */
      12: { sx: 384, sy: 64, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Top left tin roof
       * @inner
       */
      31: { sx: 448, sy: 0, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Top right tin roof
       * @inner
       */
      30: { sx: 448, sy: 64, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Vertical roof ripple in
       * @inner
       */
      34: { sx: 384, sy: 192, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Vertical roof ripple out
       * @inner
       */
      28: { sx: 384, sy: 128, w: TILE_SIZE, h: TILE_SIZE, frames: 1 },
      /**
       * Tree sprite
       * @inner
       */
      tree: {sx: 0, sy: 256 , w: 128, h: 128, frames: 1},
      /**
       * Tree 2 sprite
       * @inner
       */
      tree2: {sx: 0, sy: 384 , w: 128, h: 128, frames: 1},
      /**
       * Grass sprite
       * @inner
       */
      grass: {sx: 448, sy: 192 , w: TILE_SIZE, h: TILE_SIZE, frames: 1},
      /**
       * Bush sprite
       * @inner
       */
      bush: {sx: 448, sy: 256 , w: TILE_SIZE, h: TILE_SIZE, frames: 1},
      /**
       * Bush 2 sprite
       * @inner
       */
      bush2: {sx: 448, sy: 320 , w: TILE_SIZE, h: TILE_SIZE, frames: 1},
      /**
       * Rock sprite
       * @inner
       */
      rock: {sx: 384, sy: 256 , w: TILE_SIZE, h: TILE_SIZE, frames: 1}, 
      /**
       * Small rock sprite
       * @inner
       */
      smallrock: {sx: 320, sy: 256 , w: TILE_SIZE, h: TILE_SIZE, frames: 1},
      /**
       * Wheat sprite
       * @inner
       */
      wheat: {sx: 256, sy: 256 , w: TILE_SIZE, h: TILE_SIZE, frames: 1},
      /**
       * Item: Rope sprite
       * @inner
       */
      rope: {sx: 128, sy: 256 , w: TILE_SIZE, h: TILE_SIZE, frames: 1},
      /**
       * Item: Boots sprite
       * @inner
       */
      boots: {sx: 192, sy: 256 , w: TILE_SIZE, h: TILE_SIZE, frames: 1},
      /**
       * Item: boat sprite
       * @inner
       */
      boat: {sx: 128, sy: 320 , w: TILE_SIZE, h: TILE_SIZE, frames: 1},
      /**
       * Item: weapons sprite
       * @inner
       */
      weapons: {sx: 192, sy: 320 , w: TILE_SIZE, h: TILE_SIZE, frames: 1}
   },
  /**
   * Source image filename
   * @property
   * @inner
   */
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
var Game = function () {

   /**
    * @public
    * @type {Array.<object>}
    */
   this.screens = [];
   
   this.gameCam = new pn.GameCam();
   
   /**
    * Used to determine mouse velocity
    * @public
    * @type {Array.<object>}
    */
   this.oldRelPos = new pn.Vector2();
   
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
   this.setScreen = function(num, screen) { pn.game.screens[num] = screen; };

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
   this.initialize = function (canvasElementId,callback) {

      // Set up the rendering context
      this.canvasOuter = document.getElementById(canvasElementId);
      this.canvas = this.canvasOuter.getContext && this.canvasOuter.getContext('2d');

      if(!this.canvas) {
         return alert("Please upgrade your browser to play"); 
      }
   
      this.width = this.canvas.canvas.width = window.innerWidth;
      this.height = this.canvas.canvas.height = window.innerHeight;

      this.gameCam.setPos(1920,900);
      this.gameCam.setDimensions(this.width, this.height);
      this.gameCam.setTiles(
         Math.floor(this.width / TILE_SIZE) + EDGE_BUFFER,
         Math.floor(this.height / TILE_SIZE) + EDGE_BUFFER
      );
      this.gameCam.setSourceTile(
         Math.floor(this.gameCam.getPos().x / TILE_SIZE) - EDGE_BUFFER,
         Math.floor(this.gameCam.getPos().y / TILE_SIZE) - EDGE_BUFFER
      ); 

      this.counter = 0;
      this.board = new GameBoard();
      this.player = new Player();
      this.players = new GameBoard();
      this.messages = new GameBoard();

      $(pn.game.canvasOuter).bind("contextmenu",function(e){
         return false;
      });
      
      $(pn.game.canvasOuter).mousedown( function (event) {
         event.preventDefault();
         if (event.which === 3) {
            pn.game.dragging = true;
            var mouse = pn.game.relMousePos(event);
            pn.game.oldRelPos.set(mouse.x, mouse.y);

         } else if (event.which === 1) {
            pn.game.clicking = true;
            var mouse = pn.game.relMousePos(event);
            var offset = new pn.Vector2(mouse.x - (mouse.x % TILE_SIZE), mouse.y - (mouse.y % TILE_SIZE));
            pn.game.canvas.fillRect(offset.x, offset.y, TILE_SIZE, TILE_SIZE); //Draws a rectangular outline
         } 
      });
      
      $(pn.game.canvasOuter).mousemove( function (event) {
         event.preventDefault();
         if (pn.game.dragging) {
            var mouse = pn.game.relMousePos(event);
            pn.game.gameCam.setSourcePixel(
               -( TILE_SIZE - (pn.game.gameCam.getPos().x % TILE_SIZE)),
               -( TILE_SIZE - (pn.game.gameCam.getPos().y % TILE_SIZE))
            );
            pn.game.gameCam.setVelocity(
               mouse.x - pn.game.oldRelPos.x,
               mouse.y - pn.game.oldRelPos.y
            );
            pn.game.gameCam.setSourceTile(
               Math.floor(pn.game.gameCam.getPos().x / TILE_SIZE) - EDGE_BUFFER,
               Math.floor(pn.game.gameCam.getPos().y / TILE_SIZE) - EDGE_BUFFER
            );
            pn.game.oldRelPos.set(mouse.x, mouse.y);

         } else if (pn.game.clicking) {
            // Start to build path
            var mouse = pn.game.relMousePos(event);
            var offset = new pn.Vector2(mouse.x - mouse.x % TILE_SIZE, mouse.y - mouse.y % TILE_SIZE);
            pn.game.canvas.fillRect(offset.x ,offset.y, TILE_SIZE, TILE_SIZE);

         } else {
            //other event while not clicking left mouse button
            var mouse = pn.game.relMousePos(event);
            var offset = new pn.Vector2(mouse.x - (mouse.x % TILE_SIZE), mouse.y - (mouse.y % TILE_SIZE));
            pn.game.canvas.strokeRect(offset.x, offset.y, TILE_SIZE, TILE_SIZE); //Draws a rectangular outline

         }
      });

      $(pn.game.canvasOuter).mouseup( function (event) {
         event.preventDefault();
         if (event.which === 1 && pn.game.players.length < pn.game.maxcharacters) {
            // Add a character and send it through the sockets
            
         } else if (event.which === 1) {
            // Submit move given character here
         }

         pn.game.clicking = false;
         pn.game.dragging = false;
         pn.game.gameCam.setVelocity(0, 0);
      });
      
      // Start the game loop
      this.loop();

      // Load the sprite sheet and pass forward the callback.
      SpriteSheet.load(sprites,callback);

      pn.socket.loadMap("World", pn.game.start);
   }
   
   this.loop = function() {
      var dt = 30/1000;
      for (var i = 0, len = pn.game.screens.length; i < len; i += 1) {
         if ( pn.game.screens[i]) {
            pn.game.screens[i].update(dt);
            pn.game.screens[i] && pn.game.screens[i].draw(pn.game.canvas);
         }
      }
      pn.game.gameCam.update();
      setTimeout(pn.game.loop,30);
   }
   
   this.play = function (oldMsg) {
      this.setScreen(5, this.board); 
      this.messages.markToRemove(oldMsg);
      this.messages.add(new TitleScreen("Game Started", "Place your 5 characters"));
      this.setScreen(30, this.messages);
   }
   
   this.start = function() {      
      pn.socket.addUser('add_player', {player: JSON.stringify(pn.game.player)});
      
      for (var i = 0; i < GENERATION.WIDTH; i += 1) {
         for (var j = 0; j < GENERATION.HEIGHT; j += 1) {
            var x = (-( TILE_SIZE + (pn.game.gameCam.getPos().x%TILE_SIZE))) + ((i - pn.game.gameCam.getSourceTile().x) * TILE_SIZE);
            var y = (-( TILE_SIZE + (pn.game.gameCam.getPos().y%TILE_SIZE))) + ((j - pn.game.gameCam.getSourceTile().y) * TILE_SIZE);

            pn.game.board.add(new Tile(pn.game.board.map[i][j], x, y, i, j));
            pn.game.counter += 1;
            
            if (pn.game.board.map[i][j] == 2 && Math.random() > GENERATION.TREE) {
               pn.game.board.add(new Tile('tree', x-TILE_SIZE-(Math.random()*TILE_SIZE), y-TILE_SIZE-(Math.random()*TILE_SIZE), i, j));
               pn.game.counter += 1;
            } else if (pn.game.board.map[i][j] == 2 && Math.random() > GENERATION.TREE2) {
               pn.game.board.add(new Tile('tree2', x-TILE_SIZE-(Math.random()*TILE_SIZE), y-TILE_SIZE-(Math.random()*TILE_SIZE), i, j));
               pn.game.counter += 1;
            }
            
            if (pn.game.board.map[i][j] == 3 && Math.random() > GENERATION.BUSH) {
               pn.game.board.add(new Tile('bush', x, y, i, j));
               pn.game.counter += 1;
            } else if (pn.game.board.map[i][j] == 3 && Math.random() > GENERATION.BUSH2) {
               pn.game.board.add(new Tile('bush2', x, y, i, j));
               pn.game.counter += 1;
            } else if (pn.game.board.map[i][j] == 3 && Math.random() > GENERATION.GRASS) {
               pn.game.board.add(new Tile('grass', x, y, i, j));
               pn.game.counter += 1;
            }
            
            if (pn.game.board.map[i][j] == 1 && Math.random() > GENERATION.ROCK) {
               pn.game.board.add(new Tile('rock', x, y, i, j));
               pn.game.counter += 1;
            } else if (pn.game.board.map[i][j] == 1 && Math.random() > GENERATION.ROCK2) {
               pn.game.board.add(new Tile('smallrock', x, y, i, j));
               pn.game.counter += 1;
            }
            
            if (pn.game.board.map[i][j] == 11 && Math.random() > GENERATION.WHEAT) {
               pn.game.board.add(new Tile('wheat', x, y, i, j));
               pn.game.counter += 1;
            }
         }
      }
      console.log(pn.game.counter);
      pn.game.setScreen(5, pn.game.board); 
      pn.game.messages.add(new TitleScreen("Project NaN", "Left click to start playing", pn.game.play));   
      pn.game.setScreen(30, pn.game.messages);
   }
};


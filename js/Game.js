var OBJECT_PLAYER = 1,
OBJECT_TILE_COLLIDE = 2,
OBJECT_TILE_NO_COLLIDE = 4,
OBJECT_ENEMY_PROJECTILE = 8,
OBJECT_POWERUP = 16;


var sprites = {
	bottomleft_tinroof: { sx: 0, sy: 0, w: 64, h: 64, frames: 1 }, 				// 30
	bottomright_tinroof: { sx: 64, sy: 0, w: 64, h: 64, frames: 1 }, 				// 29
	cavefloor: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 },								// 19
	cocaine: { sx: 64, sy: 64, w: 64, h: 64, frames: 1 },								// 4
	concrete: { sx: 128, sy: 0, w: 64, h: 64, frames: 1 },							// 20
	concretebroken: { sx: 128, sy: 64, w: 64, h: 64, frames: 1 },					// Not Currently on the map
	fence_bottomleft: { sx: 192, sy: 0, w: 64, h: 64, frames: 1 },					// 25
	fence_bottomright: { sx: 192, sy: 64, w: 64, h: 64, frames: 1 },				// 26
	fence_horz: { sx: 0, sy: 128, w: 64, h: 64, frames: 1 },							// 22
	fence_topleft: { sx: 0, sy: 192, w: 64, h: 64, frames: 1 },						// 23
	fence_topright: { sx: 64, sy: 128, w: 64, h: 64, frames: 1 },					// 24
	fence_vert: { sx: 128, sy: 128, w: 64, h: 64, frames: 1 },						// 21
	forest: { sx: 64, sy: 192, w: 64, h: 64, frames: 1 },								// 2
	grass: { sx: 128, sy: 192, w: 64, h: 64, frames: 1 },								// 3
	horizontalsection_tinroof: { sx: 192, sy: 128, w: 64, h: 64, frames: 1 },	// 34, 28
	housefloor: { sx: 192, sy: 192, w: 64, h: 64, frames: 1 },						// 18
	lake: { sx: 256, sy: 0, w: 64, h: 64, frames: 1 },									// 14
	longgrass: { sx: 320, sy: 0, w: 64, h: 64, frames: 1 },							// 11
	mountain: { sx: 256, sy: 64, w: 64, h: 64, frames: 1 },							// 1
	ocean: { sx: 384, sy: 0, w: 64, h: 64, frames: 1 },								// 15
	path: { sx: 320, sy: 64, w: 64, h: 64, frames: 1 },								// 16
	path2: { sx: 256, sy: 128, w: 64, h: 64, frames: 1 },								//	17
	pebel: { sx: 320, sy: 128, w: 64, h: 64, frames: 1 },								// 13
	player: { sx: 320, sy: 192, w: 32, h: 32, frames: 1 },							// Player
	road: { sx: 256, sy: 192, w: 64, h: 64, frames: 1 },								// Not Currently on the map
	sand: { sx: 384, sy: 64, w: 64, h: 64, frames: 1 },								// 12
	topleft_tinroof: { sx: 448, sy: 0, w: 64, h: 64, frames: 1 },					// 31
	topright_tinroof: { sx: 448, sy: 64, w: 64, h: 64, frames: 1 },				// 32
	verticalsection_tinroof: { sx: 384, sy: 128, w: 32, h: 64, frames: 1 }		// 33, 27
}

var Game = new function () {
   this.screens = [];	
	this.gameCam = {x: 0, y: 0, w: 0, h: 0, cols: 0, rows: 0};
	
	this.setScreen = function(num, screen) { Game.screens[num] = screen; };
	
	this.initialize = function (canvasElementId,sprite_data,callback) {

		this.canvasOuter = document.getElementById(canvasElementId);
		// Set up the rendering context
		this.canvas = this.canvasOuter.getContext && this.canvasOuter.getContext('2d');
		if(!this.canvas) { return alert("Please upgrade your browser to play"); }
		
		this.width = this.canvas.canvas.width = window.innerWidth;
		this.height = this.canvas.canvas.height = window.innerHeight;
		this.gameCam.w = this.width;
		this.gameCam.h - this.height;
		this.cols = Math.floor(this.width/64)+2;
		this.rows = Math.floor(this.height/64)+2;

	
		
		$(this.canvas).mousedown( function (event) {
			this.gameCam.x = 0;
		});
		$(this.canvas).mouseup( function (event) {
			
		});
		
		// Start the game loop
		//this.loop();

		// Load the sprite sheet and pass forward the callback.
		SpriteSheet.load(sprite_data,callback);
	}
	
	this.loop = function() {
		var dt = 30/1000;
		for(var i=0, len = Game.screens.length;i<len;i++) {
			if( Game.screens[i]) {
				 Game.screens[i].update(dt);
				 Game.screens[i] &&  Game.screens[i].draw(Game.ctx);
			}
		}
		setTimeout(Game.loop,30);
	}; 
};

var playGame = function() {
		Game.setScreen(3,new TitleScreen("Project NaN", "Game Started..."));
		
		var board = new GameBoard(); 
		board.loadMap();
		
		for(var i= 0; i < Game.gameCam.cols; i++) {
			for(var j = 0; j < Game.gameCam.rows; j++) {
			   
				board.add(new Tile());
			}
		}
		
		Game.setScreen(3,board); 

	};

var startGame = function() {
	
	Game.setScreen(0,new TitleScreen("Alien Invasion","Press space to start playing",playGame));	
	//SpriteSheet.draw(Game.ctx,"ship",100,100);
}

window.addEventListener("load", function() {
	Game.initialize("gamescreen",sprites,startGame);
});

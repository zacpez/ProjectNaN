/**
 * Global game object, which can be called from anywhere.
 * @global
 * @type {object}
 * @name pn
 */
var pn = {
   "socket": {},
   "menu": {},
   "localStorage": {},
   "game": {},
   "player": {}
};

/**
 * After all assets are download, however executed before AJAX
 * @event window:load
 */
$(window).load(function () {
   pn.socket = new Socket('localhost:9081');
   pn.menu = new Menu();
   pn.menu.initialize(pn.socket);
	pn.localStorage = new LocalStorage();
   pn.localStorage.initialize();
   pn.game = new Game();
   pn.game.initialize("gamescreen", pn.game.start);
});   


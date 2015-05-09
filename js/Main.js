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
 * @event window:load
 */
$(window).load(function () {
   
   //var game = new Game();
   //game.init();
   
   //var database = new Database();
   //if (database.init()) {
   //   var serverList = database.getServerList();
   //}
   pn.socket = new Socket('localhost:9081');
   pn.menu = new Menu();
   pn.menu.initialize(pn.socket);
	pn.localStorage = new LocalStorage();
   pn.localStorage.initialize();
});   


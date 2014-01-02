/**
 * @constructor
 * @class LocalStorage
 * 
 */
function LocalStorage() {

   /**
	 * Loaded server list
	 * @public
	 * @type {Array.<object>}
	 */
   this.servers = [];
	
	/**
	 * Grabs the server list
	 * @public
	 */
   this.initialize = function () {
      pn.socket.getRoomList();
   }
	
   /**
	 * Sets a value of a key to undefined in the browsers storage
	 * @public
	 */
   this.clear = function (key){
      var localData = new Array();
      localStorage.setItem(key, undefined);
   }
	
	/**
	 * @public
	 * @param key name on data to be set in the browsers storage
	 * @param value data to be set in the browsers storage
	 */
   this.set = function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
   }
	
	/**
	 * @public
	 * @param key search key to find in browser storage
	 * @returns response value that the search key is related to
	 */
   this.getArrayFromLocalStorage = function (key) {
      var response = localStorage.getItem(key);
      if (!(response)) {
          return undefined; 
      } else {
          response = JSON.parse(response);
      }
      return response;
   }

};


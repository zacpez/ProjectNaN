//
// Localstorage.js
//

var LocalStorage = new function () {
   this.servers = [];
   
	this.init = function () {
		Database.loadMap();
      Game.board.loadMap();
      Database.loadServers();
	}
	
   this.clear = function (){
      var theArray = new Array();
      localStorage.setItem("map", JSON.stringify(theArray));
   }
	
	this.set = function (key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

   this.getArrayFromLocalStorage = function (key) {
      var theArray = localStorage.getItem(key);
      
      if (! theArray) {
          theArray = new Array();
      } else {
          theArray = JSON.parse(theArray);
      }

      return theArray;
   }

};


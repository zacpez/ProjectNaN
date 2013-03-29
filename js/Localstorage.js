//
// Localstorage.js
//

var LocalStorage = new function () {
   
	this.init = function () {
		Database.loadMap();
      Game.board.loadMap();
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


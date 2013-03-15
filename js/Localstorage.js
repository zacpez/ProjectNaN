//
// Localstorage.js
//

var LocalStorage = function () {
   
   this.clear = function (){
      var theArray = new Array();
      localStorage.setItem("map", JSON.stringify(theArray));
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


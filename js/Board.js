
//gameboard.js
var GameBoard = function() {
	var board = this;
	
	// The current list of objects
	this.objects = [];
	this.objTypeCounts = [];

	this.map = [];
	this.loadMap = function () {
	
		this.map = LocalStorage.getArrayFromLocalStorage("World");

	}
	
	// Add a new object to the object list
	this.add = function(obj) {
		obj.board=this;
		this.objects.push(obj);
		this.objTypeCounts[obj.type] = (this.objTypeCounts[obj.type] || 0) + 1;
		return obj;
	};
	
	this.objectsToRemove = [];
	// Mark an object for removal
	this.markToRemove = function(obj) {
		var wasStillAlive = this.objects.indexOf(obj) != -1;
		if(wasStillAlive) { this.objectsToRemove.push(obj);  }
		return wasStillAlive;
	};

	// Reset the list of objectsToRemove objects
	this.resetObjectsToRemove = function() { this.objectsToRemove = []; }

	// Remove objects marked for removal from the list
	this.finalizeRemoved = function() {
		for(var i=0,len=this.objectsToRemove.length;i<len;i++) {
			var idx = this.objects.indexOf(this.objectsToRemove[i]);
			if(idx != -1) {
				this.objTypeCounts[this.objectsToRemove[i].type]--;
				this.objects.splice(idx,1);
			}
		}
	};
	
	// Call the same method on all current objects
	this.iterate = function(funcName) {
		var args = Array.prototype.slice.call(arguments,1);
		for(var i=0,len=this.objects.length;i<len;i++) {
			var obj = this.objects[i];
			obj[funcName].apply(obj,args)
		}
	};
	
	this.overlap = function(o1,o2) {
		return !((o1.y+o1.h-1<o2.y) || (o1.y>o2.y+o2.h-1) ||
			(o1.x+o1.w-1<o2.x) || (o1.x>o2.x+o2.w-1));
	};
	
		
	this.collide = function(obj,opposingtype) { 
		for(var i = 0, len=this.objects.length; i < len; i++) { 
			var opponent = this.objects [i];
			if(obj != opponent) { 
				var collision = (!opposingtype || opponent.type === opposingtype) && board.overlap(obj,opponent) ;
				if (collision)
					return opponent;
			} 
		}
		return false;
	};


	// Call update on all objects and then delete
	// any objects that have been marked for removal
	this.update = function(dt) {
		this.resetObjectsToRemove();
		this.iterate('update',dt);
		this.finalizeRemoved();		
	};
	
	// Draw all the objects
	this.draw= function(ctx) {
		this.iterate('draw',ctx);
	};
};

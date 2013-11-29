
var Player = function (){
	this.name;

}

Player.prototype = {

	initialize: fucntion (){
		// Overwrite the default
		
	},
	
	set: function( key, value ){
		this[key] = value;
	},

	get: function (){
		return this[key];
	}
}

var TileMap = (function(){
	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	this.width;
	this.height;
	var grid;
	this.txtMovements;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------
	var TileMap = function(p_width, p_height) {
		this.width = p_width;
		this.height = p_height;
		grid = new Array(this.height);

		for(var y = 0; y < this.height; y++)
			grid[y] = new Array(this.width);

		nbMovements = 0;
	}

	var twoDigits = function(num) {
		(String(num).length < 2) ? num = String("0" + num) :  num = String(num);
		return num;	
	}

	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------
	TileMap.prototype = {
		load: function(p_chapter, p_level) {
			var str_chapter = twoDigits(p_chapter);
			var str_level = twoDigits(p_level);

			var current_stage = game.cache.getText('chapter_'+ str_chapter +'_stage_' + str_level);
			var json = JSON.parse(current_stage);
			
			var jsonWidth = json['width'];
			var jsonHeight = json['height'];
			var tm = json['tiles'];

			for(var h = 0; h < jsonHeight; h++) {
				for(var w = 0; w < jsonWidth; w++) {
					
					// OPTIONAL TODO: Put all enum's value on an array and access it with tm[h][w]
					// TODO: Values must be constants type
					switch(tm[h][w]) {
						case 0: 
							grid[h][w] = new Tile(e_TileType.EMPTY, w, h);
							break;

						case 1: 
							grid[h][w] = new Tile(e_TileType.ROCK, w, h);
							break;

						case 10:  
							grid[h][w] = new Tile(e_TileType.GB_GREEN, w, h);
							break;

						case 11: 
							grid[h][w] = new Tile(e_TileType.GB_RED, w, h);
							break;
					}	
				}
			}
			
			var bloxAmount = json['gem_blox_amount'];
			gemBloxs = new Array(bloxAmount);
			for(var i = 0; i < gemBloxs.length; i++) 
				gemBloxs[i] = new GemBlox(gemBloxArray[json['blox'][i]['color']], json['blox'][i]['x'], json['blox'][i]['y']);

			gameState = gameState_e.IN_GAME;

			var text = "Nb. movements:" + nbMovements;
			var style = { font: "15px Arial", fill: "#00ff00", align: "center" };
			this.txtMovements = game.add.text(2, 28, text, style);
		},

		getGrid: function() {
			return grid;
		},

		getWidth: function() {
			return this.width;
		},

		getHeight: function() {
			return this.height;
		},

		destroy: function() {
			for(var h = 0; h < this.height; h++) 
				for(var w = 0; w < this.width; w++) 
					grid[h][w].sprite.destroy();

			for(var i = 0; i < gemBloxs.length; i++)
				gemBloxs[i].sprite.destroy();

			this.txtMovements.destroy();
		}
	};

	return TileMap;
}());
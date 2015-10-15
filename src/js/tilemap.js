/** ----------------------------------------------------------
 * Project: GemBlox
 * Author: Kris Rejas (kris0x00)
 * Version: 0.5, 2015-10-09, Phaser edition
 * -----------------------------------------------------------*/

var TileMap = (function(){
	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	this.width;
	this.height;
	var grid;
	this.txtMovements;
	this.exceptedBlox;
	this.wall;
	this.offset;
	this.btnReset;
	this.btnBack;
	this.level;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------
	var TileMap = function(p_width, p_height) {
		this.width = p_width;
		this.height = p_height;

		this.offset = {
			x: -(GAME_WIDTH - (this.width * TILE_SIZE)) / 2, 
			y: -(GAME_HEIGHT - (this.height * TILE_SIZE) + 15)
		};

		grid = new Array(this.height);
		for(var y = 0; y < this.height; y++)
			grid[y] = new Array(this.width);

		nbMovements = 0;
		this.exceptedBlox = 0;

		this.wall = new Array();
		var right = game.add.sprite(this.width * TILE_SIZE, 0, '');	
		right.height = GAME_HEIGHT;
		game.physics.ninja.enableTile(right, right.frame);
		var bottom 	= game.add.sprite(0, this.height * TILE_SIZE, '');
		bottom.width = GAME_WIDTH;
		game.physics.ninja.enableTile(bottom, bottom.frame);
		
		this.wall.push(right);
		this.wall.push(bottom);

		this.level = 0;
	}

	var twoDigits = function(num) {
		(String(num).length < 2) ? num = String("0" + num) :  num = String(num);
		return num;	
	}

	var btnResetOnClick = function() {
		this.destroy();
		this.load(1, this.level);
	}

	var btnBackOnClick = function() {
		this.destroy();
		chapters = new Chapters(NB_STAGES);
		chapters.show();
	}

	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------
	TileMap.prototype = {
		load: function(p_chapter, p_level) {
			this.level = p_level;

			var str_chapter = twoDigits(p_chapter);
			var str_level = twoDigits(p_level);

			var current_stage = game.cache.getText('stage_' + str_level);
			var json = JSON.parse(current_stage);
			
			var jsonWidth = json['width'];
			var jsonHeight = json['height'];
			var tm = json['tiles'];

			for(var h = 0; h < this.height; h++) {
				for(var w = 0; w < this.width; w++) {
					
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
							grid[h][w] = new Tile(e_TileType.GB_RED, w, h);
							break;

						case 11: 
							grid[h][w] = new Tile(e_TileType.GB_BLUE, w, h);
							break;

						case 12:
							grid[h][w] = new Tile(e_TileType.GB_GREEN, w, h);
							break;

						case 13:
							grid[h][w] = new Tile(e_TileType.GB_YELLOW, w, h);
							break;

						default:
							grid[h][w] = new Tile(e_TileType.EMPTY, w, h);
							break;
					}	
				}
			}
			
			var bloxAmount = json['gem_blox_amount'];
			gemBloxs = new Array(bloxAmount);
			for(var i = 0; i < gemBloxs.length; i++) 
				gemBloxs[i] = new GemBlox(gemBloxArray[json['blox'][i]['color']], json['blox'][i]['x'], json['blox'][i]['y']);

			gameState = gameState_e.IN_GAME;

			var text = "Moves: " + nbMovements;
			var style = { font: "20px Arial", fill: "#ffffff", align: "center" };
			this.txtMovements = game.add.text(15, 10, text, style);
			this.exceptedBlox = bloxAmount;

			this.btnReset = game.add.text(GAME_WIDTH - 200, 10, "RESET", style);
			this.btnReset.inputEnabled = true;
			this.btnReset.events.onInputUp.add(btnResetOnClick, this);

			this.btnBack = game.add.text(GAME_WIDTH - 100, 10, "BACK", style);
			this.btnBack.inputEnabled = true;
			this.btnBack.events.onInputUp.add(btnBackOnClick, this);
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

		end: function() {
			// TODO: Show the score table + options
			// Options: 1) Retry, 2) Next level, 3) Quit
		},

		destroy: function() {
			for(var h = 0; h < this.height; h++) 
				for(var w = 0; w < this.width; w++) 
					grid[h][w].sprite.destroy();

			for(var i = 0; i < gemBloxs.length; i++)
				gemBloxs[i].sprite.destroy();

			this.txtMovements.destroy();
			this.btnReset.destroy();
			this.btnBack.destroy();
			nbMovements = 0;
		},

		update: function() {
			this.txtMovements.text = "Moves:   " + nbMovements;
		}
	};

	return TileMap;
}());
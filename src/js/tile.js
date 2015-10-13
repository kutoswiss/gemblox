var TILE_SIZE = 128 * SCALING;

var e_TileType = {
	EMPTY: 		{key: 'tile_empty', 	isAllowed: true},
	ROCK: 		{key: 'tile_rock', 		isAllowed: false},
	WATER: 		{key: 'tile_water', 	isAllowed: true},

	FLAKE: 		{key: 'tile_flake', 	isAllowed: true},
	FLAKE_OK: 	{key: '', 				isAllowed: false},

	GB_RED:		{key: 'tile_gb_red',	isAllowed: true},
	GB_BLUE:	{key: 'tile_gb_blue',	isAllowed: true},
	GB_GREEN:	{key: 'tile_gb_green',	isAllowed: true},
	GB_YELLOW:	{key: 'tile_gb_yellow',	isAllowed: true},

	GB_RED_OK:		{key: '',			isAllowed: false},
	GB_BLUE_OK:		{key: '',			isAllowed: false},
	GB_GREEN_OK:	{key: '',			isAllowed: false},
	GB_YELLOW_OK:	{key: '',			isAllowed: false},

	BLOCK: 		{key: '',				isAllowed: false}
};

var Tile = (function(){
	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	this.type;
	this.sprite;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------
	var Tile = function(p_type, p_x, p_y) {
		this.position = {x: 0, y: 0};
		this.type = p_type;
		this.sprite = game.add.sprite(p_x * TILE_SIZE, p_y * TILE_SIZE, this.type.key);	
		this.sprite.loadTexture(this.type.key);
		this.sprite.scale.setTo(SCALING, SCALING);
		game.physics.ninja.enableTile(this.sprite, this.sprite.frame);

		if(this.type.isAllowed == false) {
			tileObstacles.push(this.sprite);
		}
	}

	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------
	Tile.prototype = {
		getType: function() {
			return this.type;
		}
	};

	return Tile;
}());
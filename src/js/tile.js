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
	var sprite;
	var position;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------
	var Tile = function() {
		position = {x: 0, y: 0};
		this.type = e_TileType.EMPTY;
		sprite = game.add.sprite(position.x, position.y, this.type.key);
	}

	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------
	Tile.prototype = {
		setPosition: function(p_x, p_y) {
			position.x = p_x;
			position.y = p_y;

			sprite.x = position.x * TILE_SIZE;
			sprite.y = position.y * TILE_SIZE;		
		},

		setType: function(p_tileType) {
			this.type = p_tileType;
			sprite.loadTexture(this.type.key);
		},

		getType: function() {
			return this.type;
		}
	};

	return Tile;
}());
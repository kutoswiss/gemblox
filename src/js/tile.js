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

var Tile = function() {
	this.type;
	this.sprite;
	this.position = {x: 0, y: 0};

	this.SetType = function(tileType) {
		this.type = tileType;
		this.sprite = game.add.sprite(this.position.x, this.position.y, tileType.key);
	};

	this.SetPosition = function(x, y) {
		this.position.x = x;
		this.position.y = y;

		this.sprite.x = this.position.x * TILE_SIZE;
		this.sprite.y = this.position.y * TILE_SIZE;
	};
}
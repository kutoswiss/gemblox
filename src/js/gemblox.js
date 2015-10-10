var eDirection = {
	NONE: 	0,
	LEFT: 	1,
	RIGHT: 	2,
	UP: 	3,
	DOWN: 4
};

var e_GemBloxColor = {
	RED: 		{key: 'gem_blox_red',	 tile_to_reach: e_TileType.GB_RED, 		tile_reached: e_TileType.GB_RED_OK},
	BLUE: 		{key: 'gem_blox_blue', 	 tile_to_reach: e_TileType.GB_BLUE, 	tile_reached: e_TileType.GB_BLUE_OK},
	GREEN: 		{key: 'gem_blox_green',  tile_to_reach: e_TileType.GB_GREEN, 	tile_reached: e_TileType.GB_GREEN_OK},
	YELLOW: 	{key: 'gem_blox_yellow', tile_to_reach: e_TileType.GB_YELLOW, 	tile_reached: e_TileType.GB_YELLOW_OK}
};

var gemBloxArray = new Array(4);
gemBloxArray[0] = e_GemBloxColor.RED;
gemBloxArray[1] = e_GemBloxColor.BLUE;
gemBloxArray[2] = e_GemBloxColor.GREEN;
gemBloxArray[3] = e_GemBloxColor.YELLOW;

var GemBlox = (function(){
	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	var color;
	var previousTile;
	var mouseUp;
	var mouseDown;
	this.direction;
	this.position;
	this.sprite;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------
	var GemBlox = function(p_color, p_x, p_y) {
		color = p_color;
		this.position = {x: p_x, y: p_y};
		mouseUp = {x: 0, y: 0};
		mouseDown = {x: 0, y: 0};
		this.direction = eDirection.NONE;

		this.sprite = game.add.sprite(this.position.x, this.position.y, color.key);
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(onMouseDown, this);
		this.sprite.events.onInputUp.add(onMouseUp, this);
	}

	var onMouseDown = function() {
		mouseDown.x = game.input.activePointer.x;
		mouseDown.y = game.input.activePointer.y;
	}

	var onMouseUp = function() {
		mouseUp.x = game.input.activePointer.x;
		mouseUp.y = game.input.activePointer.y;

		var deltaX = Math.abs(mouseUp.x - mouseDown.x);
		var deltaY = Math.abs(mouseUp.y - mouseDown.y);

		if(deltaX > deltaY)
			this.direction = (mouseUp.x > mouseDown.x) ? eDirection.RIGHT : eDirection.LEFT;
		else
			this.direction = (mouseUp.y > mouseDown.y) ? eDirection.DOWN : eDirection.UP;
	}

	var isThereABlox = function(p_x, p_y) {
		var result = false;
		for(var i = 0; (i < gemBloxs.length) && (result == false); i++) 
			result = ((gemBloxs[i].position.x == p_x) && (gemBloxs[i].position.y == p_y)) ? true : false;
		return result;
	}

	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------
	GemBlox.prototype = {
		setPosition: function(p_x, p_y) {
			this.position.x = p_x;
			this.position.y = p_y;
		},

		update: function() {
			var tmpX = this.position.x;
			var tmpY = this.position.y;

			switch(this.direction) {
				case eDirection.UP:
					if(((tmpY-1) >= 0) && (!isThereABlox(tmpX, tmpY-1)) && (tileMap.getGrid()[tmpY-1][tmpX].getType().isAllowed == true))
						this.position.y--;
					else
						this.direction = eDirection.NONE;
					break;

				case eDirection.DOWN:
					if(((tmpY+1) < tileMap.getHeight()) && (!isThereABlox(tmpX, tmpY+1)) &&(tileMap.getGrid()[tmpY+1][tmpX].getType().isAllowed == true))
						this.position.y++;
					else
						this.direction = eDirection.NONE;
					break;

				case eDirection.LEFT:
					if(((tmpX-1) >= 0) && (!isThereABlox(tmpX-1, tmpY)) && (tileMap.getGrid()[tmpY][tmpX-1].getType().isAllowed == true))
						this.position.x--;
					else
						this.direction = eDirection.NONE;
					break;

				case eDirection.RIGHT:
					if(((tmpX+1) < tileMap.getWidth()) && (!isThereABlox(tmpX+1, tmpY)) && (tileMap.getGrid()[tmpY][tmpX+1].getType().isAllowed == true))
						this.position.x++;
					else
						this.direction = eDirection.NONE;
					break;

			}
			
			this.sprite.x = this.position.x * TILE_SIZE;
			this.sprite.y = this.position.y * TILE_SIZE;
		}
	};

	return GemBlox;
}());
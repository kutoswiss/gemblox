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

var GemBlox = function(p_color, posX, posY) {

	
	// These lines are not working :(, dunno why
	/*this.color = e_GemBloxColor.RED;
	this.position = {x: 0, y: 0};
	this.sprite;

	this.setPosition(posX, posY);
	this.setColor(p_color);*/

	this.color = p_color;
	this.position = {x: posX, y: posY};

	this.sprite = game.add.sprite(posX, posY, this.color.key);
	this.sprite.x = posX * TILE_SIZE;
	this.sprite.y = posY * TILE_SIZE;

	this.previousTile = tileMap.getGrid()[posY][posX].type;
	tileMap.getGrid()[posY][posX].type = e_TileType.BLOCK;

	this.sprite.inputEnabled = true;
	this.sprite.events.onInputDown.add(block_onMouseDown, this);
	this.sprite.events.onInputUp.add(block_onMouseUp, this);

	this.direction;
	this.mouseDown = {x: 0, y: 0};
	this.mouseUp = {x: 0, y: 0};

	function block_onMouseDown() {
		this.mouseDown.x = game.input.activePointer.x;
		this.mouseDown.y = game.input.activePointer.y;
	}

	function block_onMouseUp() {
		this.mouseUp.x = game.input.activePointer.x;
		this.mouseUp.y = game.input.activePointer.y;

		var deltaX = Math.abs(this.mouseUp.x - this.mouseDown.x);
		var deltaY = Math.abs(this.mouseUp.y - this.mouseDown.y);

		if(deltaX > deltaY)
			this.direction = (this.mouseUp.x > this.mouseDown.x) ? eDirection.RIGHT : eDirection.LEFT;
		else
			this.direction = (this.mouseUp.y > this.mouseDown.y) ? eDirection.DOWN : eDirection.UP;

		this.move(this.direction);
	}

	this.setColor = function(p_color) {
		this.color = p_color;
		this.sprite = game.add.sprite(this.position.x, this.position.y, this.color.key);
	}

	this.setPosition = function(x, y) {
		this.position.x = x;
		this.position.y = y;
	}

	/**
	 * @brief Function to move the gemblox
	 * @param Direction of the gemblox (direction enum type)
	 */
	this.move = function(direction) {
		var tmpX = this.position.x;
		var tmpY = this.position.y;

		if(tileMap.getGrid()[tmpY][tmpX].type == this.color.tile_reached)
			tileMap.getGrid()[tmpY][tmpX].type = this.color.tile_to_reach;	
		else
			tileMap.getGrid()[tmpY][tmpX].type = this.previousTile;

		switch(this.direction) {
			case eDirection.RIGHT:
			for(var i = tmpX; i < tileMap.getWidth(); i++)
				if(tileMap.getGrid()[tmpY][tmpX+1].type.isAllowed == true)
					tmpX = i;
				break;

			case eDirection.LEFT:
				for(var i = tmpX; i >= 0; i--)
					if(tileMap.getGrid()[tmpY][tmpX-1].type.isAllowed == true)
						tmpX = i;
				break;

			case eDirection.DOWN:
				for(var i = tmpY; i < tileMap.getHeight(); i++)
					if(tileMap.getGrid()[tmpY+1][tmpX].type.isAllowed == true)
						tmpY = i;
				break;

			case eDirection.UP:
				for(var i = tmpY; i >= 0; i--)
					if(tileMap.getGrid()[tmpY-1][tmpX].type.isAllowed == true)
						tmpY = i;
				break;
		}

		this.setPosition(tmpX, tmpY);

		if(tileMap.getGrid()[tmpY][tmpX].type == this.color.tile_to_reach) 
			tileMap.getGrid()[tmpY][tmpX].type = this.color.tile_reached;
		else {
			this.previousTile = tileMap.getGrid()[tmpY][tmpX].type;
			tileMap.getGrid()[tmpY][tmpX].type = e_TileType.BLOCK;
		}
	}

	/**
	 * @brief Function to update the gemblox position visually
	 */
	this.update = function() {
		this.sprite.x = this.position.x * TILE_SIZE;
		this.sprite.y = this.position.y * TILE_SIZE;
	}
}
var eDirection =
{
	NONE: 	0,
	LEFT: 	1,
	RIGHT: 	2,
	UP: 	3,
	DOWN: 4
};

var e_GemBloxColor = 
{
	RED: 		{key: 'gem_blox_red', 		},
	BLUE: 		{key: 'gem_blox_blue', 		},
	GREEN: 		{key: 'gem_blox_green', 	},
	YELLOW: 	{key: 'gem_blox_yellow', 	}
};

function Pingu(color, posX, posY)
{
	this.color = color;
	this.position = {x: posX, y: posY};

	this.sprite = game.add.sprite(posX, posY, this.color.key);
	this.sprite.x = posX * TILE_SIZE;
	this.sprite.y = posY * TILE_SIZE;

	tileMap.grid[posY][posX].type = e_TileType.BLOCK;


	this.sprite.inputEnabled = true;
	this.sprite.events.onInputDown.add(block_onMouseDown, this);
	this.sprite.events.onInputUp.add(block_onMouseUp, this);

	this.direction;
	this.mouseDown = {x: 0, y: 0};
	this.mouseUp = {x: 0, y: 0};


	function block_onMouseDown()
	{
		this.mouseDown.x = game.input.activePointer.x;
		this.mouseDown.y = game.input.activePointer.y;
	};

	function block_onMouseUp()
	{
		this.mouseUp.x = game.input.activePointer.x;
		this.mouseUp.y = game.input.activePointer.y;

		var deltaX = Math.abs(this.mouseUp.x - this.mouseDown.x);
		var deltaY = Math.abs(this.mouseUp.y - this.mouseDown.y);

		if(deltaX > deltaY)
			this.direction = (this.mouseUp.x > this.mouseDown.x) ? eDirection.RIGHT : eDirection.LEFT;
		else
			this.direction = (this.mouseUp.y > this.mouseDown.y) ? eDirection.DOWN : eDirection.UP;

		this.Move(this.direction);
	};

	this.SetColor = function(gemBloxColor)
	{
		this.color = gemBloxColor;
		this.sprite = game.add.sprite(this.position.x, this.position.y, this.color.key);
	};


	this.SetPosition = function(x, y)
	{
		this.position.x = x;
		this.position.y = y;

		this.sprite.x = this.position.x * TILE_SIZE;
		this.sprite.y = this.position.y * TILE_SIZE;
	};

	this.Move = function(direction)
	{
		var tmpX = this.position.x;
		var tmpY = this.position.y;

		if(tileMap.grid[tmpY][tmpX].type == e_TileType.FLAKE_OK)
			tileMap.grid[tmpY][tmpX].type = e_TileType.FLAKE;	
		else
			tileMap.grid[tmpY][tmpX].type = e_TileType.EMPTY;

		switch(this.direction)
		{
			case eDirection.RIGHT:
			
				for(var i = tmpX; i < tileMap.width; i++)
					if(tileMap.grid[tmpY][tmpX+1].type.isAllowed == true)
						tmpX = i;
			
				break;

			case eDirection.LEFT:
				for(var i = tmpX; i >= 0; i--)
					if(tileMap.grid[tmpY][tmpX-1].type.isAllowed == true)
						tmpX = i;
				break;

			case eDirection.DOWN:
				for(var i = tmpY; i < tileMap.height; i++)
					if(tileMap.grid[tmpY+1][tmpX].type.isAllowed == true)
						tmpY = i;
				break;

			case eDirection.UP:
				for(var i = tmpY; i >= 0; i--)
					if(tileMap.grid[tmpY-1][tmpX].type.isAllowed == true)
						tmpY = i;
				break;

		}
		
		this.SetPosition(tmpX, tmpY);

		if(tileMap.grid[tmpY][tmpX].type == e_TileType.FLAKE)
			tileMap.grid[tmpY][tmpX].type = e_TileType.FLAKE_OK;
		else
			tileMap.grid[tmpY][tmpX].type = e_TileType.BLOCK;

		isGameOver();
	};
}
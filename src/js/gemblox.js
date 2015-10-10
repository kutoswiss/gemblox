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
	// --- Constants ---------------------------------------------
	// -----------------------------------------------------------
	var VELOCITY = 1000;

	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	var color;
	var mouseUp;
	var mouseDown;
	this.direction;
	this.sprite;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------
	var GemBlox = function(p_color, p_x, p_y) {
		color = p_color;
		mouseUp = {x: 0, y: 0};
		mouseDown = {x: 0, y: 0};
		this.direction = eDirection.NONE;

		this.sprite = game.add.sprite(p_x, p_y, color.key);
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(onMouseDown, this);
		this.sprite.events.onInputUp.add(onMouseUp, this);
		this.sprite.x = p_x * TILE_SIZE;
		this.sprite.y = p_y* TILE_SIZE;
		
		game.physics.ninja.enableAABB(this.sprite);
		this.sprite.body.immovable = true;
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

	var onHitHandler = function(body, bodyB, shapeA, shapeB, equation) {
		this.sprite.body.setZeroVelocity();
		this.direction = eDirection.NONE;
	}

	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------
	GemBlox.prototype = {
		update: function() {
			this.sprite.body.setZeroVelocity();

			switch(this.direction) {
				case eDirection.UP:
					this.sprite.body.moveUp(VELOCITY);
					break;

				case eDirection.DOWN:
					this.sprite.body.moveDown(VELOCITY);
					break;

				case eDirection.LEFT:
					this.sprite.body.moveLeft(VELOCITY);
					break;

				case eDirection.RIGHT:
					this.sprite.body.moveRight(VELOCITY);
					break;
			}

			if(this.sprite.body.touching.left || this.sprite.body.touching.right || this.sprite.body.touching.up || this.sprite.body.touching.down) {
				this.sprite.body.setZeroVelocity();
				this.direction = eDirection.NONE;1
			}
		}
	};

	return GemBlox;
}());
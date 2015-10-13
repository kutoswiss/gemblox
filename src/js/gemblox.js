/** ----------------------------------------------------------
 * Project: GemBlox
 * Author: Kris Rejas (kris0x00)
 * Version: 0.5, 2015-10-09, Phaser edition
 * -----------------------------------------------------------*/

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

// -----------------------------------------------------------
// --- GemBlox Class -----------------------------------------
// -----------------------------------------------------------
var GemBlox = (function() {

	// -----------------------------------------------------------
	// --- Constants ---------------------------------------------
	// -----------------------------------------------------------
	var VELOCITY = 1000;

	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	var mouseUp;
	var mouseDown;
	this.color;
	this.direction;
	this.sprite;
	this.isCorrect;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------

	/**
	 * @brief Ctor
	 * @param Color of the blox (e_GemBloxColor enum type)
	 * @param Tile position x
	 * @param Tile position y
	 */
	var GemBlox = function(p_color, p_x, p_y) {
		this.color = p_color;
		mouseUp = {x: 0, y: 0};
		mouseDown = {x: 0, y: 0};
		this.direction = eDirection.NONE;

		this.sprite = game.add.sprite(p_x, p_y, this.color.key);
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(onMouseDown, this);
		this.sprite.events.onInputUp.add(onMouseUp, this);
		this.sprite.x = p_x * TILE_SIZE;
		this.sprite.y = p_y * TILE_SIZE;
		this.sprite.scale.setTo(SCALING, SCALING);

		game.physics.ninja.enableAABB(this.sprite);
		this.sprite.immovable = true;
		this.isCorrect = false;
	}

	/**
	 * @brief onMouseDown Handler
	 */
	var onMouseDown = function() {
		if(this.direction == eDirection.NONE) {
			mouseDown.x = game.input.activePointer.x;
			mouseDown.y = game.input.activePointer.y;
		}
	}

	/**
	 * @brief onMouseUp Handler
	 */
	var onMouseUp = function() {
		if(this.direction == eDirection.NONE) {
			mouseUp.x = game.input.activePointer.x;
			mouseUp.y = game.input.activePointer.y;

			var deltaX = Math.abs(mouseUp.x - mouseDown.x);
			var deltaY = Math.abs(mouseUp.y - mouseDown.y);

			if(deltaX > deltaY)
				this.direction = (mouseUp.x > mouseDown.x) ? eDirection.RIGHT : eDirection.LEFT;
			else
				this.direction = (mouseUp.y > mouseDown.y) ? eDirection.DOWN : eDirection.UP;

			nbMovements++;
		}
	}


	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------

	GemBlox.prototype = {
		/**
		 * @brief Function to get the Tile Position of the blox
		 * @return Position structure {x, y}
		 */
		getTilePosition: function() {
			return {x: Math.floor(this.sprite.x / TILE_SIZE), y: Math.floor(this.sprite.y / TILE_SIZE)};
		},

		/**
		 * @brief Function to move the blox (sprite) on a direction
		 */
		move: function() {
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
		},

		/**
		 * @brief Function to resolve collisions on the blox
		 */
		solveCollisions: function() {
			if(this.sprite.body.touching.left || this.sprite.body.touching.right || this.sprite.body.touching.up || this.sprite.body.touching.down) {
				this.sprite.body.setZeroVelocity();
				this.direction = eDirection.NONE;
				fxCling.play();
			}
		},

		/**
		 * @brief Function to check if the blox has reached his destination
		 */
		checkBloxDestination: function() {
			var pos = this.getTilePosition();

			if(this.direction == eDirection.NONE) {
				switch(this.color) {
					case e_GemBloxColor.RED:
						if(tileMap.getGrid()[pos.y][pos.x].type == e_TileType.GB_RED){
							if(this.isCorrect == false)
								fxBloxReached.play();
							this.isCorrect = true;
						}
						else
							this.isCorrect = false;
						break;

					case e_GemBloxColor.GREEN:
						if(tileMap.getGrid()[pos.y][pos.x].type == e_TileType.GB_GREEN) {
							if(this.isCorrect == false)
								fxBloxReached.play();
							this.isCorrect = true;
						}
						else 
							this.isCorrect = false;
						break;

					case e_GemBloxColor.BLUE:
						if(tileMap.getGrid()[pos.y][pos.x].type == e_TileType.GB_BLUE) {
							if(this.isCorrect == false)
								fxBloxReached.play();
							this.isCorrect = true;
						}
						else 
							this.isCorrect = false;
						break;

					case e_GemBloxColor.YELLOW:
						if(tileMap.getGrid()[pos.y][pos.x].type == e_TileType.GB_YELLOW) {
							if(this.isCorrect == false)
								fxBloxReached.play();
							this.isCorrect = true;
						}
						else 
							this.isCorrect = false;
						break;
				}
			}
		},

		/**
		 * @brief Function to update 'visually' the blox
		 */
		update: function() {
			this.sprite.body.setZeroVelocity();
			this.move();
			this.solveCollisions();
			this.checkBloxDestination();
		}
	};

	return GemBlox;
}());
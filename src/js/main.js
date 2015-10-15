/** ----------------------------------------------------------
 * Project: GemBlox
 * Author: Kris Rejas (kris0x00)
 * Version: 0.5, 2015-10-09, Phaser edition
 * -----------------------------------------------------------*/

// -----------------------------------------------------------
// --- Constants  --------------------------------------------
// -----------------------------------------------------------
var GAME_WIDTH = 640;
var GAME_HEIGHT = 960;
var NB_CHAPTERS = 1; // Must be dynamic later
var NB_STAGES = 8; // Must be dynamic later
var SCALING = 1;

// -----------------------------------------------------------
// --- Variables ---------------------------------------------
// -----------------------------------------------------------
var gameState_e =  {
	MENU_MAIN: 0.0,
	MENU_CHAPTERS: 0.1,
	MENU_STAGES: 0.2,
	IN_GAME: 1.0
};

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update, render: render});
var gameState = gameState_e.MENU_MAIN;
var tileMap; 
var gemBloxs; 
var menu; 
var chapters;

var tileObstacles = new Array();
var nbMovements = 0;

// Fx objects
var fxCling;
var fxBloxReached;
var fxMainBgm;

// -----------------------------------------------------------
// --- Functions ---------------------------------------------
// -----------------------------------------------------------

/**
 * @brief Function to preload assets
 */
 function preload() {

 	// Preload sprites
 	game.load.image(e_TileType.EMPTY.key,		'assets/img/pb_tile_empty_dark.png');
 	game.load.image(e_TileType.ROCK.key, 		'assets/img/pb_tile_rock.png');
 	game.load.image(e_TileType.FLAKE.key, 		'assets/img/pb_tile_flake.png');

 	game.load.image(e_TileType.GB_RED.key, 		'assets/img/tile_gb_red.png');
 	game.load.image(e_TileType.GB_BLUE.key, 	'assets/img/tile_gb_blue.png');
 	game.load.image(e_TileType.GB_GREEN.key, 	'assets/img/tile_gb_green.png');
 	game.load.image(e_TileType.GB_YELLOW.key, 	'assets/img/tile_gb_yellow.png');

 	game.load.image(e_GemBloxColor.RED.key, 	'assets/img/gem_blox_red.png');
 	game.load.image(e_GemBloxColor.BLUE.key, 	'assets/img/gem_blox_blue.png');
 	game.load.image(e_GemBloxColor.GREEN.key, 	'assets/img/gem_blox_green.png');
 	game.load.image(e_GemBloxColor.YELLOW.key, 	'assets/img/gem_blox_yellow.png');

 	game.load.image('logo', 		'assets/img/logo.png');
 	game.load.image('btn_play', 	'assets/img/button_play.png');
 	game.load.image('btn_options', 	'assets/img/button_options.png');
 	game.load.image('btn_about', 	'assets/img/button_about.png');
 	game.load.image('btn_stage', 	'assets/img/button_stage.png');


 	game.load.audio('cling', 			'assets/sounds/cling_03.mp3');
 	game.load.audio('cling_reached', 	'assets/sounds/cling_04.ogg');
 	game.load.audio('main_bgm', 		'assets/sounds/main_bgm.mp3');

 	
 	// Preload all levels JSON files
	for(var stage = 1; stage <= NB_STAGES; stage++)
		game.load.text('stage_'+ twoDigits(stage), 'assets/levels/stage_'+ twoDigits(stage) +'.json');
}

/**
 * @brief Function to create assets
 */
 function create() {
 	// Scale the game 
 	if (game.device.desktop) // FOR DESKTOP DEVICE
 	{
 		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 		game.scale.minWidth = GAME_WIDTH /2;
 		game.scale.minHeight = GAME_HEIGHT /2;
 		game.scale.maxWidth = GAME_WIDTH;
 		game.scale.maxHeight = GAME_HEIGHT;
 		game.scale.pageAlignHorizontally = true;
 		game.scale.pageAlignVertically = true;
 		game.scale.setScreenSize(true);
 	} 
 	else // MOBILES OR OTHER DEVICES
 	{
 		// Not sure if theses lines are correct...
 		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 		game.scale.minWidth = GAME_WIDTH/2;
 		game.scale.minHeight = GAME_HEIGHT/2;
		game.scale.maxWidth = 2048; 
		game.scale.maxHeight = 1228; 
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.forceOrientation(true, false);
		game.scale.hasResized.add(this.gameResized, this);
		game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
		game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
		game.scale.setScreenSize(true);
	}

	game.time.advancedTiming = true;

	// Set sounds variables
	fxCling = game.add.audio('cling');
	fxBloxReached = game.add.audio('cling_reached');
	fxMainBgm = game.add.audio('main_bgm');
	fxMainBgm.loop = true;
	fxMainBgm.play();

	// Initialize the game physics
	game.physics.startSystem(Phaser.Physics.NINJA);
	game.physics.ninja.gravity = 0;
	game.stage.backgroundColor = "#404040";

	// Start the game
	menu = new Menu();
	menu.show();
}

/**
 * @brief Function to update the game state (game loop)
 */
 function update() {
 	switch(gameState) {
 		// --------------------------------------------
 		// Game state: In Game ------------------------
 		// --------------------------------------------
 		case gameState_e.IN_GAME:
 			// Handle collisions with blox
 			for(var i = 0; i < gemBloxs.length; i++) {
 				// Detect collision between blox
 				for(var j = 0; j < gemBloxs.length; j++)	
 					if(j!=i)
 						game.physics.ninja.collide(gemBloxs[i].sprite, gemBloxs[j].sprite, bloxCollideHandler);

 				// Detect collision between blox and tiles
 				for(var j = 0; j < tileObstacles.length; j++)
 					game.physics.ninja.collide(gemBloxs[i].sprite, tileObstacles[j]);

 				// Detect collision between blox and wall
 				for(var j = 0; j < tileMap.wall.length; j++)
 					game.physics.ninja.collide(gemBloxs[i].sprite, tileMap.wall[j]);

 				// Update all blox's positions
 				gemBloxs[i].update();
 			}

 			tileMap.update();
			checkGameOver();
			break;

		default: break;
	}
}

/**
 * @brief Function to handle blox collisions
 */
function bloxCollideHandler() {
	for(var i = 0; i < gemBloxs.length; i++) {
		var pos = gemBloxs[i].getTilePosition();

		// Stop the blox
		gemBloxs[i].direction = eDirection.NONE;
		gemBloxs[i].sprite.body.setZeroVelocity();

		// Repositioning correctly the blox on the tilemap
		gemBloxs[i].sprite.body.x = (pos.x + 0.5) * TILE_SIZE;
		gemBloxs[i].sprite.body.y = (pos.y + 0.5) * TILE_SIZE;

		fxCling.play();

	}
}

/**
 * @brief Function to count how many blox is on the correct tile
 */
 function countCorrectBlox() {
 	var correct = 0;
 	for(var i = 0; i < gemBloxs.length; i++) {
 		if(gemBloxs[i].isCorrect)
 			correct++;
 	}
 	return correct;
}

/**
 * @brief Function to check if the game is complete
 */
 function checkGameOver() {
 	if(countCorrectBlox() == tileMap.exceptedBlox) {
 		// Destroy the tilemap
 		tileMap.destroy();

 		// Back to chapters
 		chapters = new Chapters(NB_STAGES);
		chapters.show();
 	}
 }

/**
 * @brief Function to convert a number into 2 digits
 */
 function twoDigits(num) {
 	(String(num).length < 2) ? num = String("0" + num) :  num = String(num);
 	return num;		
 }


/**
 * @brief Function to render some informations during debug phase
 */
 function render() {
 	//game.debug.text("Developement build - Version 1.0.6", 2, 14, "#00ff00");
 	//game.debug.text("FPS: " + game.time.fps || '--', 2, 30, "#00ff00");   
 }
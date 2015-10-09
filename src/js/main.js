/** ----------------------------------------------------------
 * Project: GemBlox
 * Author: Kris Rejas (kris0x00)
 * Version: 0.5, 2015-10-09, Phaser edition
 * -----------------------------------------------------------*/

// -----------------------------------------------------------
// --- Constants  --------------------------------------------
// -----------------------------------------------------------
var GAME_WIDTH = 640;
var GAME_HEIGHT = 1024;
var NB_CHAPTERS = 1; // Must be dynamic later
var NB_STAGES = 2; // Must be dynamic later
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

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update});
var tileMap; // Object
var gemBloxs; // Object
var menu; // Object
var chapters; // Object
var gameState = gameState_e.MENU_MAIN;


// -----------------------------------------------------------
// --- Functions ---------------------------------------------
// -----------------------------------------------------------

/**
 * @brief Function to preload assets
 */
 function preload() {
 	game.load.image(e_TileType.EMPTY.key,		'assets/img/pb_tile_empty.png');
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


	// TODO: Chapters and stages MUST be dynamic !!!
	// Load all chapters and stage
	for(var chapter = 1; chapter <= NB_CHAPTERS; chapter++)
		for(var stage = 1; stage <= NB_STAGES; stage++)
			game.load.text('chapter_'+ twoDigits(chapter) +'_stage_'+ twoDigits(stage), 'assets/levels/chapter_'+ twoDigits(chapter) +'/stage_'+ twoDigits(stage) +'.json');
	}

/**
 * @brief Function to create assets
 */
 function create() {
 	if (game.device.desktop) {
 		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 		game.scale.minWidth = GAME_WIDTH / 2;
 		game.scale.minHeight = GAME_HEIGHT / 2;
 		game.scale.maxWidth = GAME_WIDTH;
 		game.scale.maxHeight = GAME_HEIGHT;
 		game.scale.pageAlignHorizontally = true;
 		game.scale.pageAlignVertically = true;
 		game.scale.setScreenSize(true);
 	} else {
 		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 		game.scale.minWidth = GAME_WIDTH/2;
 		game.scale.minHeight = GAME_HEIGHT/2;
		game.scale.maxWidth = 2048; // You can change this to GAME_WIDTH*2.5 if needed
		game.scale.maxHeight = 1228; // Make sure these values are proportional to the GAME_WIDTH and GAME_HEIGHT
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.forceOrientation(true, false);
		game.scale.hasResized.add(this.gameResized, this);
		game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
		game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
		game.scale.setScreenSize(true);
	}

	menu = new Menu("Gueule at");
	menu.show();
}

/**
 * @brief Function to update the game state (game loop)
 */
 function update() {
 	switch(gameState) {
 		case gameState_e.IN_GAME:
			// Update all blox's positions
			for(var i = 0; i < gemBloxs.length; i++) 
				gemBloxs[i].update();
			break;

		case gameState_e.MENU_MAIN:
			break;

		case gameState_e.MENU_CHAPTERS:
			break;

		case gameState_e.MENU_STAGES:
			break;

		default: break;
	}
}

/**
 * @brief Function to check if the game is complete
 */
 function isGameOver() {
 	if(countCorrectBlox() == 2)
 		alert("You win !");
 }

/**
 * @brief Function to count how many blox is on the correct tile
 */
 function countCorrectBlox() {
 	var correct = 0;
 	for(var y = 0; y < tileMap.getHeight(); y++) {
 		for(var x = 0; x < tileMap.getWidth(); x++) {
 			if((tileMap.getGrid()[y][x].type == e_TileType.GB_RED_OK) || (tileMap.getGrid()[y][x].type == e_TileType.GB_BLUE_OK) ||
 				(tileMap.getGrid()[y][x].type == e_TileType.GB_GREEN_OK) || (tileMap.getGrid()[y][x].type == e_TileType.GB_YELLOW_OK)) {
 				correct++;
 		}
 	}
 }
 return correct;
}

/**
 * @brief Function to convert a number into 2 digits
 */
 function twoDigits(num) {
 	(String(num).length < 2) ? num = String("0" + num) :  num = String(num);
 	return num;		
 }



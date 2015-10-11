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
var NB_STAGES = 3; // Must be dynamic later
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

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});
var tileMap; // Object
var gemBloxs; // Object
var menu; // Object
var chapters; // Object
var gameState = gameState_e.MENU_MAIN;

var tileObstacles = new Array();
var nbMovements = 0;

// Fx objects
var sounds;
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

 	game.load.image('logo', 	'assets/img/logo.png');
 	game.load.image('btn_play', 'assets/img/button_play.png');
 	game.load.image('btn_options', 'assets/img/button_options.png');
 	game.load.image('btn_about', 'assets/img/button_about.png');
 	game.load.image('btn_stage', 	'assets/img/button_stage.png');


 	game.load.audio('cling', 'assets/sounds/cling_03.mp3');
 	game.load.audio('cling_reached', 'assets/sounds/cling_04.ogg');
 	game.load.audio('main_bgm', 'assets/sounds/main_bgm.mp3');

 	game.time.advancedTiming = true;


	// TODO: Chapters and stages MUST be dynamic !!!
	// Load all chapters and stage
	/*for(var chapter = 1; chapter <= NB_CHAPTERS; chapter++)
		for(var stage = 1; stage <= NB_STAGES; stage++)
			game.load.text('chapter_'+ twoDigits(chapter) +'_stage_'+ twoDigits(stage), 'assets/levels/chapter_'+ twoDigits(chapter) +'/stage_'+ twoDigits(stage) +'.json');*/

	for(var stage = 1; stage <= NB_STAGES; stage++)
		game.load.text('stage_'+ twoDigits(stage), 'assets/levels/stage_'+ twoDigits(stage) +'.json');
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

	fxCling = game.add.audio('cling');
	fxBloxReached = game.add.audio('cling_reached');
	fxMainBgm = game.add.audio('main_bgm');
	fxMainBgm.loop = true;
	fxMainBgm.play();


	game.physics.startSystem(Phaser.Physics.NINJA);
	game.physics.ninja.gravity = 0;
	game.stage.backgroundColor = "#505050";

	menu = new Menu();
	menu.show();

	getCount("assets/levels/");
}

/**
 * @brief Function to update the game state (game loop)
 */
 function update() {
 	switch(gameState) {
 		case gameState_e.IN_GAME:
 			for(var i = 0; i < gemBloxs.length; i++)
 				for(var j = 0; j < gemBloxs.length; j++)	
 					if(j!=i)
 						game.physics.ninja.collide(gemBloxs[i].sprite, gemBloxs[j].sprite, bloxCollideHandler);

 			for(var i = 0; i < gemBloxs.length; i++)
 				for(var j = 0; j < tileObstacles.length; j++)
 					game.physics.ninja.collide(gemBloxs[i].sprite, tileObstacles[j]);
 			
			// Update all blox's positions
			for(var i = 0; i < gemBloxs.length; i++)
				gemBloxs[i].update();
			

			tileMap.txtMovements.text = "Nb. movements:  " + nbMovements;
			isGameOver();
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

function bloxCollideHandler() {
	for(var i = 0; i < gemBloxs.length; i++) {
		var pos = gemBloxs[i].getTilePosition();

		// Stop the blox
		gemBloxs[i].direction = eDirection.NONE;
		gemBloxs[i].sprite.body.setZeroVelocity();

		// Repositioning correctly the blox on the tilemap
		gemBloxs[i].sprite.body.x = (pos.x+0.5) * TILE_SIZE;
		gemBloxs[i].sprite.body.y = (pos.y+0.5) * TILE_SIZE;

		fxCling.play();
	}
}

/**
 * @brief Function to check if the game is complete
 */
 function isGameOver() {
 	if(countCorrectBlox() == tileMap.exceptedBlox) {
 		// Destroy the tilemap
 		tileMap.destroy();

 		// Back to chapters
 		chapters = new Chapters(NB_STAGES);
		chapters.show();
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
 * @brief Function to convert a number into 2 digits
 */
 function twoDigits(num) {
 	(String(num).length < 2) ? num = String("0" + num) :  num = String(num);
 	return num;		
 }

 function render() {
 	game.debug.text("Developement build - Version 1.0.6", 2, 14, "#00ff00");
 	game.debug.text("FPS: " + game.time.fps || '--', 2, 30, "#00ff00");   
 }


 function getCount(foldername) {
    $.ajax({
	    url: "assets/levels/",
	    success: function (data) {
	        var image_count = $(data).length(); 
	        alert(image_count);    
	    }
	});
  }



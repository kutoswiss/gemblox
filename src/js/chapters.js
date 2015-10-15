/** ----------------------------------------------------------
 * Project: GemBlox
 * Author: Kris Rejas (kris0x00)
 * Version: 0.5, 2015-10-09, Phaser edition
 * -----------------------------------------------------------*/

var Chapters = (function(){
	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	var amountChapter;
	var btnsChapter; 
	var txtsChapter;
	var style;
	
	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------

	/**
	 * @brief Constructor
	 */
	var Chapters = function(p_nbChapter) {
		amountChapter = p_nbChapter;
		btnsChapter = new Array(amountChapter);
		txtsChapter = new Array(amountChapter);
		gameState = gameState_e.MENU_CHAPTERS;
		style = { font: "32px Arial", fill: "#ffffff", align: "center" };
	}

	/**
	 * @brief Delegate Button OnClick
	 */
	var btnChapterOnClick = function() {
		for(var i = 0; i < amountChapter; i++) {
			btnsChapter[i].destroy();
			txtsChapter[i].destroy();
		}

		var nbTileWidth = 6;
		var nbTileHeight = 9;

		tileMap = new TileMap(nbTileWidth, nbTileHeight);
		tileMap.load(1, this.id);
	}

	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------
	Chapters.prototype = {
		/**
		 * @brief Function to show the chapters menu
		 */
		show: function() {
			var space = GAME_WIDTH / 6;
			for(var i = 0; i < amountChapter; i++) {
				var level = i+1;
				var x = space * ((i % 5)+1);
				var y = space * (Math.floor(i / 5) + 1);

				btnsChapter[i] = game.add.sprite(x, y,  'btn_stage');	
				btnsChapter[i].anchor.set(0.5);
				btnsChapter[i].loadTexture('btn_stage');
				btnsChapter[i].inputEnabled = true;
				btnsChapter[i].events.onInputUp.add(btnChapterOnClick, {parent: this, id: level});

				txtsChapter[i] = game.add.text(x, y, level, style);
    			txtsChapter[i].anchor.set(0.5);
			}
		}
	};

	return Chapters;
}());
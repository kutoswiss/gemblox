var Chapters = (function(){
	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	var amountChapter;
	var btnChapters;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------

	/**
	 * @brief Constructor
	 */
	var Chapters = function(p_nbChapter) {
		amountChapter = p_nbChapter;
		btnChapters = new Array(amountChapter);
	}

	/**
	 * @brief Delegate Button OnClick
	 */
	var btnChapterOnClick = function() {
		for(var i = 1; i <= amountChapter; i++)
			btnChapters[i].destroy();

		tileMap = new TileMap(5, 8);
		tileMap.LoadMap(1, this.id);
	}

	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------
	Chapters.prototype = {
		/**
		 * @brief Function to show the chapters menu
		 */
		show: function() {
			for(var i = 1; i <= amountChapter; i++) {
				var text = "Chapter " + i;
				var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    		btnChapters[i] = game.add.text(game.world.centerX, 100 * i, text, style);
	    		btnChapters[i].anchor.set(0.5);
	    		btnChapters[i].inputEnabled = true;
				btnChapters[i].events.onInputUp.add(btnChapterOnClick, {parent: this, id: i});
			}
		}
	};

	return Chapters;
}());
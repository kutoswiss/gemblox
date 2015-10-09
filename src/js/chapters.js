var Chapters = function(p_nbChapter) {
	// --- Fields ------------------------------------------------
	var amountChapter = p_nbChapter;
	var btnChapters = new Array(amountChapter);
	
	// --- Private functions -------------------------------------
	var btnChapterOnClick = function() {
		// Destroy all buttons
		for(var i = 1; i <= amountChapter; i++)
			btnChapters[i].destroy();

		tileMap = new TileMap(5, 8);
		tileMap.LoadMap(1, this.id);
	}

	// --- Public functions --------------------------------------
	this.Show = function() {
		for(var i = 1; i <= amountChapter; i++) {
			var text = "Chapter " + i;
			var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    		btnChapters[i] = game.add.text(game.world.centerX, 100 * i, text, style);
    		btnChapters[i].anchor.set(0.5);
    		btnChapters[i].inputEnabled = true;
			btnChapters[i].events.onInputUp.add(btnChapterOnClick, {parent: this, id: i});
		}
	}
}
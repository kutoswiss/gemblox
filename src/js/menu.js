var Menu = function() {
	// --- Fields ------------------------------------------------
	var btnPlay;
	var btnOptions;
	var btnAbout;

	// --- Private functions -------------------------------------
	var destroyAllBtns = function() {
		btnPlay.destroy();
		btnOptions.destroy();
		btnAbout.destroy();
	}

	var btnPlayOnClick = function() {
		destroyAllBtns();
		chapters = new Chapters(2);
		chapters.Show();
	}

	var btnOptionsOnClick = function() {
		// No code for the moment
	}

	var btnAboutOnClick = function() {
		// No code for the moment
	}

	// --- Public functions --------------------------------------
	this.Show = function() {
		var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

		btnPlay = game.add.text(game.world.centerX, 500, "Play", style);
		btnPlay.anchor.set(0.5);
		btnPlay.inputEnabled = true;
		btnPlay.events.onInputUp.add(btnPlayOnClick, this);

		btnOptions = game.add.text(game.world.centerX, 600, "Options", style);
		btnOptions.anchor.set(0.5);
		btnOptions.inputEnabled = true;
		btnOptions.events.onInputUp.add(btnOptionsOnClick, this);

		btnAbout = game.add.text(game.world.centerX, 700, "About", style);
		btnAbout.anchor.set(0.5);
		btnAbout.inputEnabled = true;
		btnAbout.events.onInputUp.add(btnAboutOnClick, this);
	}
}
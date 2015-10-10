var Menu = (function(){
	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	var btnPlay;
	var style;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------
	/**
	 * @brief Constructor
	 */
	var Menu = function() {
		style = { font: "65px Arial", fill: "#ff0044", align: "center" };
	}

	/**
	 * @brief Function to destroy all buttons
	 */
	var destroyAllBtns = function() {
		btnPlay.destroy();
	}

	/**
	 * @brief Delegate Button Play OnClick
	 */
	var btnPlayOnClick = function() {
		destroyAllBtns();
		chapters = new Chapters(2);
		chapters.show();
	}

	// -----------------------------------------------------------
	// --- Public functions --------------------------------------
	// -----------------------------------------------------------
	Menu.prototype = {
		/**
		 * @brief Function to show the menu
		 */
		show: function() {
			btnPlay = game.add.text(game.world.centerX, 500, "Play", style);
			btnPlay.anchor.set(0.5);
			btnPlay.inputEnabled = true;
			btnPlay.events.onInputUp.add(btnPlayOnClick, this);
		}
	};

	return Menu;
}());
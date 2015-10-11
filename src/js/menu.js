var Menu = (function(){
	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	this.btnPlay;
	this.logo;

	// -----------------------------------------------------------
	// --- Private functions -------------------------------------
	// -----------------------------------------------------------
	/**
	 * @brief Constructor
	 */
	var Menu = function() {
	}

	/**
	 * @brief Delegate Button Play OnClick
	 */
	var btnPlayOnClick = function() {
		this.destroy();
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
			this.logo = game.add.sprite(game.world.centerX, 300, 'logo');	
			this.logo.anchor.set(0.5);
			this.logo.loadTexture('logo');

			this.btnPlay = game.add.sprite(game.world.centerX, 500, 'btn_play');	
			this.btnPlay.anchor.set(0.5);
			this.btnPlay.loadTexture('btn_play');
			this.btnPlay.inputEnabled = true;
			this.btnPlay.events.onInputUp.add(btnPlayOnClick, this);
		},

		destroy: function() {
			this.btnPlay.destroy();
			this.logo.destroy();
		}
	};

	return Menu;
}());
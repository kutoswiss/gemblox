/** ----------------------------------------------------------
 * Project: GemBlox
 * Author: Kris Rejas (kris0x00)
 * Version: 0.5, 2015-10-09, Phaser edition
 * -----------------------------------------------------------*/

var Menu = (function(){
	// -----------------------------------------------------------
	// --- Fields ------------------------------------------------
	// -----------------------------------------------------------
	this.btnPlay;
	this.btnOptions;
	this.btnAbout;
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
		chapters = new Chapters(NB_STAGES);
		chapters.show();
	}

	var btnOptionsOnClick = function() {

	}

	var btnAboutOnClick = function() {
		
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

			this.btnPlay = game.add.sprite(game.world.centerX, 700, 'btn_play');	
			this.btnPlay.anchor.set(0.5);
			this.btnPlay.loadTexture('btn_play');
			this.btnPlay.inputEnabled = true;
			this.btnPlay.events.onInputUp.add(btnPlayOnClick, this);

			this.btnOptions = game.add.sprite(game.world.centerX, 750, 'btn_options');	
			this.btnOptions.anchor.set(0.5);
			this.btnOptions.loadTexture('btn_options');
			this.btnOptions.inputEnabled = true;
			this.btnOptions.events.onInputUp.add(btnOptionsOnClick, this);

			this.btnAbout = game.add.sprite(game.world.centerX, 800, 'btn_about');	
			this.btnAbout.anchor.set(0.5);
			this.btnAbout.loadTexture('btn_about');
			this.btnAbout.inputEnabled = true;
			this.btnAbout.events.onInputUp.add(btnAboutOnClick, this);
		},

		destroy: function() {
			this.btnPlay.destroy();
			this.btnOptions.destroy();
			this.btnAbout.destroy();
			this.logo.destroy();
		}
	};

	return Menu;
}());
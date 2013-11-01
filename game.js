
var keys = {
	up: 38,
	down: 40,
	right: 39,
	left: 37
}

var assets = {
	dirt: {
		render: function(ctx, x, y) {
			ctx.drawImage(assets.spritesheet, 0, 32, 32, 32, x, y, 32, 32);
		}
	},
	grass: {
		render: function(ctx, x, y) {
			ctx.drawImage(assets.spritesheet, 0, 0, 32, 32, x, y, 32, 32);
		}
	},	
	player: {
		render: function(ctx, x, y) {
				ctx.drawImage(assets.spritesheet, 0, 64, 32, 32, x, y, 32, 32);
		}
	}
}

var map = [
	[assets.grass, assets.grass, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],
	[assets.grass, assets.grass, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],
	[assets.grass, assets.grass, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],
	[assets.grass, assets.grass, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],
	[assets.grass, assets.grass, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],
	[assets.grass, assets.grass, assets.dirt, assets.dirt, assets.dirt, assets.dirt, assets.dirt, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],
	[assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],
	[assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],
	[assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],
	[assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass, assets.dirt, assets.grass, assets.grass, assets.grass, assets.grass, assets.grass],

];


function Game(canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.spritesheetLoaded = false;
	var game = this;

	this.player = {
		speed: 4,
		positionX: 10,
		positionY: 10	
	},

	this.loadSpriteSheet = function(callback) {

		var img = new Image();
		img.src = "spritesheet.png";
		img.onload = function() {
			assets.spritesheet  = this;
			game.spritesheetLoaded = true;	
			callback();
		};
	};

	this.keyDown = function(event) {

		if (event.which === keys.up) {
			this.player.positionY -= this.player.speed;
		}

		if (event.which === keys.down) {
			this.player.positionY += this.player.speed;
		}

		if (event.which === keys.left) {
			this.player.positionX -= this.player.speed;
		}

		if (event.which === keys.right) {
			this.player.positionX += this.player.speed;
		}

		return false;
	}.bind(this);

	this.start = function() {
		this.loadSpriteSheet(function() {
			window.addEventListener('keydown',this.keyDown, true);

			var that = this;
			(function animloop(){
  				requestAnimationFrame(animloop);
  				that.render();
			})();

			
		}.bind(this));
	};

	this.render = function() {
		for(var y = 0; y < map.length; y++) {
			var row = map[y];
			for (var x = 0; x < row.length; x++) {
				var tile = row[x];
				tile.render(this.ctx, x * 32, y * 32)
			}
		}

		assets.player.render(this.ctx, this.player.positionX, this.player.positionY)
	}
}

(new Game(document.getElementById("game"))).start();


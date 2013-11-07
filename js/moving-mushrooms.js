var Game = {
	stage : new createjs.Stage($("#stage")),
	tileSrcs : ["img/small-mushroom.png", 
				"img/small-dark-mushroom.png",
				"img/small-yellow-mushroom.png"],
	tiles : [],
	level : [1, 1, 1, 0, 2, 2, 2],
	winState : [2, 2, 2, 0, 1, 1, 1],
	offsetX : 25,
	offsetY : 25
};

Game.Tile = function(myX, myY, myType){
	'use strict';
	var my = new createjs.Bitmap(Game.tileSrcs[myType]),
	updateDirection = function(){
		if(my.type === 1) {
			my.direction = 1;
		}
		if(my.type === 2){
			my.direction = -1;
		}
	},
	jumpTo = function (destinationTile){
		destinationTile.type = my.type;
		my.type = 0;
	};
	my.type = myType;
	my.posX = myX;
	my.posY = myY;
	updateDirection();
	my.update = function(){
		my.image.src = Game.tileSrcs[my.type];
		updateDirection();
	};
	my.addEventListener("mousedown", function(){
		var nextIndex, nextNextIndex, nextTile, nextNextTile, oppositeType;
		if(my.type !== 0) {
			if(my.type === 1){
				oppositeType = 2;
			} else {
				oppositeType = 1;
			}
			nextIndex = my.posX + my.direction;
			nextTile = Game.tiles[nextIndex];
			
			nextNextIndex = my.posX + (2* my.direction);
			nextNextTile = Game.tiles[nextNextIndex];
			
			if (nextTile.type === 0){
				jumpTo(nextTile);
			} else if (nextTile.type === oppositeType && nextNextTile.type === 0){
				jumpTo(nextNextTile);
			}
		}
		Game.update();
	});
	return my;
};

Game.isGameOver = function(){
	var isWon = true, i;
	for (i = 0; i < Game.tiles.length; i += 1) {
		if (Game.tiles[i].type !== Game.winState[i]){
			isWon = false;
			break;
		}
	}
	return isWon;
};

Game.gameOver = function(){
	console.log("player wins");
};

Game.update = function(){
	var tile, i;
	for (i =0; i< Game.tiles.length; i+=1){
		tile = Game.tiles[i];
		tile.x = tile.posX * tile.image.width + Game.offsetX;
		tile.y = Game.offsetY;
		tile.update();
	}
	Game.stage.update();
	if(Game.isGameOver()){
		Game.gameOver();
	}
};

Game.initModel = function (){
	var col, type, i, tile, row = 0;
	for (i = 0; i< Game.level.length; i+=1) {
		console.log("adding tile");
		type = Game.level[i];
		col = i;
		tile = new Game.Tile(col, row, type);
		Game.tiles.push(tile);
		Game.stage.addChild(tile);
	}
	Game.update();
};

Game.initModel();


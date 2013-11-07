var Game = {
	stage : new createjs.Stage($("#stage")),
	tileSrcs : ["img/small-mushroom.png", "img/small-dark-mushroom.png"],
	tiles : [],
	level : [1, 0, 0, 0, 0],
	winState : [0, 0, 0, 0, 1],
	offsetX : 25,
	offsetY : 25
};

Game.Tile = function(myX, myY, myType){
	var my = new createjs.Bitmap(Game.tileSrcs[myType]);
	my.type = myType;
	my.posX = myX;
	my.posY = myY;
	my.update = function(){
		my.image.src = Game.tileSrcs[my.type];
	};
	my.addEventListener("mousedown", function(){
		var nextX;
		if(my.type === 1){
			my.type = 0;
			nextX = my.posX + 1;
			Game.tiles[nextX].type = 1;
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


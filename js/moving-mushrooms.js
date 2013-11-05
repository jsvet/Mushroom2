var Game = {
	stage : new createjs.Stage($("#stage")),
	tileSrcs : ["img/small-mushroom.png", "img/small-dark-mushroom.png"]
};

Game.Tile = function(myX, myY, myType){
	var my = new createjs.Bitmap(Game.tileSrcs[myType]);
	my.type = myType;
	my.posX = myX;
	my.posY = myY;
	return my;
};

Game.update = function(){
	Game.stage.update();
};

Game.initModel = function (){
	var tile = new Game.Tile(0, 0, 0);
	Game.stage.addChild(tile);
	Game.update();
};

Game.initModel();

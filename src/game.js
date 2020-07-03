Game = function(game) {}

Game.prototype = {
    preload: function() {

        //load assets
        this.game.load.image('circle','asset/circle.png');
        this.game.load.image('body','asset/body.png');
        this.game.load.image('shadow', 'asset/white-shadow.png');
    	this.game.load.image('background', 'asset/tile.png');

    	this.game.load.image('eye-white', 'asset/eye-white.png');
    	this.game.load.image('eye-black', 'asset/eye-black.png');

        this.game.load.image('food', 'asset/hex.png');
    },
    create: function() {
        var width = this.game.width;
        var height = this.game.height;

        this.game.world.setBounds(-width, -height, width*2, height*2);
    	// this.game.stage.backgroundColor = '#444';

        //add background
        var background = this.game.add.tileSprite(-width, -height,
            this.game.world.width, this.game.world.height, 'background');

        //initialize physics and groups
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.foodGroup = this.game.add.group();
        this.snakeHeadCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();

        //add food randomly
        // for (var i = 0 ; i < 1000 ; i++) {
        //     this.initFood(Util.randomInt(-width, width), Util.randomInt(-height, height));
        // }

        this.game.snakes = [];

        //create player
        var snake = new PlayerSnake(this.game, 'body', 0, 0);
        this.game.camera.follow(snake.head);

        //create bots
        var botSnake1 = new BotSnake(this.game, 'circle', Util.randomInt(200, 500), );
        var botSnake2 = new BotSnake(this.game, 'circle', Util.randomInt(200, -500), 0);

        //initialize snake groups and collision
        for (var i = 0 ; i < this.game.snakes.length ; i++) {
            var snake = this.game.snakes[i];
            snake.head.body.setCollisionGroup(this.snakeHeadCollisionGroup);
            snake.head.body.collides([this.foodCollisionGroup]);
            //callback for when a snake is destroyed
            snake.addDestroyedCallback(this.snakeDestroyed, this);
        }
    },

    //update loop
    update: function() {
        //update game components
        for (var i = this.game.snakes.length - 1 ; i >= 0 ; i--) {
            this.game.snakes[i].update();
        }
        for (var i = this.foodGroup.children.length - 1 ; i >= 0 ; i--) {
            var f = this.foodGroup.children[i];
            f.food.update();
        }
        if (Util.randomInt(1,10)>8){
            this.initFood(Util.randomInt(-this.game.width, this.game.width), Util.randomInt(-this.game.height, this.game.height));
        }
        if (Util.randomInt(1,1000)>995){
            new BotSnake(this.game, 'circle', Util.randomInt(-this.game.width, this.game.width),  Util.randomInt(-this.game.height, this.game.height)   );
        }
    },

    initFood: function(x, y) {
        var f = new Food(this.game, x, y);
        f.sprite.body.setCollisionGroup(this.foodCollisionGroup);
        this.foodGroup.add(f.sprite);
        f.sprite.body.collides([this.snakeHeadCollisionGroup]);
        return f;
    },

    snakeDestroyed: function(snake) {
        //place food where snake was destroyed
        for (var i = 0 ; i < snake.headPath.length ;
        i += Math.round(snake.headPath.length / snake.snakeLength) * 2) {
            this.initFood(
                snake.headPath[i].x + Util.randomInt(-10,10),
                snake.headPath[i].y + Util.randomInt(-10,10)
            );
        }
    }
};

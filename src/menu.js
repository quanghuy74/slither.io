
var Menu = {

    preload: function() {

        this.game.load.image("startBtn", "asset/start.png");
        this.game.load.image('background', 'asset/tile.png');

    },

    create: function() {
        var width = this.game.width;
        var height = this.game.height;
        this.game.world.setBounds(-width, -height, width*2, height*2);
            var background = this.game.add.tileSprite(-width, -height,
            this.game.world.width, this.game.world.height, 'background');

        startButton = this.game.add.button(width/2, height/2, "startBtn", this.startGame, this);

        startButton.anchor.setTo(0.5);
    },

    startGame: function() {
        this.game.state.start("Game");
    }

};


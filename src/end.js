
var end =  function(){};
    end.prototype = {
        preload: function() {
            this.game.load.image("startBtn", "asset/start.png");
            this.game.load.image('background', 'asset/tile.png');
        },


        create: function(){
            var width = this.game.width;
            var height = this.game.height;

            this.game.world.setBounds(-width, -height, width*2, height*2);
            this.game.stage.backgroundColor = '#444';;
            const background = this.game.add.tileSprite(-width, -height,
                this.game.world.width, this.game.world.height, 'background');

            const Button = this.game.add.button(width / 2, height / 2, "startBtn", this.startGame, this);
            Button.anchor.setTo(0.5);
            // var gameOverTitle = this.game.add.sprite(160,160,"gameover");
            // gameOverTitle.anchor.setTo(0.5,0.5);
            // var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
            // playButton.anchor.setTo(0.5,0.5);
        },

        init: function(score){
            swal({
                title: "your score: " + score,
                imageUrl: 'https://i.imgur.com/4NZ6uLY.jpg'
            });
        },

        startGame: function() {
            this.game.state.start("Game");
        }
    }



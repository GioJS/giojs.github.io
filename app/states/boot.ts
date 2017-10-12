declare var Phaser: any;

import  "../../lib/phaser.js";

export class BootState {
    game: Phaser.Game;
    cursors: any;
    enter: any;
    constructor(game: Phaser.Game){
        this.game = game;
    }

    preload() {
        this.game.stage.backgroundColor = '#85b5e1';

        this.game.load.crossOrigin = 'anonymous';
        //this.game.load.image('platform', 'app/assets/platform.png');
    }

    create() {
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Press Enter");
        text.anchor.setTo(0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
       // console.log(this.enter)
        /*
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2, 0.2);
        this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        */
    }

    update(){
        
        if(this.enter.isDown){
            this.game.state.start('play', true, false, levels[curr_level]);
        }
    }
}
declare var Phaser: any;

import  "../../lib/phaser.js";

export class WinState {
    game: Phaser.Game;
    cursors: any;
    enter: any;
    constructor(game: Phaser.Game){
        this.game = game;
    }

    preload() {
        this.game.stage.backgroundColor = '#85b5e1';
    }

    create() {
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "You win Press Enter", {"fill":"green"});
        text.anchor.setTo(0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }

    update(){
        if(this.enter.isDown){
            this.game.state.start('play', true, false, first_level);
        }
    }
}
declare var Phaser: any;

import  "../../lib/phaser.js";
import { LevelManager } from "../level_mng/level_mng";

export class GameoverState {
    game: Phaser.Game;
    cursors: any;
    enter: any;
    levelMGR: LevelManager;
    constructor(game: Phaser.Game, levelMGR: LevelManager){
        this.game = game;
        this.levelMGR = levelMGR;
    }

    preload() {
        this.game.stage.backgroundColor = '#85b5e1';
    }

    create() {
        this.game.world.setBounds(0, 0, 800, 600);
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "You loose Press Enter", {"fill":"red"});
        text.anchor.setTo(0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.game.input.onDown.add(function () {
            if (this.game.paused) {
                this.game.paused = false;
            }       
        }, this);

        this.game.input.onTap.add(() => {
            this.game.state.start('play', true, false, this.levelMGR.currentLevel());        
        }, this);
    }

    update(){
        if(this.enter.isDown){
            this.game.state.start('play', true, false, this.levelMGR.currentLevel());
        }
    }
}
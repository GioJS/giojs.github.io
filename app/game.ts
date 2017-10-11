declare var Phaser: any;

import "../lib/phaser.js";
import { BootState } from "./states/boot";
import { PlayState } from "./states/play";
import { WinState } from "./states/win";
import { GameoverState } from "./states/gameover";

class Game {
    game: Phaser.Game;

    constructor() {
        this.game =new Phaser.Game(800, 600, Phaser.AUTO, 'content');
        this.game.state.add("boot", new BootState(this.game));
        this.game.state.add("play", new PlayState(this.game));
        this.game.state.add("win", new WinState(this.game));
        this.game.state.add("gameover", new GameoverState(this.game));
        this.game.state.start("boot");
    }
    
    
        
    
}


window.onload = () => {

    var game = new Game();

};

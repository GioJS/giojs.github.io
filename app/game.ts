declare var Phaser: any;

import "../lib/phaser.js";
import { BootState } from "./states/boot";
import { PlayState } from "./states/play";
import { WinState } from "./states/win";
import { GameoverState } from "./states/gameover";
import { LevelManager } from "./level_mng/level_mng";
import { Level } from "./level_mng/level";

class Game {
    game: Phaser.Game;
    levelMGR: LevelManager;
    constructor() {
        this.levelMGR = new LevelManager();

        var level1 = new Level().deserialize({
            "time_r":60,
            "obj": 90,
            "coins":[
                {"x":40, "y":120},
                {"x":90, "y":120},
                {"x":140, "y":120},
                {"x":520, "y":60},
                {"x":570, "y":60},
                {"x":620, "y":60},
                {"x":480, "y":400},
                {"x":530, "y":400},
                {"x":580, "y":400}
            ],
            "platforms":[
                {"x":500, "y":150},
                {"x":-200, "y":300},
                {"x":400, "y":450}
            ],
            "player":{
                "x": 32,
                "y": 400
            }
        });

        var level2 = new Level().deserialize( {
            "time_r":60,
            "obj": 150,
            "coins":[
                {"x":40, "y":120},
                {"x":90, "y":120},
                {"x":140, "y":120},
                {"x":520, "y":60},
                {"x":570, "y":60},
                {"x":620, "y":60},
                {"x":480, "y":400},
                {"x":530, "y":400},
                {"x":580, "y":400},
                {"x":200, "y":500},
                {"x":250, "y":500},
                {"x":300, "y":500},
                {"x":400, "y":280},
                {"x":350, "y":240},
                {"x":300, "y":200}
            ],
            "platforms":[
                {"x":500, "y":150},
                {"x":-200, "y":300},
                {"x":400, "y":450},
                {"x":100, "y":560}
            ],
            "player":{
                "x": 32,
                "y": 400
            }
        });

        this.levelMGR.addLevel(level1);
        this.levelMGR.addLevel(level2);

        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');
        this.game.state.add("boot", new BootState(this.game, this.levelMGR));
        this.game.state.add("play", new PlayState(this.game));
        this.game.state.add("win", new WinState(this.game, this.levelMGR));
        this.game.state.add("gameover", new GameoverState(this.game, this.levelMGR));
        this.game.state.start("boot");
    }
    
    
        
    
}


window.onload = () => {

    var game = new Game();

};

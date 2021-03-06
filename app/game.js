"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../lib/phaser.js");
var boot_1 = require("./states/boot");
var play_1 = require("./states/play");
var win_1 = require("./states/win");
var gameover_1 = require("./states/gameover");
var level_mng_1 = require("./level_mng/level_mng");
var level_1 = require("./level_mng/level");
var Game = /** @class */ (function () {
    function Game() {
        this.levelMGR = new level_mng_1.LevelManager();
        var level1 = new level_1.Level().deserialize({
            "time_r": 60,
            "obj": 90,
            "coins": [
                { "x": 40, "y": 120 },
                { "x": 90, "y": 120 },
                { "x": 140, "y": 120 },
                { "x": 520, "y": 60 },
                { "x": 570, "y": 60 },
                { "x": 620, "y": 60 },
                { "x": 480, "y": 400 },
                { "x": 530, "y": 400 },
                { "x": 580, "y": 400 }
            ],
            "platforms": [
                { "x": 500, "y": 150 },
                { "x": -200, "y": 300 },
                { "x": 400, "y": 450 }
            ],
            "player": {
                "x": 32,
                "y": 400
            }
        });
        var level2 = new level_1.Level().deserialize({
            "time_r": 60,
            "obj": 180,
            "coins": [
                { "x": 40, "y": 120 },
                { "x": 90, "y": 120 },
                { "x": 140, "y": 120 },
                { "x": 520, "y": 60 },
                { "x": 570, "y": 60 },
                { "x": 620, "y": 60 },
                { "x": 480, "y": 400 },
                { "x": 530, "y": 400 },
                { "x": 580, "y": 400 },
                { "x": 200, "y": 500 },
                { "x": 250, "y": 500 },
                { "x": 300, "y": 500 },
                { "x": 400, "y": 280 },
                { "x": 350, "y": 240 },
                { "x": 300, "y": 200 },
                { "x": 650, "y": 560 },
                { "x": 700, "y": 560 },
                { "x": 750, "y": 560 }
            ],
            "platforms": [
                { "x": 500, "y": 150 },
                { "x": -200, "y": 300 },
                { "x": 400, "y": 440 },
                { "x": 100, "y": 560 }
            ],
            "player": {
                "x": 32,
                "y": 400
            }
        });
        var level3 = new level_1.Level().deserialize({
            "time_r": 60,
            "obj": 90,
            "coins": [
                { "x": 40, "y": 120 },
                { "x": 90, "y": 120 },
                { "x": 140, "y": 120 },
                { "x": 520, "y": 60 },
                { "x": 570, "y": 60 },
                { "x": 620, "y": 60 },
                { "x": 480, "y": 400 },
                { "x": 530, "y": 400 },
                { "x": 580, "y": 400 }
            ],
            "platforms": [
                { "x": 500, "y": 150 },
                { "x": -200, "y": 300, "animation": [{
                            "to": { y: 250 }, "move_time": 1500, "type": Phaser.Easing.Quadratic.InOut
                        },
                        { "to": { y: 300 }, "move_time": 2000, "type": Phaser.Easing.Quadratic.InOut }] },
                { "x": 400, "y": 450 }
            ],
            "player": {
                "x": 32,
                "y": 400
            }
        });
        var level4 = new level_1.Level().deserialize({
            "time_r": 60,
            "obj": 100,
            "coins": [
                { "x": 40, "y": 120 },
                { "x": 90, "y": 120 },
                { "x": 140, "y": 120 },
                { "x": 520, "y": 60 },
                { "x": 570, "y": 60 },
                { "x": 620, "y": 60 },
                { "x": 480, "y": 400 },
                { "x": 530, "y": 400 },
                { "x": 580, "y": 400 },
                { "x": 60, "y": -80 }
            ],
            "platforms": [
                { "x": 500, "y": 150 },
                { "x": -200, "y": 300 },
                { "x": 400, "y": 450 },
                { "x": -100, "y": -10 }
            ],
            "player": {
                "x": 32,
                "y": 400
            },
            "world_bounds": { "x": 0, "y": -500, "width": 800, "height": 1100 }
        });
        this.levelMGR.addLevel(level1);
        this.levelMGR.addLevel(level2);
        this.levelMGR.addLevel(level3);
        this.levelMGR.addLevel(level4);
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');
        this.game.state.add("boot", new boot_1.BootState(this.game, this.levelMGR));
        this.game.state.add("play", new play_1.PlayState(this.game));
        this.game.state.add("win", new win_1.WinState(this.game, this.levelMGR));
        this.game.state.add("gameover", new gameover_1.GameoverState(this.game, this.levelMGR));
        this.game.state.start("boot");
    }
    return Game;
}());
window.onload = function () {
    var game = new Game();
};

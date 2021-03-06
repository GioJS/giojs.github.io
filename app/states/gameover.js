"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../lib/phaser.js");
var GameoverState = /** @class */ (function () {
    function GameoverState(game, levelMGR) {
        this.game = game;
        this.levelMGR = levelMGR;
    }
    GameoverState.prototype.preload = function () {
        this.game.stage.backgroundColor = '#85b5e1';
    };
    GameoverState.prototype.create = function () {
        var _this = this;
        this.game.world.setBounds(0, 0, 800, 600);
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "You loose Press Enter", { "fill": "red" });
        text.anchor.setTo(0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.game.input.onDown.add(function () {
            if (this.game.paused) {
                this.game.paused = false;
            }
        }, this);
        this.game.input.onTap.add(function () {
            _this.game.state.start('play', true, false, _this.levelMGR.currentLevel());
        }, this);
    };
    GameoverState.prototype.update = function () {
        if (this.enter.isDown) {
            this.game.state.start('play', true, false, this.levelMGR.currentLevel());
        }
    };
    return GameoverState;
}());
exports.GameoverState = GameoverState;

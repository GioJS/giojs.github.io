"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../lib/phaser.js");
var GameoverState = /** @class */ (function () {
    function GameoverState(game) {
        this.game = game;
    }
    GameoverState.prototype.preload = function () {
        this.game.stage.backgroundColor = '#85b5e1';
    };
    GameoverState.prototype.create = function () {
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "You loose Press Enter", { "fill": "red" });
        text.anchor.setTo(0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    };
    GameoverState.prototype.update = function () {
        if (this.enter.isDown) {
            this.game.state.start('play');
        }
    };
    return GameoverState;
}());
exports.GameoverState = GameoverState;

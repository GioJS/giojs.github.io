"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../lib/phaser.js");
var WinState = /** @class */ (function () {
    function WinState(game, levelMGR) {
        this.game = game;
        this.levelMGR = levelMGR;
    }
    WinState.prototype.preload = function () {
        this.game.stage.backgroundColor = '#85b5e1';
    };
    WinState.prototype.create = function () {
        this.game.world.setBounds(0, 0, 800, 600);
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "You win Press Enter", { "fill": "green" });
        text.anchor.setTo(0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    };
    WinState.prototype.update = function () {
        if (this.enter.isDown) {
            var level = this.levelMGR.nextLevel();
            if (level) {
                this.game.state.start('play', true, false, level);
            }
            else {
                var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, "game finished", { "fill": "red" });
                text.anchor.setTo(0.5);
            }
        }
    };
    return WinState;
}());
exports.WinState = WinState;

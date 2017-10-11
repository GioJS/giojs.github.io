"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../lib/phaser.js");
var WinState = /** @class */ (function () {
    function WinState(game) {
        this.game = game;
    }
    WinState.prototype.preload = function () {
        this.game.stage.backgroundColor = '#85b5e1';
    };
    WinState.prototype.create = function () {
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "You win Press Enter", { "fill": "green" });
        text.anchor.setTo(0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    };
    WinState.prototype.update = function () {
        if (this.enter.isDown) {
            this.game.state.start('play');
        }
    };
    return WinState;
}());
exports.WinState = WinState;

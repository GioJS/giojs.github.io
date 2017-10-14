"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../lib/phaser.js");
var BootState = /** @class */ (function () {
    function BootState(game, levelMGR) {
        this.game = game;
        this.levelMGR = levelMGR;
    }
    BootState.prototype.preload = function () {
        this.game.stage.backgroundColor = '#85b5e1';
        this.game.load.crossOrigin = 'anonymous';
    };
    BootState.prototype.create = function () {
        this.game.world.setBounds(0, 0, 800, 600);
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Press Enter");
        text.anchor.setTo(0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    };
    BootState.prototype.update = function () {
        if (this.enter.isDown) {
            this.game.state.start('play', true, false, this.levelMGR.currentLevel());
        }
    };
    return BootState;
}());
exports.BootState = BootState;

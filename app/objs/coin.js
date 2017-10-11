"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../lib/phaser.js");
var Coin = /** @class */ (function () {
    function Coin(game) {
        this.game = game;
        this.points = 10;
        this.sprite_path = 'app/assets/coin.png';
        this.game.load.spritesheet('coin', this.sprite_path, 32, 32, 6);
    }
    Coin.prototype.createCoin = function (x, y) {
        this.sprite = this.game.add.sprite(x, y, 'coin');
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.animations.add('rotation');
        this.sprite.animations.play('rotation', 30, true);
    };
    return Coin;
}());
exports.Coin = Coin;

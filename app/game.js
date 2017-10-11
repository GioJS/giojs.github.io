"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../lib/phaser.js");
var boot_1 = require("./states/boot");
var play_1 = require("./states/play");
var win_1 = require("./states/win");
var Game = /** @class */ (function () {
    function Game() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');
        this.game.state.add("boot", new boot_1.BootState(this.game));
        this.game.state.add("play", new play_1.PlayState(this.game));
        this.game.state.add("win", new win_1.WinState(this.game));
        this.game.state.start("boot");
    }
    return Game;
}());
window.onload = function () {
    var game = new Game();
};

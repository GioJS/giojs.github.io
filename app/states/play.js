"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../lib/phaser.js");
var player_1 = require("../objs/player");
var coin_1 = require("../objs/coin");
var PlayState = /** @class */ (function () {
    function PlayState(game) {
        this.game = game;
    }
    PlayState.prototype.init = function (level) {
        this.gameover = false;
        this.time_r = level.time_r;
        this.player_xy = level.player;
        this.coins_coords = level.coins;
        this.platforms_coords = level.platforms;
        this.obj = level.obj;
    };
    PlayState.prototype.preload = function () {
        this.game.stage.backgroundColor = '#85b5e1';
        this.game.load.crossOrigin = 'anonymous';
        this.game.load.image('platform', 'app/assets/platform.png');
        this.player = new player_1.Player(this.game, this.player_xy.x, this.player_xy.y);
        this.coins = new Array();
        for (var _i = 0, _a = this.coins_coords; _i < _a.length; _i++) {
            var coord = _a[_i];
            this.coins.push(new coin_1.Coin(this.game, coord));
        }
    };
    PlayState.prototype.create = function () {
        var _this = this;
        // this.time_r = 60;
        this.last_time = Math.round(this.game.time.totalElapsedSeconds());
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player.createPlayer();
        for (var _i = 0, _a = this.coins; _i < _a.length; _i++) {
            var coin = _a[_i];
            coin.createCoin();
        }
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.jmp = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.platforms = this.game.add.physicsGroup();
        for (var _b = 0, _c = this.platforms_coords; _b < _c.length; _b++) {
            var coord = _c[_b];
            this.platforms.create(coord.x, coord.y, 'platform');
        }
        this.platforms.setAll('body.immovable', true);
        this.points_text = this.game.add.text(0, 0, "Points: 0", { "fill": "white" });
        this.time_text = this.game.add.text(400, 0, "Time: " + this.time_r, { "fill": "white" });
        this.game.time.events.add(Phaser.Timer.SECOND * this.time_r, function () {
            _this.gameover = true;
        }, this);
    };
    PlayState.prototype.render = function () {
        this.points_text.setText("Points: " + this.player.points);
        this.time_text.setText("Time: " + Math.round(this.game.time.events.duration / 1000));
    };
    PlayState.prototype.update = function () {
        var _this = this;
        if (this.gameover) {
            this.game.state.start('gameover');
        }
        if (this.player.points === this.obj) {
            this.game.state.start('win');
        }
        this.game.physics.arcade.collide(this.player.sprite, this.platforms);
        var _loop_1 = function (coin) {
            this_1.game.physics.arcade.collide(this_1.player.sprite, coin.sprite, function () {
                _this.player.points += coin.points;
                coin.sprite.destroy();
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.coins; _i < _a.length; _i++) {
            var coin = _a[_i];
            _loop_1(coin);
        }
        if (this.esc.isDown) {
            this.game.state.start('boot');
        }
        if (this.player.isOnFloor()) {
            if (this.cursors.left.isDown) {
                this.player.left();
            }
            else if (this.cursors.right.isDown) {
                this.player.right();
            }
            else {
                this.player.stop();
            }
        }
        if (this.jmp.isDown && (this.player.isOnFloor())) {
            this.player.jump();
        }
    };
    return PlayState;
}());
exports.PlayState = PlayState;

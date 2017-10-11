"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../lib/phaser.js");
var player_1 = require("../objs/player");
var coin_1 = require("../objs/coin");
var PlayState = /** @class */ (function () {
    function PlayState(game) {
        this.game = game;
    }
    PlayState.prototype.preload = function () {
        this.game.stage.backgroundColor = '#85b5e1';
        this.game.load.crossOrigin = 'anonymous';
        this.game.load.image('platform', 'app/assets/platform.png');
        this.player = new player_1.Player(this.game);
        this.coins = new Array(new coin_1.Coin(this.game), new coin_1.Coin(this.game), new coin_1.Coin(this.game));
        this.coins.push(new coin_1.Coin(this.game), new coin_1.Coin(this.game), new coin_1.Coin(this.game));
        this.coins.push(new coin_1.Coin(this.game), new coin_1.Coin(this.game), new coin_1.Coin(this.game));
    };
    PlayState.prototype.create = function () {
        this.time_r = 60;
        this.last_time = Math.round(this.game.time.totalElapsedSeconds());
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player.createPlayer();
        var i = 0;
        for (var j = 0; j < 3; j++) {
            this.coins[j].createCoin(40 + i, 120);
            i += 50;
        }
        i = 0;
        for (var j = 3; j < 6; j++) {
            this.coins[j].createCoin(520 + i, 60);
            i += 50;
        }
        i = 0;
        for (var j = 6; j < 9; j++) {
            this.coins[j].createCoin(480 + i, 400);
            i += 50;
        }
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.jmp = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.platforms = this.game.add.physicsGroup();
        this.platforms.create(500, 150, 'platform');
        this.platforms.create(-200, 300, 'platform');
        this.platforms.create(400, 450, 'platform');
        this.platforms.setAll('body.immovable', true);
        this.points_text = this.game.add.text(0, 0, "Points: 0", { "fill": "white" });
        this.time_text = this.game.add.text(400, 0, "Time: " + this.time_r, { "fill": "white" });
    };
    PlayState.prototype.render = function () {
        this.points_text.setText("Points: " + this.player.points);
        this.time_text.setText("Time: " + this.time_r);
    };
    PlayState.prototype.update = function () {
        var _this = this;
        //console.log(this.game.time.totalElapsedSeconds())
        var now = Math.round(this.game.time.totalElapsedSeconds());
        if ((now - this.last_time) == 1) {
            if ((this.time_r - 1) <= 0) {
                this.time_r = 0;
            }
            else {
                this.time_r -= 1;
                this.last_time = now;
            }
        }
        if (this.time_r == 0) {
            this.game.state.start('gameover');
        }
        if (this.player.points === 90) {
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

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
        this.platforms_objs = level.platforms;
        this.obj = level.obj;
        if (level.world_bounds) {
            this.world_bounds = level.world_bounds;
        }
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
        // this.time_r = 60;
        var _this = this;
        this.ten_secs = false;
        if (this.world_bounds) {
            this.game.world.setBounds(this.world_bounds.x, this.world_bounds.y, this.world_bounds.width, this.world_bounds.height);
        }
        this.last_time = Math.round(this.game.time.totalElapsedSeconds());
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player.createPlayer();
        this.player.sprite.checkWorldBounds = true;
        for (var _i = 0, _a = this.coins; _i < _a.length; _i++) {
            var coin = _a[_i];
            coin.createCoin();
        }
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.jmp = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.platforms = this.game.add.physicsGroup();
        for (var _b = 0, _c = this.platforms_objs; _b < _c.length; _b++) {
            var platform = _c[_b];
            var plt = this.platforms.create(platform.x, platform.y, 'platform');
            if (platform.animation) {
                var tween = this.game.add.tween(plt.body);
                for (var _d = 0, _e = platform.animation; _d < _e.length; _d++) {
                    var anim = _e[_d];
                    tween.to(anim.to, anim.move_time, anim.type);
                }
                //.to({y: 150}, platform.time, Phaser.Easing.Quadratic.InOut)
                tween.loop().start();
            }
        }
        this.platforms.setAll('body.immovable', true);
        this.pause_text = this.game.add.text(650, 0, "Pause");
        this.pause_text.visible = false;
        this.points_text = this.game.add.text(0, 0, "Points: 0", { "fill": "white" });
        this.points_text.fixedToCamera = true;
        this.time_text = this.game.add.text(400, 0, "Time: " + this.time_r, { "fill": "white" });
        this.time_text.fixedToCamera = true;
        this.game.time.events.add(Phaser.Timer.SECOND * this.time_r, function () {
            _this.gameover = true;
        }, this);
        this.game.onPause.add(function () {
            _this.pause_text.visible = true;
            _this.game.paused = true;
        }, this);
        this.game.input.onDown.add(function () {
            if (this.game.paused) {
                this.game.paused = false;
                this.pause_text.visible = false;
            }
        }, this);
        this.score_tween = this.game.add.tween(this.points_text.scale).to({ x: 1.5, y: 1.5 }, 50, Phaser.Easing.Linear.In).to({ x: 1, y: 1 }, 50, Phaser.Easing.Linear.In);
        this.finish_time_tween = this.game.add.tween(this.time_text.scale).to({ x: 1.5, y: 1.5 }, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.In);
    };
    PlayState.prototype.createCoinScore = function (points) {
        var coin_point = this.game.add.text(this.player.sprite.position.x, this.player.sprite.y, "+" + points, { fill: "green", stroke: "#ffffff", strokeThickness: 15 });
        coin_point.anchor.setTo(0.5, 0);
        coin_point.align = 'center';
        var coin_tween = this.game.add.tween(coin_point).to({ x: this.points_text.width, y: this.points_text.y }, 800, Phaser.Easing.Exponential.In, true);
        coin_tween.onComplete.add(function () {
            coin_point.destroy();
            this.score_tween.start();
            this.player.points += points;
        }, this);
    };
    PlayState.prototype.render = function () {
        this.points_text.setText("Points: " + this.player.points);
        this.time_text.setText("Time: " + this.last_time);
        if (this.ten_secs) {
            this.time_text.setStyle({ 'fill': 'red' });
        }
    };
    PlayState.prototype.update = function () {
        var _this = this;
        this.last_time = Math.round(this.game.time.events.duration / 1000);
        if (this.last_time <= 10) {
            this.ten_secs = true;
            this.finish_time_tween.start();
        }
        if (this.gameover) {
            this.game.state.start('gameover');
        }
        if (this.player.points === this.obj) {
            this.game.state.start('win');
        }
        this.game.physics.arcade.collide(this.player.sprite, this.platforms);
        var _loop_1 = function (coin) {
            this_1.game.physics.arcade.overlap(this_1.player.sprite, coin.sprite, function () {
                _this.createCoinScore(coin.points);
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
        if (this.jmp.isDown && this.player.isOnFloor()) {
            this.player.jump();
        }
        if (this.player.sprite.y < 0) {
            this.game.camera.y -= 4;
        }
        else {
            this.game.camera.y += 4;
        }
    };
    return PlayState;
}());
exports.PlayState = PlayState;

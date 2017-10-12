"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../lib/phaser.js");
var Player = /** @class */ (function () {
    function Player(game, x, y) {
        this.sprite_path = 'app/assets/phaser-dude.png';
        this.game = game;
        this.healt = 100;
        this.x = x;
        this.y = y;
        this.points = 0;
        this.game.load.spritesheet('player', this.sprite_path, 32, 48);
    }
    Player.prototype.createPlayer = function () {
        this.sprite = this.game.add.sprite(this.x, this.y, 'player');
        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 500;
        this.direction = Phaser.RIGHT;
    };
    Player.prototype.stop = function () {
        this.sprite.body.velocity.x = 0;
        this.sprite.animations.stop();
        this.sprite.frame = 4;
        this.direction = Phaser.UP;
    };
    Player.prototype.left = function () {
        this.sprite.body.velocity.x = -250;
        if (this.isOnFloor())
            this.sprite.animations.play('left');
        this.direction = Phaser.LEFT;
    };
    Player.prototype.right = function () {
        this.sprite.body.velocity.x = 250;
        if (this.isOnFloor())
            this.sprite.animations.play('right');
        this.direction = Phaser.RIGHT;
    };
    Player.prototype.jump = function () {
        this.sprite.body.velocity.y = -400;
        this.sprite.animations.stop();
        if (this.direction == Phaser.RIGHT) {
            this.sprite.frame = 6;
            this.sprite.body.velocity.x = 250;
        }
        else if (this.direction == Phaser.LEFT) {
            this.sprite.frame = 1;
            this.sprite.body.velocity.x = -250;
        }
        else {
            this.sprite.frame = 4;
        }
    };
    Player.prototype.isOnFloor = function () {
        return (this.sprite.body.onFloor() || this.sprite.body.touching.down);
    };
    return Player;
}());
exports.Player = Player;

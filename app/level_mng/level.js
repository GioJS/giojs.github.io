"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Level = /** @class */ (function () {
    function Level() {
    }
    Level.prototype.deserialize = function (input) {
        this.player = input.player;
        this.platforms = input.platforms;
        this.coins = input.coins;
        this.obj = input.obj;
        this.time_r = input.time_r;
        this.world_bounds = input.world_bounds;
        this.animation = input.animation;
        return this;
    };
    return Level;
}());
exports.Level = Level;

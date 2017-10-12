"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LevelManager = /** @class */ (function () {
    function LevelManager() {
        this.curr = 0;
        this.levels = new Array();
    }
    LevelManager.prototype.addLevel = function (lvl) {
        this.levels.push(lvl);
    };
    LevelManager.prototype.nextLevel = function () {
        if (this.curr == this.levels.length) {
            return null;
        }
        return this.levels[++this.curr];
    };
    LevelManager.prototype.currentLevel = function () {
        if (this.curr < 0 || this.curr > this.levels.length) {
            return null;
        }
        return this.levels[this.curr];
    };
    LevelManager.prototype.prevLevel = function () {
        if (this.curr == 0) {
            return null;
        }
        return this.levels[--this.curr];
    };
    return LevelManager;
}());
exports.LevelManager = LevelManager;

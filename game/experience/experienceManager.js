var levels = {
    2: 20,
    3: 40,
    4: 100,
    5: 250,
    6: 350,
    7: 500,
    8: 650,
    9: 900,
    10: 1200,
    11: 1500,
    12: 1800,
    13: 2300,
    14: 2600,
    15: 3200,
    16: 3800,
    17: 4500,
    18: 5200,
    19: 5700,
    20: 6000,
    21: 6800,
    22: 7800,
    23: 8800,
    24: 9800,
    25: 10500,
    26: 11400,
    27: 13600,
    28: 15000,
    29: 17500,
    30: 20000,
    31: 24000,
    32: 28000,
    33: 35000,
    34: 40000,
    35: 45000
    /* todo reach 99 */
};

var ExperienceManager = (function () {
    function ExperienceManager(hero) {
        this.level = 1;
        this.nextLevel = 2;
        this.xp = 0;
        this.hero = hero;
        this.emitter = new Phaser.Events.EventEmitter();
    }

    ExperienceManager.prototype.increaseLevel = function () {
        if (this.level === 99)
            return;
        this.level = this.nextLevel++;
        this.hero.maxHp += this.hero.maxHp < 9999 ? 50 : 0;
        this.hero.damage += 1;
        this.hero.magicDefence += 1;
        this.hero.magicDamage += 1;
        this.hero.critDamage += 1;
        this.emitter.emit('nextLevel');
    };

    ExperienceManager.prototype.gainXp = function (xp) {
        this.xp += xp;
        if (this.xp >= levels[this.nextLevel])
            this.increaseLevel();
    };

    return ExperienceManager;
}());
var Enemy = new Phaser.Class({
    Extends: Unit,

    initialize:
        function Enemy(scene, x, y, texture, frame, type, hp, damage,  magicDamage, magicDefence, critProb, defence, critDamage, xp) {
            Unit.call(this, scene, x, y, texture, frame, type, hp, damage, magicDamage, magicDefence, critProb, defence, critDamage);
            this.xp = xp;
        }
});
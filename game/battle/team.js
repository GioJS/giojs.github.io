var Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Unit(scene, x, y, texture, frame, type, hp, damage, magicDamage, magicDefence, critProb, defence, critDamage) {
            Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
            this.type = type;
            this.hp = hp;
            this.damage = damage; // default damage
            this.living = hp > 0;
            this.menuItem = null;
            this.textItem = null;
            this.maxHp = 0;
            this.critProb = critProb;
            this.defence = defence;
            this.magicDefence = magicDefence;
            this.magicDamage = magicDamage;
            this.critDamage = critDamage;

            if (!this.living)
                this.angle = 90;
        },
    // we will use this to notify the menu item when the unit is dead
    setMenuItem: function (item) {
        this.menuItem = item;
    },
    setTextItem: function (item) {
        this.textItem = item;
    },
    magic: function (name, target) {
        if (target.living) {
            var particles = this.scene.add.particles('flares');
            if(name === 'blizzard') {

                particles.createEmitter({
                    frame: 'blue',
                    x: target.x,
                    y: target.y,
                    speed: 200,
                    scale: {start: 0.4, end: 0},
                    lifespan: 100,
                    blendMode: 'ADD'
                });
            }
             else if (name === 'fire') {
                    particles.createEmitter({
                        frame: 'red',
                        x: target.x,
                        y: target.y,
                        speed: 200,
                        scale: { start: 0.4, end: 0 },
                        lifespan: 100,
                        blendMode: 'ADD'
                    });
                } else if(name === 'thunder') {
                    particles.createEmitter({
                        frame: 'yellow',
                        x: target.x,
                        y: target.y,
                        speed: 200,
                        scale: { start: 0.4, end: 0 },
                        lifespan: 100,
                        blendMode: 'ADD'
                    });
                }

                this.scene.time.delayedCall(1000, function() {
                    particles.destroy();
                    var crit = Math.random() >= this.critProb;
                    console.log(target);
                    var damage;
                    if ((this.magicDamage + this.critDamage) <= target.magicDefence)
                        damage = 0;
                    else
                        damage = this.magicDamage - target.magicDefence + (crit ? this.critDamage : 0);
                    target.takeDamage(damage);
                    this.scene.events.emit("Message", this.type + (crit ? ' critical' : '') + " casts " + name + " " + target.type + " for " + damage + " damage");

                }, [], this);
        }
    },
    attack: function (target) {
        if (target.living) {
            var tween = this.scene.tweens.add({
                targets: [this],
                x: target.x + (target.x < this.x ? 20 : -20),
                y: target.y,
                duration: 500,
                ease: 'Quadratic.InOut',
                repeat: 0,
                yoyo: true,
                onComplete: function () {
                    var crit = Math.random() >= this.critProb;
                    console.log(target);
                    var damage;
                    if ((this.damage + this.critDamage) <= target.defence)
                        damage = 0;
                    else
                        damage = this.damage - target.defence + (crit ? this.critDamage : 0);
                    target.takeDamage(damage);
                    this.scene.events.emit("Message", this.type + (crit ? ' critical' : '') + " attacks " + target.type + " for " + damage + " damage");
                },
                onCompleteScope: this
            });
        }
    },
    takeDamage: function (damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.menuItem.unitKilled();
            this.living = false;
            if (this instanceof PlayerCharacter) {
                this.angle = 90;
            }

            if (this instanceof Enemy) {

                this.scene.tweens.add({
                    targets: [this],
                    alpha: 0,
                    duration: 2000,
                    ease: 'Linear.None',
                    repeat: 0,
                    yoyo: false,
                    onComplete: function () {
                        //this.destroy();
                        this.visible = false;
                    },
                    onCompleteScope: this
                });
            }


            this.menuItem = null;
        }
    }
});


var PlayerCharacter = new Phaser.Class({
    Extends: Unit,

    initialize:
        function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage, magicDamage, magicDefence, critProb, defence, critDamage) {
            Unit.call(this, scene, x, y, texture, frame, type, hp, damage, magicDamage, magicDefence, critProb, defence, critDamage);
            // flip the image so I don't have to edit it manually
            this.flipX = true;

            this.setScale(2);
        }
});

var Team = (function () {
    function Team() {
        var warrior = {
            maxHp: 100,
            hp: 100,
            damage: 20,
            magicDamage: 0,
            magicDefence: 2,
            critProb: 0.3,
            defence: 8,
            critDamage: 20
        };
        var mage = {
            maxHp: 80,
            hp: 80,
            damage: 8,
            magicDamage: 120,
            magicDefence: 20,
            critProb: 0.1,
            defence: 2,
            critDamage: 5
        };
        this.heroes = [warrior, mage];
        this.heroes[0].xpManager = new ExperienceManager(warrior);
        this.heroes[1].xpManager = new ExperienceManager(mage);
    }

    return Team;
}());

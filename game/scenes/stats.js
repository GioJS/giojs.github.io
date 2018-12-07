var Status = new Phaser.Class({

    Extends: MainMenu,

    initialize:

        function Status() {
            Phaser.Scene.call(this, {key: 'Stats'});

        },

    preload: function () {

    },

    create: function () {
        this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0x000000);
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.strokeRect(200, 0, 120, 300);
        this.graphics.fillRect(200, 0, 120, 300);

        this.buttons = [];


        this.team = team.heroes;
        var scene = this;
        this.team.forEach(function (hero, index) {
            var h;
            if (index === 0) {
                h = "Warrior lvl " + hero.xpManager.level + "\n xp: " + hero.xpManager.xp + "\n next lvl: " + levels[hero.xpManager.nextLevel];
                scene.w = scene.add.text(205, 5, h).setColor('#000000').setScale(0.8);

            } else if (index === 1) {
                h = "Mage lvl " + hero.xpManager.level + "\n xp: " + hero.xpManager.xp + "\n next lvl: " + levels[hero.xpManager.nextLevel];
                scene.m = scene.add.text(205, 55, h).setColor('#000000').setScale(0.8);

            }
        });


        this.back = this.add.text(205, 105, "Back");
        this.back.setColor('#000000');
        this.back.setInteractive();


        this.timer = this.add.text(205, 220, hours + " : " + minutes + " : " + seconds);

        this.elapsed();
        this.timer.setColor('#000000');
        this.timer.setScale(0.75);


        this.back.on('pointerdown', function () {
            this.scene.back.setColor('#cccf00');
            if(this.scene.index === 0)
                this.scene.scene.switch('MainMenu');
            this.scene.index = 0;
        });
        this.buttons.push(this.back);

        //this.buttons = [this.items, this.equipment, this.abilities, this.save, this.exit];
        this.input.keyboard.on("keydown", this.onKeyInput, this);
        this.index = -1;

        this.time.addEvent({delay: 1000, callback: this.elapsed, callbackScope: this, repeat: -1});
        this.sys.events.on('wake', function () {
            this.team.forEach(function (hero, index) {
                var h;
                if (index === 0) {
                    h = "Warriorlvl " + hero.xpManager.level + "\nxp: " + hero.xpManager.xp + "\n next lvl: " + levels[hero.xpManager.nextLevel];
                    scene.w.setText(h);

                } else if (index === 1) {
                    h = "Mage lvl " + hero.xpManager.level + "\n xp: " + hero.xpManager.xp + "\n next lvl: " + levels[hero.xpManager.nextLevel];
                    scene.m.setText(h);

                }
            });
        }, this);
    },
    onKeyInput: function (event) {
        this.deselectAll();

        if (event.code === "KeyA" && this.index >= 0) {
            this.index--;
        } else if (event.code === "KeyZ" && this.index < this.buttons.length) {
            this.index++;
        } else if (event.code === 'KeyX') {
            switch (this.index) {
                case 0:
                    this.scene.switch('MainMenu');
                    break;
                default:
                    console.log('error');
            }

        } else if (event.code === 'Escape') {
            this.scene.switch('MainMenu');
        }

        if (this.index < 0) {
            this.index = this.buttons.length - 1;
        }

        if (this.index >= this.buttons.length) {
            this.index = 0;
        }

        this.buttons[this.index].setColor('#cccf00');
    }
});

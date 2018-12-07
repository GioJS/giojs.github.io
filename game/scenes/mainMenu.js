var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, {key: 'MainMenu'});

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

        this.items = this.add.text(205, 5, "Items");
        this.items.setColor('#cccf00');
        this.items.setInteractive();
        this.items.on('pointerdown', function () {
            if (this.scene.index === 0) {
                this.scene.scene.switch('ItemsMenu');
            }
            this.scene.deselectAll();
            this.scene.index = 0;
            this.scene.items.setColor('#cccf00')
        });

        this.equipment = this.add.text(205, 25, "Equipment");
        this.equipment.setColor('#000000');
        this.equipment.setInteractive();
        this.equipment.on('pointerdown', function () {
            if (this.scene.index === 1) {
                console.log('opened ' + this.scene.index)
            }
            this.scene.deselectAll();
            this.scene.index = 1;
            this.scene.equipment.setColor('#cccf00')
        });


        this.abilities = this.add.text(205, 45, "Abilities");
        this.abilities.setColor('#000000');
        this.abilities.setInteractive();
        this.abilities.on('pointerdown', function () {
            if (this.scene.index === 2) {
                console.log('opened ' + this.scene.index)
            }
            this.scene.deselectAll();
            this.scene.index = 2;
            this.scene.abilities.setColor('#cccf00')
        });

        this.save = this.add.text(205, 85, "Save");
        this.save.setColor('#000000');
        this.save.setInteractive();
        this.save.on('pointerdown', function () {
            if (this.scene.index === 4) {
                console.log('opened ' + this.scene.index)
            }
            this.scene.deselectAll();
            this.scene.index = 4;
            this.scene.save.setColor('#cccf00')
        });


        this.stats = this.add.text(205, 65, "Status");
        this.stats.setColor('#000000');
        this.stats.setInteractive();
        this.stats.on('pointerdown', function () {
            if (this.scene.index === 3) {
                this.scene.scene.stop();
                this.scene.scene.switch("Stats");

                console.log('opened ' + this.scene.index)
            }
            this.scene.deselectAll();
            this.scene.index = 3;
            this.scene.stats.setColor('#cccf00')
        });

        this.exit = this.add.text(205, 105, "Exit");
        this.exit.setColor('#000000');
        this.exit.setInteractive();
        this.exit.on('pointerdown', function () {
            if (this.scene.index === 5) {
                this.scene.scene.stop();
                this.scene.scene.get('InitialMap').scene.start('BootScene');

                console.log('opened ' + this.scene.index)
            }
            this.scene.deselectAll();
            this.scene.index = 5;
            this.scene.exit.setColor('#cccf00')
        });


        this.timer = this.add.text(205, 220, hours + " : " + minutes + " : " + seconds);

        this.elapsed();
        this.timer.setColor('#000000');
        this.timer.setScale(0.75);

        this.buttons = [this.items, this.equipment, this.abilities, this.stats, this.save, this.exit];
        this.input.keyboard.on("keydown", this.onKeyInput, this);
        this.index = 0;

        this.time.addEvent({delay: 1000, callback: this.elapsed, callbackScope: this, repeat: -1});
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
                    this.scene.switch('ItemsMenu');
                    break;
                case 3:
                    this.scene.switch("Stats");
                    break;
                case 5:
                    this.scene.stop();
                    this.scene.get('InitialMap').scene.start('BootScene');
                    break;
                default:
                    console.log('error');
            }
        } else if (event.code === 'Escape') {
            this.scene.stop();
        }

        if (this.index < 0) {
            this.index = this.buttons.length - 1;
        }

        if (this.index >= this.buttons.length) {
            this.index = 0;
        }

        this.buttons[this.index].setColor('#cccf00');
    },
    deselectAll: function () {
        this.buttons.forEach(function (item) {
            item.setColor("#000000");
        });
    },
    elapsed: function () {
        getElapsedTime(this.timer);
    }
});

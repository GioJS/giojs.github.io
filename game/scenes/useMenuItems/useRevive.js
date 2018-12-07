var UseRevive = new Phaser.Class({

    Extends: MainMenu,

    initialize:

        function UseRevive() {
            Phaser.Scene.call(this, {key: 'UseRevive'});

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


        this.warrior = this.add.text(205, 5, "Warrior " + this.team[0].hp + "/" + this.team[0].maxHp);
        this.warrior.setInteractive();
        this.warrior.setColor('#cccf00');
        this.warrior.setScale(0.8);
        this.warrior.on("pointerdown", function () {
            this.scene.deselectAll();
            if (this.scene.index === 0) {
                if (this.scene.team[0].hp > 0)
                    return;
                this.scene.team[0].hp = this.scene.team[0].maxHp;
                inventory.useRevives(1);
                this.scene.warrior.setText("Warrior " + this.scene.team[0].hp + "/" + this.scene.team[0].maxHp);
            }
            this.scene.warrior.setColor('#cccf00');

            this.scene.index = 0;
        });
        this.buttons.push(this.warrior);


        this.mage = this.add.text(205, 25, "Mage " + this.team[1].hp + "/" + this.team[1].maxHp);
        this.mage.setInteractive();
        this.mage.setScale(0.8);
        this.mage.setColor('#000000');

        this.mage.on("pointerdown", function () {
            this.scene.deselectAll();
            if (this.scene.index === 1) {
                if (this.scene.team[1].hp > 0)
                    return;
                this.scene.team[1].hp = this.scene.team[1].maxHp;
                inventory.useRevives(1);
                this.scene.mage.setText("Mage " + this.scene.team[1].hp + "/" + this.scene.team[1].maxHp);

            }
            this.scene.mage.setColor('#cccf00');
            this.scene.index = 1;
        });
        this.buttons.push(this.mage);

        this.back = this.add.text(205, 85, "Back");
        this.back.setColor('#000000');
        this.back.setInteractive();
        this.back.on('pointerdown', function () {
            this.scene.deselectAll();
            if (this.scene.index === 3)
                this.scene.scene.switch('ItemsMenu');
            this.scene.index = 3;
            this.scene.back.setColor('#cccf00');
        });
        this.buttons.push(this.back);

        this.timer = this.add.text(205, 220, hours + " : " + minutes + " : " + seconds);

        this.elapsed();
        this.timer.setColor('#000000');
        this.timer.setScale(0.75);


        //this.buttons = [this.items, this.equipment, this.abilities, this.save, this.exit];
        this.input.keyboard.on("keydown", this.onKeyInput, this);
        this.index = 0;

        this.time.addEvent({delay: 1000, callback: this.elapsed, callbackScope: this, repeat: -1});

        this.sys.events.on('wake', function () {
            this.warrior.setText("Mage " + this.scene.team[0].hp + "/" + this.scene.team[0].maxHp);

            this.mage.setText("Mage " + this.scene.team[1].hp + "/" + this.scene.team[1].maxHp);

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
                    if (this.team[0].hp > 0)
                        return;
                    this.team[0].hp = this.team[0].maxHp;
                    inventory.useRevives(1);
                    this.warrior.setText("Warrior " + this.team[0].hp + "/" + this.team[0].maxHp);
                    break;
                case 1:
                    if (this.team[1].hp > 0)
                        return;
                    this.team[1].hp = this.team[1].maxHp;
                    inventory.useRevives(1);
                    this.mage.setText("Mage " + this.team[1].hp + "/" + this.team[1].maxHp);
                    break;
                case 2:
                    this.scene.switch('ItemsMenu');
                    break;
                default:
                    console.log('error');
            }

        } else if (event.code === 'Escape') {
            this.scene.switch('ItemsMenu');
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

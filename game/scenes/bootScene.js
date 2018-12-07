var seconds = 0;
var minutes = 0;
var hours = 0;
var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BootScene() {
            Phaser.Scene.call(this, {key: 'BootScene'});

        },

    preload: function () {
        this.load.image('finger', 'game/assets/finger.png');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.centerX = this.cameras.main.centerX / 2;
        this.centerY = this.cameras.main.centerY / 2;
        this.startX = this.centerX + 20;
        this.startY = this.cameras.main.centerY / 2 + 50;
        this.loadY = this.cameras.main.centerY / 2 + 80;
        this.cursorY = this.cameras.main.centerY / 2 + 60;
        this.cursorStart = this.centerY + 60;
        this.cursorLoad = this.centerY + 90;
        this.firstTapStart = false;
    },

    create: function () {
        this.cameras.main.setBackgroundColor("#ffffff");

        var text = this.add.text(this.centerX, this.centerY, "Final Phaser");
        text.setScale(1.5);
        text.setColor("#000000");

        var start = this.add.text(this.startX, this.startY, "New Game");
        start.setScale(1.0);
        start.setColor("#000000");
        start.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            this.scene.firstTapLoad = false;
            if(!this.scene.firstTapStart) {
                this.scene.cursor.y = this.scene.cursorStart;
                this.scene.firstTapStart = true;
            } else {
                this.scene.scene.start('PreludeScene');
            }
        });


        var load = this.add.text(this.startX, this.loadY, "Load Game");
        load.setScale(1.0);
        load.setColor("#000000");

        load.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            this.scene.firstTapStart = false;
            if(!this.scene.firstTapLoad) {
                this.scene.cursor.y = this.scene.cursorLoad;
                this.scene.firstTapLoad = true;
            } else {
                //this.scene.scene.start('WorldScene');
            }
        });

        this.cursor = this.physics.add.sprite(this.centerX, this.cursorY, 'finger');
        var tween = this.tweens.add({
            targets: [this.cursor],
            x: this.cursor.x - 10,
            duration: 700,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

    },
    update: function () {
        if (this.cursors.down.isDown) {
            this.cursor.y = this.cursorLoad;
        }
        if (this.cursors.up.isDown) {
            this.cursor.y = this.cursorStart;
        }

        if (this.cursors.space.isDown) {
            if (this.cursor.y === this.cursorStart) { // start game
                console.log("start");
                this.scene.start('PreludeScene');
            } else {
                //load game
                console.log("load screen")
            }


        }
    }


});
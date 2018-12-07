var PreludeScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function WorldScene() {
            Phaser.Scene.call(this, {key: 'PreludeScene'});
        },
    preload: function () {
        this.centerX = this.cameras.main.centerX / 2 - 15;
        this.centerY = this.cameras.main.centerY / 2 + 30;
        this.preludeText = [
            'A long time ago...',
            'the wizard lord begin a \nwar against humanity',
            'after centuries seems \nthe wizard lord is winning...'
        ];
        this.text = null;
    },
    create: function () {
        this.prelude();
        this.evt = this.time.addEvent({delay: 5000, callback: this.prelude, callbackScope: this, repeat: 2});
    },
    prelude: function () {
        if (this.text !== null)
            this.text.destroy();
        this.text = this.add.text(this.centerX, this.centerY, this.preludeText.shift());
        this.text.setScale(0.8);
        this.text.setColor('#ffffff');
        this.tweens.add({
            targets: [this.text],
            alpha: 0,
            duration: 5000,
            ease: 'Linear.None',
            repeat: 1,
            yoyo: false
        });
    },
    update: function () {
        if(this.completed())
            this.scene.start('InitialMap');
    },
    completed: function () {
        return this.evt.getOverallProgress() === 1;
    }
});

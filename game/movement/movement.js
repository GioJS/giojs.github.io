var Movement = (function() {
    function Movement(player, scene) {
        this.player = player;

        this.scene = scene;

        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.moveUpT = false;
        this.moveDownT = false;
        this.moveLeftT = false;
        this.moveRightT = false;

        this.stopMove = false;


        if (scene.game.device.os.android) {
            this.up = scene.add.sprite(50, 160, 'up').setInteractive();
            this.up.scaleX = 0.5;
            this.up.scaleY = 0.5;
            this.up.angle = -90;
            this.up.setScrollFactor(0);
            this.up.on('pointerdown', function (pointer, localX, localY, event) {
                this.moveUpT = true;
                this.moveDownT = false;
                this.moveLeftT = false;
                this.moveRightT = false;
            }, this);

            this.up.on('pointerup', function (pointer, localX, localY, event) {
                this.moveUpT = false;
            }, this);

            this.latest = 10000;

            this.down = scene.add.sprite(50, 200, 'down').setInteractive();
            this.down.scaleX = 0.5;
            this.down.scaleY = 0.5;
            this.down.angle = +90;

            this.down.setScrollFactor(0);
            this.down.on('pointerdown', function (pointer, localX, localY, event) {
                this.moveDownT = true;
                this.moveUpT = false;
                this.moveLeftT = false;
                this.moveRightT = false;
            }, this);

            this.down.on('pointerup', function (pointer, localX, localY, event) {
                this.moveDownT = false;
            }, this);

            this.left = scene.add.sprite(20, 180, 'left').setInteractive();
            this.left.scaleX = 0.5;
            this.left.scaleY = 0.5;
            this.left.angle = -180;
            this.left.setScrollFactor(0);

            this.left.on('pointerdown', function (pointer, localX, localY, event) {
                this.moveLeftT = true;
                this.moveUpT = false;
                this.moveDownT = false;
                this.moveRightT = false;
            }, this);

            this.left.on('pointerup', function (pointer, localX, localY, event) {
                this.moveLeftT = false;
            }, this);

            this.right = scene.add.sprite(80, 180, 'right').setInteractive();
            this.right.scaleX = 0.5;
            this.right.scaleY = 0.5;
            this.right.angle = 360;

            this.right.setScrollFactor(0);
            this.right.on('pointerdown', function (pointer, localX, localY, event) {
                this.moveRightT = true;
                this.moveUpT = false;
                this.moveDownT = false;
                this.moveLeftT = false;
            }, this);

            this.right.on('pointerup', function (pointer, localX, localY, event) {
                this.moveRightT = false;
            }, this);
        }
    }

    Movement.prototype.resetMovements = function() {
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
    };


    Movement.prototype.cursorMove = function() {
        // Horizontal movement
        if (this.scene.cursors.left.isDown) {
            this.moveLeft = true;
        } else if (this.scene.cursors.right.isDown) {
            this.moveRight = true;
        }

        // Vertical movement
        if (this.scene.cursors.up.isDown) {
            this.moveUp = true;
        } else if (this.scene.cursors.down.isDown) {
            this.moveDown = true;
        }
    };

    Movement.prototype.stop = function () {
      this.stopMove = true;
    };

    Movement.prototype.start = function () {
        this.stopMove = false;
    };

    Movement.prototype.movement = function () { //TODO extract to class
        if(this.stopMove)
            return;
        // Horizontal movement
        if (this.moveLeft || this.moveLeftT) {
            this.player.body.setVelocityX(-80);
        } else if (this.moveRight || this.moveRightT) {
            this.player.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.moveUp || this.moveUpT) {
            this.player.body.setVelocityY(-80);
        } else if (this.moveDown || this.moveDownT) {
            this.player.body.setVelocityY(80);
        }
        //animation
        if (this.moveLeft || this.moveLeftT) {
            this.player.flipX = true;
            this.player.anims.play('left', true);
        } else if (this.moveRight || this.moveRightT) {
            this.player.flipX = false;
            this.player.anims.play('right', true);
        } else if (this.moveUp || this.moveUpT) {
            this.player.anims.play('up', true);
        } else if (this.moveDown || this.moveDownT) {
            this.player.anims.play('down', true);
        } else {
            this.player.anims.stop();
        }
    };

    return Movement;
}());
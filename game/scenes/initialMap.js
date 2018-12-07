var InitialScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function InitialScene() {
            Phaser.Scene.call(this, {key: 'InitialMap'});
        },
    preload: function () {
        team = new Team();
        inventory = new Inventory();

        inventory.addRevives(2);
        inventory.addPotions(10);

        this.load.image('tiles', 'game/assets/map/spritesheet.png');
        this.load.tilemapTiledJSON('map', 'game/assets/map/map.json');
        this.load.spritesheet('player', 'game/assets/pgsheets.png', {frameWidth: 16, frameHeight: 16});
        this.cursors = this.input.keyboard.createCursorKeys();
        this.load.image('up', 'game/assets/arrow.png');
        this.load.image('down', 'game/assets/arrow.png');
        this.load.image('left', 'game/assets/arrow.png');
        this.load.image('right', 'game/assets/arrow.png');

        //level enemies
        this.load.image('dragonblue', 'game/assets/dragonblue.png');
        this.load.image('dragonorrange', 'game/assets/dragonorrange.png');


    },
    create: function () {
        var map = this.make.tilemap({key: 'map'});

        var tiles = map.addTilesetImage('spritesheet', 'tiles');

        var grass = map.createStaticLayer('Grass', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);

        this.player = this.physics.add.sprite(50, 100, 'player', 6);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        this.start = this.time.now;
        this.input.keyboard.on('keydown', function (event) {
            if (event.code === 'Enter') {
                //this.input.enabled = false;
                this.movement.stop();
                this.scene.launch('MainMenu');
            } else if (event.code === 'Escape') {
                this.movement.start();
            }
        }, this);
        this.time.addEvent({
            repeat: -1, delay: 1000, callbackScope: this, callback: function () {
                seconds++;

                if (seconds !== 0 && seconds % 60 === 0) {
                    seconds = 0;
                    minutes++;
                }

                if (minutes !== 0 && this.minutes % 60 === 0) {
                    minutes = 0;
                    hours++;
                }
            }
        });

        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });

        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {frames: [0, 6, 0, 12]}),
            frameRate: 10,
            repeat: -1
        });


        this.physics.add.collider(this.player, obstacles);

        //if (this.game.device.os.android) {
        this.menuButton = this.add.text(5, 0, "Menu");
        this.menuButton.setInteractive();
        this.menuButton.setColor('#ffff21');
        this.menuButton.setBackgroundColor("#ffffff");
        this.menuButton.setScrollFactor(0);
        this.menuButton.on('pointerdown', function () {
            this.setBackgroundColor('#0001ff');
            if (!this.scene.scene.menuOpen) {
                this.scene.movement.stop();
                this.scene.scene.menuOpen = true;
                this.scene.scene.launch('MainMenu');
            } else {
                this.scene.movement.start();
                this.scene.scene.menuOpen = false;
                this.scene.scene.get('MainMenu').scene.stop();
            }
        });

        this.menuButton.on('pointerup', function () {
            this.setBackgroundColor('#ffffff');
        });
        //}
        // where the enemies will be
        this.spawns = this.physics.add.group({classType: Phaser.GameObjects.Zone});
        for (var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);
        }
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
        // we listen for 'wake' event
        this.sys.events.on('wake', this.wake, this);

        this.movement = new Movement(this.player, this);

    },
    update: function (time, delta) {
        this.player.body.setVelocity(0);
        this.movement.resetMovements();

        this.movement.cursorMove();
        this.movement.movement();
    },
    wake: function () {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
    },
    onMeetEnemy: function (player, zone) {
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

        // shake the world
        this.cameras.main.shake(2000);
        this.input.stopPropagation();
        this.movement.stop();
        // start battle
        this.scene.scene.tweens.add({
            targets: [this.scene.scene],
            duration: 2000,
            alpha: 0,
            ease: 'Linear.None',
            repeat: 0,
            yoyo: false,
            onComplete: function () {
                this.scene.switch('BattleScene');
                this.movement.start();
            },
            onCompleteScope: this
        });
    }

});

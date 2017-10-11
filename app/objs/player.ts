declare var Phaser: any;

import "../../lib/phaser.js";
export class Player {
    sprite_path: string;
    game: Phaser.Game;
    healt: number;
    sprite: any;
    direction: any;
    points: number;
    constructor(game: Phaser.Game){
        this.sprite_path = 'app/assets/phaser-dude.png';
        this.game = game;
        this.healt = 100;
        this.points = 0;
        this.game.load.spritesheet('player', this.sprite_path, 32, 48);
    }

    createPlayer(){
        this.sprite = this.game.add.sprite(32, this.game.world.height - 150, 'player');
        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
        
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 500;
        this.direction = Phaser.RIGHT;
    }

    stop(){
        
        this.sprite.body.velocity.x = 0;
        this.sprite.animations.stop();
        if(this.direction == Phaser.LEFT)
            this.sprite.frame = 0;
        else
            this.sprite.frame = 7;
    }

    left(){
        this.sprite.body.velocity.x = -250;
        if(this.isOnFloor())
            this.sprite.animations.play('left');
        this.direction = Phaser.LEFT;
    }

    right(){
        this.sprite.body.velocity.x = 250;
        if(this.isOnFloor())
            this.sprite.animations.play('right');
        this.direction = Phaser.RIGHT;
    }

    jump(){
        this.sprite.body.velocity.y = -400;
        this.sprite.animations.stop();
        if(this.direction == Phaser.RIGHT){
            this.sprite.frame = 6;
            this.sprite.body.velocity.x = 250;
        }
        else{
            this.sprite.frame = 1;
            this.sprite.body.velocity.x = -250;
        }
        
    }

  

    isOnFloor(){
        return (this.sprite.body.onFloor() || this.sprite.body.touching.down);
    }
}
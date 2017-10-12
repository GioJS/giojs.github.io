declare var Phaser: any;

import "../../lib/phaser.js";

export class Coin {
    sprite: any;
    points: number;
    game: Phaser.Game;
    sprite_path: string;
    coords: any;
    constructor(game: Phaser.Game, coords: any){
        this.game = game;
        this.points = 10;
        this.coords = coords
        this.sprite_path = 'app/assets/coin.png'
        this.game.load.spritesheet('coin', this.sprite_path, 32, 32, 6);
    }

    createCoin(){
        this.sprite = this.game.add.sprite(this.coords.x, this.coords.y, 'coin');
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.animations.add('rotation');
        this.sprite.animations.play('rotation', 30, true);
    }

}
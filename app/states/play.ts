declare var Phaser: any;

import  "../../lib/phaser.js";
import { Player } from '../objs/player';
import { Coin} from '../objs/coin';
import { Level } from "../level_mng/level";

export class PlayState {
    game: Phaser.Game;
    cursors: any;
    esc: any;
    jmp: any;
    player_xy: any;
    platforms_objs: any;
    platforms: Phaser.Game.physicsGroup;
    player: Player;
    coins_coords: any;
    coins: Array<Coin>;
    points_text: any;
    time_r: number;
    last_time: number;
    time_text: any;
    obj: number;
    gameover: boolean;
    game_timer: any;
    constructor(game: Phaser.Game){
        this.game = game;
    }

    init(level: Level){
        this.gameover = false;
        this.time_r = level.time_r;
        this.player_xy = level.player;
        
        this.coins_coords = level.coins;
        this.platforms_objs = level.platforms;
        this.obj = level.obj;
    }

    preload() {
        this.game.stage.backgroundColor = '#85b5e1';

        this.game.load.crossOrigin = 'anonymous';
        
        this.game.load.image('platform', 'app/assets/platform.png');
        this.player = new Player(this.game, this.player_xy.x, this.player_xy.y);

        this.coins = new Array();
        for(let coord of this.coins_coords){
            this.coins.push(new Coin(this.game, coord));
        }
    }

    create() {
       // this.time_r = 60;
        this.last_time =  Math.round(this.game.time.totalElapsedSeconds());
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player.createPlayer();

        for(let coin of this.coins){
            coin.createCoin();
        }

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.jmp = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        this.platforms = this.game.add.physicsGroup();

        for(let platform of this.platforms_objs){
            var plt = this.platforms.create(platform.x, platform.y, 'platform');
            if(platform.animation){
                var tween = this.game.add.tween(plt.body)
                for(let anim of platform.animation){
                    tween.to(anim.to, anim.move_time, anim.type);
                }
                //.to({y: 150}, platform.time, Phaser.Easing.Quadratic.InOut)
                tween.loop().start();
            }
        }

        this.platforms.setAll('body.immovable', true);

        this.points_text = this.game.add.text(0, 0, "Points: 0", {"fill":"white"});
        this.time_text = this.game.add.text(400, 0, "Time: "+this.time_r, {"fill":"white"});
        this.game.time.events.add(Phaser.Timer.SECOND * this.time_r, () => {
            this.gameover = true;
        }, this);
        
    }

    render(){
        this.points_text.setText("Points: "+this.player.points);
        this.time_text.setText("Time: "+Math.round(this.game.time.events.duration/1000));
    }

    update(){
        if(this.gameover){
            this.game.state.start('gameover');
        }
        if(this.player.points === this.obj){
            this.game.state.start('win');
        }
        
       this.game.physics.arcade.collide(this.player.sprite, this.platforms);
       
       for(let coin of this.coins){
            this.game.physics.arcade.collide(this.player.sprite, coin.sprite, () => {
                    this.player.points += coin.points;
                    coin.sprite.destroy();
            });
        }

       if(this.esc.isDown){
           this.game.state.start('boot');
       }
       if(this.player.isOnFloor()){
            if(this.cursors.left.isDown){
                this.player.left();
            }else if(this.cursors.right.isDown){
                this.player.right();
            }else{
                this.player.stop();
            }
        }
       if(this.jmp.isDown && (this.player.isOnFloor())){
           this.player.jump();
       }
    }
       
}
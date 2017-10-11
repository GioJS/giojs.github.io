declare var Phaser: any;

import  "../../lib/phaser.js";
import { Player } from '../objs/player';
import { Coin} from '../objs/coin';

export class PlayState {
    game: Phaser.Game;
    cursors: any;
    esc: any;
    jmp: any;
    platforms: Phaser.Game.physicsGroup;
    player: Player;
    coins: Array<Coin>;
    points_text: any;
    time_r: number;
    last_time: number;
    time_text: any;

    constructor(game: Phaser.Game){
        this.game = game;
        
    }

    preload() {
        this.game.stage.backgroundColor = '#85b5e1';

        this.game.load.crossOrigin = 'anonymous';
        
        this.game.load.image('platform', 'app/assets/platform.png');
        this.player = new Player(this.game);
        this.coins = new Array(new Coin(this.game), new Coin(this.game), new Coin(this.game));
        this.coins.push(new Coin(this.game), new Coin(this.game), new Coin(this.game));
        this.coins.push(new Coin(this.game), new Coin(this.game), new Coin(this.game));
    }

    create() {
        this.time_r = 60;
        this.last_time =  Math.round(this.game.time.totalElapsedSeconds());
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player.createPlayer();
        var i = 0;

        for(var j=0; j<3; j++){
            this.coins[j].createCoin(40+i, 120);
            i += 50;
        }
        i = 0;
        for(var j=3; j<6; j++){
            this.coins[j].createCoin(520+i, 60);
            i += 50;
        }

        i = 0;
        for(var j=6; j<9; j++){
            this.coins[j].createCoin(480+i, 400);
            i += 50;
        }

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.jmp = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        this.platforms = this.game.add.physicsGroup();
       
        this.platforms.create(500, 150, 'platform');
        this.platforms.create(-200, 300, 'platform');
        this.platforms.create(400, 450, 'platform');

        this.platforms.setAll('body.immovable', true);

        this.points_text = this.game.add.text(0, 0, "Points: 0", {"fill":"white"});
        this.time_text = this.game.add.text(400, 0, "Time: "+this.time_r, {"fill":"white"});
        
    }

    render(){
        this.points_text.setText("Points: "+this.player.points);
        this.time_text.setText("Time: "+this.time_r);
    }

    update(){
        //console.log(this.game.time.totalElapsedSeconds())
        var now = Math.round(this.game.time.totalElapsedSeconds());
        if((now - this.last_time) == 1){
            
            if((this.time_r - 1) <= 0){
                this.time_r = 0;
            }else {
                this.time_r -= 1;
                this.last_time = now;
            }
        }

        if(this.time_r == 0){
            this.game.state.start('gameover');
        }
        
        if(this.player.points === 90){
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
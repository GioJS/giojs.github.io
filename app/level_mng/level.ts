export class Level {
    player: any;
    platforms: any;
    coins: any;
    obj: number;
    time_r: number;
    
    constructor(){

    }

    deserialize(input) {
        this.player = input.player;

        this.platforms = input.platforms;
        this.coins = input.coins;

        this.obj = input.obj;
        this.time_r = input.time_r;
        this.animation = input.animation;
        return this;
    }
}
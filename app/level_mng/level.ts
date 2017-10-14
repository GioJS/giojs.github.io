export class Level {
    player: any;
    platforms: any;
    coins: any;
    obj: number;
    time_r: number;
    world_bounds: any;
    animation: any;
    constructor(){

    }

    deserialize(input) {
        this.player = input.player;

        this.platforms = input.platforms;
        this.coins = input.coins;

        this.obj = input.obj;
        this.time_r = input.time_r;
        this.world_bounds = input.world_bounds;
        this.animation = input.animation;
        return this;
    }
}
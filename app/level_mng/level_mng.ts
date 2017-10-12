import { Level } from "./level";

export class LevelManager {
    private levels: Array<Level>;
    private curr: number;
    
    constructor(){
        this.curr = 0;
        this.levels = new Array();
    }

    addLevel(lvl: Level){
        this.levels.push(lvl);
    }

    nextLevel(){
        if(this.curr == this.levels.length){
            return null;
        }
        return this.levels[++this.curr];
    }

    currentLevel(){
        if(this.curr < 0 || this.curr > this.levels.length){
            return null;
        }
        return this.levels[this.curr];
    }

    prevLevel(){
        if(this.curr == 0){
            return null;
        }
        return this.levels[--this.curr];
    }

}
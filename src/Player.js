import Entity from './Entity';
import imgs from './Images';

const { cat, cat_left } = imgs;

class Player extends Entity {

    inventory = []

    attr = {
        name: 'Player',
        ascii: '@',
        health: 10,
        color: 'transparent',
        img: cat,
        img_left: cat_left,
        move_left: false,
        move_right: true
    }

    move(dx, dy) { 
        if (this.attr.health <=0) return
        this.x += dx;
        this.y += dy;
    }

    add(item){
        this.inventory.push(item)
    }

    copyPlayer(){
        let newPlayer = new Player();
        Object.assign(newPlayer, this);
        return newPlayer;
    }
}

export default Player;
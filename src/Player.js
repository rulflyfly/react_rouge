import Entity from './Entity';
const cat = new Image();
cat.src = './img/player.png'

class Player extends Entity {

    inventory = []

    attr = {
        name: 'Player',
        ascii: '@',
        health: 10,
        color: 'transparent',
        img: cat
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
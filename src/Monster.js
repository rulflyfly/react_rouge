import Entity from './Entity.js'

class Monster extends Entity {
    action(verb, world) {
        if (verb === 'bump') {
            //attack
            world.addToHistory(`Player attacks ${this.attr.name}!`)
            this.attr.health = this.attr.health - 1;
            if (this.attr.health <= 0) {
                world.addToHistory(`${this.attr.name} dies!`)
                world.remove(this)
            } else {
                world.addToHistory(`${this.attr.name}'s health is ${this.attr.health}`)
                world.player.attr.health = world.player.attr.health - 1;
                if (world.player.attr.health <= 0) {
                    world.addToHistory(`You have died!`)
                } else {
                    world.addToHistory(`Your health is ${world.player.attr.health}`)
                }
            }
        }
    }

    spot = this.x
    spot_left = this.x + 2;
    spot_right = this.x - 2;

    walk(map, otherFolks) {
        let fantomMonster = {...this}
        let direction = Math.floor(Math.random()*4)
        
        switch (direction) {
            case 0: 
                fantomMonster.x-=1
            break;
            case 1:
                fantomMonster.y-=1
            break;
            case 2:
                fantomMonster.x+=1
            break;
            case 3:
                fantomMonster.y+=1
            break;
            default:
            break;
        }


        let x = fantomMonster.x
        let y = fantomMonster.y

        if (otherFolks) {
            let entity = otherFolks.find(entity => entity.x === x && entity.y === y)
            if (map[x][y] === 0 && !entity) {
                this.x = x;
                this.y = y
            }
        }
    }
}

export default Monster;
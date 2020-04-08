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
}

export default Monster;
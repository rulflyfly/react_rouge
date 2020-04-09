import Loot from './Loot';
import Monster from './Monster';
import Stairs from './Stairs';
import imgs from './Images';

const {sword,
        health,
        coin,
        armor,
        ogre,
        dragon,
        slime,
        spider} = imgs;

const lootTable = [
    {name: 'Long Sword', img: sword, ascii: '/', offset: {x: 6, y: 3}},
    {name: 'Health Potions', img: health, ascii: '!', offset: {x: 6, y: 3}},
    {name: 'Gold Coin', img: coin, ascii: '$', offset: {x: 3, y: 3}},
    {name: 'Light Armor', img: armor, ascii: '#', offset: {x: 4, y: 3}},
]

const monsterTable = [
    {name: 'Ogre', img: ogre, ascii: 'O', offset: {x: 2, y: 3}, health: 6},
    {name: 'Dragon', img: dragon, ascii: 'D', offset: {x: 2, y: 3}, health: 10},
    {name: 'Slime', img: slime, ascii: 'S', offset: {x: 3, y: 2}, health: 2},
    {name: 'Spider', img: spider, ascii: 'k', offset: {x: 4, y: 3}, health: 3}
]

class Spawner {
    constructor(world) {
        this.world = world;
    }

    spawn(spawnCount, createEntity){
        for (let i = 0; i < spawnCount; i++) {
            let entity = createEntity()
            this.world.add(entity)
            this.world.moveToSpace(entity)
        }
    }

    spawnLoot(spawnCount){
        this.spawn(spawnCount, () => {
            return new Loot(getRandomInt(this.world.width - 1), 
                            getRandomInt(this.world.height - 1),
                            this.world.tileSize, lootTable[getRandomInt(lootTable.length)])
        })
    }

    spawnMonster(spawnCount){
        this.spawn(spawnCount, () => {
            return new Monster(getRandomInt(this.world.width - 1), 
                            getRandomInt(this.world.height - 1),
                            this.world.tileSize, monsterTable[getRandomInt(monsterTable.length)])
        })
    }

    spawnStairs() {
        let stairs = new Stairs(this.world.width - 10, this.world.height - 10, this.world.tileSize)
        this.world.add(stairs);
        this.world.moveToSpace(stairs);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random()*Math.floor(max))
}

export default Spawner;
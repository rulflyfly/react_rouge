import Entity from './Entity'
import Spawner from './Spawner'
import imgs from './Images'

const { portal } = imgs


class Stairs extends Entity {
    attr = { name: 'Stairs', img: portal, ascii: '>', offset: {x: 2, y: 3}}

    action(verb, world){
        if (verb === 'bump') {
            world.addToHistory('You move down the stairs...');
            world.createCellularMap();
            world.player.x = 0;
            world.player.y = 0;
            world.moveToSpace(world.player);
            world.entities = world.entities.filter(e  => e === world.player);
            let spawner = new Spawner(world);
            spawner.spawnLoot(10);
            spawner.spawnMonster(6);
            world.moveToSpace(world.entities);
            for (let i = 0; i < world.entities.length; i++) {
                let x = world.entities[i].x;
                let y = world.entities[i].y;
                if (world.worldmap[x][y] !== 0) {
                    world.entities.splice(i, 1)
                }
            }
            spawner.spawnStairs()
        }
    }
}

export default Stairs;
import React, {useRef, useEffect, useState} from 'react';
import InputManager from './InputManager';
import World from './World';
import Spawner from './Spawner';

const ReactRouge = ({width, height, tileSize}) => {

    const canvasRef = useRef()
    let inputManager = new InputManager();

    const [world, setWorld] = useState(new World(width, height, tileSize))

    const handleInput = (action, data) => {
        let newWorld = new World();
        Object.assign(newWorld, world);
        newWorld.movePlayer(data.x, data.y);
        setWorld(newWorld);
    }

    useEffect(() => {
        let newWorld = new World();
        Object.assign(newWorld, world);
        newWorld.createCellularMap();
        newWorld.moveToSpace(world.player);
        let spawner = new Spawner(newWorld);
        spawner.spawnLoot(10);
        spawner.spawnMonster(6);
        spawner.spawnStairs()
        for (let i = 0; i < newWorld.entities.length; i++) {
            let x = newWorld.entities[i].x;
            let y = newWorld.entities[i].y;
            if (newWorld.worldmap[x][y] !== 0) {
                console.log('not 0')
                newWorld.entities.splice(i, 1)
            }
        }
        setWorld(newWorld);
    }, [])

    useEffect(() => {
        inputManager.bindKeys()
        inputManager.subscribe(handleInput)
        return () => {
            inputManager.unbindKeys()
            inputManager.unsubscribe(handleInput)
        }
    })

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, width*tileSize, height*tileSize)
        world.draw(ctx)
    })
    return (
        <div>
            <canvas 
                ref={canvasRef}
                width={width*tileSize} 
                height={height*tileSize}
                style={{background: 'DimGrey'}}>
             </canvas>
             <ul>
                 {world.player.inventory.map((item, index) =>{
                     return (
                         <li key={index}>{item.attr.name}</li>
                     )
                 })}
             </ul>
             <ul>
                 {world.history.map((item, index) =>{
                     return (
                         <li key={index}>{item}</li>
                     )
                 })}
             </ul>
        </div>
    )
}
    

export default ReactRouge;
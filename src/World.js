import { Map } from 'rot-js'
import Player from './Player';
import imgs from './Images';

const { tree } = imgs

class World {
    constructor (width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.entities = [new Player(0, 0, 16)];
        this.history = ['You enter the dungeon', '---']
        this.worldmap = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            this.worldmap[i] = new Array(this.height)
        }
    }

    tree = {
        img: tree
    }

    get player() {
        return this.entities[0]
    }

    add(entity){
        this.entities.push(entity);
    }

    remove(entity){
        this.entities = this.entities.filter(e => e !== entity)
    }

    getEntityAtLocation(x, y){
        return this.entities.find(entity => entity.x === x && entity.y === y)
    }

    moveToSpace(entity){
        for (let i = entity.x; i < this.width; i++) {
            for (let j = entity.y; j < this.height; j++) {
                if (this.worldmap[i][j] === 0 && !this.getEntityAtLocation(i, j)) {
                    entity.x = i;
                    entity.y = j;
                    return;
                } 
            }
        }
    }

    isWall(x, y) {
        return (
            this.worldmap[x] === undefined ||
            this.worldmap[y] === undefined ||
            this.worldmap[x][y] ===1
        )
    }

    movePlayer(dx, dy, action) {
        if (action === 'move-right') {
            this.player.attr.move_right = true
            this.player.attr.move_left = false
        } else if (action === 'move-left') {
            this.player.attr.move_right = false
            this.player.attr.move_left = true
        }
        let tempPlayer = this.player.copyPlayer();
        tempPlayer.move(dx, dy);
        let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);

        if(entity) {
            entity.action('bump', this)
            return;
        }

        if (this.isWall(tempPlayer.x, tempPlayer.y)) {
            console.log("wall, can't move")
        } else {
            this.player.move(dx, dy)
        }
    }

    createCellularMap(){
        const map = new Map.Cellular(this.width, this.height, {connected: true})
        map.randomize(0.5)
        const userCallback = (x, y, val) => {
            if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
                this.worldmap[x][y] = 1;
                return;
            }
            this.worldmap[x][y] = (val === 0) ? 1 : 0
        }
        map.create(userCallback);
        map.connect(userCallback, 1)
    }

    draw(ctx) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.worldmap[i][j] === 1) this.drawWall(ctx, i, j)
            }
        }
        this.entities.forEach(entity => {
            entity.draw(ctx)
        })

    }

    drawWall(ctx, x, y) {
        //ctx.fillStyle = 'transparent';
        //ctx.fillRect(x * this.tileSize + 2, y * this.tileSize + 2, this.tileSize-4, this.tileSize-4)
        ctx.drawImage(this.tree.img, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
    }

    addToHistory(history){
        if (this.history.length > 6) this.history.shift()
        this.history.push(history)
    }
}

export default World;
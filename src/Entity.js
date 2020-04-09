class Entity {
    constructor(x, y, size, attr) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.attr = {...attr}
    }

    action(verb, world){
        console.log(`Verb: ${verb}`)
    }

    draw(ctx) {
        ctx.fillStyle = 'transparent';
        ctx.textBaseline = 'hanging';
        ctx.font = '16px Helvetica';
        ctx.fillText(this.attr.ascii, 
            this.x * this.size + (this.attr.offset ? this.attr.offset.x : 0), 
            this.y * this.size + (this.attr.offset ? this.attr.offset.y : 0))
       if (this.attr.img && this.attr.name !== 'Stairs') {
            if (this.attr.move_right) {
                ctx.drawImage(this.attr.img, 
                this.x * this.size + (this.attr.offset ? this.attr.offset.x : 0), 
                this.y * this.size + (this.attr.offset ? this.attr.offset.y : 0), 16, 16)
            } else if (this.attr.move_left) {
                ctx.drawImage(this.attr.img_left, 
                this.x * this.size + (this.attr.offset ? this.attr.offset.x : 0), 
                this.y * this.size + (this.attr.offset ? this.attr.offset.y : 0), 16, 16)
            } else {
                ctx.drawImage(this.attr.img, 
                this.x * this.size + (this.attr.offset ? this.attr.offset.x : 0), 
                this.y * this.size + (this.attr.offset ? this.attr.offset.y : 0), 16, 16)
            }
       } else {
            ctx.drawImage(this.attr.img, 
            this.x * this.size + (this.attr.offset ? this.attr.offset.x : 0), 
            this.y * this.size + (this.attr.offset ? this.attr.offset.y : 0), 24, 24)
       }
    }
}

export default Entity;
// Boundary tile

export class Boundary {
    static width = 40
    static height = 40
    
    constructor({position}){
        this.position = position
        this.width = 32
        this.height = 32
    }

    render(canvasObj){
        canvasObj.fillStyle = 'red'
        canvasObj.fillRect(this.position.x,this.position.y,this.width,this.height)
        //console.log("rendered boundary")
    }
}

// Background object

export class BackgroundSprite {
    constructor({position, image}){
        this.position = position
        this.image = image
        this.image.onload = () => {
            this.width = this.image.width
            this.height = this.image.height
        }
    }

    render(canvasObj){
        canvasObj.drawImage(this.image, this.position.x, this.position.y)
        //console.log("rendered background")
    }
}

// Player object

export class PlayerSprite {
    constructor({position, cropIndex, image, frames = {max:1}}){
        this.position = position
        this.cropIndex = cropIndex
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.cropIndex.dw
            this.height = this.cropIndex.dh
        }
    }

    render(canvasObj){
        canvasObj.drawImage(
            this.image,
            this.cropIndex.sx,
            this.cropIndex.sy,
            this.cropIndex.sw / this.frames.max,
            this.cropIndex.sh,
            this.position.x,
            this.position.y,
            this.cropIndex.dw / this.frames.max,
            this.cropIndex.dh
        )
        //console.log("rendered player")
    }
}
// Boundary tile

export class Boundary {
    static width = 16
    static height = 16
    
    constructor({position}){
        this.position = position
        this.width = 16
        this.height = 16
    }

    render(canvasObj){
        canvasObj.fillStyle = 'rgba(255,0,0,0.1)'
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
    constructor({position, cropIndex, image, frame}){
        this.position = position
        this.cropIndex = cropIndex
        this.image = image
        this.frame = frame%4
        this.image.onload = () => {
            this.width = this.cropIndex.dw
            this.height = this.cropIndex.dh
        }
    }

    render(canvasObj){
        canvasObj.drawImage(
            this.image,
            this.cropIndex.sx + this.cropIndex.sw*this.frame,
            this.cropIndex.sy,
            this.cropIndex.sw,
            this.cropIndex.sh,
            this.position.x,
            this.position.y,
            this.cropIndex.dw,
            this.cropIndex.dh
        )
        //console.log("rendered player")
    }
}
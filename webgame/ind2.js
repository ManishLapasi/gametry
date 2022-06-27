const canvas = document.querySelector('canvas');

const c = canvas.getContext("2d");

canvas.width = 880
canvas.height = 480

const offset = {
    x: -500,
    y: -600
}

tileSize = 16
movementSize = 5
console.log(c);

console.log(collisionArray)

let mapWidth = 55
let mapHeight = 30

const collisionsMap = []
for(let i=0;i<collisionArray.length;i+=mapWidth){
    collisionsMap.push(collisionArray.slice(i,i+mapWidth))
}
console.log(collisionsMap)

class Boundary {
    static width = 78.5
    static height = 78.5
    
    constructor({position}){
        this.position = position
        this.width = Boundary.width
        this.height = Boundary.height
    }

    render(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

const boundaries = []

collisionsMap.forEach(
    (row,i) => {
        row.forEach(
            (symbol,j) => {
                if(symbol===767){
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j*Boundary.width + offset.x,
                                y: i*Boundary.height + offset.y
                            }
                        })
                    )
                }
            }
        )
    }
)

console.log(boundaries)

const mapImage = new Image()
mapImage.src = './img/MapAsset.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

class backgroundSprite {
    constructor({position, image}){
        this.position = position
        this.image = image
    }

    render(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class playerSprite {
    constructor({position, cropIndex, image, frames = {max:1}}){
        this.position = position
        this.cropIndex = cropIndex
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / frames.max
            this.height = this.image.height
        }
    }

    render(){
        c.drawImage(
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
    }
}

const background = new backgroundSprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image: mapImage
})

const player = new playerSprite({
    position:{
        x: canvas.width/2+playerImage.width/5,
        y: canvas.height/2+playerImage.height/2
    },
    cropIndex:{
        sx: 0,
        sy: 0,
        sw: 192/4,
        sh: 68,
        dw: 192/4,
        dh: 68
    },
    image: playerImage
})

const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

function collision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
}

const movables = [background, ...boundaries]

function animate(){
    window.requestAnimationFrame(animate)
    background.render()
    boundaries.forEach(boundary => {
        boundary.render()
    })
    player.render()
    let moving = true
    if (keys.ArrowDown.pressed && lastKey=='ArrowDown') {
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(collision(
                {
                    rectangle1:player, rectangle2: {...boundary, 
                        position:{
                            x: boundary.x,
                            y: boundary.y - movementSize
                        }
                    }
                }
                )
                ){
                moving = false
                console.log("colliding")
                break
            }
        }
        if(moving){
            movables.forEach(movable => {
                movable.position.y -= movementSize
            })
        }
    }
    if (keys.ArrowUp.pressed && lastKey=='ArrowUp') {
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(collision({rectangle1:player, rectangle2:{...boundary, position:{
                x: boundary.x,
                y: boundary.y + movementSize
            }}})
            ){
                moving = false
                console.log("colliding")
                break
            }
        }
        if(moving){
            movables.forEach(movable => {
                movable.position.y += movementSize
            })
        }
    }
    if (keys.ArrowRight.pressed && lastKey=='ArrowRight') {
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(collision({rectangle1:player, rectangle2:{...boundary, position:{
                x: boundary.x - movementSize,
                y: boundary.y
            }}})
            ){
                moving = false
                console.log("colliding")
                break
            }
        }
        if(moving){
            movables.forEach(movable => {
                movable.position.x -= movementSize
            })
        }
    }
    if (keys.ArrowLeft.pressed && lastKey=='ArrowLeft') {
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(collision({rectangle1:player, rectangle2:{...boundary, position:{
                x: boundary.x + movementSize,
                y: boundary.y
            }}})
            ){
                moving = false
                console.log("colliding")
                break
            }
        }
        if(moving){
            movables.forEach(movable => {
                movable.position.x += movementSize
            })
        }
    }
    console.log(moving)
}

animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowDown':
            lastKey = 'ArrowDown'
            keys.ArrowDown.pressed = true
            break;
        case 'ArrowLeft':
            lastKey = 'ArrowLeft'
            keys.ArrowLeft.pressed = true
            break;
        case 'ArrowRight':
            lastKey = 'ArrowRight'
            keys.ArrowRight.pressed = true
            break;
        case 'ArrowUp':
            lastKey = 'ArrowUp'
            keys.ArrowUp.pressed = true
            break;    
        default:
            console.log(e.key)    
        break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break;    
        default:
            console.log(e.key)    
        break;
    }
})
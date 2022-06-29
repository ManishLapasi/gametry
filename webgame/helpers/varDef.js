
export const zoomLevel = 2.5

export const mapWidth = 80
export const mapHeight = 50

export const tileSize = 16
export const movementSize = 10

export const canvasWidth = mapWidth*tileSize
export const canvasHeight = mapHeight*tileSize

export const offset = {
    x: 0,
    y: 0
}

export const cropIndex = {
        sx: 0,
        sy: 0,
        sw: 48,
        sh: 68,
        dw: tileSize*zoomLevel,
        dh: tileSize*zoomLevel
    }

export var keys = {
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

export var lastkey = ''

export const mapImage = new Image()
mapImage.src = './img/newLand.png'

export const fgImage = new Image()
fgImage.src = './img/foreground.png'

export const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

export const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

export const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

export const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'
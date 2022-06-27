
export const zoomLevel = 2.5

export const canvasWidth = 1200
export const canvasHeight = 900

export const offset = {
    x: 0,
    y: 0
}

export const tileSize = 16
export const movementSize = 3

export const mapWidth = 55
export const mapHeight = 30

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
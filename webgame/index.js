import * as functionDefs from './helpers/functionDef.js'
import * as vars from './helpers/varDef.js'
import * as classDefs from './helpers/classDef.js'
import {collisionArray} from './layersData/collisionArray.js'

const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
canvas.width = vars.canvasWidth
canvas.height = vars.canvasHeight

const mapImage = vars.mapImage

const fgImage = vars.fgImage

const playerDownImage = vars.playerDownImage

const playerUpImage = vars.playerUpImage

const playerLeftImage = vars.playerLeftImage

const playerRightImage = vars.playerRightImage

const background = new classDefs.BackgroundSprite({
    position:vars.offset,
    image: mapImage
})

const foreground = new classDefs.BackgroundSprite({
    position:vars.offset,
    image: fgImage
})

const player = new classDefs.PlayerSprite({
    position:{
        x: vars.offset.x + 10,
        y: vars.offset.y + 10
    },
    cropIndex:vars.cropIndex,
    frame: 0,
    image: playerDownImage
})

const collisionsMap = functionDefs.formCollisionsMap(collisionArray, vars.mapWidth)

const boundaries = functionDefs.formBoundaryTileMap(collisionsMap, vars.offset, classDefs.Boundary)

var keys = vars.keys
var lastkey = vars.lastkey

const movables = [player]

function collision({rectangle1, rectangle2}){
    var val = (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
    console.log(val)
    if(val){
        console.log(rectangle1, rectangle2, "collision")
    }
    return val
}

function checkMapBoundaryCollision(player, delX, delY, xMax, yMax){
    return ((player.position.x + delX ) > 0 && (player.position.x + 4*delX ) < xMax &&
            (player.position.y + delY ) > 0 && (player.position.y + 4*delY ) < yMax)
}

function setMovement(boundaries, player, delX, delY){
    for(let i=0;i<boundaries.length;i++){
        var boundary = boundaries[i]
            if(collision({rectangle1:boundary, rectangle2: {...player,position:{
                x: player.position.x + delX,
                y: player.position.y + delY
            }}})){
                console.log("colliding")
                return false
            }
    }
    return checkMapBoundaryCollision(player, delX, delY, vars.canvasWidth, vars.canvasHeight)
}

function animate(){
    window.requestAnimationFrame(animate)
    background.render(c)
    boundaries.forEach(boundary => {
        boundary.render(c)
    })
    player.render(c)
    foreground.render(c)
    let moving = true
    if (keys.ArrowDown.pressed && lastkey=='ArrowDown') {
        moving = setMovement(boundaries, player, 0, +vars.movementSize)
        player.frame = (player.frame+1)%4
        player.image = playerDownImage
        if(moving){
            movables.forEach(movable => {
                movable.position.y += vars.movementSize
            })
        }
    }
    else if (keys.ArrowUp.pressed && lastkey=='ArrowUp') {
        moving = setMovement(boundaries, player, 0, -vars.movementSize)
        player.frame = (player.frame+1)%4
        player.image = playerUpImage
        if(moving){
            movables.forEach(movable => {
                movable.position.y -= vars.movementSize
            })
        }
    }
    else if (keys.ArrowRight.pressed && lastkey=='ArrowRight') {
        moving = setMovement(boundaries, player, +vars.movementSize, 0)
        player.frame = (player.frame+1)%4
        player.image = playerRightImage
            if(moving){
            movables.forEach(movable => {
                movable.position.x += vars.movementSize
            })
        }
    }
    else if (keys.ArrowLeft.pressed && lastkey=='ArrowLeft') {
        moving = setMovement(boundaries, player, -vars.movementSize, 0)
        player.frame = (player.frame+1)%4
        player.image = playerLeftImage
            if(moving){
            movables.forEach(movable => {
                movable.position.x -= vars.movementSize
            })
        }
    }
    else{
        player.frame = 0
    }

}

animate()

window.addEventListener('keydown', (e) => {
    [keys, lastkey] = functionDefs.updateKeyStates(keys,lastkey,e,true)
})

window.addEventListener('keyup', (e) => {
    [keys, lastkey] = functionDefs.updateKeyStates(keys,lastkey,e,false)
})
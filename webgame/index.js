import * as functionDefs from './helpers/functionDef.js'
import * as vars from './helpers/varDef.js'
import * as classDefs from './helpers/classDef.js'
import {collisionArray} from './layersData/collisionArray.js'

const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
canvas.width = vars.canvasWidth
canvas.height = vars.canvasHeight
console.log(c)

console.log(vars.offset)

console.log(vars.tileSize)

const mapImage = new Image()
mapImage.src = './img/MapAsset2.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

console.log(collisionArray)

const background = new classDefs.BackgroundSprite({
    position:vars.offset,
    image: mapImage
})

console.log(background)

const player = new classDefs.PlayerSprite({
    position:{
        x:vars.canvasWidth/2 + 100,
        y:vars.canvasHeight/2 - 10
    },
    cropIndex:vars.cropIndex,
    image: playerImage
})

console.log(player)

const collisionsMap = functionDefs.formCollisionsMap(collisionArray, vars.mapWidth)

console.log(collisionsMap)

const boundaries = functionDefs.formBoundaryTileMap(collisionsMap, vars.offset, classDefs.Boundary)

console.log(boundaries)

var keys = vars.keys
var lastkey = vars.lastkey

const movables = [background, ...boundaries]

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

function setMovement(boundaries, player, delX, delY){
    for(let i=0;i<boundaries.length;i++){
        var boundary = boundaries[i]
            if(collision({rectangle1:player, rectangle2: {...boundary,position:{
                x: boundary.position.x + delX,
                y: boundary.position.y + delY
            }}})){
                console.log("colliding")
                return false
            }
    }
    return true
}

function animate(){
    window.requestAnimationFrame(animate)
    background.render(c)
    boundaries.forEach(boundary => {
        boundary.render(c)
    })
    player.render(c)
    let moving = true
    if (keys.ArrowDown.pressed && keys.lastKey=='ArrowDown') {
        moving = setMovement(boundaries, player, 0, -vars.movementSize)
        console.log(keys.lastKey, moving)
        if(moving){
            movables.forEach(movable => {
                movable.position.y -= vars.movementSize
            })
        }
    }
    if (keys.ArrowUp.pressed && keys.lastKey=='ArrowUp') {
        moving = setMovement(boundaries, player, 0, vars.movementSize)
        console.log(keys.lastKey, moving)
        if(moving){
            movables.forEach(movable => {
                movable.position.y += vars.movementSize
            })
        }
    }
    if (keys.ArrowRight.pressed && keys.lastKey=='ArrowRight') {
        moving = setMovement(boundaries, player, -vars.movementSize, 0)
        console.log(keys.lastKey, moving)
        if(moving){
            movables.forEach(movable => {
                movable.position.x -= vars.movementSize
            })
        }
    }
    if (keys.ArrowLeft.pressed && keys.lastKey=='ArrowLeft') {
        moving = setMovement(boundaries, player, +vars.movementSize, 0)
        console.log(keys.lastKey, moving)
        if(moving){
            movables.forEach(movable => {
                movable.position.x += vars.movementSize
            })
        }
    }
}

animate()

window.addEventListener('keydown', (e) => {
    [keys, lastkey] = functionDefs.updateKeyStates(keys,lastkey,e,true)
})

window.addEventListener('keyup', (e) => {
    [keys, lastkey] = functionDefs.updateKeyStates(keys,lastkey,e,false)
})
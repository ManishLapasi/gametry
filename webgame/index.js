import * as functionDefs from './helpers/functionDef.js'
import * as vars from './helpers/varDef.js'
import * as classDefs from './helpers/classDef.js'
import {collisionArray, doorArray, nextMapArray} from './layersData/interactionTilesArray.js'

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
const boundaries = functionDefs.formBoundaryTileMap(collisionsMap, vars.offset, classDefs.Boundary, 7873)

const doorMap = functionDefs.formCollisionsMap(doorArray, vars.mapWidth)
const doors = functionDefs.formBoundaryTileMap(doorMap, vars.offset, classDefs.Boundary, 7874)

const nextAreaMap = functionDefs.formCollisionsMap(nextMapArray, vars.mapWidth)
const nextAreas = functionDefs.formBoundaryTileMap(nextAreaMap, vars.offset, classDefs.Boundary, 7875)

var keys = vars.keys
var lastkey = vars.lastkey

const movables = [player]
console.log(boundaries, doors, nextAreas)

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
        moving = functionDefs.setMovement(boundaries, player, 0, +vars.movementSize, vars.canvasWidth, vars.canvasHeight)
        if(keys.ArrowDown.count%vars.framerate==0) player.frame = (player.frame+1)%4
        player.image = playerDownImage
        if(moving){
            movables.forEach(movable => {
                movable.position.y += vars.movementSize
            })
        }
    }
    else if (keys.ArrowUp.pressed && lastkey=='ArrowUp') {
        moving = functionDefs.setMovement(boundaries, player, 0, -vars.movementSize, vars.canvasWidth, vars.canvasHeight)
        if(keys.ArrowUp.count%vars.framerate==0) player.frame = (player.frame+1)%4
        player.image = playerUpImage
        if(moving){
            movables.forEach(movable => {
                movable.position.y -= vars.movementSize
            })
        }
    }
    else if (keys.ArrowRight.pressed && lastkey=='ArrowRight') {
        moving = functionDefs.setMovement(boundaries, player, +vars.movementSize, 0, vars.canvasWidth, vars.canvasHeight)
        if(keys.ArrowRight.count%vars.framerate==0) player.frame = (player.frame+1)%4
        player.image = playerRightImage
            if(moving){
            movables.forEach(movable => {
                movable.position.x += vars.movementSize
            })
        }
    }
    else if (keys.ArrowLeft.pressed && lastkey=='ArrowLeft') {
        moving = functionDefs.setMovement(boundaries, player, -vars.movementSize, 0, vars.canvasWidth, vars.canvasHeight)
        if(keys.ArrowLeft.count%vars.framerate==0) player.frame = (player.frame+1)%4
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
    if(player.image == playerRightImage){
        var nextArea = functionDefs.checkNextArea(player.position,nextAreas,vars.tileSize)
        if(nextArea) console.log("next Area tile")
        
    }
}

animate()

window.addEventListener('keydown', (e) => {
    [keys, lastkey] = functionDefs.updateKeyStates(keys,lastkey,e,true)
})

window.addEventListener('keyup', (e) => {
    [keys, lastkey] = functionDefs.updateKeyStates(keys,lastkey,e,false)
})
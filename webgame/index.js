import * as functionDefs from './helpers/functionDef.js'
import * as vars from './helpers/varDef.js'
import * as classDefs from './helpers/classDef.js'
import {collisionArray, doorArray, nextMapArray} from './layersData/interactionTilesArray.js'

const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
canvas.width = vars.canvasWidth
canvas.height = vars.canvasHeight

const background = new classDefs.BackgroundSprite({
    position:vars.offset,
    image: vars.mapImage
})

const foreground = new classDefs.BackgroundSprite({
    position:vars.offset,
    image: vars.fgImage
})

const player = new classDefs.PlayerSprite({
    position:{
        x: vars.offset.x + 10,
        y: vars.offset.y + 10
    },
    cropIndex:vars.cropIndex,
    frame: 0,
    image: vars.playerDownImage
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
        player.image = vars.playerDownImage
        if(moving){
            movables.forEach(movable => {
                movable.position.y += vars.movementSize
            })
        }
    }
    else if (keys.ArrowUp.pressed && lastkey=='ArrowUp') {
        moving = functionDefs.setMovement(boundaries, player, 0, -vars.movementSize, vars.canvasWidth, vars.canvasHeight)
        if(keys.ArrowUp.count%vars.framerate==0) player.frame = (player.frame+1)%4
        player.image = vars.playerUpImage
        if(moving){
            movables.forEach(movable => {
                movable.position.y -= vars.movementSize
            })
        }
    }
    else if (keys.ArrowRight.pressed && lastkey=='ArrowRight') {
        moving = functionDefs.setMovement(boundaries, player, +vars.movementSize, 0, vars.canvasWidth, vars.canvasHeight)
        if(keys.ArrowRight.count%vars.framerate==0) player.frame = (player.frame+1)%4
        player.image = vars.playerRightImage
            if(moving){
            movables.forEach(movable => {
                movable.position.x += vars.movementSize
            })
        }
    }
    else if (keys.ArrowLeft.pressed && lastkey=='ArrowLeft') {
        moving = functionDefs.setMovement(boundaries, player, -vars.movementSize, 0, vars.canvasWidth, vars.canvasHeight)
        if(keys.ArrowLeft.count%vars.framerate==0) player.frame = (player.frame+1)%4
        player.image = vars.playerLeftImage
            if(moving){
            movables.forEach(movable => {
                movable.position.x -= vars.movementSize
            })
        }
    }
    else{
        player.frame = 0
    }
    if(player.image == vars.playerRightImage){
        var nextArea = functionDefs.checkNextArea(player.position,nextAreas,vars.tileSize)
        if(nextArea && lastkey=='Enter') {
            console.log("next Area tile")
            player.position.x = vars.tileSize
            background.image = vars.mapImage
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

window.addEventListener('keypress', (e) => {
    if(e.key=="Enter"){
        var content = document.getElementById("textBox")
        if (content.style.display=="none") {
            console.log("set to block")
            document.getElementById("textBox").style.display="block"
        }
        else {
            console.log("set to none")
            document.getElementById("textBox").style.display="none"
        }
    }
})
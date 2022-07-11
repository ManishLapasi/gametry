// form collision map

export function formCollisionsMap(collisionArray, mapWidth){
    const collisionsMap = []
    for(let i=0;i<collisionArray.length;i+=mapWidth){
        collisionsMap.push(collisionArray.slice(i,i+mapWidth))
    }
    return collisionsMap
}


// form boundary tile-map

export function formBoundaryTileMap(collisionsMap, offset, Boundary, indicator){
    const boundaries = []
    collisionsMap.forEach(
        (row,i) => {
            row.forEach(
                (symbol,j) => {
                    if(symbol===indicator){
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
    return boundaries
}



// keep player within map bounds

export function checkMapBoundaryCollision(player, delX, delY, xMax, yMax){
    return ((player.position.x + delX ) > 0 && (player.position.x + 15*delX ) < xMax &&
            (player.position.y + delY ) > 0 && (player.position.y + 15*delY ) < yMax)
}

// check collision between two tiles

export function collision({rectangle1, rectangle2}){
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

// set playerMovement, true if allowed and false if not

export function setMovement(boundaries, player, delX, delY, cw, ch){
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
    return checkMapBoundaryCollision(player, delX, delY, cw, ch)
}

// update keys when they are pressed and unpressed

export function updateKeyStates(keys, lastkey, e, boolVal) {
    console.log(e.key) 
    switch (e.key) {
        case 'ArrowDown':
            if(lastkey == 'ArrowDown'){
                keys.ArrowDown.count += 1
            }
            else{
                keys.ArrowDown.count = 0
            }
            if (boolVal){
                lastkey = 'ArrowDown'
            }
            keys.ArrowDown.pressed = boolVal
            break;
        case 'ArrowLeft':
            if(lastkey == 'ArrowLeft'){
                keys.ArrowLeft.count += 1
            }
            else{
                keys.ArrowLeft.count = 0
            }
            if (boolVal){
                lastkey = 'ArrowLeft'
            }
            keys.ArrowLeft.pressed = boolVal
            break;
        case 'ArrowRight':
            if(lastkey == 'ArrowRight'){
                keys.ArrowRight.count += 1
            }
            else{
                keys.ArrowRight.count = 0
            }
            if (boolVal){
                lastkey = 'ArrowRight'
            }
            keys.ArrowRight.pressed = boolVal
            break;
        case 'ArrowUp':
            if(lastkey == 'ArrowUp'){
                keys.ArrowUp.count += 1
            }
            else{
                keys.ArrowUp.count = 0
            }
            if (boolVal){
                lastkey = 'ArrowUp'
            }
            keys.ArrowUp.pressed = boolVal
            break;    
        case 'Enter':
            lastkey = 'Enter'
        default:
            console.log(e.key)    
        break;
    }
    return [keys, lastkey]
}

export function checkNextArea(position, nextAreas, tileSize) {
    let nextArea = false
    for(let i=0;i<nextAreas.length;i++){
        if (Math.abs(position.x-nextAreas[i].position.x) < 2*tileSize && Math.abs(position.y-nextAreas[i].position.y) < 2*tileSize){
            nextArea = true
            break
        }
    }
    return nextArea
}
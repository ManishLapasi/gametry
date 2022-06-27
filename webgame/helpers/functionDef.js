// form collision map

function formCollisionsMap(collisionArray, mapWidth){
    const collisionsMap = []
    for(let i=0;i<collisionArray.length;i+=mapWidth){
        collisionsMap.push(collisionArray.slice(i,i+mapWidth))
    }
    return collisionsMap
}


// form boundary tile-map

export function formBoundaryTileMap(collisionsMap, offset, Boundary){
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
    return boundaries
}

// update keys when they are pressed and unpressed

export function updateKeyStates(keys, lastkey, e, boolVal) {
    switch (e.key) {
        case 'ArrowDown':
            if (boolVal){
                keys.lastKey = 'ArrowDown'
            }
            keys.ArrowDown.pressed = boolVal
            break;
        case 'ArrowLeft':
            if (boolVal){
                keys.lastKey = 'ArrowLeft'
            }
            keys.ArrowLeft.pressed = boolVal
            break;
        case 'ArrowRight':
            if (boolVal){
                keys.lastKey = 'ArrowRight'
            }
            keys.ArrowRight.pressed = boolVal
            break;
        case 'ArrowUp':
            if (boolVal){
                keys.lastKey = 'ArrowUp'
            }
            keys.ArrowUp.pressed = boolVal
            break;    
        default:
            console.log(e.key)    
        break;
    }
    return [keys, lastkey]
}

export {formCollisionsMap}

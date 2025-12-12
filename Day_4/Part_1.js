import {pad2dArray, stringTo2dArray} from "../sharedFunctions.js";

const input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

const PAPER = '@'
const paddedGrid = pad2dArray(stringTo2dArray(input), 'X')

const canAccess = (y, x) => {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    let count = 0;
    for (const direction of directions) {
        if (paddedGrid[y + direction[0]][x + direction[1]] === PAPER) count++
    }
    return count < 4
}

let count = 0

for ( let y = 0; y < paddedGrid.length; y++) {
    for ( let x = 0; x < paddedGrid[0].length; x++) {
        if (paddedGrid[y][x] === PAPER) {
            if (canAccess(y, x)) {
                count++
            }
        }
    }
}

console.log(count)
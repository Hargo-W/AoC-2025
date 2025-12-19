import {getCharCoords, pad2dArray, stringTo2dArray} from "../sharedFunctions.js";

const input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

const grid = pad2dArray(stringTo2dArray(input), 'X')

const startPoint = getCharCoords('S', grid)

let splitCount = 0

const beams = new Set

const moveBeam = (position) => {
    const nextCoords = [position[0] + 1, position[1]]
    const nextChar = grid[nextCoords[0]][nextCoords[1]]
    if (nextChar === 'X' || beams.has(position.toString())) return
    beams.add(position.toString())
    if (nextChar === '.') moveBeam(nextCoords)
    if (nextChar === '^') {
        splitCount++
        const goLeft = [nextCoords[0], nextCoords[1] - 1]
        const goRight = [nextCoords[0], nextCoords[1] + 1]
        moveBeam(goLeft)
        moveBeam(goRight)
    }
}

moveBeam(startPoint)

console.log(splitCount)
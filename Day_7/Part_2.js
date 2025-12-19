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

const paddedGrid = pad2dArray(stringTo2dArray(input), 'X')

const startPoint = getCharCoords('S', paddedGrid)

const splitterRealityCounts = new Map

const updateAllPreviousSplitterCounts = (path, amount) => {
    path.forEach( position => {
        const currentCount = splitterRealityCounts.get(position) || 0;
        splitterRealityCounts.set(position, currentCount + amount);
    })
}

const hasBeenMapped = new Set

const moveBeam = (position, path = []) => {
    const currentChar = paddedGrid[position[0]][position[1]]
    if (currentChar === 'X') return

    if (currentChar === '^') {
        const positionString = position.toString()

        if (hasBeenMapped.has(positionString)) {
            updateAllPreviousSplitterCounts(path, splitterRealityCounts.get(positionString))
            return
        }

        hasBeenMapped.add(positionString)
        path.push(positionString)
        updateAllPreviousSplitterCounts(path, 1)

        const leftCoords = [position[0] + 1, position[1] - 1]
        const rightCoords = [position[0] + 1, position[1] + 1]
        moveBeam(leftCoords, [...path])
        moveBeam(rightCoords, [...path])
        return
    }

    moveBeam([position[0] + 1, position[1]], [...path])
}

moveBeam(startPoint, [startPoint.toString()])

const finalCount = 1 + splitterRealityCounts.get(startPoint.toString())

console.log(finalCount)

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

const [freshRanges, ingredientIds] = input.split('\n\n').map(row => row.split('\n'))

const isFresh = (id) => {
    for (const range of freshRanges) {
        const [min, max] = range.split('-').map(Number)
        if (id >= min && id <= max) return true
    }
    return false
}

let count = 0

for (const id of ingredientIds) {
    if (isFresh(Number(id))) count++
}

console.log(count)
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

const [freshRanges, _] = input.split('\n\n').map(row => row.split('\n'))
const ranges = freshRanges.map(row => row.split('-').map(Number))

ranges.sort((a, b) => a[0] - b[0])


const merged = []

for (const [start, end] of ranges) {
    if (!merged.length || merged[merged.length - 1][1] < start - 1) {
        merged.push([start, end])
    } else {
        merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end)
    }
}

let sum = 0
for (const [start, end] of merged) {
    sum += end - start + 1
}
console.log(sum)
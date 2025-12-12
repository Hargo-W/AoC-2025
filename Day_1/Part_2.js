const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

const instructions = input.split('\n')

let dialPosition = 50
let zeroCount = 0

const moveDial = (instruction) => {
    const direction = instruction.slice(0, 1)
    const amount = Number(instruction.slice(1))

    if (direction === 'R') {
        for (let n = amount; n > 0; n--) {
            if (dialPosition === 0) zeroCount++
            dialPosition += 1
            if (dialPosition > 99) {
                dialPosition -= 100
            }
        }
    } else if (direction === 'L') {
        for (let n = amount; n > 0; n--) {
            if (dialPosition === 0) zeroCount++
            dialPosition -= 1
            if (dialPosition < 0) {
                dialPosition += 100
            }
        }
    }
}

for (const instruction of instructions) {
    moveDial(instruction)
}

console.log(zeroCount)
const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

const grid = input.split('\n').map(row => row.split(''))

const problems = []

let problemIndex = 0
for (let i = grid[0].length - 1; i >= 0; i--) {
    const numberArr = []
    let symbol = undefined
    for (let j = 0; j < grid.length; j++) {
        const currentChar = grid[j][i]
        if (currentChar === '+' || currentChar === '*') {
            symbol = currentChar
            break
        }
        if (currentChar !== ' ') numberArr.push(currentChar)
    }
    const number = numberArr.join().replace(/,/g, "")
    if (!number) continue

    if (!problems[problemIndex]) problems.push([number])
    else problems[problemIndex].push(number)

    if (symbol) {
        problems[problemIndex].push(symbol)
        problemIndex++
    }
}

let sum = 0
for (const problem of problems) {
    const symbol = problem.pop()
    let result = 0

    for (const num of problem) {
        const number = Number(num)
        if (symbol === '+') result += number
        else if (symbol === '*') {
            if (!result) result = number
            else result *= number
        }
    }

    sum += result
}

console.log(sum)
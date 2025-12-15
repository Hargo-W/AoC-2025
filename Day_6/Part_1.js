const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

const grid = input.split('\n').map(row => row.trim().split(/\s+/))
const problems = []

for (const row of grid) {
    for (let i = 0; i < row.length; i++) {
        if (!problems[i]) problems.push([row[i]])
        else problems[i].push(row[i])
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
const input = `987654321111111
811111111111119
234234234234278
818181911112111`

const banks = input.split('\n')

const getMaxJoltage = (bank) => {
    const bankArray = bank.split('')
    let maxJoltage = 0
    for (let i = 0; i < bankArray.length; i++) {
        const j1 = bankArray[i]

        for (let j = i + 1; j < bankArray.length; j++) {
            const j2 = bankArray[j]
            const joltage = Number(j1.toString() + j2.toString())
            if (joltage > maxJoltage) maxJoltage = joltage
        }
    }

    return maxJoltage
}

let sum = 0

for (const bank of banks) {
    sum += getMaxJoltage(bank)
}

console.log(sum)
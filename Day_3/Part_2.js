const input = `987654321111111
811111111111119
234234234234278
818181911112111`

const banks = input.split('\n')
const AMOUNT_OF_BATTERIES_ALLOWED = 12

const getIndexOfHighestNumber = (array) => {
    let max = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] > array[max]) max = i
    }
    return max
}

const getMaxJoltage = (bank) => {
    const bankArray = bank.split('').map(Number)
    const poweredBatteries = []
    let openSlots = AMOUNT_OF_BATTERIES_ALLOWED
    let currentIndex = 0

    while (openSlots > 0) {
        const possibleBatteries = bankArray.slice(currentIndex, bankArray.length - openSlots + 1)
        const strongestIndex = getIndexOfHighestNumber(possibleBatteries)
        const strongestBattery = possibleBatteries[strongestIndex]
        poweredBatteries.push(strongestBattery)
        currentIndex += strongestIndex + 1
        openSlots--
    }

    return Number(poweredBatteries.join().replace(/,/g, ""))
}

let sum = 0

for (const bank of banks) {
    sum += getMaxJoltage(bank)
}

console.log(sum)
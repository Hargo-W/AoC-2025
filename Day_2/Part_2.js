const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

const ranges = input.split(',')

let sum = 0

const isInvalidId = (id) => {
    const midPoint = Math.floor(id.length / 2);

    for (let n = midPoint; n > 0; n--) {
        let isValid = true
        const charArray = id.split('')
        const pattern = charArray.splice(0, n)
        while (charArray.length > 0) {
            const potentialPattern = charArray.splice(0, n)
            if(pattern.toString() !== potentialPattern.toString()) {
                isValid = false
            }
        }
        if (isValid === true) return true
    }

    return false
}

const checkForInvalidIds = (range) => {
    const [ firstId, lastId ] = range.split('-').map( id => Number(id))
    for (let id = firstId; id <= lastId; id++) {
        if (isInvalidId(id.toString())) sum += id
    }
}

for (const range of ranges) {
    checkForInvalidIds(range)
}

console.log(sum)
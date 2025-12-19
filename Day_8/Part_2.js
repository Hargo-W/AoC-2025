const input = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`

const boxes = input.split('\n').map(row => row.split(',').map(Number))

const getDistance = (box1, box2) => {
    const [p1, p2, p3] = box1
    const [q1, q2, q3] = box2
    return Math.sqrt(Math.pow(p1 - q1, 2) + Math.pow(p2 - q2, 2) + Math.pow(p3 - q3, 2))
}

const connectClosestBoxes = () => {
    const distancesAndBoxes = new Map

    for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            const box1 = boxes[i]
            const box2 = boxes[j]

            const distance = getDistance(box1, box2)
            distancesAndBoxes.set(distance, [box1.toString(), box2.toString()])
        }
    }

    return distancesAndBoxes
}

const circuits = []

const mergeCircuits = () => {
    for (let i = 0; i < circuits.length; i++) {
        let spliced = false
        for (const box of circuits[i]) {
            for (let j = i + 1; j < circuits.length; j++) {
                if (circuits[j].includes(box)) {
                    for (const newBox of circuits[j]) {
                        if (!circuits[i].includes(newBox)) circuits[i].push(newBox)
                    }
                    circuits.splice(j, 1)
                    spliced = true
                }
            }
        }
        if (spliced) i--
    }
}

const establishCircuits = (box1, box2) => {
    let makeNewCircuit = true
    for (const circuit of circuits) {
        if (circuit.includes(box1) && circuit.includes(box2)) {
            makeNewCircuit = false
        } else if (circuit.includes(box1)) {
            circuit.push(box2)
            makeNewCircuit = false
        } else if (circuit.includes(box2)) {
            circuit.push(box1)
            makeNewCircuit = false
        }
    }

    if (makeNewCircuit) circuits.push([box1, box2])
}

const connectedBoxesInOrder = [...connectClosestBoxes().entries()].sort((a, b) => a[0] - b[0]).map(distanceAndBox => distanceAndBox[1])

const allBoxesConnected = () => {
    if (circuits.length !== 1) return false
    const boxStrings = boxes.map(String)
    return boxStrings.every(box => circuits[0].includes(box))
}

for (const [box1, box2] of connectedBoxesInOrder) {
    establishCircuits(box1, box2)
    mergeCircuits()
    if (allBoxesConnected()) {
        const x1 = box1.split(',').map(Number)[0]
        const x2 = box2.split(',').map(Number)[0]
        console.log(x1 * x2)
        break
    }
}
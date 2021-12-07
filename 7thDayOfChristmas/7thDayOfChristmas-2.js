const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split(",").map(e => parseInt(e))
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

const calcFuelCost = (posArr, bestPos) => {
    let fuel = 0;
    posArr.forEach(pos => {
        const dist = Math.abs(pos - bestPos)
        fuel += dist*(dist+1)/2
    })
    return fuel;
}

let minFuelCost = {
    cost: calcFuelCost(inputData, inputData[0]),
    bestPos: 0
}
for (bestPos = 0; bestPos < Math.max(...inputData); bestPos++) {
    const fuelCost = calcFuelCost(inputData, bestPos)
    if (fuelCost < minFuelCost.cost) {
        minFuelCost.cost = fuelCost
        minFuelCost.bestPos = bestPos
    }
}
console.log(`Fuel Cost: ${JSON.stringify(minFuelCost)}`)
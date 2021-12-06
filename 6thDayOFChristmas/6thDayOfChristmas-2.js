const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split(",").map(e => parseInt(e))
    // fishCounts = [fish with count 0, fish with count 1, ... , fish with count 8]
    fishCounts = (new Array(9)).fill(0).map((e, i) => inputData.filter(e2 => e2 === i).length)
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

console.log(`Initial state: ${fishCounts}`)
for (day = 0; day < 256; day++) {
    newFishes = fishCounts[0]
    for (i = 0; i < fishCounts.length-1; i++) {
        fishCounts[i] = fishCounts[i+1]
    }
    fishCounts[fishCounts.length-1] = newFishes;
    fishCounts[6] += newFishes
    console.log(`After ${day+1} day(s): ${fishCounts}, Total: ${fishCounts.reduce((e, e2) => e+e2)}`)
}
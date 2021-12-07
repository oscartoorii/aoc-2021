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

const sortedData = inputData.sort(function(a, b) {
    return a - b;
  })
let median;
if (sortedData.length % 2 === 0) {
    median = Math.round((sortedData[(sortedData.length/2)-1] + sortedData[sortedData.length/2])/2)
} else {
    median = sortedData[Math.floor(sortedData.length/2)]
}
let fuelCost = 0;
sortedData.forEach(e => fuelCost += Math.abs(median - e))
console.log(`Fuel Cost: ${fuelCost}`)
const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map((e) => e.split("").map((e2) => parseInt(e2)))
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

gamma = []
for (col = 0; col < inputData[0].length; col++) {
    colSum = 0;
    for (row = 0; row < inputData.length; row++) {
        colSum += inputData[row][col]
    }
    gamma.push(colSum >= inputData.length/2 ? 1 : 0)
}
epsilon = gamma.map((e) => e === 1 ? 0 : 1)
gammaDec = parseInt(gamma.join(''), 2)
epsilonDec = parseInt(epsilon.join(''), 2)
powerConsumption = gammaDec * epsilonDec

console.log(`Gamma in binary: ${gamma.join('')}, Epsilon in binary: ${epsilon.join('')}`)
console.log(`Gamma in decimal: ${gammaDec}, Epsilon in decimal: ${epsilonDec}`)
console.log(`Power consumption: ${powerConsumption}`)
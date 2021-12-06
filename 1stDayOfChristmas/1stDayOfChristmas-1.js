const fs = require('fs')

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map((e) => parseInt(e))
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

let increaseCount = 0;
for (var i = 1; i < inputData.length; i++) {
    if (inputData[i] > inputData[i-1]) {
        increaseCount++;
    }
}

console.log(increaseCount)
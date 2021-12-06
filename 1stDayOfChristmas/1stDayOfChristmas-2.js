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

let windowData = []
for (var i = 1; i < inputData.length - 1; i++) {
    windowData.push(inputData[i-1]+inputData[i]+inputData[i+1])
}
console.log(windowData)

let increaseCount = 0;
for (var i = 1; i < windowData.length; i++) {
    if (windowData[i] > windowData[i-1]) {
        increaseCount++;
    }
}

console.log(increaseCount)
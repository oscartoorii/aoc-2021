const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map(e => e.split('').map(e2 => parseInt(e2)))
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

const setRisk = (numArr, middleNum) => {
    if (numArr.every(e => e > middleNum)) {
        totalRiskLevel += middleNum+1
    }
}

let totalRiskLevel = 0;
for (row = 0; row < inputData.length; row++) {
    for (col = 0; col < inputData[0].length; col++) {
        if (row === 0) {
            if (col === 0) {
                setRisk([inputData[row+1][col], inputData[row][col+1]], inputData[row][col])
            } else if (col === inputData[0].length-1) {
                setRisk([inputData[row+1][col], inputData[row][col-1]], inputData[row][col])
            } else {
                setRisk([inputData[row+1][col], inputData[row][col-1], inputData[row][col+1]], inputData[row][col])
            }
        } else if (row === inputData.length-1) {
            if (col === 0) {
                setRisk([inputData[row-1][col], inputData[row][col+1]], inputData[row][col])
            } else if (col === inputData[0].length-1) {
                setRisk([inputData[row-1][col], inputData[row][col-1]], inputData[row][col])
            } else {
                setRisk([inputData[row-1][col], inputData[row][col-1], inputData[row][col+1]], inputData[row][col])
            }
        } else{
            if (col === 0) {
                setRisk([inputData[row-1][col], inputData[row+1][col], inputData[row][col+1]], inputData[row][col])
            } else if (col === inputData[0].length-1) {
                setRisk([inputData[row-1][col], inputData[row+1][col], inputData[row][col-1]], inputData[row][col])
            } else {
                setRisk([inputData[row-1][col], inputData[row+1][col], inputData[row][col-1], inputData[row][col+1]], inputData[row][col])
            }
        }
    }
}
console.log(`Total Risk Level: ${totalRiskLevel}`)
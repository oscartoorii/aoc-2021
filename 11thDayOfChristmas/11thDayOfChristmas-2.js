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

// Returns surrounding positions as an array
const surroundingPos = (middlePos, inputData) => {
    let surrPosArr = []
    surrPosArr.push({ row: middlePos.row-1, col: middlePos.col-1})
    surrPosArr.push({ row: middlePos.row-1, col: middlePos.col})
    surrPosArr.push({ row: middlePos.row-1, col: middlePos.col+1})
    surrPosArr.push({ row: middlePos.row, col: middlePos.col+1})
    surrPosArr.push({ row: middlePos.row+1, col: middlePos.col+1})
    surrPosArr.push({ row: middlePos.row+1, col: middlePos.col})
    surrPosArr.push({ row: middlePos.row+1, col: middlePos.col-1})
    surrPosArr.push({ row: middlePos.row, col: middlePos.col-1})
    return surrPosArr.filter(e => e.row >= 0 && e.col >= 0 && e.row < inputData.length && e.col < inputData[0].length)
}

const STEP_ITER = 500;
for (step = 0; step < STEP_ITER; step++) {
    inputData = inputData.map(e => e.map(e2 => e2+1)) // Increase all energy lvl by 1
    while (inputData.some(e => !e.every(e2 => e2 <= 9))) { // Take "micro-steps" until no values are greater than 9
        for (row = 0; row < inputData.length; row++) {
            for (col = 0; col < inputData[0].length; col++) {
                if (inputData[row][col] > 9) {
                    surroundingPos({ row: row, col: col }, inputData).forEach(e => inputData[e.row][e.col] !== 0 ? inputData[e.row][e.col]++ : inputData[e.row][e.col]=0)
                    inputData[row][col] = 0
                }
            }
        }
    }
    if (inputData.every(e => e.every(e2 => e2 === 0))) {
        console.log(`First step when all octopuses flash: ${step+1}`)
        break;
    }
}
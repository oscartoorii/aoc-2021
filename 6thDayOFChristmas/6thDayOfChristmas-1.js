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

console.log(`Initial state: ${inputData}`)
let currentFishes;
for (day = 0; day < 18; day++) {
    currentFishes = inputData.length
    for (fish = 0; fish < currentFishes; fish++) {
        if (inputData[fish] === 0) {
            inputData[fish] = 6;
            inputData.push(8)
        } else {
            inputData[fish]--;
        }
    }
    console.log(`${inputData.length} fish after ${day+1} day(s)`)
}
const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map(e => e.split(" | ").map(e2 => e2.split(" "))).map(e3 => { return {
        unique: e3[0],
        output: e3[1]
    }})
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

const easyNumDigits = [2, 3, 4, 7]
const easyNumCount = inputData.reduce((total, num) => {
    return total + num.output.reduce((total2, num2) => {
        return total2 + (easyNumDigits.some(e => num2.length===e) ? 1 : 0)
    }, 0)
}, 0)
console.log(`Number of easy numbers: ${easyNumCount}`)
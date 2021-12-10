const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map(e => e.split(''))
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

for (row = 0; row < inputData.length; row++) {
    for (col = 0; col < inputData[0].length; col++) {
        if (row === 0) {
            if (col === 0) {
                
            } else if (col === inputData[0].length-1) {

            } else {
                
            }
        } else if (row === inputData.length-1) {
            if (col === 0) {

            } else if (col === inputData[0].length-1) {

            } else {
                
            }
        } else{
            if (col === 0) {

            } else if (col === inputData[0].length-1) {

            } else {
                
            }
        }
    }
}
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

const openingChars = ["(", "[", "{", "<"]
const illegalCharMap = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
}

let totalSyntaxErrorScore = 0;
for (line of inputData) {
    let stack = []
    for (char of line) {
        if (openingChars.includes(char)) {
            stack.push(char)
        } else if (Object.keys(illegalCharMap).includes(char)) {
            if (openingChars.indexOf(stack.slice(-1)[0]) === Object.keys(illegalCharMap).indexOf(char)) {
                stack.pop()
            } else {
                totalSyntaxErrorScore += Object.entries(illegalCharMap).filter(e => char === e[0])[0][1]
                break;
            }
        }
    }
}
console.log(`Total Syntax Error Score: ${totalSyntaxErrorScore}`)
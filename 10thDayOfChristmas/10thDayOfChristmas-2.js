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
const closingCharMap = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
}

let scores = []
for (line of inputData) {
    let stack = [], corrupted = false;
    for (char of line) {
        if (openingChars.includes(char)) {
            stack.push(char)
        } else if (Object.keys(closingCharMap).includes(char)) {
            if (openingChars.indexOf(stack.slice(-1)[0]) === Object.keys(closingCharMap).indexOf(char)) {
                stack.pop()
            } else {
                corrupted = true;
                break;
            }
        }
    }
    if (!corrupted) {
        console.log(stack)
        const score = stack.reverse().reduce((total, char) => total = 5*total + (openingChars.indexOf(char)+1), 0)
        scores.push(score)
    }
}
const middleScore = scores.sort((a, b) => a-b)[Math.floor(scores.length/2)]
console.log(`Middle score: ${middleScore}`)
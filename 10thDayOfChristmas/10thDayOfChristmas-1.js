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

const findIllegalChar = (line, charPos, openingChar) => {
    if (charPos >= line.length) {
        return 1;
    }
    if (openingChars.includes(line[charPos])) { // Indicates opening char
        return findIllegalChar(line, charPos+1, line[charPos])
    }
    (line[charPos] === Object.keys(illegalCharMap)[0]) ? openingChar === openingChar[0] : false
    (line[charPos] === Object.keys(illegalCharMap)[1]) ? openingChar === openingChar[1] : false
    (line[charPos] === Object.keys(illegalCharMap)[2]) ? openingChar === openingChar[2] : false
    (line[charPos] === Object.keys(illegalCharMap)[3]) ? openingChar === openingChar[3] : false
}

for (line of inputData) {

}
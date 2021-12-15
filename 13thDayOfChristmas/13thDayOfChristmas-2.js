const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").filter(e => e.includes(",")).map(e => e.split(',').map(e2 => parseInt(e2)))
    folds = data.split("\r\n").filter(e => e.includes("fold along")).map(e => e.split(" ")[2].split("="))
} catch (err) {
    console.error(err)
}
console.log(inputData)
console.log(folds)

/////////////////////// ANSWER ///////////////////////

const foldY = (coords, foldYPos) => { return (coords[1] > foldYPos) ? [coords[0], foldYPos-(coords[1]-foldYPos)] : coords }
const foldX = (coords, foldXPos) => { return (coords[0] > foldXPos) ? [foldXPos-(coords[0]-foldXPos), coords[1]] : coords }
for (fold of folds) {
    inputData = inputData.map(e => (fold[0]==="x") ? foldX(e, fold[1]) : foldY(e, fold[1]))
    inputData = Array.from(new Set(inputData.map(JSON.stringify)), JSON.parse)
}
const maxX = inputData.map(e => e[0]).sort((a,b)=>a-b).slice(-1)[0]
const maxY = inputData.map(e => e[1]).sort((a,b)=>a-b).slice(-1)[0]
for (y = 0; y <= maxY; y++) {
    for (x = 0; x <= maxX; x++) {
        inputData.some(e => e[0]===x && e[1]===y) ? process.stdout.write("#") : process.stdout.write(".")
    }
    console.log()
}
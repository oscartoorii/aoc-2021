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
inputData = inputData.map(e => (folds[0][0]==="x") ? foldX(e, folds[0][1]) : foldY(e, folds[0][1]))
console.log(`Visible dot count after 1 fold: ${Array.from(new Set(inputData.map(JSON.stringify)), JSON.parse).length}`)
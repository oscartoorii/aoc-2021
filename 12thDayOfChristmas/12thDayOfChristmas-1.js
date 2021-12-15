const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map(e => e.split('-'))
    const allVals = (targetVal) => {
        let valArr = []
        for (val of inputData) {
            if (val[0] === targetVal) { valArr.push(val[1]) }
            else if (val[1] === targetVal) { valArr.push(val[0]) }
        }
        return valArr
    }
    inputData = inputData.reduce((total, e) => total.concat(e[0], e[1]), []).reduce((total, e) => ({ ...total, [e]: allVals(e)}), {})
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

let paths = []
const recursivePathFinder = (currentPath, newNode) => {
    if (newNode === "end") {
        paths.push(currentPath.concat([newNode]))
        return;
    }
    for (possibleNode of inputData[newNode]) {
        // Try searching path if new possible node is uppercase or unexplored lowercase
        if (possibleNode.toUpperCase()===possibleNode || !currentPath.includes(possibleNode)) {
            recursivePathFinder(currentPath.concat([newNode]), possibleNode)
        }
    }
}

recursivePathFinder([], "start")
console.log(`Number of paths: ${paths.length}`)
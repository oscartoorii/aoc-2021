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
    for (possibleNode of inputData[newNode].filter(e => e !== "start")) {
        // Try searching path if new possible node is uppercase or lowercase explored less than twice
        let lowerCasesPath = currentPath.filter(e => e!==e.toUpperCase())
        if (possibleNode.toUpperCase()===possibleNode) {
            recursivePathFinder(currentPath.concat([newNode]), possibleNode)
        } else if ((new Set(lowerCasesPath.concat([newNode]))).size === lowerCasesPath.concat([newNode]).length) { // No lowercase duplicates
            recursivePathFinder(currentPath.concat([newNode]), possibleNode)
        } else if (!currentPath.includes(possibleNode)) { // Are lowercase duplicates
            recursivePathFinder(currentPath.concat([newNode]), possibleNode)
        }
    }
}

recursivePathFinder([], "start")
console.log(`Number of paths: ${paths.length}`)
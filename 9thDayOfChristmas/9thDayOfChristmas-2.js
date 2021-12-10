const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map(e => e.split('').map(e2 => parseInt(e2)))
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

let basinMins = [];
const setBasinMin = (numArr, middleNum, row, col) => {
    if (numArr.every(e => e > middleNum)) {
        basinMins.push({
            row: row,
            col: col,
        })
    }
}
// Find all the minimum positions of basins
for (row = 0; row < inputData.length; row++) {
    for (col = 0; col < inputData[0].length; col++) {
        if (row === 0) {
            if (col === 0) {
                setBasinMin([inputData[row+1][col], inputData[row][col+1]], inputData[row][col], row, col)
            } else if (col === inputData[0].length-1) {
                setBasinMin([inputData[row+1][col], inputData[row][col-1]], inputData[row][col], row, col)
            } else {
                setBasinMin([inputData[row+1][col], inputData[row][col-1], inputData[row][col+1]], inputData[row][col], row, col)
            }
        } else if (row === inputData.length-1) {
            if (col === 0) {
                setBasinMin([inputData[row-1][col], inputData[row][col+1]], inputData[row][col], row, col)
            } else if (col === inputData[0].length-1) {
                setBasinMin([inputData[row-1][col], inputData[row][col-1]], inputData[row][col], row, col)
            } else {
                setBasinMin([inputData[row-1][col], inputData[row][col-1], inputData[row][col+1]], inputData[row][col], row, col)
            }
        } else{
            if (col === 0) {
                setBasinMin([inputData[row-1][col], inputData[row+1][col], inputData[row][col+1]], inputData[row][col], row, col)
            } else if (col === inputData[0].length-1) {
                setBasinMin([inputData[row-1][col], inputData[row+1][col], inputData[row][col-1]], inputData[row][col], row, col)
            } else {
                setBasinMin([inputData[row-1][col], inputData[row+1][col], inputData[row][col-1], inputData[row][col+1]], inputData[row][col], row, col)
            }
        }
    }
}
// For each minimum of basin, recursively find the positions included in that basin
const findBasinPos = (pos, dir) => {
    if (pos.row < 0 || pos.row >= modInputData.length || pos.col < 0 || pos.col >= modInputData[0].length
        || modInputData[pos.row][pos.col].value === 9 || modInputData[pos.row][pos.col].visited === true) { // Return condition if border, 9 or visited node is reached
        return 0;
    }
    modInputData[pos.row][pos.col].visited = true;
    let posList = [pos];
    const above = (dir !== "below") ? findBasinPos({ row: pos.row-1, col: pos.col }, "above") : 0;
    const below = (dir !== "above") ? findBasinPos({ row: pos.row+1, col: pos.col }, "below") : 0;
    const left = (dir !== "right") ? findBasinPos({ row: pos.row, col: pos.col-1 }, "left") : 0;
    const right = (dir !== "left") ? findBasinPos({ row: pos.row, col: pos.col+1 }, "right") : 0;
    (above !== 0) ? posList = posList.concat(above) : 0;
    (below !== 0) ? posList = posList.concat(below) : 0;
    (left !== 0) ? posList = posList.concat(left) : 0;
    (right !== 0) ? posList = posList.concat(right) : 0;
    return posList
}

let basinSizes = [], modInputData = []
for (basinMin of basinMins) {
    modInputData = inputData.map(e => e.map(e2 => {
        return {
            value: e2,
            visited: false,
        }
    }))
    const basinPosList = findBasinPos(basinMin)
    basinSizes.push(basinPosList.length);
}
const basinSizesSorted = basinSizes.sort((a,b)=>b-a) // Sort descending order
const finalOutput = basinSizesSorted[0] * basinSizesSorted[1] * basinSizesSorted[2]
console.log(`Product of sizes of 3 largest basins: ${finalOutput}`)
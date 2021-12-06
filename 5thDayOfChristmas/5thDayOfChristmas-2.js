const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map(e => e.split(" -> ").map(e2 => e2.split(",").map(e3 => parseInt(e3))))
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

let mapHeight = 0, mapWidth = 0;
// Find max X and Y value
for (line of inputData) {
    for (coords of line) {
        if (coords[0] > mapWidth) {
            mapWidth = coords[0]
        }
        if (coords[1] > mapHeight) {
            mapHeight = coords[1]
        }
    }
}

// Initialise empty map
let map = new Array(mapHeight+1).fill(0).map(() => new Array(mapWidth+1).fill(0))

for (line of inputData) {
    let linePosX = line[0][0];
    let linePosY = line[0][1];
    while (linePosX !== line[1][0] || linePosY !== line[1][1]) {
        map[linePosY][linePosX] += 1;
        linePosX += (line[1][0] - linePosX)/(Math.abs(line[1][0] - linePosX) || 1)
        linePosY += (line[1][1] - linePosY)/(Math.abs(line[1][1] - linePosY) || 1)
    }
    map[linePosY][linePosX] += 1;
}

let overlapCount = 0;
for (row of map) {
    for (cell of row) {
        if (cell >= 2) {
            overlapCount++;
        }
    }
}

console.log(`Points where at least 2 lines overlap: ${overlapCount}`)
//map.forEach(e => console.log(JSON.stringify(e)))
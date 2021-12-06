const fs = require('fs')

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map((e) => e.split(" ").map((e, i) => i===1?parseInt(e):e))
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

let horPos = 0;
let depth = 0;

for (movement of inputData) {
    switch (movement[0]) {
        case 'forward':
            horPos += movement[1];
            break;
        case 'up':
            depth -= movement[1];
            break;
        case 'down':
            depth += movement[1];
            break;
    }
}

console.log(`Horizontal Position: ${horPos}, Depth: ${depth}`)
console.log(`Product: ${horPos*depth}`)

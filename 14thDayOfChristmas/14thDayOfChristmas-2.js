const fs = require('fs');

const inputFile = 'input1.csv'
let template = [];
let folds = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    template = data.split("\r\n")[0]
    pairs = data.split("\r\n").filter(e => e.includes("->")).map(e => e.split(" -> "))
} catch (err) {
    console.error(err)
}
console.log(template)
console.log(pairs)

/////////////////////// ANSWER ///////////////////////

let counts = pairs.map(e => {
    return {
        mapping: e,
        count: 0
    }
})
for (step = 0; step < 10; step++) {
    
}
const counts = {};
for (char of template) {
    counts[char] = counts[char] ? counts[char] + 1 : 1;
}
const sortedCounts = Object.entries(counts).sort((a,b)=>a[1]-b[1])
console.log(`Difference of most and least common element: ${sortedCounts.slice(-1)[0][1] - sortedCounts[0][1]}`)

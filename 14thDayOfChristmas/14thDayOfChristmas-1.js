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

for (step = 0; step < 10; step++) {
    let newTemplate = [];
    for (templatePos = 0; templatePos < template.length-1; templatePos++) {
        const insertionChar = pairs.filter(e => e[0]===template[templatePos]+template[templatePos+1])[0][1];
        newTemplate = newTemplate.concat([template[templatePos], insertionChar])
    }
    newTemplate = newTemplate.concat(template.slice(-1))
    template = newTemplate
}
const counts = {};
for (char of template) {
    counts[char] = counts[char] ? counts[char] + 1 : 1;
}
const sortedCounts = Object.entries(counts).sort((a,b)=>a[1]-b[1])
console.log(`Difference of most and least common element: ${sortedCounts.slice(-1)[0][1] - sortedCounts[0][1]}`)

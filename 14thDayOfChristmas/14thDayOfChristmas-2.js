const fs = require('fs');

const inputFile = 'input1.csv'
let template = [];
let pairs = []
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    template = data.split("\r\n")[0]
    pairs = data.split("\r\n").filter(e => e.includes("->")).map(e => {
        return {
            [e.split(" -> ")[0]]: {
                mapping: e.split(" -> ")[1],
                count: 0,
                end: false
            }
        }
    }).reduce((t, e) => { return {...t, ...e} }, {})
} catch (err) {
    console.error(err)
}
console.log(template)
console.log(pairs)

/////////////////////// ANSWER ///////////////////////

for (templatePos = 0; templatePos < template.length-1; templatePos++) {
    pairs[template[templatePos]+template[templatePos+1]].count++;
    if (templatePos === template.length-2) {
        pairs[template[templatePos]+template[templatePos+1]].end = true;
    }
}
for (step = 0; step < 40; step++) {
    const newPairs = JSON.parse(JSON.stringify(pairs)) // Deep-copy of pairs
    Object.entries(pairs).map(e => {
        if (e[1].count > 0) {
            newPairs[e[0].charAt(0)+e[1].mapping].count += e[1].count;
            newPairs[e[1].mapping+e[0].charAt(1)].count += e[1].count;
            newPairs[e[0]].count -= e[1].count
            if (e[1].end) {
                newPairs[e[0]].end = false;
                newPairs[e[1].mapping+e[0].charAt(1)].end = true;
            }
        }
    })
    pairs = newPairs
}
const charCounts = {};
for (pair of Object.entries(pairs)) {
    charCounts[pair[0].charAt(0)] = charCounts[pair[0].charAt(0)] ? charCounts[pair[0].charAt(0)] + pair[1].count : pair[1].count;
    if (pair[1].end) {
        charCounts[pair[0].charAt(1)] = charCounts[pair[0].charAt(1)] ? charCounts[pair[0].charAt(1)] + 1 : 1;
    }
}
const sortedCounts = Object.entries(charCounts).sort((a,b)=>a[1]-b[1])
console.log(`Difference of most and least common element: ${sortedCounts.slice(-1)[0][1] - sortedCounts[0][1]}`)

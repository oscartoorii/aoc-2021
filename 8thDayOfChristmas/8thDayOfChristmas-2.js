const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map(e => e.split(" | ").map(e2 => e2.split(" "))).map(e3 => { return {
        unique: e3[0],
        output: e3[1]
    }})
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

let segments = {    ////Layout//
    a: [],          //   aaaa
    b: [],          //  b    c
    c: [],          //  b    c
    d: [],          //   dddd
    e: [],          //  e    f
    f: [],          //  e    f
    g: [],          //   gggg
}

// Figure out digits that make up 1

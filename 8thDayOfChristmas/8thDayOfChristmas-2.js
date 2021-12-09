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

const numPatterns = {
    0: ["a", "b", "c", "e", "f", "g"],
    1: ["c", "f"],
    2: ["a", "c", "d", "e", "g"],
    3: ["a", "c", "d", "f", "g"],
    4: ["b", "c", "d", "f"],
    5: ["a", "b", "d", "f", "g"],
    6: ["a", "b", "d", "e", "f", "g"],
    7: ["a", "c", "f"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
    9: ["a", "b", "c", "d", "f", "g"]
}

const matchNum = (decodedNum) => {
    for (matchedNum of Object.entries(numPatterns)) {
        if (decodedNum.every(e => matchedNum[1].includes(e)) && matchedNum[1].every(e => decodedNum.includes(e))) {
            return matchedNum[0]
        }
    }
    return -1;
}

const countOcc = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
let totalCount = 0;
for (display of inputData) {
    const uniqueSorted = display.unique.sort((a, b) => a.length - b.length).map(e => e.split(''))
    let segments = {    ////Layout//
        a: [],          //   aaaa
        b: [],          //  b    c
        c: [],          //  b    c
        d: [],          //   dddd
        e: [],          //  e    f
        f: [],          //  e    f
        g: [],          //   gggg
    }
    segments.c = uniqueSorted[0]
    segments.f = uniqueSorted[0]
    segments.a = uniqueSorted[1].filter(e => !segments.c.includes(e))
    segments.b = uniqueSorted[2].filter(e => !segments.c.concat(segments.a).includes(e))
    segments.d = uniqueSorted[2].filter(e => !segments.c.concat(segments.a).includes(e))
    segments.e = uniqueSorted[uniqueSorted.length-1].filter(e => !segments.c.concat(segments.a,segments.b).includes(e))
    segments.g = uniqueSorted[uniqueSorted.length-1].filter(e => !segments.c.concat(segments.a,segments.b).includes(e))
    const allLetters = uniqueSorted.reduce((a1, a2) => a1.concat(a2))
    segments.a = segments.a[0]
    segments.c = (countOcc(allLetters, segments.c[0]) === 8) ? segments.c[0] : segments.c[1]
    segments.f = (countOcc(allLetters, segments.f[1]) === 8) ? segments.f[0] : segments.f[1]
    segments.b = (countOcc(allLetters, segments.b[0]) === 6) ? segments.b[0] : segments.b[1]
    segments.d = (countOcc(allLetters, segments.d[1]) === 6) ? segments.d[0] : segments.d[1]
    segments.e = (countOcc(allLetters, segments.e[0]) === 4) ? segments.e[0] : segments.e[1]
    segments.g = (countOcc(allLetters, segments.g[1]) === 4) ? segments.g[0] : segments.g[1]
    const decoded = display.output.map(e => e.split('')).map(e => e.map(e2 => Object.entries(segments).filter(e3 => e2===e3[1])[0][0]))
    const finalNum = decoded.reduce((final, num) => final + matchNum(num), "")
    totalCount += parseInt(finalNum)
}

console.log(`Total count: ${totalCount}`)
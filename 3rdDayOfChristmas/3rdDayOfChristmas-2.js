const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n").map((e) => e.split("").map((e2) => parseInt(e2)))
} catch (err) {
    console.error(err)
}
console.log(inputData)

/////////////////////// ANSWER ///////////////////////

const ratingSolver = (commonFunction) => {
    colNo = 0;
    filterData = inputData;
    while (true) {
        colSum = 0;
        for (row of filterData) {
            colSum += row[colNo]
        }
        common = commonFunction(colSum, filterData.length);
        filterData = filterData.filter(e => e[colNo] === common)
        colNo++;
        if (colNo >= inputData[0].length || filterData.length == 1) {
            break;
        }
    }
    return filterData[0];
}

const OGRating = ratingSolver((colSum, arrLen) => (colSum >= arrLen/2 ? 1 : 0)).join('')
const CO2SRating = ratingSolver((colSum, arrLen) => (colSum < arrLen/2 ? 1 : 0)).join('')
const OGRatingDec = parseInt(OGRating, 2)
const CO2SRatingDec = parseInt(CO2SRating, 2)
const LSRating = OGRatingDec * CO2SRatingDec

console.log(`Oxygen Generator Rating in binary: ${OGRating}, CO2 Scrubber Rating in binary: ${CO2SRating}`)
console.log(`Oxygen Generator Rating in binary: ${OGRatingDec}, CO2 Scrubber Rating in binary: ${CO2SRatingDec}`)
console.log(`Life Support Rating: ${LSRating}`)
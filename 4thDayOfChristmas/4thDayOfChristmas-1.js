const fs = require('fs');

const inputFile = 'input1.csv'
let inputData = [];
let drawNumbers = [];
let bingoCards = [];
try {
    const data = fs.readFileSync(inputFile, 'utf8')
    inputData = data.split("\r\n")
    drawNumbers = inputData[0].split(",").map(e => parseInt(e))
    const bingoCardsInput = inputData.slice(2).filter(e => e !== '')
    for (cardNo = 0; cardNo < bingoCardsInput.length; cardNo += 5) {
        let card = bingoCardsInput.slice(cardNo, cardNo+5).map(e => e.split(" ").filter(e2 => e2 !== '').map(e3 => parseInt(e3)))
        card = card.map(e => e.map(e2 => {
            return {
                value: e2,
                checked: false,
            }
        }))
        bingoCards.push(card)
    }
} catch (err) {
    console.error(err)
}
console.log(bingoCards.slice(0, 3).map(e => e.map(e2 => e2.map(e3 => JSON.stringify(e3)))))
console.log(drawNumbers)

/////////////////////// ANSWER ///////////////////////

const checkCardWon = (card, row, col) => {
    if (card[row].every(e => e.checked === true)) {
        return true;
    }
    let trueCount = 0;
    for (i = 0; i < card.length; i++) {
        if (card[i][col].checked === true) {
            trueCount++
        }
    }
    if (trueCount === 5) {
        return true;
    }
    return false;
}

const cardScore = (card, winningNum) => {
    let unmarkedSum = 0;
    for (row of card) {
        for (cell of row) {
            if (!cell.checked) {
                unmarkedSum += cell.value
            }
        }
    }
    return unmarkedSum * winningNum;
}

const bingoSolver = () => {
    for (draw of drawNumbers) {
        for (card of bingoCards) {
            for (row in card) {
                for (col in card[row]) {
                    if (card[row][col].value === draw) {
                        card[row][col].checked = true;
                        if (checkCardWon(card, row, col)) {
                            return cardScore(card, draw)
                        }
                    }
                }
            }
        }
    
    }
    return -1;
}

const finalScore = bingoSolver()
console.log(`Final Score: ${finalScore}`)

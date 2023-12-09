const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const inputArray = syncReadFile('input.txt');

function solutionOne(cards) {
    let totalCardPoints = 0;

    for (let i = 0; i < cards.length; i++) {
        totalCardPoints += getCardPoints(cards[i]);
    }

    return totalCardPoints;
}

function getCardPoints(card) {
    let winningNumbers = getWinningNumbers(card);
    let myNumbers = getMyNumbers(card);


    let matchedNumbers = getMatchingNumbers(winningNumbers, myNumbers);

    return calculateCardPoints(matchedNumbers);
}

function getWinningNumbers(card) {
    let startIndex = card.indexOf(':');
    let endIndex = card.indexOf('|');

    // .slice() includes the starting index, but excludes the ending index therefore:
    // startIndex + 2 because of ':' and the space after it. endIndex - 1 because of the space before the '|'.
    let winningNumbers = storeNumsIntoSet(card.slice(startIndex + 2, endIndex - 1));

    return winningNumbers;
}

function getMyNumbers(card) {
    let startIndex = card.indexOf('|');
    
    // startIndex + 2 because of '|' and the space after it.
    let myNumbers = storeNumsIntoSet(card.slice(startIndex + 2));

    return myNumbers;
}

function storeNumsIntoSet(numbers) {
    let numbersSet = new Set();
    let numbersString = numbers.split(' ');

    for (let i = 0; i < numbersString.length; i++) {
        numbersSet.add(numbersString[i]);
    }

    if (numbersSet.has('')) { // Find single-digit winning numbers.
        numbersSet.delete(''); // Remove the empty space character from single-digit winning numbers.
    }

    return numbersSet;
}

function getMatchingNumbers(winningNumbers, myNumbers) {
    let matchingNumbers = new Set();

    for (let number of myNumbers) {
        if (winningNumbers.has(number)) {
            matchingNumbers.add(number);
        }
    }

    return matchingNumbers;
}

function calculateCardPoints(matchingNumbers) {
    let points = 0;

    for (let matchedNumbers of matchingNumbers) {
        if (points == 0) {
            points += 1;
        }

        else {
            points *= 2;
        }
    }
    
    return points;
}

console.log(`Q1: The total worth of cards in points is: ` + solutionOne(inputArray));



function solutionTwo(cards) {
    let totalCardsWon = 0;
    let cardsWon = new Map();

    initalizeCardsWon(cardsWon, cards);

    for (let i = 0; i < cards.length; i++) { // Update Map, one card at a time.
        getCardsWon(cards[i], cardsWon);
    }

    for (let i = 1; i <= cardsWon.size; i++) { // Get value of each card in Map and add them up.
        totalCardsWon += cardsWon.get(i);
    }

    return totalCardsWon;
}

function initalizeCardsWon(cardsWon, cards) { // Initalize Map to have at least one copy of each card in the beginning.
    for (let i = 0; i < cards.length; i++) {
        let ID = getCardID(cards[i]);
        cardsWon.set(ID, 1);
    }

    return cardsWon;
}

function getCardID(card) {
    let startIndex = card.indexOf(' ');
    let endIndex = card.indexOf(':');

    let cardID = card.slice(startIndex, endIndex).trim();

    return parseInt(cardID);
}

function getCardsWon(card, cardsWon) {
    let winningNumbers = getWinningNumbers(card);
    let myNumbers = getMyNumbers(card);
    let cardID = parseInt(getCardID(card));

    let matchedNumbers = getMatchingNumbers(winningNumbers, myNumbers);

    return updateCardsWon(cardsWon, cardID, matchedNumbers);
}

function updateCardsWon(cardsWon, cardID, matchedNumbers) {
    let matchingNumbers = matchedNumbers.size;

    for (let i = 1; i <= matchingNumbers; i++) {
        let winningID = cardID + i; 
        let currentCopiesCurrentID = cardsWon.get(cardID); // Current card ID being evaluated.
        let currentCopiesWinningID = cardsWon.get(winningID); // Card ID that won another copy.
        let newCopiesWinningID = currentCopiesCurrentID + currentCopiesWinningID;

        cardsWon.set(winningID, newCopiesWinningID); // Update Map to have new number of copies.
    }

    return cardsWon;
}

console.log(`Q2: The total scratchcards won is: ` + solutionTwo(inputArray));
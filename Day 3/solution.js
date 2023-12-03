const {readFileSync, promises: fsPromises} = require('fs');

const numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

function isNumber(char) {
    if (Object.is(parseInt(char), NaN))
        return false;

    return true;
}

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const inputArray = syncReadFile('input.txt');

function solutionOne(engineSchematic) {
    let totalProductNumbersSum = 0;

    let symbolCoords = getSymbolCoords(engineSchematic);
    totalProductNumbersSum += getAdjacentProductNumberSum(engineSchematic, symbolCoords);

    //console.log('Coords of symbols: ' + symbolCoords);

    return totalProductNumbersSum;
}

function getSymbolCoords(engineSchematic) {
    let symbolCoords = [];

    for (let y = 0; y < engineSchematic.length; y++) {
        for (let x = 0; x < engineSchematic[y].length; x++) {
            //console.log(engineSchematic[y][x]);
            let currChar = engineSchematic[y][x];

            if (currChar !== '.' && !numbers.has(currChar)) { // "Symbol" is any char that is not a period or a number.
                symbolCoords.push([x,y]);
            }
        }
    }

    return symbolCoords;
}

function getAdjacentProductNumberSum(engineSchematic, symbols) {
    // let xCoord = symbols[0][0];
    // let yCoord = symbols[0][1];
    let adjacentProductNumbersSum = 0;

    for (let i = 0; i < symbols.length; i++) {
        let xCoord = symbols[i][0];
        let yCoord = symbols[i][1];

        viewSquare(engineSchematic, yCoord, xCoord);

        adjacentProductNumbersSum += getTopBottomRowSum(engineSchematic, yCoord-1, xCoord-1, xCoord, xCoord+1); // Check top row
        adjacentProductNumbersSum += getMiddleRowSum(engineSchematic, yCoord, xCoord-1, xCoord+1); // Check middle row
        adjacentProductNumbersSum += getTopBottomRowSum(engineSchematic, yCoord+1, xCoord-1, xCoord, xCoord+1); // Check bottom row
    }

    return adjacentProductNumbersSum;
}

function getTopBottomRowSum(engineSchematic, yCoord, left, middle, right) {
    let productNumber;

    if (isNumber(engineSchematic[yCoord][middle])) { // Check if Top-Middle is a number, check left and right of number.
        productNumber = getProductNumber(engineSchematic, yCoord, middle, true, true);
        console.log(productNumber);

        return productNumber;
    }

    else { // If Top-Middle is not a number, check top corners.
        let leftProductNumber = 0;
        let rightProductNumber = 0;

        if (isNumber(engineSchematic[yCoord][left])) {
            leftProductNumber = getProductNumber(engineSchematic, yCoord, left, true, false); // Left corner
        }
        
        if (isNumber(engineSchematic[yCoord][right])) {
            rightProductNumber = getProductNumber(engineSchematic, yCoord, right, false, true); // Right corner

        }

        console.log(leftProductNumber, rightProductNumber);
        
        return leftProductNumber + rightProductNumber;
    }
}

function getMiddleRowSum(engineSchematic, yCoord, left, right) {
    let leftProductNumber = 0;
    let rightProductNumber = 0;

    if (isNumber(engineSchematic[yCoord][left])) {
        leftProductNumber = getProductNumber(engineSchematic, yCoord, left, true, false); // Middle left
    }
    
    if (isNumber(engineSchematic[yCoord][right])) {
        rightProductNumber = getProductNumber(engineSchematic, yCoord, right, false, true); // Middle right

    }

    console.log('middle row: ', leftProductNumber, rightProductNumber);

    return leftProductNumber + rightProductNumber;
}

function getProductNumber(engineSchematic, yCoord, ptr, doLeft, doRight) {
    let productNumberArray = [];
    let productNumber;

    if (doLeft) {
        let leftString = getLeftString(engineSchematic, yCoord, ptr-1);
        for (let i = 0; i < leftString.length; i++) {
            productNumberArray.push(leftString[i]);
        }
    }

    productNumberArray.push(engineSchematic[yCoord][ptr]);

    if (doRight) {
        let rightString = getRightString(engineSchematic, yCoord, ptr+1);
        for (let i = 0; i < rightString.length; i++) {
            productNumberArray.push(rightString[i]);
        }
    }
    
    productNumber = productNumberArray.join('');
    
    if (isNumber(productNumber)) // If there is a product number, convert to Int.
        return parseInt(productNumber);
    else // Otherwise, do nothing.
        return 0;
}

function getLeftString(engineSchematic, yCoord, leftPtr) {
    let leftString = [];

    while (engineSchematic[yCoord][leftPtr] !== '.' && leftPtr >= 0) {
        leftString.push(engineSchematic[yCoord][leftPtr]);
        leftPtr--;
    }

    return leftString.reverse();
}

function getRightString(engineSchematic, yCoord, rightPtr) {
    let rightString = [];

    while (engineSchematic[yCoord][rightPtr] !== '.' && rightPtr < engineSchematic[yCoord].length) {
        rightString.push(engineSchematic[yCoord][rightPtr]);
        rightPtr++;
    }

    return rightString;
}

function viewSquare(engineSchematic, yCoord, xCoord) {
    let topL = engineSchematic[yCoord-1][xCoord-1];
    let topM = engineSchematic[yCoord-1][xCoord];
    let topR = engineSchematic[yCoord-1][xCoord+1];

    let middleL = engineSchematic[yCoord][xCoord-1];
    let middle = engineSchematic[yCoord][xCoord];
    let middleR = engineSchematic[yCoord][xCoord+1];

    let botL = engineSchematic[yCoord+1][xCoord-1];
    let botM = engineSchematic[yCoord+1][xCoord];
    let botR = engineSchematic[yCoord+1][xCoord+1];

    console.log(
            topL + ' ' + topM + ' ' + topR + '\n',
            middleL + ' ' + middle + ' ' + middleR + '\n',
            botL + ' ' + botM + ' ' + botR + '\n'
        );

    return;
}

console.log(`Q1: The sum of all of the part numbers in the engine schematic is: ` + solutionOne(inputArray)); // 514969
const {readFileSync, promises: fsPromises} = require('fs');

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
    totalProductNumbersSum += getSymbolProductNumberSum(engineSchematic, symbolCoords);

    return totalProductNumbersSum;
}

function getSymbolCoords(engineSchematic) {
    let symbolCoords = [];

    for (let y = 0; y < engineSchematic.length; y++) {
        for (let x = 0; x < engineSchematic[y].length; x++) {
            let currChar = engineSchematic[y][x];

            if (currChar !== '.' && !isNumber(currChar)) { // "Symbol" is any char that is not a period or a number.
                symbolCoords.push([x,y]);
            }
        }
    }

    return symbolCoords;
}

function getSymbolProductNumberSum(engineSchematic, symbols) {
    let symbolProductNumbersSum = 0;

    for (let i = 0; i < symbols.length; i++) {
        let xCoord = symbols[i][0];
        let yCoord = symbols[i][1];

        symbolProductNumbersSum += sumAdjacentProductNumbers(engineSchematic, yCoord, xCoord-1, xCoord, xCoord+1);
    }

    return symbolProductNumbersSum;
}

function sumAdjacentProductNumbers(engineSchematic, yCoord, left, middle, right) {
    hasTopMid = isNumber(engineSchematic[yCoord-1][middle]);
    hasBotMid = isNumber(engineSchematic[yCoord+1][middle]);
    
    
    if (hasTopMid && hasBotMid) {
        let top = getProductNumber(engineSchematic, yCoord-1, middle, true, true);
        let midLeft = getProductNumber(engineSchematic, yCoord, left, true, false);
        let midRight = getProductNumber(engineSchematic, yCoord, right, false, true);
        let bot = getProductNumber(engineSchematic, yCoord+1, middle, true, true)

        return top + midLeft + midRight + bot;
    }

    else if (hasTopMid) {
        let top = getProductNumber(engineSchematic, yCoord-1, middle, true, true);   
        let midLeft = getProductNumber(engineSchematic, yCoord, left, true, false);
        let midRight = getProductNumber(engineSchematic, yCoord, right, false, true);
        let botLeft = getProductNumber(engineSchematic, yCoord+1, left, true, false);    
        let botRight = getProductNumber(engineSchematic, yCoord+1, right, false, true);

        return top + midLeft + midRight + botLeft + botRight;
    }

    else if (hasBotMid) {
        let topLeft = getProductNumber(engineSchematic, yCoord-1, left, true, false);
        let topRight = getProductNumber(engineSchematic, yCoord-1, right, false, true);
        let midLeft = getProductNumber(engineSchematic, yCoord, left, true, false);
        let midRight = getProductNumber(engineSchematic, yCoord, right, false, true);
        let bot = getProductNumber(engineSchematic, yCoord+1, middle, true, true);

        return topLeft + topRight + midLeft + midRight + bot;
    }

    else {
        let topLeft = getProductNumber(engineSchematic, yCoord-1, left, true, false); 
        let topRight = getProductNumber(engineSchematic, yCoord-1, right, false, true); 
        let midLeft = getProductNumber(engineSchematic, yCoord, left, true, false); 
        let midRight = getProductNumber(engineSchematic, yCoord, right, false, true);
        let botLeft = getProductNumber(engineSchematic, yCoord+1, left, true, false);
        let botRight = getProductNumber(engineSchematic, yCoord+1, right, false, true);

        return topLeft + topRight + midLeft + midRight + botLeft + botRight;
    }        
}

function getProductNumber(engineSchematic, yCoord, ptr, doLeft, doRight) {
    let productNumberArray = [];
    
    if (isNumber(engineSchematic[yCoord][ptr])) {
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

        let productNumber = productNumberArray.join('');
        
        return parseInt(productNumber);
    }

    else {
        return 0;
    }
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

/* Helper function to visualize "square" around a symbol
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
*/

console.log(`Q1: The sum of all of the part numbers in the engine schematic is: ` + solutionOne(inputArray)); // 514969



function solutionTwo(engineSchematic) {
    let totalGearRatio = 0;

    let potentialGearCoords = getGearCoords(engineSchematic);
    totalGearRatio += getGearRatio(engineSchematic, potentialGearCoords);

    return totalGearRatio;
}

function getGearCoords(engineSchematic) {
    let potentialGearCoords = [];

    for (let y = 0; y < engineSchematic.length; y++) {
        for (let x = 0; x < engineSchematic[y].length; x++) {
            let currChar = engineSchematic[y][x];

            if (currChar == '*') { // Potential "gears" are denoted with a '*' character. Must also have two adjacent product numbers to be a true "gear".
                potentialGearCoords.push([x,y]);
            }
        }
    }

    return potentialGearCoords;
}

function getGearRatio(engineSchematic, potentialGears) {
    let gearRatio = 0;

    for (let i = 0; i < potentialGears.length; i++) {
        let xCoord = potentialGears[i][0];
        let yCoord = potentialGears[i][1];

        let productNumbers = getAdjacentProductNumbers(engineSchematic, yCoord, xCoord-1, xCoord, xCoord+1);

        gearRatio += productNumbers[0] * productNumbers[1];
    }

    return gearRatio;
}

function getAdjacentProductNumbers(engineSchematic, yCoord, left, middle, right) {

    hasTopMid = isNumber(engineSchematic[yCoord-1][middle]);
    hasBotMid = isNumber(engineSchematic[yCoord+1][middle]);
    
    
    if (hasTopMid && hasBotMid) {
        let top = getProductNumber(engineSchematic, yCoord-1, middle, true, true);
        let bot = getProductNumber(engineSchematic, yCoord+1, middle, true, true)

        return [top, bot];
    }

    else if (hasTopMid) {
        let top = getProductNumber(engineSchematic, yCoord-1, middle, true, true);

        let midLeft = getProductNumber(engineSchematic, yCoord, left, true, false);
        if (midLeft !== 0) {
            return [top, midLeft];
        }

        let midRight = getProductNumber(engineSchematic, yCoord, right, false, true);
        if (midRight !== 0) {
            return [top, midRight];
        }

        let botLeft = getProductNumber(engineSchematic, yCoord+1, left, true, false);
        if (botLeft !== 0) {
            return [top, botLeft];
        } 

        let botRight = getProductNumber(engineSchematic, yCoord+1, right, false, true);
        if (botRight !== 0) {
            return [top, botRight];
        }

        return [top, 0];
    }

    else if (hasBotMid) {
        let bot = getProductNumber(engineSchematic, yCoord+1, middle, true, true);

        let topLeft = getProductNumber(engineSchematic, yCoord-1, left, true, false);
        if (topLeft !== 0) {
            return [topLeft, bot];
        }

        let topRight = getProductNumber(engineSchematic, yCoord-1, right, false, true);
        if (topRight !== 0) {
            return [topRight, bot];
        }

        let midLeft = getProductNumber(engineSchematic, yCoord, left, true, false);
        if (midLeft !== 0) {
            return [midLeft, bot];
        }

        let midRight = getProductNumber(engineSchematic, yCoord, right, false, true);
        if (midRight !== 0) {
            return [midRight, bot];
        }

        return [0, bot];
    }

    else {
        let productNumbers = [];

        let topLeft = getProductNumber(engineSchematic, yCoord-1, left, true, false);
        if (topLeft !== 0) {
            productNumbers.push(topLeft);
        }

        let topRight = getProductNumber(engineSchematic, yCoord-1, right, false, true);
        if (topRight !== 0) {
            productNumbers.push(topRight);
        }   

        let midLeft = getProductNumber(engineSchematic, yCoord, left, true, false);
        if (midLeft !== 0) {
            productNumbers.push(midLeft);
        }

        let midRight = getProductNumber(engineSchematic, yCoord, right, false, true);
        if (midRight !== 0) {
            productNumbers.push(midRight);
        }

        let botLeft = getProductNumber(engineSchematic, yCoord+1, left, true, false);
        if (botLeft !== 0) {
            productNumbers.push(botLeft);
        }

        let botRight = getProductNumber(engineSchematic, yCoord+1, right, false, true);
        if (botRight !== 0) {
            productNumbers.push(botRight);
        }

        if (productNumbers.length < 2) { // If productNumbers has less than two product numbers, fill productNumbers with 0's.
            if (productNumbers.length == 0) { 
                productNumbers.push(0);
                productNumbers.push(0);
            }
            
            else {
                productNumbers.push(0);
            }
        }

        return productNumbers;
    }
}

console.log('Q2: The sum of all of the gear ratios in the engine schematic is: ' + solutionTwo(inputArray)); // 78915902
const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const inputArray = syncReadFile('input.txt');

function solutionOne(lines) {
    let currCalValue;
    let calValueSum = 0;

    for (let i = 0; i < lines.length; i++) {
        currCalValue = parseInt(getDigits(lines[i]));
        calValueSum += currCalValue;
    }

    return calValueSum;
}

function getDigits(line) {
    let firstDigitPtr = 0;
    let lastDigitPtr = line.length - 1;

    let foundFirstDigit = false;
    let foundLastDigit = false;

    while(1) {
        foundFirstDigit = isDigit(line[firstDigitPtr]);
        foundLastDigit = isDigit(line[lastDigitPtr]);

        if (foundFirstDigit && foundLastDigit) { // When both digits are found. Exit loop.
            break;
        }

        else if (foundFirstDigit && !foundLastDigit) { // When first digit is found, but not last. Only move lastDigitPtr backwards.
            lastDigitPtr--;
        }

        else if (!foundFirstDigit && foundLastDigit) { // When last digit is found, but not first. Only move firstDigitPtr forwards.
            firstDigitPtr++;
        }

        else { // When both digits are not found. Move both pointers.
            firstDigitPtr++;
            lastDigitPtr--;
        }
    }

    return line[firstDigitPtr] + line[lastDigitPtr];
}

function isDigit(char) {
    if (Object.is(parseInt(char), NaN))
        return false;
    else
        return true;
}

console.log(`Q1: The sum of all the calibration values is ` + solutionOne(inputArray)); //55607



function solutionTwo(lines) {
    let currCalValue;
    let calValueSum = 0;

    for (let i = 0; i < lines.length; i++) {
        currCalValue = getDigitsUpdated(lines[i]);
        calValueSum += currCalValue;
    }

    return calValueSum;
}

function getDigitsUpdated(line) {
    let keywords = ['one', '1', 'two', '2', 'three', '3', 'four', '4', 'five', '5', 'six', '6', 'seven', '7', 'eight', '8', 'nine', '9'];
    let foundKeywords = [];

    for (let i = 0; i < keywords.length; i++) {
        if (line.includes(keywords[i]))
            foundKeywords.push(keywords[i]); // Keep track of digits mentioned (written out and numerical) in a line.
    }

    let [firstDigit, lastDigit] = getDigitValues(line, foundKeywords);
    let stringCalVal = convertToNumeral(firstDigit, lastDigit);

    return stringToInt(stringCalVal);
}

function getDigitValues (line, keywords) {
    let firstDigitPtr = Infinity;
    let lastDigitPtr = 0;

    let firstDigitValue;
    let lastDigitValue;

    for (let i = 0; i < keywords.length; i++) {
        let keyword = keywords[i];

        // Check both instances of a digit's first time mentioned and last time mentioned. Eliminates needing to check all instances of a digit.
        let currFirstPtr = line.indexOf(keyword);
        let currLastPtr = line.lastIndexOf(keyword);

        if (currFirstPtr <= firstDigitPtr) {
            firstDigitPtr = currFirstPtr;
            firstDigitValue = keyword;
        }

        if (currLastPtr >= lastDigitPtr) {
            lastDigitPtr = currLastPtr;
            lastDigitValue = keyword;
        }
    }
    
    return [firstDigitValue, lastDigitValue];
}

function convertToNumeral(firstDigit, lastDigit) {
    let calValue = '';

    if (firstDigit.length > 1) {
        switch (firstDigit) {
            case 'one':
                calValue += '1';
                break;
            case 'two':
                calValue += '2';
                break;
            case 'three':
                calValue += '3';
                break;
            case 'four':
                calValue += '4';
                break;
            case 'five':
                calValue += '5';
                break;
            case 'six':
                calValue += '6';
                break;
            case 'seven':
                calValue += '7';
                break;
            case 'eight':
                calValue += '8';
                break;
            case 'nine':
                calValue += '9';
                break;
        }
    }

    else {
        calValue += firstDigit;
    }

    if (lastDigit.length > 1) {
        switch (lastDigit) {
            case 'one':
                calValue += '1';
                break;
            case 'two':
                calValue += '2';
                break;
            case 'three':
                calValue += '3';
                break;
            case 'four':
                calValue += '4';
                break;
            case 'five':
                calValue += '5';
                break;
            case 'six':
                calValue += '6';
                break;
            case 'seven':
                calValue += '7';
                break;
            case 'eight':
                calValue += '8';
                break;
            case 'nine':
                calValue += '9';
                break;
        }
    }

    else {
        calValue += lastDigit;
    }

    return calValue;
}

function stringToInt(value) {
    return parseInt(value);
}

console.log(`Q2: The sum of all the (new) calibration values is ` + solutionTwo(inputArray)); //55291
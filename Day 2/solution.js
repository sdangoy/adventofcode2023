const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const inputArray = syncReadFile('input.txt');

function solutionOne(games) {
    let sumOfIDs = 0;

    for (let i = 0; i < games.length; i++) {
        let gameInfo = getGameInfo(games[i]);
        let gameID = parseInt(getID(gameInfo[0]));
        
        let sets = gameInfo[1].split('; ');
        let isPossible = possibleSets(sets); // Check if all sets meets the 12 red / 13 green / 14 blue rule.

        if (isPossible)
            sumOfIDs += gameID;
    }

    return sumOfIDs;
}

function getGameInfo(currGame) {
    return currGame.split(': '); // Separate into Game ID and sets per game.
}

function getID(currGame) {
    return currGame.substr(4); // Get ID # only.
}

function possibleSets(sets) {
    for (let i = 0; i < sets.length; i++) {
        let isPossible = possibleCubes(sets[i]); // Check if set meets the 12 red / 13 green / 14 blue rule.

        if (!isPossible)
            return false;
    }

    return true;
}

function possibleCubes(set) {
    let cubes = set.split(', ');

    for (let i = 0; i < cubes.length; i++) {
        let isPossible = compareCubes(cubes[i]); // Check if all pulls meets the 12 red / 13 green / 14 blue rule.

        if (!isPossible)
            return false;
    }

    return true;
}

function compareCubes(cube) {
    let isPossible = true;
    let cubeInfo = cube.split(' ');
    let numOfCubes = parseInt(cubeInfo[0]);

    switch (cubeInfo[1]) { // Check if number of cubes pulled meets the 12 red / 13 green / 14 blue rule.
        case "red":
            if (numOfCubes > 12)
                isPossible = false;
            break;
        case "green":
            if (numOfCubes > 13)
                isPossible = false;
            break;
        case "blue":
            if (numOfCubes > 14)
                isPossible = false;
            break;
    }

    return isPossible;
}

console.log(`Q1: The sum of the IDs where it was possible to have only 12 red cubes, 13 green cubes, and 14 blue cubes is: ` + solutionOne(inputArray)); //2268



function solutionTwo(games) {
    let sumOfIDs = 0;

    for (let i = 0; i < games.length; i++) {
        let gameInfo = getGameInfo(games[i]);
        
        let sets = gameInfo[1].split('; '); // Separate sets in a game.
        let power = calculatePower(sets);
        sumOfIDs += power;
    }

    return sumOfIDs;
}

function calculatePower(sets) {
    let minRedCubes = 0;
    let minGreenCubes = 0;
    let minBlueCubes = 0;

    for (let i = 0; i < sets.length; i++) {
        let set = sets[i].split(', '); // Get an individual set in a game.
        let minNumOfCubes = getMinNumCubesInSet(set, minRedCubes, minGreenCubes, minBlueCubes); // Check current set.

        // After each set in a game, update minimum number of cubes needed for each color.
        minRedCubes = minNumOfCubes[0];
        minGreenCubes = minNumOfCubes[1];
        minBlueCubes = minNumOfCubes[2];
    }

    return minRedCubes * minGreenCubes * minBlueCubes;
}

function getMinNumCubesInSet(set, minRedCubes, minGreenCubes, minBlueCubes) {
    for (let i = 0; i < set.length; i++) {
        let minValues = getCubeInfo(set[i], minRedCubes, minGreenCubes, minBlueCubes); // Check current pull.

        //After each pull in a set, update minimum number of cubes needed for each color.
        minRedCubes = minValues[0];
        minGreenCubes = minValues[1];
        minBlueCubes = minValues[2];
    }

    return [minRedCubes, minGreenCubes, minBlueCubes];
}

function getCubeInfo(cube, minRedCubes, minGreenCubes, minBlueCubes) {
    let cubeInfo = cube.split(' ');

    let numOfCubes = parseInt(cubeInfo[0]);

    switch(cubeInfo[1]) {
        case "red":
            if (numOfCubes > minRedCubes)
                minRedCubes = numOfCubes;
            break;
        case "green":
            if (numOfCubes > minGreenCubes)
                minGreenCubes = numOfCubes;
            break;
        case "blue":
            if (numOfCubes > minBlueCubes)
                minBlueCubes = numOfCubes;
            break;
    }

    return [minRedCubes, minGreenCubes, minBlueCubes];
}

console.log(`Q2: The sum of the power of the minimum set of cubes in each game is: ` + solutionTwo(inputArray)); //63542
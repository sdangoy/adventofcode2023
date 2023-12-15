const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const inputArray = syncReadFile('input.txt');

function solutionOne(almanacData) {
    let lowestPosition = Infinity;
    let mapInstructions = [];

    let updatedMap = getInitialSources(almanacData[0]);

    for (let i = 2; i <= almanacData.length; i++) { // Start at first map instruction in seed-to-soil map to the end of the humidity-to-location map.
        if (almanacData[i] == '' || i === almanacData.length) { // At the end of each map, perform all of the map instructions and clear map instruction array.
            updatedMap = convertMap(mapInstructions, updatedMap);
            updatedMap = updateMap(updatedMap);        
            mapInstructions = [];
        }

        else if (almanacData[i].match(/(\d+)/)) { // Find strings containing only numbers (map instructions) and add to map instruction array.
            mapInstructions.push(almanacData[i]);
        }
    }

    updatedMap.forEach((value, key) => { // Find the lowest position out of the inital seeds.
        if(key < lowestPosition) {
            lowestPosition = value;
        }
    })

    return lowestPosition;
}

function getInitialSources(initalSources) {
    let startIndex = initalSources.indexOf(' '); 
    let substring = initalSources.slice(startIndex + 1); // Get only the inital sources.
    let initialSourcesArray = substring.split(' ');
    let sourcesMap = new Map();

    for (let currentSource of initialSourcesArray) {
        sourcesMap.set(parseInt(currentSource), parseInt(currentSource)); // Any source number that aren't mapped correspond to the same destination number. This is default.
    }

    return sourcesMap;
}

function convertMap(instructions, sources) {

    for (let i = 0; i < instructions.length; i++) { // Go through each instruction of a map.
        let instructionInfo = instructions[i].split(' ');
        let startSource = parseInt(instructionInfo[1]);
        let startDestination = parseInt(instructionInfo[0]);
        let range = parseInt(instructionInfo[2]);

        sources = convertSourceToDestination(sources, startSource, startDestination, range);
    }

    return sources;
}

function convertSourceToDestination(sources, startSource, startDestination, range) {
    let newSources = new Map();

    sources.forEach((value, key) => {
        if (!newSources.has(key)) { // If source has not already been updated, update to new value. 
            if (key >= startSource && key <= (startSource + range - 1)) { // In this situation, the starting source is included in range. Hence the -1.
                let difference = key - startSource;
                let newDestination = startDestination + difference;
                newSources.set(key, newDestination);
            }
    
            else { // If source has already been updated, keep same value. DO NOT UPDATE AGAIN.
                newSources.set(key, value);
            }
        }
    })
    
    return newSources;
}

function updateMap(mapToUpdate) {
    let newMap = new Map();

    mapToUpdate.forEach((value) => {
        newMap.set(value, value); // At the end of each map, the destinations become the new sources.
    });

    return newMap;
}

console.log(`Q1: The lowest location number that corresponds to any of the initial seed numbers is: ` + solutionOne(inputArray)); // 388071289
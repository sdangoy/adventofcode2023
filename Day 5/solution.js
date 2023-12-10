const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const inputArray = syncReadFile('sample.txt');

function solutionOne(almanacData) {
    let lowestNumber = Infinity;

    let seedsMap = getSeeds(almanacData[0]);

    // Seed -> Soil
    for (let i = 3; i < 5; i++) {
        seedsMap = updateSeedsMap(seedsMap, almanacData[i]);
    }

    let updatedSeedsMap = new Map();

    for (let seed of seedsMap.values()) {
        updatedSeedsMap.set(seed, seed);
    }

    seedsMap.clear();

    for (let seed of updatedSeedsMap.values()) {
        seedsMap.set(seed, seed);
    }

    updatedSeedsMap.clear();

    console.log('Soil:');
    console.log(seedsMap);


    // Soil -> Fertilizer
    for (let i = 7; i < 11; i++) {
        seedsMap = updateSeedsMap(seedsMap, almanacData[i]);
    }

    for (let seed of seedsMap.values()) {
        updatedSeedsMap.set(seed, seed);
    }

    seedsMap.clear();

    for (let seed of updatedSeedsMap.values()) {
        seedsMap.set(seed, seed);
    }

    updatedSeedsMap.clear();

    console.log('Fertilizer:');
    console.log(seedsMap);


    // Fertilizer -> Water
    for (let i = 12; i < 17; i++) {
        seedsMap = updateSeedsMap(seedsMap, almanacData[i]);
    }

    for (let seed of seedsMap.values()) {
        updatedSeedsMap.set(seed, seed);
    }

    seedsMap.clear();

    for (let seed of updatedSeedsMap.values()) {
        seedsMap.set(seed, seed);
    }

    updatedSeedsMap.clear();

    console.log('Water:');
    console.log(seedsMap);


    // Water -> Light
    for (let i = 18; i < 21; i++) {
        seedsMap = updateSeedsMap(seedsMap, almanacData[i]);
    }

    for (let seed of seedsMap.values()) {
        updatedSeedsMap.set(seed, seed);
    }

    seedsMap.clear();

    for (let seed of updatedSeedsMap.values()) {
        seedsMap.set(seed, seed);
    }

    updatedSeedsMap.clear();

    console.log('Light:');
    console.log(seedsMap);


    // Light -> Temperature
    for (let i = 22; i < 26; i++) {
        seedsMap = updateSeedsMap(seedsMap, almanacData[i]);
    }

    for (let seed of seedsMap.values()) {
        updatedSeedsMap.set(seed, seed);
    }

    seedsMap.clear();

    for (let seed of updatedSeedsMap.values()) {
        seedsMap.set(seed, seed);
    }

    updatedSeedsMap.clear();

    console.log('Temperature:');
    console.log(seedsMap);


    // Temperature -> Humidity
    for (let i = 27; i < 30; i++) {
        seedsMap = updateSeedsMap(seedsMap, almanacData[i]);
    }

    for (let seed of seedsMap.values()) {
        updatedSeedsMap.set(seed, seed);
    }

    seedsMap.clear();

    for (let seed of updatedSeedsMap.values()) {
        seedsMap.set(seed, seed);
    }

    updatedSeedsMap.clear();

    console.log('Humidity:');
    console.log(seedsMap);


    // Humidity -> Location
    for (let i = 31; i < 33; i++) {
        seedsMap = updateSeedsMap(seedsMap, almanacData[i]);
    }

    for (let seed of seedsMap.values()) {
        updatedSeedsMap.set(seed, seed);
    }

    seedsMap.clear();

    for (let seed of updatedSeedsMap.values()) {
        seedsMap.set(seed, seed);
    }

    updatedSeedsMap.clear();

    console.log('Location:');
    console.log(seedsMap);

    for (let seed of seedsMap.values()) {
        if (seed < lowestNumber) {
            lowestNumber = seed;
        }
    }

    return lowestNumber;
}

function getSeeds(seedsString) {
    let startIndex = seedsString.indexOf(' ');
    let substring = seedsString.slice(startIndex + 1);
    let seeds = substring.split(' ');
    let seedsMap = new Map();

    for (let seed of seeds) {
        let seedNumber = parseInt(seed);
        let destination = parseInt(seed); // Any source number that aren't mapped correspond to the same destination number. This is default.
        seedsMap.set(seedNumber, destination);
    }

    return seedsMap;
}

function updateSeedsMap(seedsMap, mapInfo) {
    //console.log(seedsMap);
    console.log(mapInfo);

    mapInfo = mapInfo.split(' ');

    // console.log(mapInfo);

    let range = parseInt(mapInfo[2]);
    //console.log('range: ' + range);
    let destination = parseInt(mapInfo[0]);
    //console.log('destination: ' + destination);
    let source = parseInt(mapInfo[1]);
    //console.log('source: ' + source)

    for (let i = 0; i < range; i++) {
        //console.log(source + i);
        if (seedsMap.has(source + i)) {
            console.log('HAS: ' + (source + i));
            seedsMap.set(source + i, destination + i);
            console.log(seedsMap);
        }
    }

    return seedsMap;
}

function getDestinations(destination, range) {
    let destinationRange = [];

    for (let i = 0; i < range; i++) {
        destinationRange.push(destination + i);
    }

    return destinationRange;
}

function getSources(source, range) {
    let sourceRange = [];

    for (let i = 0; i < range; i++) {
        sourceRange.push(source + i);
    }

    return sourceRange;
}

console.log(`Q1: The lowest location number that corresponds to any of the initial seed numbers is: ` + solutionOne(inputArray));
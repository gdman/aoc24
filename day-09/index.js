const fs = require('fs');

const diskMap = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('').map(str => parseInt(str));

const fill = (char, noOfTimes) => {
    const result = [];

    for (let i = 0; i < noOfTimes; i++) {
        result.push(char);
    }

    return result;
}

const disk = [];

for (let i = 0; i < diskMap.length; i += 2) {
    const id = (i / 2).toString();
    
    disk.push(...fill(id, diskMap[i]));
    disk.push(...fill('.', diskMap[i + 1]));
}

const getNextEndId = () => {
    while (disk.length > 0) {
        const id = disk.pop();

        if (id !== '.') {
            return id;
        }
    }
}

for (let i = 0; i < disk.length; i++) {
    const char = disk[i];
    
    if (char === '.') {
        disk[i] = getNextEndId();
    }
}

const checksum = disk.reduce((checksum, char, index) => checksum + (char * index), 0);

console.log(checksum);
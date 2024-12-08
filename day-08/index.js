const fs = require('fs');

const grid = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n').map(line => line.split(''));

const antennaMap = new Map();

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        const marker = grid[row][col];

        if (marker === '.') {
            continue;
        }

        if (!antennaMap.has(marker)) {
            antennaMap.set(marker, []);
        }

        antennaMap.get(marker).push([ row, col ]);
    }
}

const isInBounds = ([row, col]) => row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

const antiNodes = new Set();

for (const antenna of antennaMap.keys()) {
    const remainingAntennas = [ ...antennaMap.get(antenna) ];

    while (remainingAntennas.length > 1) {
        const baseAntenna = remainingAntennas.shift();

        for (const pairedAntenna of remainingAntennas) {
            const rowDiff = pairedAntenna[0] - baseAntenna[0];
            const colDiff = pairedAntenna[1] - baseAntenna[1];

            const antiNodeA = [ baseAntenna[0] - rowDiff, baseAntenna[1] - colDiff ];
            const antiNodeB = [ pairedAntenna[0] + rowDiff, pairedAntenna[1] + colDiff ];

            if (isInBounds(antiNodeA)) {
                antiNodes.add(antiNodeA[0] + ':' + antiNodeA[1]);
            }

            if (isInBounds(antiNodeB)) {
                antiNodes.add(antiNodeB[0] + ':' + antiNodeB[1]);
            }
        }
    }
}

console.log(antiNodes.size);
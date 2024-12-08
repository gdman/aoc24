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

const addAntiNode = antiNode => antiNodes.add(antiNode[0] + ':' + antiNode[1]);

const addAntiNodes = ([ baseRow, baseCol ], [ rowDiff, colDiff ], directionFunction) => {
    let row = baseRow;
    let col = baseCol;

    while (true) {
        row = directionFunction(row, rowDiff);
        col = directionFunction(col, colDiff);

        const antiNode = [ row, col ];

        if (isInBounds(antiNode)) {
            addAntiNode(antiNode);
        } else {
            break;
        }
    }
}

for (const antenna of antennaMap.keys()) {
    const remainingAntennas = [ ...antennaMap.get(antenna) ];

    while (remainingAntennas.length > 1) {
        const baseAntenna = remainingAntennas.shift();

        addAntiNode(baseAntenna);

        for (const pairedAntenna of remainingAntennas) {
            addAntiNode(pairedAntenna);

            const rowDiff = pairedAntenna[0] - baseAntenna[0];
            const colDiff = pairedAntenna[1] - baseAntenna[1];

            addAntiNodes(baseAntenna,   [ rowDiff, colDiff ], (a, b) => a - b);
            addAntiNodes(pairedAntenna, [ rowDiff, colDiff ], (a, b) => a + b);
        }
    }
}

console.log(antiNodes.size);
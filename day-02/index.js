const fs = require('fs');

const reports = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n')
    .map(report => report.split(/\s+/).map(level => parseInt(level)));

const isSafe = report => {
    let a = report.shift();
    let b = report.shift();
    let direction;

    while (true) {
        const jump = b - a;

        const newDirection = jump > 0 ? 1 : -1;

        if (!direction) {
            direction = newDirection;
        }

        if (direction && newDirection !== direction) {
            return false;
        }

        if (direction === 1 && jump <= 0 || jump > 3) {
            return false;
        }

        if (direction === -1 && jump >= 0 || jump < -3) {
            return false;
        }

        if (report.length === 0) {
            return true;
        }

        a = b;
        b = report.shift();
    }
}

let counter = 0;

for (const report of reports) {
    if (isSafe(report)) {
        counter++;
    }
}

console.log(counter);
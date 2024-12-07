const fs = require('fs');

const formulas = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n').map(line => {
    const [ total, numbers ] = line.split(':');
    return {
        total : parseInt(total),
        numbers : numbers.trim().split(' ').map(number => parseInt(number))
    };
});

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const operations = [ add, multiply ];

const isPossible = (total, numbers) => {
    const sums = [ [ numbers.shift() ] ];

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];

        const nextIndex = i + 1;

        sums[nextIndex] = [];

        for (const previousTotal of sums[i]) {
            for (const operation of operations) {
                const newTotal = operation(previousTotal, number);

                if (newTotal > total) {
                    continue;
                }

                sums[nextIndex].push(newTotal);
            }
        }
    }

    return sums[sums.length - 1].includes(total);
}

let grandTotal = 0;

for (const { total, numbers } of formulas) {
    if (isPossible(total, numbers)) {
        grandTotal += total;
    }
}

console.log(grandTotal);
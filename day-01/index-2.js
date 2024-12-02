const fs = require('fs');

const [ listA, listB ] = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n')
    .reduce(
        (lists, line) => {
            const [a, b] = line.split(/\s+/);
            lists[0].push(parseInt(a));
            lists[1].push(parseInt(b));
            return lists;
        }, 
        [ [], [] ]
    );

listA.sort();
listB.sort();

let score = 0;
let nextB = listB.shift();

for (let i = 0; i < listA.length; i++) {
    const a = listA[i];

    let multiplier = 0;

    while (listB.length > 0) {
        if (nextB > a) {
            break;
        }

        if (nextB === a) {
            multiplier++;
        }

        nextB = listB.shift();
    }

    score += (a * multiplier);
}

console.log(score);
const fs = require('fs');

const [ listA, listB ] = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .reduce(
        (lists, line) => {
            const [a, b] = line.split(/\s+/);
            lists[0].push(a);
            lists[1].push(b);
            return lists;
        }, 
        [ [], [] ]
    );

listA.sort();
listB.sort();

let distance = 0;

for (let i = 0; i < listA.length; i++) {
    const big   = Math.max(listA[i], listB[i]);
    const small = Math.min(listA[i], listB[i]);

    distance += (big - small);
}

console.log(distance);
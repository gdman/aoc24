const fs = require('fs');

const rows = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n');

const [ rules, updates ] = rows.reduce(([ rules, updates ], row) => {
    if (row.includes('|')) {
        rules.push(row.split('|').map(num => parseInt(num)));
    } else if (row.includes(',')) {
        updates.push(row.split(',').map(num => parseInt(num)));
    }
    return [ rules, updates ];
}, [ [], [] ]);

let total = 0;

for (const update of updates) {

    const applicableRules = rules.reduce((map, rule) => {
        if (update.includes(rule[0]) && update.includes(rule[1])) {
            if (!map.has(rule[1])) {
                map.set(rule[1], []);
            }
            map.get(rule[1]).push(rule[0]);
        }
        return map;
    }, new Map());

    const addNumber = (current, num) => {
        if (applicableRules.has(num)) {
            for (const dependency of applicableRules.get(num)) {
                addNumber(current, dependency);
            }
        }

        if (!current.includes(num)) {
            current.push(num);
        }
    }

    const updated = [];

    for (const num of update) {
        addNumber(updated, num);
    }

    if (update.join(',') !== updated.join(',')) {
        total += updated[Math.floor(updated.length / 2)];
    }
    
}

console.log(total);
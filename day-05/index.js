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

const isValid = update => {
    for (let i = 0; i < update.length; i++) {
        const num = update[i];

        const applicableRules = rules.filter(rule => rule[0] === num && update.includes(rule[1]));

        for (const applicableRule of applicableRules) {
            const ruleIndex = update.indexOf(applicableRule[1]);

            if (ruleIndex < i) {
                return false;
            }
        }
    }
    return true;
}

let total = 0;

for (const update of updates) {
    if (isValid(update)) {
        total += update[Math.floor(update.length / 2)];
    }
}

console.log(total);
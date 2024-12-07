const before = Date.now();

require('./' + process.argv[2]);

const after = Date.now();

console.log('Time: ' + (after - before));
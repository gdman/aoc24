const before = new Date().getMilliseconds();

require('./' + process.argv[2]);

const after = new Date().getMilliseconds();

console.log('Time: ' + (after - before));
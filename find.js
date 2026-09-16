const fs = require('fs');
const text = fs.readFileSync('index.html', 'utf8');
const start = text.indexOf('<section aria-label=\\"Client logos\\"');
console.log('Start index is:', start);

const matches = [...text.matchAll(/Client logos/g)];
console.log('Found "Client logos" at indices:', matches.map(m => m.index));

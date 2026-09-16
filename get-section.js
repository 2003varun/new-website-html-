const fs = require('fs');
const text = fs.readFileSync('index.html', 'utf8');
const start = text.indexOf('<section aria-label=\\"Client logos\\"');
const end = text.indexOf('</section>', start) + 10;
fs.writeFileSync('out.txt', text.substring(start, end));

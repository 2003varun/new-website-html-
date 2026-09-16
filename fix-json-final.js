const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const templateStart = html.indexOf('<script type="__bundler/template">');
const contentStart = html.indexOf('>', templateStart) + 1;
const contentEnd = html.indexOf('</script>', contentStart);

let jsonStr = html.substring(contentStart, contentEnd);

// Strip literal physical newlines (ASCII 10 and 13)
jsonStr = jsonStr.replace(/\r/g, '').replace(/\n/g, '');

html = html.substring(0, contentStart) + jsonStr + html.substring(contentEnd);
fs.writeFileSync('index.html', html);
console.log('Fixed physical newlines in JSON successfully.');

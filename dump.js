const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const templateStart = html.indexOf('<script type="__bundler/template">');
const contentStart = html.indexOf('>', templateStart) + 1;
const contentEnd = html.indexOf('</script>', contentStart);

let jsonStr = html.substring(contentStart, contentEnd);
fs.writeFileSync('dump.txt', jsonStr.substring(44000, 45000));

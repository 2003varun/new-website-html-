const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// The HTML is bundled inside a JSON string, so quotes are escaped like \"
const matches = [...html.matchAll(/<img src=\\"(logo\/[^\\"]+)\\"/g)];

console.log('Total img elements pointing to logo/ in index.html:', matches.length);

const uniqueLogos = new Set();
for (const match of matches) {
    uniqueLogos.add(match[1]);
}

console.log('Unique logos referenced in index.html:', uniqueLogos.size);
console.log('The logos are:', Array.from(uniqueLogos).join(', '));

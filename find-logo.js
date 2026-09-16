const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<img[^>]*logo\.png[^>]*>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('Match:', match[0]);
}

const escapedRegex = /<img[^>]*logo\\.png[^>]*>/g;
while ((match = escapedRegex.exec(html)) !== null) {
  console.log('Match escaped:', match[0]);
}

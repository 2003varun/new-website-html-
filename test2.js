const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function check(tag) {
  const startTag = `<script type="${tag}">`;
  const start = html.lastIndexOf(startTag) + startTag.length;
  const end = html.indexOf('</script>', start);
  const jsonStr = html.substring(start, end);
  console.log(tag + ' start: ' + JSON.stringify(jsonStr.substring(0, 30)));
}

check('__bundler/template');

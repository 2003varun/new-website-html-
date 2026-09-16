const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function check(tag) {
  const startTag = `<script type="${tag}">`;
  const start = html.lastIndexOf(startTag) + startTag.length;
  const end = html.indexOf('</script>', start);
  const jsonStr = html.substring(start, end).trim();
  try {
    JSON.parse(jsonStr);
    console.log(tag + ' success!');
  } catch(e) {
    console.error(tag + ' fail:', e.message);
  }
}

check('__bundler/template');
check('__bundler/manifest');
check('__bundler/ext_resources');

const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const scriptTypes = [
  '__bundler/manifest',
  '__bundler/ext_resources',
  '__bundler/page_order',
  '__bundler/template'
];

for (const type of scriptTypes) {
  const startTag = `<script type="${type}">`;
  const endTag = `</script>`;
  
  let startIdx = html.indexOf(startTag);
  if (startIdx === -1) continue;
  
  startIdx += startTag.length;
  const endIdx = html.indexOf(endTag, startIdx);
  
  if (endIdx !== -1) {
    let content = html.substring(startIdx, endIdx);
    
    // Remove all physical newlines
    content = content.replace(/\\r\\n/g, '').replace(/\\n/g, '').replace(/\\r/g, '');
    
    html = html.substring(0, startIdx) + '\\n' + content + '\\n  ' + html.substring(endIdx);
  }
}

fs.writeFileSync('index.html', html);
console.log('Fixed JSON newlines in script tags.');

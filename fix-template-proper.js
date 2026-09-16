const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startTag = '<script type="__bundler/template">';
const startIdx = html.indexOf(startTag);
if (startIdx !== -1) {
  const contentStart = startIdx + startTag.length;
  const endIdx = html.indexOf('</script>', contentStart);
  
  let content = html.substring(contentStart, endIdx);
  
  const firstQuote = content.indexOf('"');
  const lastQuote = content.lastIndexOf('"');
  
  if (firstQuote !== -1 && lastQuote !== -1) {
    let before = content.substring(0, firstQuote);
    let str = content.substring(firstQuote, lastQuote + 1);
    let after = content.substring(lastQuote + 1);
    
    // Replace all physical newlines inside the JSON string literal
    str = str.replace(/\r/g, '').replace(/\n/g, '');
    
    content = before + str + after;
  }
  
  html = html.substring(0, contentStart) + content + html.substring(endIdx);
  fs.writeFileSync('index.html', html);
  console.log('Fixed JSON error successfully.');
} else {
  console.log('Could not find __bundler/template.');
}

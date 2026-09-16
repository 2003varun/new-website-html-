const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

function fixScript(tag) {
  const startTag = `<script type="${tag}">`;
  const startIdx = html.indexOf(startTag);
  if (startIdx === -1) return;
  
  const contentStart = startIdx + startTag.length;
  const endIdx = html.indexOf('</script>', contentStart);
  
  let content = html.substring(contentStart, endIdx);
  
  // Remove all physical newlines in the content, but keep a single leading/trailing newline
  // just so it doesn't break the HTML visually.
  // Actually, we should just extract the string starting with " and ending with "
  const firstQuote = content.indexOf('"');
  const lastQuote = content.lastIndexOf('"');
  if (firstQuote !== -1 && lastQuote !== -1) {
     let before = content.substring(0, firstQuote);
     let str = content.substring(firstQuote, lastQuote + 1);
     let after = content.substring(lastQuote + 1);
     
     // Remove ALL physical newlines from inside the JSON string
     str = str.replace(/\\r/g, '').replace(/\\n/g, '');
     
     content = before + str + after;
  }
  
  html = html.substring(0, contentStart) + '\\n' + content.trim() + '\\n  ' + html.substring(endIdx);
}

fixScript('__bundler/template');
fixScript('__bundler/manifest');
fixScript('__bundler/ext_resources');

fs.writeFileSync('index.html', html);
console.log('Fixed JSON newlines strictly inside string literals.');

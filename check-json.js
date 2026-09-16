const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const templateStart = html.indexOf('<script type="__bundler/template">');
const contentStart = html.indexOf('>', templateStart) + 1;
const contentEnd = html.indexOf('</script>', contentStart);

const jsonStr = html.substring(contentStart, contentEnd);

console.log("Extracted JSON string length:", jsonStr.length);

try {
  JSON.parse(jsonStr);
  console.log("JSON parses perfectly!");
} catch (e) {
  console.error(e.message);
  
  // Find the position mentioned in the error
  const match = e.message.match(/position (\d+)/);
  if (match) {
    const pos = parseInt(match[1]);
    const snippetStart = Math.max(0, pos - 50);
    const snippetEnd = Math.min(jsonStr.length, pos + 50);
    
    console.log("---- Context around error ----");
    console.log(jsonStr.substring(snippetStart, snippetEnd));
    console.log("------------------------------");
    console.log("Character at position " + pos + " is ASCII code:", jsonStr.charCodeAt(pos));
    console.log("Character at position " + pos + " is:", JSON.stringify(jsonStr.charAt(pos)));
    
    // Also print a few characters around it
    for (let i = pos - 5; i <= pos + 5; i++) {
        if (i >= 0 && i < jsonStr.length) {
            console.log(`char at ${i}: '${jsonStr.charAt(i)}' (code ${jsonStr.charCodeAt(i)})`);
        }
    }
  }
}

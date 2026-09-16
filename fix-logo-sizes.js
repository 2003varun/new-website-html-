const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the massive styles with a reasonable size for a loading spinner/logo
html = html.replace('<img src="logo.png" alt="Q-DAT IT Solutions" style="width:100%;height:100%;object-fit:contain;">', '<img src="logo.png" alt="Q-DAT IT Solutions" style="width:150px;height:auto;object-fit:contain;">');
html = html.replace('<img src="logo.png" alt="Q-DAT IT Solutions" style="width:1200px;height:800px;object-fit:contain;">', '');

fs.writeFileSync('index.html', html);
console.log('Fixed logo sizes in thumbnail.');

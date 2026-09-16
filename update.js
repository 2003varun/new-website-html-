const fs = require('fs');
let html = fs.readFileSync('new.html', 'utf8');

const newSection = `<section aria-label=\\"Client logos\\" style=\\"border-top:1px solid var(--color-divider);background:var(--color-surface)\\">\\n  
<div style=\\"max-width:1200px;margin:0 auto;padding:0 28px 28px\\">\\n        
<div style=\\"font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-neutral-700);padding:20px 0 16px\\">Trusted by teams at<\\u002Fdiv>\\n    
    <div class=\\"client-logo-grid\\">\\n          
    <div class=\\"client-logo-item\\"><img src=\\"logo/62dc3b8f29b41209ca21371115d0cccf.jpg\\" alt=\\"\\" style=\\"width:156px;height:66px;object-fit:contain;\\"><\\u002Fdiv>\\n          
    <div class=\\"client-logo-item\\"><img src=\\"logo/BPTL-logo.png\\" alt=\\"\\" style=\\"width:156px;height:66px;object-fit:contain;\\"><\\u002Fdiv>\\n          
    <div class=\\"client-logo-item\\"><img src=\\"logo/bpl.png\\" alt=\\"\\" style=\\"width:156px;height:66px;object-fit:contain;\\"><\\u002Fdiv>\\n          
    <div class=\\"client-logo-item\\"><img src=\\"logo/buddy4study-logo-new.png\\" alt=\\"\\" style=\\"width:156px;height:66px;object-fit:contain;\\"><\\u002Fdiv>\\n          
    <div class=\\"client-logo-item\\"><img src=\\"logo/sap-logo-svg.png\\" alt=\\"\\" style=\\"width:156px;height:66px;object-fit:contain;\\"><\\u002Fdiv>\\n          
    <div class=\\"client-logo-item\\"><img src=\\"logo/vedantu.png\\" alt=\\"\\" style=\\"width:156px;height:66px;object-fit:contain;\\"><\\u002Fdiv>\\n        <\\u002Fdiv>\\n      <\\u002Fdiv>\\n    <\\u002Fsection>`;

const newCss = `.client-logo-grid 
{ display: grid; grid-template-columns: repeat(3, 1fr);
 gap: 24px; 
 padding: 24px 0; 
 align-items: center; 
 justify-items: center; } @media (max-width: 991px) { .client-logo-grid { grid-template-columns: repeat(2, 1fr); } } @media (max-width: 575px) { .client-logo-grid { grid-template-columns: 1fr; } } .client-logo-item { display: flex; justify-content: center; align-items: center; width: 100%; height: 104px; }\\n<\\u002Fstyle>`;

// Replace the section
// Use a generic match to safely replace the old client logo section
const sectionRegex = /<section aria-label=\\"Client logos\\".*?<\\u002Fsection>/;
html = html.replace(sectionRegex, newSection);

// Replace the style (insert at the end of the first </style> match)
html = html.replace(/<\\u002Fstyle>/, newCss);

fs.writeFileSync('new.html', html);
console.log('Update complete');

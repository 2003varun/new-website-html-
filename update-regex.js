const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const files = fs.readdirSync('logo');
const logos = files
  .filter(f => !fs.statSync(`logo/${f}`).isDirectory())
  .filter(f => /\.(png|jpe?g|svg|webp)$/i.test(f))
  .map(f => `logo/${f}`);

function getRowHTML(directionClass, shiftAmount) {
  let shiftedLogos = [...logos];
  for(let i=0; i<shiftAmount; i++) {
    shiftedLogos.push(shiftedLogos.shift());
  }
  
  let half = [...shiftedLogos];
  if (half.length < 10) {
      half = [...half, ...half];
  }
  let fullRow = [...half, ...half];
  
  let rowHtml = `<div class=\\"client-marquee-row ${directionClass}\\">`;
  for(let src of fullRow) {
    rowHtml += `<div class=\\"client-marquee-item\\"><img src=\\"${src}\\" alt=\\"\\" style=\\"max-width:156px;height:66px;object-fit:contain;\\"><\\/div>`;
  }
  rowHtml += `<\\/div>`;
  return rowHtml;
}

let newSection = `<section aria-label=\\"Client logos\\" style=\\"border-top:1px solid var(--color-divider);background:var(--color-surface);overflow:hidden;\\">
      <div style=\\"max-width:1200px;margin:0 auto;padding:0 28px 28px\\">
        <div style=\\"font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-neutral-700);padding:20px 0 16px\\">Trusted by teams at<\\/div>
        
        <style>
          .client-marquee-container {
            display: flex;
            flex-direction: column;
            gap: 32px;
            overflow: hidden;
            width: 100%;
          }
          .client-marquee-row {
            display: flex;
            width: max-content;
          }
          .client-marquee-item {
            width: calc(min(100vw - 56px, 1144px) / 5);
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 15px;
          }
          @media (max-width: 1024px) {
            .client-marquee-item {
              width: calc(min(100vw - 56px, 1144px) / 3);
            }
          }
          @media (max-width: 768px) {
            .client-marquee-item {
              width: calc(min(100vw - 56px, 1144px) / 2);
            }
          }
          .scroll-left {
            animation: scroll-left-anim 35s linear infinite;
          }
          .scroll-right {
            animation: scroll-right-anim 35s linear infinite;
          }
          @keyframes scroll-left-anim {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right-anim {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        <\\/style>

        <div class=\\"client-marquee-container\\">
          ${getRowHTML('scroll-left', 0)}
          ${getRowHTML('scroll-right', 2)}
          ${getRowHTML('scroll-left', 4)}
          ${getRowHTML('scroll-right', 1)}
        <\\/div>
      <\\/div>
    <\\/section>`;

newSection = newSection.replace(/\\r/g, '').replace(/\\n/g, '');

// Use regex to match all <section aria-label=\"Client logos\">...</section> regardless of slashes
const regex = /<section aria-label=\\"Client logos\\"[^>]*>.*?<(\\/?\\w*?\\/?\\w*)section>/g;

let matches = html.match(regex);
console.log('Found ' + (matches ? matches.length : 0) + ' sections with regex.');

html = html.replace(regex, newSection);

fs.writeFileSync('index.html', html);
console.log('Regex replace successful.');

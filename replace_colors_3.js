const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const replacements = [
  // Fix button hovers
  { from: /hover:bg-white/g, to: 'hover:bg-[var(--text-primary)]' },
  { from: /active:bg-white/g, to: 'active:bg-[var(--text-primary)]' },
  { from: /hover:text-black/g, to: 'hover:text-[var(--bg-primary)]' },
  { from: /active:text-black/g, to: 'active:text-[var(--bg-primary)]' },
];

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = content;
      for (const r of replacements) {
        modified = modified.replace(r.from, r.to);
      }
      if (content !== modified) {
        fs.writeFileSync(fullPath, modified, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDir(dir);
console.log('Done!');

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const replacements = [
  { from: /bg-\[#0E0E0E\]\/80/g, to: 'bg-[var(--navbar-bg)]' },
  { from: /bg-\[#0E0E0E\]\/50/g, to: 'bg-[var(--bg-primary)]/50' },
  { from: /bg-\[#0E0E0E\]/g, to: 'bg-[var(--bg-primary)]' },
  { from: /bg-\[#151515\]/g, to: 'bg-[var(--bg-secondary)]' },
  { from: /bg-\[#1A1A1A\]/g, to: 'bg-[var(--bg-card)]' },
  { from: /text-\[#E0E0E0\]/g, to: 'text-[var(--text-primary)]' },
  { from: /text-\[#888\]/g, to: 'text-[var(--text-muted)]' },
  { from: /text-\[#A0A0A0\]/g, to: 'text-[var(--text-secondary)]' },
  { from: /text-\[#666\]/g, to: 'text-[var(--text-muted)]' },
  { from: /border-\[#333\]/g, to: 'border-[var(--border-subtle)]' },
  { from: /border-\[#222\]/g, to: 'border-[var(--border-subtle)]' },
  { from: /border-\[#333333\]/g, to: 'border-[var(--border-subtle)]' },
  // Also text-white but only when not inside hover or gradient logic? 
  // Let's just leave text-white as it is because it often used for things that should ALWAYS be white.
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

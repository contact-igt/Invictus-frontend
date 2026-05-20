const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const replacements = [
  // Fix text-white
  { from: /text-white/g, to: 'text-[var(--text-primary)]' },
  // Fix text-[#E0E0E0]
  { from: /text-\[#E0E0E0\]/g, to: 'text-[var(--text-primary)]' },
  // Fix text-[#A0A0A0]
  { from: /text-\[#A0A0A0\]/g, to: 'text-[var(--text-secondary)]' },
  // Fix text-[#888] and text-[#666]
  { from: /text-\[#888888\]/g, to: 'text-[var(--text-muted)]' },
  { from: /text-\[#666666\]/g, to: 'text-[var(--text-muted)]' },
  { from: /text-\[#888\]/g, to: 'text-[var(--text-muted)]' },
  { from: /text-\[#666\]/g, to: 'text-[var(--text-muted)]' },

  // Since bg-[var(--bg-primary)]/50 doesn't work with hex css variables in Tailwind v3,
  // we need to fix those opacity modifiers
  { from: /bg-\[var\(--bg-primary\)\].*?\/50/g, to: 'bg-[var(--bg-card)]' },
  { from: /bg-\[#0E0E0E\]\/50/g, to: 'bg-[var(--bg-card)]' },
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

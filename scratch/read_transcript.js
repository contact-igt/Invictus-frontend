const fs = require('fs');
const readline = require('readline');
const file = 'C:/Users/admin/.gemini/antigravity/brain/43d1d89b-74f6-4f2c-9ca9-3ee518708a3c/.system_generated/logs/transcript.jsonl';
const rl = readline.createInterface({ input: fs.createReadStream(file) });
rl.on('line', (l) => {
  if (l.includes('"step_index":5483')) {
    const obj = JSON.parse(l);
    console.log(obj.content);
  }
});

const fs = require('fs');
try {
  const path = '/.gemini/antigravity/brain/a87b316b-fb42-47ce-bc49-f8ea7dbb5e57/.system_generated/logs/transcript.jsonl';
  if (fs.existsSync(path)) {
    console.log("FOUND AT ABSOLUTE PATH");
  } else if (fs.existsSync(process.env.HOME + path)) {
    console.log("FOUND AT HOME PATH");
    const content = fs.readFileSync(process.env.HOME + path, 'utf8');
    fs.writeFileSync('transcript_copy.txt', content);
  } else {
    // try to find it
    console.log("Not found at strict absolute path or home path.");
  }
} catch (e) {
  console.error(e);
}

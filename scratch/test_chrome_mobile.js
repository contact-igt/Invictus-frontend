const { execFile } = require('child_process');
const http = require('http');

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// Test if chrome can run in headless dump-dom or screenshot mode
const testUrl = "http://localhost:3000/";
const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=375,812',
  '--screenshot=scratch/mobile_home_375.png',
  testUrl
];

console.log("Launching headless chrome to capture 375px mobile screenshot...");
execFile(chromePath, args, (err, stdout, stderr) => {
  if (err) {
    console.error("Chrome error:", err.message);
  } else {
    console.log("SUCCESS! Captured mobile screenshot at 375px.");
  }
});


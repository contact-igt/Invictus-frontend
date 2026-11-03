const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACTS_DIR = "C:\\Users\\admin\\.gemini\\antigravity\\brain\\43d1d89b-74f6-4f2c-9ca9-3ee518708a3c";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function httpGetJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { res, rej } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) rej(msg.error);
          else res(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((res, rej) => {
      const id = this.id++;
      this.callbacks.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function captureScreen(client, filePath, quality = 88) {
  const screenshot = await client.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: quality,
  });
  const buf = Buffer.from(screenshot.data, 'base64');
  fs.writeFileSync(filePath, buf);
  console.log(`Saved screenshot: ${filePath} (${buf.length} bytes)`);
}

async function run() {
  const port = 9524;
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
    '--disable-extensions',
    '--user-data-dir=C:\\Users\\admin\\AppData\\Local\\Temp\\chrome-inspect-services'
  ]);

  try {
    let connected = false;
    let targetWs = null;
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        const list = await httpGetJson(`http://127.0.0.1:${port}/json/list`);
        if (list && list.length > 0) {
          targetWs = list[0].webSocketDebuggerUrl;
          connected = true;
          break;
        }
      } catch (e) {}
    }

    if (!connected || !targetWs) {
      throw new Error('Failed to connect to page websocket');
    }

    const client = new CDPClient(targetWs);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log('Navigating to http://localhost:3000/services ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/services' });
    await sleep(3000);

    // Dismiss any dialog popups
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        document.querySelectorAll('dialog').forEach(d => {
          try { d.close(); } catch(e){}
          d.remove();
        });
        document.body.style.overflow = 'auto';
      })()`
    });
    await sleep(500);

    console.log('Capturing Desktop Hero Typography...');
    await captureScreen(client, path.join(ARTIFACTS_DIR, 'services_hero_typography_desktop.jpg'));

    console.log('Switching to Mobile View (390x844)...');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(1000);
    await captureScreen(client, path.join(ARTIFACTS_DIR, 'services_hero_typography_mobile.jpg'));

    console.log('All screenshots captured successfully!');
    client.close();
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    chrome.kill();
  }
}

run();


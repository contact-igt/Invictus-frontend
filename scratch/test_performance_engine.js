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
  const port = 9520;
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
    '--disable-extensions',
    '--user-data-dir=C:\\Users\\admin\\AppData\\Local\\Temp\\chrome-inspect-perf'
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

    console.log('Navigating to http://localhost:3000/ ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(4000);

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

    // Get section #process metrics
    let metricsVal = null;
    for (let attempt = 0; attempt < 40; attempt++) {
      await sleep(500);
      const metrics = await client.send('Runtime.evaluate', {
        expression: `(() => {
          const sec = document.getElementById('process');
          if (!sec) {
            return { notFound: true, readyState: document.readyState, url: window.location.href };
          }
          const rect = sec.getBoundingClientRect();
          return {
            top: window.scrollY + rect.top,
            height: rect.height,
            winH: window.innerHeight
          };
        })()`,
        returnByValue: true
      });
      if (metrics.result && metrics.result.value && !metrics.result.value.notFound) {
        metricsVal = metrics.result.value;
        break;
      } else {
        if (attempt % 5 === 0) {
          console.log(`Attempt ${attempt}:`, metrics.result?.value);
        }
      }
    }

    if (!metricsVal) {
      throw new Error('Section #process not found');
    }

    console.log('Process Section Metrics:', metricsVal);
    const { top, height, winH } = metricsVal;
    const scrollRange = height - winH;

    async function scrollToProgress(p, label) {
      const targetY = top + p * scrollRange;
      await client.send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${targetY}, behavior: 'instant' })`
      });
      await sleep(800);
      const outPath = path.join(ARTIFACTS_DIR, label);
      await captureScreen(client, outPath);
    }

    console.log('Capturing Desktop Stages...');
    // Stage 1: Discovery initial
    await scrollToProgress(0.02, 'performance_engine_stage1_discovery.jpg');

    // Stage 2: Strategy entering from right (covering Discovery)
    await scrollToProgress(0.20, 'performance_engine_stage2_strategy_entering.jpg');

    // Stage 2: Strategy fully covered
    await scrollToProgress(0.35, 'performance_engine_stage2_strategy_covered.jpg');

    // Stage 3: Execution entering from right (covering Strategy)
    await scrollToProgress(0.50, 'performance_engine_stage3_execution_entering.jpg');

    // Stage 3: Execution fully covered
    await scrollToProgress(0.67, 'performance_engine_stage3_execution_covered.jpg');

    // Stage 4: Growth fully covered
    await scrollToProgress(0.98, 'performance_engine_stage4_growth_covered.jpg');

    // Mobile Viewport (390x844)
    console.log('Switching to Mobile View (390x844)...');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(1000);
    const mEval = await client.send('Runtime.evaluate', {
      expression: `(() => {
        const sec = document.getElementById('process');
        if (!sec) return null;
        sec.scrollIntoView({ behavior: 'instant', block: 'start' });
        return {
          scrollY: window.scrollY
        };
      })()`,
      returnByValue: true
    });
    console.log('Mobile scroll into view:', mEval);
    await sleep(1000);
    await captureScreen(client, path.join(ARTIFACTS_DIR, 'performance_engine_mobile.jpg'));

    console.log('All screenshots captured successfully!');
    client.close();
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    chrome.kill();
  }
}

run();


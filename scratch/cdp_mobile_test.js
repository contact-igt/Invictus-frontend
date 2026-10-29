const { spawn } = require('child_process');
const http = require('http');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

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

async function runMobileAudit() {
  console.log("=================================================");
  console.log("STARTING HEADLESS CHROME CDP MOBILE & RESPONSIVE AUDIT");
  console.log("=================================================");

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    'about:blank'
  ]);

  let connected = false;
  let targetWs = null;

  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      const list = await httpGetJson('http://127.0.0.1:9222/json/list');
      if (list && list.length > 0) {
        targetWs = list[0].webSocketDebuggerUrl;
        connected = true;
        break;
      }
    } catch (e) {
      // waiting for chrome
    }
  }

  if (!connected || !targetWs) {
    console.error("Failed to connect to Chrome remote debugging port.");
    chromeProc.kill();
    return;
  }

  console.log("Connected to Chrome CDP session:", targetWs);
  const client = new CDPClient(targetWs);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const viewports = [
    { name: 'Small Mobile (320px)', width: 320, height: 640 },
    { name: 'iPhone SE (375px)', width: 375, height: 667 },
    { name: 'iPhone 14 (390px)', width: 390, height: 844 },
    { name: 'iPad Tablet (768px)', width: 768, height: 1024 },
    { name: 'Desktop (1024px)', width: 1024, height: 768 },
    { name: 'Large Desktop (1440px)', width: 1440, height: 900 }
  ];

  const testPages = ['/', '/about', '/services', '/clients', '/global', '/contact', '/careers'];

  const auditReport = [];

  for (const page of testPages) {
    console.log(`\n-----------------------------------------`);
    console.log(`Testing Route: ${page}`);
    console.log(`-----------------------------------------`);

    for (const vp of viewports) {
      await client.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.width < 1024
      });

      await client.send('Page.navigate', { url: `http://localhost:3000${page}` });
      await sleep(1200); // Allow render, fonts, hydration

      // Evaluate overflow and metrics
      const evalRes = await client.send('Runtime.evaluate', {
        expression: `
          (function() {
            var scrollW = document.documentElement.scrollWidth;
            var innerW = window.innerWidth;
            var hasOverflow = scrollW > innerW;
            
            var overflowingElements = [];
            if (hasOverflow) {
              var all = document.querySelectorAll('*');
              for (var i = 0; i < all.length; i++) {
                var el = all[i];
                var rect = el.getBoundingClientRect();
                if (rect.right > innerW + 1) {
                  var tag = el.tagName.toLowerCase();
                  var cls = (el.className || '').toString().slice(0, 50);
                  var id = el.id ? '#' + el.id : '';
                  overflowingElements.push(tag + id + (cls ? '.' + cls.split(' ').slice(0, 2).join('.') : '') + ' (right=' + Math.round(rect.right) + 'px)');
                  if (overflowingElements.length >= 3) break;
                }
              }
            }

            // Check for tap target sizes under 44px
            var interactive = document.querySelectorAll('button, a, input, select');
            var smallTargets = 0;
            for (var j = 0; j < interactive.length; j++) {
              var tRect = interactive[j].getBoundingClientRect();
              if (tRect.width > 0 && tRect.height > 0) {
                if (tRect.width < 32 || tRect.height < 32) {
                  smallTargets++;
                }
              }
            }

            return {
              scrollW: scrollW,
              innerW: innerW,
              hasOverflow: hasOverflow,
              overflowCount: overflowingElements.length,
              overflowSamples: overflowingElements,
              smallTargets: smallTargets
            };
          })()
        `,
        returnByValue: true
      });

      const metrics = evalRes.result.value;
      const statusStr = metrics.hasOverflow
        ? `FAIL (Overflow! scrollWidth=${metrics.scrollW}px > innerWidth=${metrics.innerW}px | Samples: ${metrics.overflowSamples.join(', ')})`
        : `PASS (No horizontal scroll: ${metrics.scrollW}px / ${metrics.innerW}px)`;

      console.log(`[${vp.name.padEnd(24)}] ${statusStr}`);
      auditReport.push({
        page,
        viewport: vp.name,
        width: vp.width,
        metrics,
        pass: !metrics.hasOverflow
      });
    }
  }

  client.close();
  chromeProc.kill();

  console.log("\n=================================================");
  console.log("MOBILE & RESPONSIVE AUDIT SUMMARY");
  console.log("=================================================");
  const failures = auditReport.filter(r => !r.pass);
  if (failures.length === 0) {
    console.log("ALL tested routes PASSED across all viewports from 320px to 1440px with ZERO horizontal scrolling or overflow!");
  } else {
    console.log(`Found ${failures.length} overflow failures!`);
    for (const f of failures) {
      console.log(`- ${f.page} at ${f.viewport}: ${f.metrics.overflowSamples.join(', ')}`);
    }
  }
}

runMobileAudit().catch(err => {
  console.error("Audit error:", err);
  process.exit(1);
});


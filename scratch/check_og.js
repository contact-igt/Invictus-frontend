const http = require('http');

const routes = [
  '/', '/about', '/services', '/clients', '/global', '/contact', '/careers', '/privacy', '/terms', '/whatsnexus'
];

async function checkOg() {
  for (const route of routes) {
    const html = await new Promise((res) => {
      http.get(`http://localhost:3000${route}`, (r) => {
        let d = '';
        r.on('data', c => d += c);
        r.on('end', () => res(d));
      });
    });

    const ogTitle = html.includes('property="og:title"') || html.includes('property=\'og:title\'');
    const ogDesc = html.includes('property="og:description"') || html.includes('property=\'og:description\'');
    const ogImage = html.includes('property="og:image"') || html.includes('property=\'og:image\'');
    const twCard = html.includes('name="twitter:card"') || html.includes('name=\'twitter:card\'');

    console.log(`${route.padEnd(15)} | og:title: ${ogTitle} | og:desc: ${ogDesc} | og:image: ${ogImage} | twitter:card: ${twCard}`);
  }
}

checkOg();


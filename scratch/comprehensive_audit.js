const http = require('http');
const https = require('https');

const routes = [
  '/',
  '/about',
  '/services',
  '/clients',
  '/global',
  '/contact',
  '/careers',
  '/careers/business-development-executive',
  '/careers/google-ads-expert',
  '/careers/graphic-designer',
  '/careers/hr-operations-associate',
  '/careers/hr-operations-executive',
  '/careers/hr-operations-intern',
  '/careers/social-media-manager',
  '/careers/telecalling-executive',
  '/careers/video-editor',
  '/privacy',
  '/terms',
  '/whatsnexus',
  '/CaseStudy/WaterOnClick',
  '/blog',
  '/blogs',
  '/404'
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, html: data }));
    }).on('error', reject);
  });
}

async function audit() {
  console.log("=================================================");
  console.log("INVICTUS GLOBAL TECH — COMPREHENSIVE PHASE 3 AUDIT");
  console.log("=================================================\n");

  const results = [];
  const allInternalLinks = new Set();
  const pageTitles = new Map();
  const canonicalMap = new Map();

  for (const route of routes) {
    const fullUrl = `http://localhost:3000${route}`;
    try {
      const { status, headers, html } = await fetchPage(fullUrl);

      // Title
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : null;

      // Meta Description
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
      const description = descMatch ? descMatch[1].trim() : null;

      // Canonical
      const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                         html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
      const canonical = canonMatch ? canonMatch[1].trim() : null;

      // Robots
      const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
      const robots = robotsMatch ? robotsMatch[1].trim() : 'index, follow (default)';

      // Viewport
      const viewportMatch = html.match(/<meta\s+name=["']viewport["']\s+content=["']([^"']*)["']/i);
      const viewport = viewportMatch ? viewportMatch[1].trim() : null;

      // Headings
      const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
      const h2s = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
      const h3s = [...html.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

      // OpenGraph
      const ogTitle = (html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i) || [])[1];
      const ogDesc = (html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i) || [])[1];
      const ogUrl = (html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']*)["']/i) || [])[1];
      const ogImage = (html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i) || [])[1];

      // JSON-LD Schemas
      const schemas = [];
      const schemaMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
      for (const sm of schemaMatches) {
        try {
          const parsed = JSON.parse(sm[1]);
          schemas.push(parsed['@type'] || (Array.isArray(parsed) ? 'Array' : 'Unknown'));
        } catch (e) {
          schemas.push(`JSON_PARSE_ERROR: ${e.message}`);
        }
      }

      // Images
      const imgMatches = [...html.matchAll(/<img\b([^>]*)>/gi)];
      const images = imgMatches.map(m => {
        const tag = m[1];
        const src = (tag.match(/src=["']([^"']*)["']/i) || [])[1];
        const altMatch = tag.match(/alt=["']([^"']*)["']/i);
        const alt = altMatch ? altMatch[1] : null;
        const width = (tag.match(/width=["']?(\d+)["']?/i) || [])[1];
        const height = (tag.match(/height=["']?(\d+)["']?/i) || [])[1];
        return { src, alt, width, height, raw: m[0] };
      });

      // Completely missing alt attribute (null, not empty string)
      const missingAltAttr = images.filter(img => img.alt === null);

      // Missing explicit width or height
      const missingDimensions = images.filter(img => !img.width || !img.height);

      // Links on page
      const linkMatches = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']*)["'][^>]*>/gi)];
      const pageLinks = linkMatches.map(m => m[1]);
      for (const l of pageLinks) {
        if (l.startsWith('/') && !l.startsWith('//')) {
          allInternalLinks.add(l.split('#')[0].split('?')[0]);
        }
      }

      // Title & Canonical Uniqueness check
      if (title) {
        if (pageTitles.has(title) && route !== '/CaseStudy/WaterOnClick' && route !== '/blog' && route !== '/blogs') {
          console.warn(`DUPLICATE TITLE WARNING: "${title}" on ${route} and ${pageTitles.get(title)}`);
        } else {
          pageTitles.set(title, route);
        }
      }

      const resObj = {
        route,
        status,
        title,
        titleLength: title ? title.length : 0,
        description,
        descLength: description ? description.length : 0,
        canonical,
        robots,
        viewport,
        h1Count: h1s.length,
        h1s,
        h2Count: h2s.length,
        h3Count: h3s.length,
        hasOg: !!(ogTitle && ogDesc),
        ogTitle,
        ogDesc,
        ogUrl,
        schemas,
        imageCount: images.length,
        missingAltCount: missingAltAttr.length,
        missingAltSamples: missingAltAttr.map(i => i.src),
        missingDimensionsCount: missingDimensions.length,
        missingDimensionSamples: missingDimensions.map(i => i.src).slice(0, 3)
      };

      results.push(resObj);
      console.log(`[HTTP ${status}] ${route} | H1s: ${h1s.length} | Images: ${images.length} (Missing alt attr: ${missingAltAttr.length}) | Schemas: ${schemas.join(', ')}`);
    } catch (err) {
      console.error(`ERROR fetching ${route}:`, err.message);
      results.push({ route, error: err.message });
    }
  }

  console.log("\n=================================================");
  console.log("INTERNAL LINK CHECK & 404 VERIFICATION");
  console.log("=================================================");
  console.log(`Found ${allInternalLinks.size} unique internal link targets.`);

  const brokenLinks = [];
  for (const link of allInternalLinks) {
    if (!link || link === '/') continue;
    try {
      const { status } = await fetchPage(`http://localhost:3000${link}`);
      if (status >= 400) {
        brokenLinks.push({ link, status });
        console.error(`BROKEN LINK: ${link} returned HTTP ${status}`);
      } else {
        // OK
      }
    } catch (e) {
      brokenLinks.push({ link, error: e.message });
      console.error(`LINK FETCH ERROR: ${link} - ${e.message}`);
    }
  }

  if (brokenLinks.length === 0) {
    console.log("ALL internal links returned HTTP 200/300 status! Zero broken links detected.");
  } else {
    console.log(`WARNING: ${brokenLinks.length} broken internal links found!`);
  }

  return { results, brokenLinks };
}

audit().catch(console.error);


const fs = require('fs');

let code = fs.readFileSync('Invictus-frontend/src/pageComponent/Home/index.jsx', 'utf8');

// 1. Add import
if (!code.includes('LayeredPerformanceEngine')) {
  code = code.replace(
    "import { useRouter } from 'next/router';",
    "import { useRouter } from 'next/router';\r\nimport LayeredPerformanceEngine from '@/components/LayeredPerformanceEngine';"
  );
}

// 2. Remove SemicircularMethodologyJourney definition
const startIdx = code.indexOf('const SemicircularMethodologyJourney =');
const endIdx = code.indexOf('const HomePage =', startIdx);
if (startIdx !== -1 && endIdx !== -1) {
  code = code.slice(0, startIdx) + code.slice(endIdx);
}

// 3. Update scroll progress calculation
const oldProgRegex = /const rawProgress = Math\.max\(0, Math\.min\(1, -rect\.top \/ totalDistance\)\);[\r\n\s]+const progress = Math\.min\(1, rawProgress \/ 0\.88\);[\r\n\s]+setProcessProgress\(\(prev\) => {[\r\n\s]+if \(Math\.abs\(prev - progress\) < 0\.002\) return prev;[\r\n\s]+return progress;[\r\n\s]+}\);/;

if (oldProgRegex.test(code)) {
  code = code.replace(
    oldProgRegex,
    `const rawProgress = Math.max(0, Math.min(1, -rect.top / totalDistance));
          setProcessProgress((prev) => {
            if (Math.abs(prev - rawProgress) < 0.002) return prev;
            return rawProgress;
          });`
  );
}

// 4. Update Section 5
const secStart = code.indexOf('{/* SECTION 5 — Process Steps (Methodology)');
const secEnd = code.indexOf('{/* FAQ Section */}', secStart);
if (secStart !== -1 && secEnd !== -1) {
  const newSection = `{/* SECTION 5 — Process Steps (Methodology) — Layer-by-Layer Horizontal Sheet Scroll */}
      <section
        ref={processRef}
        id="process"
        className="relative min-h-[380vh] md:min-h-[420vh] border-b border-[var(--border-subtle)] z-10 bg-transparent"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--bg-primary)]">
          {/* Main Heading — Fixed at the Top */}
          <div className="text-center shrink-0 z-50 max-w-4xl mx-auto px-6 pt-16 md:pt-20 pb-2 select-none">
            <span className="text-[#2AB182] font-body text-xs md:text-sm tracking-[0.2em] uppercase font-bold mb-2.5 block">
              OUR METHODOLOGY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[var(--text-primary)] leading-tight">
              The 4-Step <span className="text-[#2AB182]">Performance</span> Engine
            </h2>
            <p className="font-body text-sm md:text-base text-[var(--text-muted)] mt-1.5">
              Performance is engineered, not guessed.
            </p>
          </div>

          {/* Layer-by-Layer Overlapping Sheet Panels */}
          <div className="relative flex-1 w-full overflow-hidden">
            <LayeredPerformanceEngine
              steps={processSteps}
              progress={processProgress}
              onStageClick={(idx) => {
                if (processRef.current) {
                  const rect = processRef.current.getBoundingClientRect();
                  const winH = window.innerHeight || 800;
                  const total = rect.height - winH;
                  const targets = [0.02, 0.36, 0.69, 0.98];
                  const targetY = window.scrollY + rect.top + targets[idx] * total;
                  window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
              }}
            />
          </div>
        </div>
      </section>

      `;
  code = code.slice(0, secStart) + newSection + code.slice(secEnd);
}

fs.writeFileSync('Invictus-frontend/src/pageComponent/Home/index.jsx', code, 'utf8');
console.log('Successfully updated Home/index.jsx');


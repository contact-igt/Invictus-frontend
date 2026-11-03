import React from 'react';

const PANEL_BACKGROUNDS = [
  'bg-gradient-to-br from-[#080b09] via-[#060807] to-[#040605]', // Discovery: Deep obsidian
  'bg-gradient-to-br from-[#0c110e] via-[#090d0b] to-[#060807]', // Strategy: Subtle charcoal-emerald
  'bg-gradient-to-br from-[#101612] via-[#0c110e] to-[#080b09]', // Execution: Rich dark slate
  'bg-gradient-to-br from-[#141b16] via-[#0f1511] to-[#0a0e0c]', // Growth: Polished dark charcoal
];

export default function LayeredPerformanceEngine({
  steps = [],
  progress = 0,
  onStageClick,
}) {
  // Clamp progress between 0 and 1
  const p = Math.max(0, Math.min(1, progress));

  // Continuous right-to-left layer transitions with minimal dead space:
  // Panel 0 (Discovery): Always stationary at offset 0%
  // Panel 1 (Strategy): Enters between p: 0.05 and 0.34
  const t1 = Math.max(0, Math.min(1, (p - 0.05) / 0.29));
  const offset1 = (1 - t1) * 100;

  // Panel 2 (Execution): Enters between p: 0.36 and 0.66
  const t2 = Math.max(0, Math.min(1, (p - 0.36) / 0.30));
  const offset2 = (1 - t2) * 100;

  // Panel 3 (Growth): Enters between p: 0.68 and 0.98
  const t3 = Math.max(0, Math.min(1, (p - 0.68) / 0.30));
  const offset3 = (1 - t3) * 100;

  const panelOffsets = [0, offset1, offset2, offset3];

  // Current active stage for bottom timeline indicator
  let activeStageIdx = 0;
  if (p >= 0.84) {
    activeStageIdx = 3;
  } else if (p >= 0.52) {
    activeStageIdx = 2;
  } else if (p >= 0.20) {
    activeStageIdx = 1;
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      {/* OVERLAPPING FULL-SCREEN SHEET PANELS */}
      <div className="relative flex-1 w-full overflow-hidden">
        {steps.map((step, idx) => {
          const offset = panelOffsets[idx];
          const zIndex = (idx + 1) * 10;
          const bgClass = PANEL_BACKGROUNDS[idx] || 'bg-[#080b09]';

          return (
            <div
              key={step.title || idx}
              className={`absolute inset-0 w-full h-full ${bgClass} will-change-transform flex items-center ${
                idx > 0
                  ? 'border-l border-[#2AB182]/40 shadow-[-30px_0_60px_rgba(0,0,0,0.9)]'
                  : ''
              }`}
              style={{
                transform: `translate3d(${offset}%, 0, 0)`,
                zIndex,
              }}
            >
              {/* Balanced editorial layout without excess empty space */}
              <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-10 lg:px-12 py-3 md:py-6 h-full flex items-center overflow-y-auto no-scrollbar">
                <div className="w-full flex flex-col justify-center">
                  
                  {/* Step Title Header: Clean, balanced subheading matching homepage scale, no numerical labels */}
                  <div className="mb-4 sm:mb-6 border-b border-white/10 pb-3 sm:pb-4 flex items-center justify-between">
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#2AB182] font-semibold">
                      METHODOLOGY
                    </span>
                  </div>

                  {/* 7 Deliverables: Spacious and balanced 2-column editorial grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-3 sm:gap-y-3.5">
                    {step.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-start gap-3.5 group transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182] mt-2 shrink-0 shadow-[0_0_6px_rgba(42,177,130,0.7)] group-hover:scale-125 transition-transform" />
                        <span className="text-sm sm:text-base md:text-[17px] text-zinc-300 font-body leading-relaxed group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM METHODOLOGY TIMELINE (No numerical labels, clean stage names) */}
      <div className="shrink-0 z-50 border-t border-white/5 bg-black/85 backdrop-blur-md px-6 py-3 select-none">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
          {steps.map((s, idx) => {
            const isActive = activeStageIdx === idx;
            return (
              <button
                key={s.title || idx}
                type="button"
                onClick={() => onStageClick && onStageClick(idx)}
                className="group flex-1 min-w-[110px] text-left transition-all duration-300 cursor-pointer"
              >
                <div className="mb-1.5">
                  <span
                    className={`font-display text-xs sm:text-sm uppercase tracking-wider font-semibold transition-colors ${
                      isActive ? 'text-[#2AB182]' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {/* Progress bar line */}
                <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2AB182] transition-all duration-300"
                    style={{
                      width: isActive ? '100%' : activeStageIdx > idx ? '100%' : '0%',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

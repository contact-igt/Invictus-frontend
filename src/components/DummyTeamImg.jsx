// Dummy image for team members
import React from "react";

const DummyTeamImg = ({ name, role }) => (
  <div className="w-32 h-36 bg-[#222] rounded-xl flex flex-col items-center justify-end shadow-lg overflow-hidden border-2 border-[#2AB182]/40 relative">
    <div className="w-full h-24 bg-gradient-to-t from-[#2AB182]/30 to-[#222]"></div>
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#444] rounded-full border-4 border-[#2AB182]/40 flex items-center justify-center text-[var(--text-primary)] font-bold text-2xl">
      IMG
    </div>
    <div className="w-full px-2 py-2 bg-[#111] text-center">
      <div className="font-display text-[var(--text-primary)] text-base font-bold leading-tight truncate">
        {name}
      </div>
      <div className="font-body text-[#2AB182] text-xs leading-tight truncate">
        {role}
      </div>
    </div>
  </div>
);

export default DummyTeamImg;

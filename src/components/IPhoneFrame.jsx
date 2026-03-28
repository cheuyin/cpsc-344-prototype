import { useState, useEffect } from 'react';

const PHONE_W = 393;
const PHONE_H = 852;
const PADDING = 40;

export default function IPhoneFrame({ children }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      const s = Math.min(1, (window.innerHeight - PADDING) / PHONE_H);
      setScale(s);
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div style={{ width: PHONE_W * scale, height: PHONE_H * scale }}>
      <div
        className="origin-top-left"
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${scale})`,
        }}
      >
        {/* iPhone outer shell */}
        <div className="relative bg-black rounded-[60px] p-3.5 shadow-2xl w-full h-full">
          {/* Screen */}
          <div className="relative w-full h-full bg-white rounded-[48px] overflow-hidden flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-[10px]">
              <div className="w-[126px] h-[37px] bg-black rounded-full" />
            </div>

            {/* Status bar */}
            <div className="relative z-40 flex justify-between items-center px-8 pt-[14px] pb-0 h-[54px] text-[14px] font-semibold shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                  <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.3" />
                  <rect x="5" y="2" width="3" height="10" rx="1" opacity="0.5" />
                  <rect x="10" y="1" width="3" height="11" rx="1" opacity="0.7" />
                  <rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                  <path d="M8 3.6a6.3 6.3 0 014.5 1.8l1.1-1.1A8.1 8.1 0 008 1.5a8.1 8.1 0 00-5.6 2.8L3.5 5.4A6.3 6.3 0 018 3.6z" />
                  <path d="M8 6.8a3.5 3.5 0 012.5 1l1.1-1.1A5.3 5.3 0 008 5a5.3 5.3 0 00-3.6 1.7L5.5 7.8A3.5 3.5 0 018 6.8z" />
                  <circle cx="8" cy="10" r="1.5" />
                </svg>
                <svg width="27" height="13" viewBox="0 0 27 13" fill="currentColor">
                  <rect x="0" y="1" width="22" height="11" rx="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
                  <rect x="1.5" y="2.5" width="16" height="8" rx="1.5" />
                  <rect x="23" y="4.5" width="3" height="4" rx="1" opacity="0.4" />
                </svg>
              </div>
            </div>

            {/* App content */}
            <div className="flex-1 min-h-0 flex flex-col">
              {children}
            </div>

            {/* Home indicator */}
            <div className="flex justify-center pb-2 pt-1 shrink-0">
              <div className="w-[134px] h-[5px] bg-black rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

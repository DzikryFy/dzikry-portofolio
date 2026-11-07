'use client';

import React, { useState, useEffect } from 'react';

export const StarCoordinates: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [timeStr, setTimeStr] = useState<string>('--:--:--');
  const [degree, setDegree] = useState<number>(142.4);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('id-ID', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      setDegree(Number((142.4 + (sec / 60) * 15).toFixed(2)));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-brass/20 bg-void-900/60 backdrop-blur-md text-[11px] font-mono text-parchment-dim select-none ${className}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-brass animate-pulse" />
      <span className="text-parchment font-semibold">{timeStr} WIB</span>
      <span className="text-brass/40">|</span>
      <span>DEPOK, ID</span>
      <span className="text-brass/40">|</span>
      <span className="hidden sm:inline text-parchment-dim">06°24&apos;LS 106°49&apos;BT</span>
    </div>
  );
};

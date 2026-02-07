import React, { useState, useEffect, useRef } from 'react';

const SyncWave: React.FC = () => {
  const [gameScore, setGameScore] = useState(0);
  const [scale, setScale] = useState(1);
  const growingRef = useRef(true);
  const rippleRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  const animate = () => {
    setScale((prevScale) => {
      let nextScale = prevScale;
      if (growingRef.current) {
        nextScale += 0.015;
        if (nextScale >= 1.8) growingRef.current = false;
      } else {
        nextScale -= 0.015;
        if (nextScale <= 0.8) growingRef.current = true;
      }
      return nextScale;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleSync = () => {
    // Sweet spot is between 1.4 and 1.6
    if (scale > 1.35 && scale < 1.65) {
      setGameScore(prev => prev + 10);
      if (rippleRef.current) {
        rippleRef.current.style.borderColor = '#00f2ff';
        rippleRef.current.style.boxShadow = '0 0 30px #00f2ff';
        setTimeout(() => {
          if (rippleRef.current) {
            rippleRef.current.style.borderColor = 'rgba(0, 242, 255, 0.4)';
            rippleRef.current.style.boxShadow = 'none';
          }
        }, 200);
      }
    } else {
      setGameScore(prev => Math.max(0, prev - 5));
      if (rippleRef.current) {
        rippleRef.current.style.borderColor = '#ff0055';
        rippleRef.current.style.boxShadow = '0 0 30px #ff0055';
        setTimeout(() => {
          if (rippleRef.current) {
            rippleRef.current.style.borderColor = 'rgba(0, 242, 255, 0.4)';
            rippleRef.current.style.boxShadow = 'none';
          }
        }, 200);
      }
    }
  };

  return (
    <div className="hex-card p-8 h-full min-h-[450px] flex flex-col items-center justify-between border-cyan-500/20 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center w-full mb-6 relative z-10">
        <h2 className="text-[10px] font-sync text-cyan-400 tracking-[0.2em]">SYNC-WAVE</h2>
        <span className="text-xs font-bold text-white tabular-nums">LVL {String(gameScore).padStart(2, '0')}</span>
      </div>
      
      <div 
        onClick={handleSync}
        className="flex-1 w-full bg-black/50 rounded-3xl relative overflow-hidden flex items-center justify-center cursor-pointer group"
      >
        <div 
          ref={rippleRef}
          className="w-24 h-24 border-2 border-cyan-500/40 rounded-full flex items-center justify-center transition-all duration-100 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_#00f2ff] animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        
        {/* Alignment zones */}
        <div className="absolute w-36 h-36 border border-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute w-40 h-40 border border-cyan-500/10 rounded-full pointer-events-none animate-ping opacity-20"></div>
      </div>

      <div className="mt-8 text-center relative z-10">
        <p className="text-[9px] text-slate-500 tracking-[0.3em] font-sync leading-loose uppercase">
          CLICK WHEN THE RIPPLE ALIGNS TO GENERATE FLOW ENERGY
        </p>
      </div>
    </div>
  );
};

export default SyncWave;
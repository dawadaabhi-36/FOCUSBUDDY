import React from 'react';
import { Mood, AIAdvice } from '../types';
import { MOOD_CONFIGS } from '../constants';

interface MoodSelectorProps {
  currentMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
  advice: AIAdvice | null;
  isLoading: boolean;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onSelectMood, advice, isLoading }) => {
  const moods: Mood[] = ['zen', 'beast', 'chaos'];

  return (
    <div className="space-y-8">
      {/* Daily Insight Hex Card */}
      <div className="hex-card p-10 aspect-square flex flex-col justify-center items-center text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
        <h3 className="text-cyan-400 text-[10px] uppercase font-bold mb-6 tracking-[0.3em] font-sync">Daily Insight</h3>
        
        <div className="min-h-[100px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          ) : advice ? (
            <p className="text-sm font-light leading-relaxed text-slate-200 animate-in fade-in duration-700 italic">
              "{advice.innovationThought}"
            </p>
          ) : (
            <p className="text-sm font-light leading-relaxed text-slate-400 italic">
              "The best way to predict the future is to architect it. Sync your frequency."
            </p>
          )}
        </div>

        <button 
          onClick={() => currentMood && onSelectMood(currentMood)}
          className="mt-8 text-[9px] border border-cyan-500/30 px-5 py-2 rounded-full hover:bg-cyan-500 hover:text-black transition-all font-bold tracking-widest uppercase"
        >
          RECALIBRATE
        </button>
      </div>

      {/* Frequency Switcher */}
      <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 shadow-xl">
        <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-6 tracking-[0.3em] font-sync text-center">Neural Frequencies</h3>
        <div className="flex gap-4">
          {moods.map((key) => {
            const config = MOOD_CONFIGS[key];
            const isActive = currentMood === key;
            return (
              <button
                key={key}
                onClick={() => onSelectMood(key)}
                className={`
                  flex-1 p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2
                  ${isActive 
                    ? 'bg-cyan-500 text-black shadow-[0_0_20px_#00f2ff]' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-400'
                  }
                `}
                title={config.label}
              >
                <span className="text-xl">{config.icon}</span>
                <span className="text-[8px] font-bold uppercase tracking-tighter">{key}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;
import React from 'react';
import { Task } from '../types';

interface EfficiencyReportProps {
  tasks: Task[];
}

const EfficiencyReport: React.FC<EfficiencyReportProps> = ({ tasks }) => {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const focusScore = (done * 1.5).toFixed(1);

  return (
    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 shadow-2xl">
      <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-6 tracking-[0.3em] font-sync text-center lg:text-left">System Report</h3>
      <div className="space-y-6">
        <div className="flex justify-between items-center p-4 bg-black/20 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Tasks Resolved</span>
          <span className="text-xl font-light text-white tabular-nums">{done}</span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-black/20 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Focus Score</span>
          <span className="text-xl font-bold text-cyan-400 tabular-nums neon-text-glow">{focusScore}</span>
        </div>

        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${done > 2 ? 'bg-cyan-500 shadow-[0_0_8px_#00f2ff]' : 'bg-slate-700'}`}></div>
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-[0.2em]">
              Pulse Rate: <span className={done > 2 ? 'text-cyan-400' : 'text-slate-400'}>{done > 2 ? 'ENERGIZED' : 'STABLE'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyReport;
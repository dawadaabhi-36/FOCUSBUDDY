import React, { useState } from 'react';
import { Task } from '../types';

interface TaskHubProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskHub: React.FC<TaskHubProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTask(inputValue.trim());
    setInputValue('');
  };

  return (
    <section className="glass p-8 lg:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
        <span className="text-6xl font-sync font-bold text-white/5">GRID</span>
      </div>

      <div className="mb-12 relative z-10">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Inject task into neural grid..."
            className="w-full bg-white/5 rounded-2xl py-5 px-8 outline-none border border-white/10 focus:border-cyan-400 transition-all text-sm font-light placeholder:text-slate-600"
          />
          <button 
            type="submit"
            className="bg-cyan-500 text-black px-10 py-5 rounded-2xl font-black hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] transition-all uppercase tracking-widest text-xs"
          >
            ADD
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 custom-scroll space-y-4 relative z-10">
        {tasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-30">
            <div className="w-16 h-16 border border-dashed border-slate-500 rounded-full mb-4 animate-spin [animation-duration:10s]"></div>
            <p className="text-sm font-light tracking-widest uppercase">Awaiting Neural Directives...</p>
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={`
                group flex items-center gap-6 p-6 rounded-[2rem] border transition-all duration-300
                ${task.completed 
                  ? 'bg-cyan-500/5 border-cyan-500/10 opacity-40 grayscale' 
                  : 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-cyan-500/30'}
              `}
            >
              <div 
                onClick={() => onToggleTask(task.id)}
                className={`
                  w-8 h-8 rounded-full border border-cyan-500 cursor-pointer flex items-center justify-center transition-all
                  ${task.completed ? 'bg-cyan-500 shadow-[0_0_15px_#00f2ff]' : 'hover:shadow-[0_0_10px_#00f2ff]'}
                `}
              >
                {task.completed && <span className="text-black text-xs font-black">✔</span>}
              </div>
              
              <span className={`flex-1 text-sm font-light tracking-wide ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {task.text}
              </span>

              <button
                onClick={() => onDeleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-cyan-400 transition-all uppercase text-[9px] font-bold tracking-widest"
              >
                DELETE
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TaskHub;
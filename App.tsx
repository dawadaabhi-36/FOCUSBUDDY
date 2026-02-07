import React, { useState, useEffect, useCallback } from 'react';
import { Mood, Task, AIAdvice } from './types';
import MoodSelector from './components/MoodSelector';
import TaskHub from './components/TaskHub';
import EfficiencyReport from './components/EfficiencyReport';
import SyncWave from './components/SyncWave';
import { getStudyAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [mood, setMood] = useState<Mood | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('neural_flow_abhi');
    return saved ? JSON.parse(saved) : [];
  });
  const [advice, setAdvice] = useState<AIAdvice | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

  useEffect(() => {
    localStorage.setItem('neural_flow_abhi', JSON.stringify(tasks));
  }, [tasks]);

  const handleUpdateAdvice = useCallback(async (currentMood: Mood, currentTasks: Task[]) => {
    setIsLoadingAdvice(true);
    try {
      const result = await getStudyAdvice(currentMood, currentTasks);
      setAdvice(result);
    } catch (error) {
      console.error("Neural Core Link Fail:", error);
    } finally {
      setIsLoadingAdvice(false);
    }
  }, []);

  const selectMood = (newMood: Mood) => {
    setMood(newMood);
    handleUpdateAdvice(newMood, tasks);
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      completed: false,
      createdAt: Date.now()
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    if (mood) handleUpdateAdvice(mood, updatedTasks);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    if (mood) handleUpdateAdvice(mood, updatedTasks);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 lg:py-20">
      <header className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-8">
        <div className="relative">
          <h1 className="text-5xl lg:text-7xl font-bold font-sync tracking-tighter leading-none neon-text-glow">
            NEURAL<br /><span className="text-cyan-400">FLOW</span>
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <span className="glow-dot"></span>
            <p className="text-[9px] tracking-[0.5em] text-slate-500 uppercase font-sync">
              Architecture by <span className="text-white">Abhi Dawada</span>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex gap-16">
          <div className="text-right">
            <p className="text-[10px] text-cyan-500 uppercase font-bold tracking-[0.3em] mb-1 font-sync">Core Pulse</p>
            <p className="text-3xl font-light tracking-tighter italic text-white">OPTIMAL</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-cyan-500 uppercase font-bold tracking-[0.3em] mb-1 font-sync">Neural Rank</p>
            <p className="text-3xl font-light tracking-tighter italic text-white uppercase">Alpha-1</p>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
        {/* Left Col: Strategy & Reports */}
        <div className="lg:col-span-3 space-y-12">
          <MoodSelector 
            currentMood={mood} 
            onSelectMood={selectMood} 
            advice={advice} 
            isLoading={isLoadingAdvice} 
          />
          <EfficiencyReport tasks={tasks} />
        </div>

        {/* Center Col: Neural Grid */}
        <div className="lg:col-span-6 min-h-[600px]">
          <TaskHub 
            tasks={tasks} 
            onAddTask={addTask} 
            onToggleTask={toggleTask} 
            onDeleteTask={deleteTask} 
          />
        </div>

        {/* Right Col: Sync Wave */}
        <div className="lg:col-span-3">
          <SyncWave />
        </div>
      </main>

      <footer className="mt-32 text-center border-t border-white/5 pt-12">
        <div className="flex flex-wrap justify-center gap-12 lg:gap-24 mb-8 opacity-20">
          {['SYNCHRONICITY', 'FLOW_MODULATION', 'NEURAL_GRID', 'ARCHITECT_CORE'].map(word => (
            <span key={word} className="text-[9px] font-bold tracking-[0.6em] text-white font-sync">{word}</span>
          ))}
        </div>
        <p className="text-slate-700 text-[9px] font-bold uppercase tracking-[0.3em]">
          Neural-Flow Propulsion Protocol // Systems Operational // 2024
        </p>
      </footer>
    </div>
  );
};

export default App;
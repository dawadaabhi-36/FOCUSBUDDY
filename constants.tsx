import { Mood, MoodConfig } from './types';

export const MOOD_CONFIGS: Record<Mood, MoodConfig> = {
  zen: {
    icon: '🧘',
    label: 'Zen Frequency',
    bgColor: 'bg-indigo-500/10',
    accentColor: 'text-indigo-400',
    shadowColor: 'shadow-indigo-500/20'
  },
  beast: {
    icon: '⚡',
    label: 'Beast Frequency',
    bgColor: 'bg-rose-500/10',
    accentColor: 'text-rose-400',
    shadowColor: 'shadow-rose-500/20'
  },
  chaos: {
    icon: '🌀',
    label: 'Chaos Frequency',
    bgColor: 'bg-amber-500/10',
    accentColor: 'text-amber-400',
    shadowColor: 'shadow-amber-500/20'
  }
};
export type Mood = 'zen' | 'beast' | 'chaos';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface AIAdvice {
  protocolName: string;
  innovationThought: string;
  quote: string;
  strategy: string;
  actionSteps: string[];
  vibe: string;
}

export interface MoodConfig {
  icon: string;
  label: string;
  bgColor: string;
  accentColor: string;
  shadowColor: string;
}
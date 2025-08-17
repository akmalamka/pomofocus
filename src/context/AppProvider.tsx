import {  useState } from 'react';
import { AppContext } from '.';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [focusLength, setFocusLength] = useState<number | null>(25);
  const [shortBreakLength, setShortBreakLength] = useState<number | null>(5);
  const [longBreakLength, setLongBreakLength] = useState<number | null>(15);
  const [pomodoroCount, setPomodoroCount] = useState<number | null>(4);

  return (
    <AppContext.Provider value={{ focusLength, setFocusLength, shortBreakLength, setShortBreakLength, longBreakLength, setLongBreakLength, pomodoroCount, setPomodoroCount }}>
      {children}
    </AppContext.Provider>
  );
}

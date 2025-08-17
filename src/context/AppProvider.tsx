import {  useEffect, useState } from 'react';
import { AppContext, getStoredValue } from '.';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [taskName, setTaskName] = useState<string>(getStoredValue('taskName', ''));
  const [focusLength, setFocusLength] = useState<number | null>(getStoredValue('focusLength', 25));
  const [shortBreakLength, setShortBreakLength] = useState<number | null>(getStoredValue('shortBreakLength', 5));
  const [longBreakLength, setLongBreakLength] = useState<number | null>(getStoredValue('longBreakLength', 15));
  const [pomodoroCount, setPomodoroCount] = useState<number | null>(getStoredValue('pomodoroCount', 4));


  // Save to localStorage whenever values change
  // TODO: save changes to localStorage when the drawer is closed

  useEffect(() => {
    localStorage.setItem('taskName', JSON.stringify(taskName));
  }, [taskName]);
  
  useEffect(() => {
    localStorage.setItem('focusLength', JSON.stringify(focusLength));
  }, [focusLength]);

  useEffect(() => {
    localStorage.setItem('shortBreakLength', JSON.stringify(shortBreakLength));
  }, [shortBreakLength]);

  useEffect(() => {
    localStorage.setItem('longBreakLength', JSON.stringify(longBreakLength));
  }, [longBreakLength]);

  useEffect(() => {
    localStorage.setItem('pomodoroCount', JSON.stringify(pomodoroCount));
  }, [pomodoroCount]);
 
  
  return (
    <AppContext.Provider value={{ taskName, setTaskName, focusLength, setFocusLength, shortBreakLength, setShortBreakLength, longBreakLength, setLongBreakLength, pomodoroCount, setPomodoroCount }}>
      {children}
    </AppContext.Provider>
  );
}

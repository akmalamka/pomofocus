import { createContext, useContext } from 'react'

interface AppContextType {
  taskName: string
  setTaskName: (name: string) => void
  focusLength: number | null
  setFocusLength: (newLength: number | null) => void
  shortBreakLength: number | null
  setShortBreakLength: (newLength: number | null) => void
  longBreakLength: number | null
  setLongBreakLength: (newLength: number | null) => void
  pomodoroUntilLongBreak: number | null
  setPomodoroUntilLongBreak: (newCount: number | null) => void
  currentMode: 'focus' | 'shortBreak' | 'longBreak'
  setCurrentMode: (mode: 'focus' | 'shortBreak' | 'longBreak') => void
  displayTimer: boolean
  setDisplayTimer: (newValue: boolean) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export function getStoredValue<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined')
    return defaultValue
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : defaultValue
}

export function useAppProvider() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useProvider must be used within an AppProvider')
  }
  return context
}

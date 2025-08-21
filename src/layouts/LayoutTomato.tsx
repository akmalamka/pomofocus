import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { useAppProvider } from '../context'
import CoreTomato from '../core/CoreTomato'

interface LayoutTomatoProps {
  timeLeft: number
  totalTime: number
}

export default function LayoutTomato({ children, timeLeft, totalTime }: PropsWithChildren<LayoutTomatoProps>) {
  const { currentMode, pomodoroUntilLongBreak } = useAppProvider()

  // Update progress as timeLeft or totalTime changes
  const progress = useMemo(() => {
    if (totalTime === 0)
      return 0
    return 1 - timeLeft / totalTime
  }, [timeLeft, totalTime])

  const baseColor = useMemo(() => {
    switch (currentMode) {
      case 'focus':
        return 'var(--color-focus)'
      case 'shortBreak':
        return 'var(--color-short-break)'
      case 'longBreak':
        return 'var(--color-long-break)'
      default:
        return ''
    }
  }, [currentMode])

  const fillColor = useMemo(() => {
    if (currentMode === 'focus') {
      if (pomodoroUntilLongBreak && pomodoroUntilLongBreak > 1) {
        return 'var(--color-short-break)'
      }
      else {
        return 'var(--color-long-break)'
      }
    }
    return 'var(--color-focus)'
  }, [currentMode, pomodoroUntilLongBreak])
  return (
    <div className="relative w-full h-full max-h-[85dvh] top-[8dvh] z-20">
      <div className="flex flex-col items-center w-3/5 justify-between absolute inset-0 top-1/2 left-1/2 -translate-1/2 text-center gap-2 sm:gap-4">
        {children}
      </div>
      <CoreTomato
        baseColor={baseColor}
        fillColor={fillColor}
        progress={progress}
        className="absolute -z-1 inset-0 m-auto max-h-[85dvh] w-auto"
      />
    </div>
  )
}

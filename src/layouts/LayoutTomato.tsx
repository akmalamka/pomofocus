import { useMemo } from 'react'
import { useAppProvider } from '../context'
import CoreTomato from '../core/CoreTomato'

export default function LayoutTomato({ children }: { children: React.ReactNode }) {
  const { currentMode } = useAppProvider()

  const tomatoColor = useMemo(() => {
    switch (currentMode) {
      case 'focus':
        return '#E61004'
      case 'shortBreak':
        return '#D18D24'
      case 'longBreak':
        return '#405647'
      default:
        return ''
    }
  }, [currentMode])
  return (
    <div className="relative w-full h-full max-h-[85dvh] top-[8dvh] z-20">
      <div className="flex flex-col items-center w-3/5 justify-between absolute inset-0 top-1/2 left-1/2 -translate-1/2 text-center gap-4">
        {children}
      </div>
      <CoreTomato color={tomatoColor} className="absolute -z-1 inset-0 m-auto max-h-[85dvh] w-auto" />
    </div>
  )
}

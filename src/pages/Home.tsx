import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useState } from 'react'
import { useAppProvider } from '../context'
import CoreButton from '../core/CoreButton'
import CoreTimer from '../core/CoreTimer'
import { useGreeting } from '../hooks/use-greeting'
import LayoutTomato from '../layouts/LayoutTomato'

export default function Home() {
  const { taskName, setTaskName, displayTimer, setDisplayTimer, currentMode } = useAppProvider()
  const [tempTaskName, setTempTaskName] = useState(taskName)

  function handleContinue() {
    setTaskName(tempTaskName)
    setDisplayTimer(true)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTaskName(e.target.value)
  }

  const greeting = useGreeting()

  const headingText = useMemo(() => {
    if (displayTimer) {
      if (taskName.length === 0) {
        switch (currentMode) {
          case 'focus':
            return 'Let’s get things done'
          case 'shortBreak':
            return 'Breathe and reset'
          case 'longBreak':
            return 'Step away, refresh fully'
          default:
            return ''
        }
      }
      return taskName
    }
    else {
      return greeting
    }
  }, [displayTimer, currentMode])

  useEffect(() => {
    setTempTaskName('')
  }, [displayTimer])

  return (
    <section className="flex justify-center h-screen w-screen relative overflow-hidden">
      <div className="container h-full relative max-w-3/5 flex flex-col items-center justify-center gap-4">
        <Typography color="creme" variant="h1" className="absolute top-10 h-24">
          {headingText}
        </Typography>
        <LayoutTomato>
          {displayTimer
            ? <CoreTimer />
            : (
                <>
                  <Typography color="white" variant="h2">
                    Let's Start
                  </Typography>
                  {/* TODO: add max character so it displays smoothly */}
                  <TextField color="primary" placeholder="What would you like to accomplish today?" variant="outlined" value={tempTaskName} onChange={handleInputChange} />
                  <div className="flex gap-4">
                    <CoreButton color="primary" disabled={!tempTaskName} onClick={handleContinue} title="Continue" />
                    <CoreButton color="white" onClick={() => setDisplayTimer(true)} title="Skip" />
                  </div>
                </>
              )}
        </LayoutTomato>
      </div>
    </section>
  )
}

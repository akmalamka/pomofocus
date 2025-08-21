import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useState } from 'react'
import { useAppProvider } from '../context'
import CoreButton from '../core/CoreButton'
import CoreTimer from '../core/CoreTimer'
import { useGreeting } from '../hooks/use-greeting'
import LayoutTomato from '../layouts/LayoutTomato'

const MAX_TEXT_INPUT_CHARS = 20

export default function Home() {
  const { taskName, setTaskName, displayTimer, setDisplayTimer, currentMode, focusLength, shortBreakLength, longBreakLength } = useAppProvider()
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

  const initialTime = useMemo(() => {
    switch (currentMode) {
      case 'focus':
        return focusLength
      case 'shortBreak':
        return shortBreakLength
      case 'longBreak':
        return longBreakLength
      default:
        return focusLength
    }
  }, [currentMode, focusLength, shortBreakLength, longBreakLength])

  const [timeLeft, setTimeLeft] = useState(initialTime! * 60) // Convert minutes to seconds

  // Everytime time in option changes, reset the timer
  useEffect(() => {
    setTimeLeft(initialTime! * 60) // Convert minutes to seconds
  }, [initialTime])

  useEffect(() => {
    setTempTaskName('')
  }, [displayTimer])

  return (
    <section className="flex justify-center h-screen w-screen relative overflow-hidden">
      <div className="container h-full relative max-w-3/5 flex flex-col items-center justify-center gap-4">
        <Typography color="creme" variant="h1" className="absolute top-10 h-24 text-center">
          {headingText}
        </Typography>
        {initialTime !== null
          ? (
              <LayoutTomato timeLeft={timeLeft} totalTime={initialTime * 60}>
                {displayTimer
                  ? <CoreTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} initialTime={initialTime * 60} />
                  : (
                      <>
                        <Typography color="white" variant="h2">
                          Let's Start
                        </Typography>
                        <div className="flex flex-col w-full gap-1">
                          <TextField color="primary" placeholder="What would you like to accomplish today?" variant="outlined" value={tempTaskName} onChange={handleInputChange} slotProps={{ htmlInput: { maxLength: 20 } }} />
                          <Typography color="white" variant="subtitle1" className="self-end">
                            {tempTaskName.length}
                            /
                            {MAX_TEXT_INPUT_CHARS}
                          </Typography>
                        </div>
                        <div className="flex gap-4">
                          <CoreButton color="primary" disabled={!tempTaskName} onClick={handleContinue} title="Continue" />
                          <CoreButton color="white" onClick={() => setDisplayTimer(true)} title="Skip" />
                        </div>
                      </>
                    )}
              </LayoutTomato>
            )
          : null}

      </div>
    </section>
  )
}

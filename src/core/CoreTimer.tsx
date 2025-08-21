import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppProvider } from '../context'
import CoreButton from './CoreButton'

interface CoreTimerProps {
  timeLeft: number
  initialTime: number
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>
}
export default function CoreTimer({ timeLeft, setTimeLeft, initialTime }: CoreTimerProps) {
  const { currentMode, setCurrentMode, pomodoroUntilLongBreak, setPomodoroUntilLongBreak } = useAppProvider()
  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef<number | null>(null)

  // Handle every time isRunning is changed
  // If isRunning is true, start the timer
  // If isRunning is false, clear the timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0)
            return prev - 1
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          return 0
        })
      }, 1000)
    }
    else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    // cleanup on unmount
    return () => {
      if (intervalRef.current)
        clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const toggleTimer = () => {
    setIsRunning(prev => !prev)
  }

  // Play sound when it hits 0
  useEffect(() => {
    if (timeLeft === 0) {
      const audio = new Audio('/chime-sound.mp3')
      audio.play().catch(err => console.error('Audio play error:', err))
    }
  }, [timeLeft])

  function resetTimer() {
    clearInterval(intervalRef.current!)
    intervalRef.current = null
    setTimeLeft(initialTime)
    setIsRunning(false)
  }

  function handleSkipBreak() {
    clearInterval(intervalRef.current!)
    intervalRef.current = null
    setCurrentMode('focus')
    setIsRunning(false)
  }

  // If timeLeft reaches 0, reset the timer and change mode if necessary
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(initialTime) // Reset to initial time in seconds

      if (currentMode === 'focus') {
        if (pomodoroUntilLongBreak && pomodoroUntilLongBreak > 1) {
          setPomodoroUntilLongBreak(pomodoroUntilLongBreak - 1)
          setCurrentMode('shortBreak')
        }
        else {
          setCurrentMode('longBreak')
        }
      }
      else {
        setCurrentMode('focus')
      }
    }
  }, [timeLeft])

  const currentModeText = useMemo(() => {
    switch (currentMode) {
      case 'focus':
        return 'Focus'
      case 'shortBreak':
        return 'Short Break'
      case 'longBreak':
        return 'Long Break'
      default:
        return ''
    }
  }, [currentMode])

  const minutes = useMemo(() => String(Math.floor(timeLeft / 60)).padStart(2, '0'), [timeLeft])
  const seconds = useMemo(() => String(timeLeft % 60).padStart(2, '0'), [timeLeft])

  return (
    <>
      <Typography color="white" variant="h2">{currentModeText}</Typography>
      <Typography variant="h4" color="white" className={`text-[200px] leading-[normal] ${timeLeft < 10 ? 'animate-wiggle' : ''}`}>
        {timeLeft !== null
          ? (
              <div className="flex items-center gap-1">
                {[...minutes].map((digit, i) => (
                  <span key={`m-${i}`} className="inline-block w-[1ch] text-center">
                    {digit}
                  </span>
                ))}
                <span className="inline-block text-center">:</span>
                {[...seconds].map((digit, i) => (
                  <span key={`s-${i}`} className="inline-block w-[1ch] text-center">
                    {digit}
                  </span>
                ))}
              </div>
            )
          : null}

      </Typography>
      <div className="flex flex-col gap-4 max-w-60% justify-center items-center">
        <div className="flex gap-4">
          <CoreButton color="primary" onClick={toggleTimer} title={isRunning ? 'Pause' : 'Start'} />
          <CoreButton color="white" onClick={resetTimer} title="Reset" />
        </div>
        { currentMode === 'shortBreak' || currentMode === 'longBreak'
          ? (
              <CoreButton color="white" onClick={handleSkipBreak} title="Skip Break" />
            )
          : null}
      </div>
    </>
  )
}

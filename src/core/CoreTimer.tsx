import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppProvider } from '../context'
import CoreButton from './CoreButton'

export default function CoreTimer() {
  const { focusLength, shortBreakLength, longBreakLength, currentMode, setCurrentMode, pomodoroUntilLongBreak, setPomodoroUntilLongBreak } = useAppProvider()
  const [isRunning, setIsRunning] = useState(false)

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
    setTimeLeft(initialTime! * 60)
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
      // clearInterval(intervalRef.current!);
      // intervalRef.current = null;
      setTimeLeft(initialTime! * 60) // Reset to initial time in seconds

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

  const currentColor = useMemo(() => {
    // start = #E61004 → (230, 16, 4)
    // end   = #E66559 → (230, 101, 89)
    const startColor = [230, 16, 4]
    // const endColor = [230, 101, 89];
    const endColor = [23, 119, 33]

    const progress = 1 - timeLeft / (initialTime! * 60)

    return startColor.map((c, i) =>
      Math.round(c + (endColor[i] - c) * progress),
    )
  }, [timeLeft, initialTime])

  useEffect(() => {
    // This effect is used to update the gradient color when currentColor changes
  }, [currentColor])
  // useEffect(() => {
  //   const progress = 1 - timeLeft / (initialTime! * 60);

  //   // start = #E61004 → (230, 16, 4)
  //   // end   = #E66559 → (230, 101, 89)
  //   const startColor = [230, 16, 4];
  //   const endColor = [230, 101, 89];

  //   // const currentColor = startColor.map((c, i) =>
  //   //   Math.round(c + (endColor[i] - c) * progress)
  //   // );

  // }, [currentMode, initialTime]);

  const currentModeDisplay = useMemo(() => {
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

  return (
    <>
      {/* <CoreTomatoIcon
        // className="w-screen h-screen absolute left-1/2 top-1/2 -translate-1/2 -z-1 text-blue-500"
        // currentColor={currentColor}
        // style={{ color: `linear-gradient(135deg, rgb(${currentColor.join(",")}), #000000)` }}
      /> */}
      {/* <img src="/tomato.svg" alt="Logo" className='w-screen h-screen absolute left-1/2 top-1/2 -translate-1/2 -z-1'
        /> */}
      <Typography color="white" variant="h2">{currentModeDisplay}</Typography>
      <Typography variant="h4" color="white" className="text-[200px] leading-[normal]">
        {timeLeft !== null
          ? (
              <div className="w-[5ch] tabular-nums">
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}
                :
                {String(timeLeft % 60).padStart(2, '0')}
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
              <CoreButton color="white" onClick={handleSkipBreak} className="w-fit" title="Skip Break" />
            )
          : null}
      </div>
    </>
  )
}

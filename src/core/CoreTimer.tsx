import { useEffect, useMemo, useRef, useState } from "react";
import { CoreButton } from "./CoreButton";
import { useAppProvider } from "../context";

export default function CoreTimer() {
  const {focusLength, shortBreakLength, longBreakLength, currentMode, setCurrentMode, pomodoroUntilLongBreak, setPomodoroUntilLongBreak} = useAppProvider();
  const [isRunning, setIsRunning] = useState(false);

  const initialTime = useMemo(() => {
    switch (currentMode) {
      case 'focus':
        return focusLength;
      case 'shortBreak':
        return shortBreakLength;
      case 'longBreak':
        return longBreakLength;
      default:
        return focusLength;
    }
  }, [currentMode, focusLength, shortBreakLength, longBreakLength]);
  
  const [timeLeft, setTimeLeft] = useState(initialTime! * 60); // Convert minutes to seconds

  // Everytime time in option changes, reset the timer
  useEffect(() => {
    setTimeLeft(initialTime! * 60); // Convert minutes to seconds
  }, [initialTime]);

  const intervalRef = useRef<number  | null>(null);

  // Handle every time isRunning is changed
  // If isRunning is true, start the timer
  // If isRunning is false, clear the timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  function resetTimer() {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setTimeLeft(initialTime! * 60);
    setIsRunning(false);
  }

  function handleSkipBreak() {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setCurrentMode('focus');
    setIsRunning(false);
  }

  // If timeLeft reaches 0, reset the timer and change mode if necessary
  useEffect(() => {
    if (timeLeft === 0) {
      // clearInterval(intervalRef.current!);
      // intervalRef.current = null;
      setTimeLeft(initialTime! * 60); // Reset to initial time in seconds

      if (currentMode === 'focus') {
        if (pomodoroUntilLongBreak && pomodoroUntilLongBreak > 1) {
          setPomodoroUntilLongBreak(pomodoroUntilLongBreak - 1);
          setCurrentMode('shortBreak');
        } else {
          setCurrentMode('longBreak');
        }
      } else {
        setCurrentMode('focus');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);


  return (
    <div className="flex flex-col items-center">
      <h3 className='text-[200px] leading-[normal]'>
        {timeLeft !== null ?
          <>
            <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(timeLeft % 60).padStart(2, "0")}</span>
          </>
        : null
        }
          
      </h3>
        <div className="flex gap-4">
          <CoreButton variant="outlined" onClick={toggleTimer}>
              {isRunning ? 'Pause' : 'Start'}
          </CoreButton>
          { currentMode === 'shortBreak' || currentMode === 'longBreak' ?
            <CoreButton variant="outlined" onClick={handleSkipBreak}>
              Skip Break
            </CoreButton> : null
          }
          <CoreButton variant="outlined" onClick={resetTimer}>
              Reset
          </CoreButton>
      </div>
    </div>
  );
}

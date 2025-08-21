import { useAppProvider } from '../context'
import CoreButton from '../core/CoreButton'

export default function LayoutFooter() {
  const { displayTimer, setDisplayTimer, setTaskName, setCurrentMode } = useAppProvider()

  function handleNewTask() {
    setTaskName('')
    setCurrentMode('focus')
    setDisplayTimer(false)
  }
  return (displayTimer
    ? (
        <footer className="absolute bottom-10 w-full flex justify-center z-10">
          <div className="container">
            <CoreButton
              color="white"
              onClick={handleNewTask}
              title="New Task"
            />
          </div>
        </footer>
      )
    : null
  )
}

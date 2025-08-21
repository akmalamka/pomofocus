import { useAppProvider } from '../context'
import CoreButton from '../core/CoreButton'

export default function LayoutFooter() {
  const { setDisplayTimer, setTaskName, setCurrentMode } = useAppProvider()

  function handleNewTask() {
    setTaskName('')
    setCurrentMode('focus')
    setDisplayTimer(false)
  }
  return (
    <footer className="absolute bottom-10 w-full flex justify-center">
      <div className="container">
        <CoreButton
          color="white"
          onClick={handleNewTask}
          title="New Task"
        />
      </div>
    </footer>
  )
}

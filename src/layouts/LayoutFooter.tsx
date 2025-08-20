import Button from '@mui/material/Button'
import { useAppProvider } from '../context'

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
        <Button
          color="white"
          onClick={handleNewTask}
        >
          New task
        </Button>
      </div>
    </footer>
  )
}

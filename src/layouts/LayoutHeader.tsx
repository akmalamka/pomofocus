import CloseIcon from '@mui/icons-material/Close'
import SettingsIcon from '@mui/icons-material/Settings'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useAppProvider } from '../context'
import CoreButton from '../core/CoreButton'
import ConfirmDialog from '../core/CoreDialog'
import CoreNumberField from '../core/CoreNumberField'
import './layout.header.css'

export default function LayoutHeader() {
  const { focusLength, setFocusLength, shortBreakLength, setShortBreakLength, longBreakLength, setLongBreakLength, pomodoroUntilLongBreak, setPomodoroUntilLongBreak } = useAppProvider()

  const [tempFocusLength, setTempFocusLength] = useState(focusLength)
  const [tempShortBreakLength, setTempShortBreakLength] = useState(shortBreakLength)
  const [tempLongBreakLength, setTempLongBreakLength] = useState(longBreakLength)
  const [tempPomodoroUntilLongBreak, setTempPomodoroUntilLongBreak] = useState(pomodoroUntilLongBreak)

  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const toggleDrawer = (state: boolean) => () => {
    setOpenDrawer(state)
  }

  const toggleDialog = (state: boolean) => () => {
    setOpenDialog(state)
  }

  function handleSave() {
    setFocusLength(tempFocusLength)
    setShortBreakLength(tempShortBreakLength)
    setLongBreakLength(tempLongBreakLength)
    setPomodoroUntilLongBreak(tempPomodoroUntilLongBreak)
    setOpenDrawer(false)
  }

  return (
    <header className="z-10 fixed left-0 top-0 w-screen bg-transparent flex justify-center">
      <div className="h-[var(--navbar-height)] w-full flex items-start justify-between container my-10">
        <img src="/logo.svg" alt="Pomofocus Logo" className="h-[32px]" />
        <IconButton aria-label="Settings" onClick={toggleDrawer(true)} color="white">
          <SettingsIcon sx={{ fontSize: 24 }} color="primary" className="icon-spin" />
        </IconButton>
      </div>

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <div className="flex min-w-[300px] h-full py-8 px-10 flex-col gap-8">
          <div className="flex items-center justify-between">
            <Typography color="primary" variant="h3">
              Settings
            </Typography>
            <IconButton aria-label="Close" onClick={toggleDialog(true)}>
              <CloseIcon sx={{ fontSize: 24 }} color="primary" className="icon-spin" />
            </IconButton>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex gap-4 flex-col">
              <SettingsItem
                label="Focus length (minutes)"
                value={tempFocusLength}
                onValueChange={setTempFocusLength}
              />
              <SettingsItem
                label="Pomodoros until long break (minutes)"
                value={tempPomodoroUntilLongBreak}
                onValueChange={setTempPomodoroUntilLongBreak}
              />

              <SettingsItem
                label="Short break length (minutes)"
                value={tempShortBreakLength}
                onValueChange={setTempShortBreakLength}
              />

              <SettingsItem
                label="Long break length (minutes)"
                value={tempLongBreakLength}
                onValueChange={setTempLongBreakLength}
              />
            </div>
            <CoreButton color="primary" onClick={handleSave} className="justify-self-end" title="Save" />
          </div>
        </div>
      </Drawer>

      <ConfirmDialog
        open={openDialog}
        title="Save before you go"
        description="Your settings aren’t saved yet. Save them first to keep your changes."
        onClose={() => setOpenDialog(false)}
        onConfirm={() => {
          handleSave()
          setOpenDialog(false)
        }}
      />

    </header>
  )
}

interface SettingsItemProps {
  label: string
  value: number | null
  onValueChange: (newValue: number | null) => void
}

function SettingsItem({ label, value, onValueChange }: SettingsItemProps) {
  return (
    <div className="flex gap-4 justify-between items-center">
      <Typography variant="body2">{label}</Typography>
      <CoreNumberField value={value} onValueChange={onValueChange} />
    </div>
  )
}

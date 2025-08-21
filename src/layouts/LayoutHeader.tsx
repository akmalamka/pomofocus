import CloseIcon from '@mui/icons-material/Close'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useAppProvider } from '../context'
import CoreButton from '../core/CoreButton'
import ConfirmDialog from '../core/CoreDialog'
import CoreNumberField from '../core/CoreNumberField'
import './layout.header.css'

interface SettingConfigType {
  label: string
  information: string
  value: number | null
  onValueChange: (newValue: number | null) => void
}

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

  const settingsConfig: Array<SettingConfigType> = [
    {
      label: 'Focus length (minutes)',
      information: 'Set how long each focus session should last. Default is 25 minutes.',
      value: tempFocusLength,
      onValueChange: setTempFocusLength,
    },
    {
      label: 'Pomodoros until long break',
      information: 'Number of completed pomodoros before a long break starts. Default is 4.',
      value: tempPomodoroUntilLongBreak,
      onValueChange: setTempPomodoroUntilLongBreak,
    },
    {
      label: 'Short break length (minutes)',
      information: 'Duration of short breaks between pomodoros. Default is 5 minutes.',
      value: tempShortBreakLength,
      onValueChange: setTempShortBreakLength,
    },
    {
      label: 'Long break length (minutes)',
      information: 'Duration of the longer break after several pomodoros. Default is 15 minutes.',
      value: tempLongBreakLength,
      onValueChange: setTempLongBreakLength,
    },
  ]

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
              {settingsConfig.map(config => (
                <SettingsItem
                  key={config.label}
                  {...config}
                />
              ))}
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

function SettingsItem({ label, information, value, onValueChange }: SettingConfigType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <div className="flex gap-4 justify-between">
      <div className="flex w-full justify-between items-center">
        <Typography variant="body2">{label}</Typography>
        <IconButton aria-label="More information" onClick={handleClick}>
          <InfoOutlineIcon color="primary" />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiPopover-paper': {
              display: 'flex',
              flexDirection: 'column',
              rowGap: 1,
              borderRadius: '12px',
              px: 2,
              py: 4,
              maxWidth: '200px',
            },
          }}
        >
          <Typography color="primary" variant="h5" className="text-center">
            Information
          </Typography>
          <Typography color="primary" variant="caption" className="text-center">
            {information}
          </Typography>
        </Popover>

      </div>
      <CoreNumberField value={value} onValueChange={onValueChange} />
    </div>
  )
}

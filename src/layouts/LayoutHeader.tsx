import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import CoreNumberField from '../core/CoreNumberField';
import CloseIcon from '@mui/icons-material/Close';
import { useAppProvider } from '../context';
import IconButton from '@mui/material/IconButton';
import { CoreButton } from '../core/CoreButton';

export default function LayoutHeader() {
  const { focusLength, setFocusLength, shortBreakLength, setShortBreakLength, longBreakLength, setLongBreakLength, pomodoroUntilLongBreak, setPomodoroUntilLongBreak} = useAppProvider();

  const [tempFocusLength, setTempFocusLength] = useState(focusLength);
  const [tempShortBreakLength, setTempShortBreakLength] = useState(shortBreakLength);
  const [tempLongBreakLength, setTempLongBreakLength] = useState(longBreakLength);
  const [tempPomodoroUntilLongBreak, setTempPomodoroUntilLongBreak] = useState(pomodoroUntilLongBreak);

  const [open, setOpen] = useState(false);
  
    const toggleDrawer = (state: boolean) => () => {
      setOpen(state);
    };

    function handleSave() {
      setFocusLength(tempFocusLength);
      setShortBreakLength(tempShortBreakLength);
      setLongBreakLength(tempLongBreakLength);
      setPomodoroUntilLongBreak(tempPomodoroUntilLongBreak);
      setOpen(false);
    }

  return (
    <header className="z-10 fixed left-0 top-0 w-screen bg-transparent text-black flex justify-center">
        <div className="h-[var(--navbar-height)] w-full flex items-center justify-between container my-4">
            <span className="heinz text-[40px]">Pomofocus</span>
            <IconButton aria-label="Settings" onClick={toggleDrawer(true)}>
              <SettingsIcon sx={{fontSize: 40}} className='text-black'/>
            </IconButton>
        </div>
        
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className='flex min-w-[300px] h-full py-8 px-10 flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <span className='heinz text-[40px]'>
              Settings
            </span>
            <IconButton aria-label="Close" onClick={toggleDrawer(false)}>
              <CloseIcon sx={{fontSize: 40}} className='text-black'/>
            </IconButton>
          </div>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex gap-4 flex-col'>
              <div className='flex gap-4 justify-between'>
                  <span className='text-[16px]'>Focus length (minutes)</span>
                  <CoreNumberField value={tempFocusLength} onValueChange={setTempFocusLength}/>
                </div>
                <div className='flex gap-4 justify-between'>
                  <span className='text-[16px]'>Pomodoros until long break (minutes)</span>
                  <CoreNumberField value={tempPomodoroUntilLongBreak} onValueChange={setTempPomodoroUntilLongBreak}/>
                </div>
                <div className='flex gap-4 justify-between'>
                  <span className='text-[16px]'>Short break length (minutes)</span>
                  <CoreNumberField value={tempShortBreakLength} onValueChange={setTempShortBreakLength}/>
                </div>
                <div className='flex gap-4 justify-between'>
                  <span className='text-[16px]'>Long break length (minutes)</span>
                  <CoreNumberField value={tempLongBreakLength} onValueChange={setTempLongBreakLength}/>
                </div>
            </div>
            <CoreButton onClick={handleSave} className='justify-self-end'>
              Save
            </CoreButton>
          </div>
          </div>

      </Drawer>
    </header>
  );
}
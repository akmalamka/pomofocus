import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import CoreNumberField from '../core/CoreNumberField';
import CloseIcon from '@mui/icons-material/Close';
import { useAppProvider } from '../context';

export default function LayoutHeader() {
  const { focusLength, setFocusLength, shortBreakLength, setShortBreakLength, longBreakLength, setLongBreakLength, pomodoroUntilLongBreak, setPomodoroUntilLongBreak } = useAppProvider();

  const [open, setOpen] = useState(false);
  
    const toggleDrawer = (state: boolean) => () => {
      setOpen(state);
    };

  return (
    <header className="z-10 fixed left-0 top-0 w-screen bg-transparent text-black flex justify-center">
        <div className="h-[var(--navbar-height)] w-full flex items-center justify-between container my-4">
            <span className="heinz text-[60px]">Pomofocus</span>
            <SettingsIcon sx={{fontSize: 40}} onClick={toggleDrawer(true)}/>
        </div>
        
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className='flex min-w-[300px] py-8 px-10 flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <span className='heinz text-[40px]'>
              Settings
            </span>
            <CloseIcon sx={{fontSize: 40}} onClick={toggleDrawer(false)}/>
          </div>
          <div className='flex gap-4 flex-col'>
            <div className='flex gap-4 justify-between'>
              <span className='text-[16px]'>Focus length (minutes)</span>
              <CoreNumberField value={focusLength} onValueChange={setFocusLength}/>
            </div>
            <div className='flex gap-4 justify-between'>
              <span className='text-[16px]'>Pomodoros until long break (minutes)</span>
              <CoreNumberField value={pomodoroUntilLongBreak} onValueChange={setPomodoroUntilLongBreak}/>
            </div>
            <div className='flex gap-4 justify-between'>
              <span className='text-[16px]'>Short break length (minutes)</span>
              <CoreNumberField value={shortBreakLength} onValueChange={setShortBreakLength}/>
            </div>
            <div className='flex gap-4 justify-between'>
              <span className='text-[16px]'>Long break length (minutes)</span>
              <CoreNumberField value={longBreakLength} onValueChange={setLongBreakLength}/>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
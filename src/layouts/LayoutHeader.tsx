import SettingsIcon from '@mui/icons-material/Settings';

export default function LayoutHeader() {
  return (
    <header className="z-10 fixed left-0 top-0 w-screen bg-transparent text-black flex justify-center">
        <div className="h-[var(--navbar-height)] w-full flex items-center justify-between container my-4">
            <span className="heinz text-[60px]">Pomofocus</span>
            <SettingsIcon sx={{fontSize: 40}} />
        </div>
    </header>
  );
}
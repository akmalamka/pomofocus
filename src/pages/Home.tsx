import CoreInputField from "../core/CoreInputField";
import { useAppProvider } from "../context";
import CoreTimer from "../core/CoreTimer";

export default function Home() {
    const {taskName, setTaskName, currentMode} = useAppProvider();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    };

    function getBackgroundImage() {
        switch (currentMode) {
            case 'focus':
                return 'url(/tomato.svg)';
            case 'shortBreak':
                return 'url(/tomato-light-red.svg)';
            case 'longBreak':
                return 'url(/tomato-green.svg)';
            default:
                return 'url(/tomato.svg)';
        }
    }
   

  return (
    <section className='flex justify-center h-screen w-screen bg-[#EEEEEE]'>
        <div className='container bg-no-repeat bg-cover bg-position-[center_top_30%] h-full w-full flex flex-col items-center justify-end text-center text-[#EEEEEE] pb-16'
        style={{backgroundImage: getBackgroundImage()}}>
            <h1 className='heinz text-[70px]'>{currentMode}</h1>
            <CoreInputField placeholder="What would you like to accomplish today?" variant="standard"  value={taskName} onChange={handleInputChange}/>
            <CoreTimer/>
        </div>
    </section>
    )
}
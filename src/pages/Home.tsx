import CoreInputField from "../core/CoreInputField";
import { CoreButton } from "../core/CoreButton";
import { useRef, useState } from "react";
import { useAppProvider } from "../context";

export default function Home() {
    const [timeLeft, settimeLeft] = useState(10);
    const {taskName, setTaskName} = useAppProvider();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    };
    const intervalRef = useRef<number | null>(null);

    function startTimer() {
    intervalRef.current = setInterval(() => {
      settimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
  }

  function resetTimer() {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    settimeLeft(10);
  }

  return (
    <section className='flex justify-center h-screen w-screen bg-[#EEEEEE]'>
        <div className= 'container bg-[url(/tomato.svg)] bg-no-repeat bg-cover bg-position-[center_top_30%] h-full w-full flex flex-col items-center justify-end text-center text-[#EEEEEE] pb-16'>
            <h1 className='heinz text-[70px]'>Good Morning!</h1>
            <CoreInputField placeholder="What would you like to accomplish today?" variant="standard"  value={taskName} onChange={handleInputChange}/>
            <h3 className='text-[300px] leading-[normal]'>
                <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(timeLeft % 60).padStart(2, "0")}</span>
            </h3>
            <div className="flex gap-4">
                <CoreButton variant="outlined" onClick={startTimer}>
                    Start
                </CoreButton>
                <CoreButton variant="outlined">
                    Skip Break
                </CoreButton>
                <CoreButton variant="outlined" onClick={resetTimer}>
                    Reset
                </CoreButton>
            </div>
        </div>
    </section>
    )
}
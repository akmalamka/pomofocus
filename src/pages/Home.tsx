import CoreInputField from "../core/CoreInputField";
import { CoreButton } from "../core/CoreButton";

export default function Home() {
    return (
    <section className='flex justify-center h-screen w-screen bg-[#EEEEEE]'>
        <div className= 'container bg-[url(/tomato.svg)] bg-no-repeat bg-cover bg-position-[center_top_30%] h-full w-full flex flex-col items-center justify-end text-center text-[#EEEEEE] pb-16'>
        <h1 className='heinz text-[70px]'>Good Morning!</h1>
        <CoreInputField placeholder="What would you like to accomplish today?" variant="standard"/>
        <h3 className='text-[300px] leading-[normal]'>
            09:21
        </h3>
        <div className="flex gap-4">
            <CoreButton variant="outlined">
                Start
            </CoreButton>
            <CoreButton variant="outlined">
                Skip Break
            </CoreButton>
            <CoreButton variant="outlined">
                Reset
            </CoreButton>
        </div>
        </div>
    </section>
    )
}
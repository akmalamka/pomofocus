import { useAppProvider } from '../context'
import CoreInputField from '../core/CoreInputField'
import CoreTimer from '../core/CoreTimer'

export default function Home() {
  const { taskName, setTaskName, currentMode } = useAppProvider()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value)
  }

  return (
    <section className="flex justify-center h-screen w-screen bg-[#EEEEEE] relative overflow-hidden">
      <div className="z-10 container h-full w-full flex flex-col items-center justify-end text-center text-[#EEEEEE] pb-12 gap-4">
        <h1 className="font-heading text-[70px]">{currentMode}</h1>
        <CoreInputField placeholder="What would you like to accomplish today?" variant="standard" value={taskName} onChange={handleInputChange} />
        <CoreTimer />
      </div>
    </section>
  )
}

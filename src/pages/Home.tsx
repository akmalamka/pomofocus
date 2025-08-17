export default function Home() {
    return (
    <section className='flex justify-center h-screen w-screen bg-[#EEEEEE]'>
        <div className= 'container bg-[url(/tomato.svg)] bg-no-repeat bg-cover bg-position-[center_top_30%] h-full w-full flex flex-col items-center justify-end text-center text-[#EEEEEE] pb-16'>
        <h1 className='heinz text-[70px]'>Good Morning!</h1>
        <h2 className='text-[45px]'>
            What would you like to accomplish today?
        </h2>
        <h3 className='text-[300px]'>
            09:21
        </h3>
        <button>
            Start
        </button>
        </div>
    </section>
    )
}
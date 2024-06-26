import React from 'react'

const Navbar = () => {
    return (
        <div className='w-[100vw] h-auto bg-green-950 text-black flex lg:justify-evenly items-center lg:flex-row flex-col' >
            <p className='text-white text-[40px] px-10 py-3 font-bold'>PROJECT-MANAGER</p>
            <div className='flex justify-center'>
                <img src="https://cdn-icons-png.flaticon.com/128/4494/4494475.png" className=" w-[6vw] h-[6vw] lg:w-[2.5vw] lg:h-[2.5vw] rounded-3xl mr-2" />
                <img src="https://cdn-icons-png.flaticon.com/128/4138/4138124.png" className="w-[6vw] h-[6vw] lg:w-[2.5vw] lg:h-[2.5vw] rounded-3xl mr-2" />
                <img src="https://cdn-icons-png.flaticon.com/128/4494/4494497.png" className="w-[6vw] h-[6vw] lg:w-[2.5vw] lg:h-[2.5vw] rounded-3xl mr-2" />
                <img src="https://cdn-icons-png.flaticon.com/128/4494/4494477.png" className="w-[6vw] h-[6vw] lg:w-[2.5vw] lg:h-[2.5vw] rounded-3xl mr-2" />
                <img src="https://cdn-icons-png.flaticon.com/128/4494/4494485.png" className="w-[6vw] h-[6vw] lg:w-[2.5vw] lg:h-[2.5vw] rounded-3xl mr-2" />
                <img src="https://cdn-icons-png.flaticon.com/128/2111/2111646.png" className="w-[6vw] h-[6vw] lg:w-[2.5vw] lg:h-[2.5vw] rounded-3xl mr-2" />
            </div>
        </div>
    )
}

export default Navbar
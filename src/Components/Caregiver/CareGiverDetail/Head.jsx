import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";



const Head = () => {
    const [open, setOpen] = useState(1)
  return (
       <div>
          <div className='bg-[#545454] px-3 py-6 border-[1px] border-[#E5E5E5] rounded-md flex flex-col gap-2'>
          <div className=' flex items-center justify-between '>
        <div>
            <h1 className=' text-[24px] font-[600] text-white'>Client: Adams, Nehemiyah</h1>
            <p className=' text-[14px] font-[400] text-white'>3942 Persimmon Dr, Apt 103, Fairfax, VA, 22031-4169</p>
        </div>
             <div className=' flex items-center gap-2 bg-white py-2 px-6 rounded-md border-[1px] border-[#D1D5DB] '>
                                <IoSearchOutline size={20} className='text-[#111827]' />
                                <input type="text" placeholder='search client' className=' focus:text-[#111827] focus:text-[15px] focus:font-[500] placeholder:text-[#111827]  focus:outline-none ' />
                               
                 </div>
    </div>

    <div className=' flex flex-wrap items-center gap-1 mt-4'>
        <button onClick={()=>setOpen(1)}  className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 1 ?  "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Profile</button>
        <button onClick={()=>setOpen(2)}  className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 2 ?  "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Calendar</button>
        <button onClick={()=>setOpen(3)}  className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 3 ?  "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>certificate & Evaluations</button>
        <button onClick={()=>setOpen(4)}  className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 4 ?  "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Availability Blocks</button>
        <button onClick={()=>setOpen(5)}  className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 5 ?  "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Pay Details</button>
        <button onClick={()=>setOpen(6)}  className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 6 ?  "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Documents</button>
        <button onClick={()=>setOpen(7)}  className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 7 ?  "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Attributes</button>
        <button onClick={()=>setOpen(8)}  className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 8 ?  "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Forms</button>
        <button onClick={()=>setOpen(9)}  className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 9 ?  "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Custom Fields</button>
        <button onClick={()=>setOpen(10)} className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 10 ? "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Emergency Contact</button>
        <button onClick={()=>setOpen(11)} className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 11 ? "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Points</button>
        <button onClick={()=>setOpen(12)} className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 12 ? "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>Note List</button>
        <button onClick={()=>setOpen(13)} className={` text-[12px] font-[500] py-1 px-3 rounded-full ${open === 13 ? "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}>My Axis</button>
    </div>
    </div>
    {
        open === 1 ? <>1</> : open === 2 ? <>2</> : open === 3 ? <>3</> : open === 4 ? <>4</>: open === 5 ? <>5</> : open === 6 ? <>6</> : open === 7 ? <>7</> : open === 8 ? <>8</> : open === 9 ? <>9</> : open === 10 ? <>10</> : open === 11 ? <>11</> : open === 12 ? <>12</> : open === 13 ? <>13</> : null
    }
       </div>
  )
}

export default Head
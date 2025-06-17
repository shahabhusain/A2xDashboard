import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Header = ({title}) => {
  return (
    <div className=' flex items-center justify-between px-6
    '>
        <h1 className=' text-[#111827] text-[24px] font-[600]'>{title}</h1>
          <div className=' flex items-center gap-3'>
            <div className=' flex items-center gap-2 bg-transparent py-2 px-6 rounded-md border-[1px] border-[#D1D5DB] '>
                        <FaSearch />
                        <input type="text" placeholder='search' className=' focus:text-[#111827] focus:text-[15px] focus:font-[500] placeholder:text-[#111827]  focus:outline-none ' />
                       
         </div>
          <button className=' text-[16px] font-[500] text-white bg-[#487FFF] py-2 px-6 rounded-md'>+ Add New User</button>
          </div>
    </div>
  )
}

export default Header
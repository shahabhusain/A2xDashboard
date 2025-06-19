import React from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { IoSunnyOutline } from "react-icons/io5";
import { FaBell, FaChevronRight, FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
const Header = ({sidebarOpen,setSidebarOpen}) => {
  return (
    <div className=' bg-white flex items-center px-6 py-2 justify-between sticky top-0'>
           <div className=' flex gap-6'>
              <button onClick={()=>setSidebarOpen(!sidebarOpen)} className=' text-[#111827]'>{sidebarOpen ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}</button>
              <div className=' flex items-center gap-2 bg-[#F5F6FA] py-2 px-6 rounded-md border-[1px] border-[#D1D5DB] '>
                <IoSearchOutline size={20} className=' text-[#111827]' />
                <input type="text" placeholder='search' className=' focus:text-[#111827] focus:text-[15px] focus:font-[500] placeholder:text-[#111827]  focus:outline-none ' />
              </div>
           </div>
           <div className=' flex items-center gap-4'>
            <span className=' p-2 rounded-full bg-[#EBECEF]'><IoSunnyOutline size={20} /></span>
            <span className=' p-2 rounded-full bg-[#EBECEF]'><FaBell size={20} /></span>
            <span className=' p-2 rounded-full bg-[#EBECEF]'><MdOutlineMessage size={20} /></span>
            <span className=' p-2 rounded-full bg-[#EBECEF]'><IoPersonCircleOutline size={20} /></span>
           </div>
    </div>
  )
}

export default Header
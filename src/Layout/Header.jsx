import React, { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { IoSunnyOutline } from "react-icons/io5";
import { FaBell, FaChevronRight, FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import profile from '../assets/profile.png'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import {
  LiaSunSolid,
  LiaEnvelopeSolid,
  LiaBellSolid,
} from "react-icons/lia";
import { Link, useNavigate } from 'react-router-dom';
import { useGetCurrentUser } from '../Api/authApi';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useGetCurrentUser()

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navigate = useNavigate()

  const handleLogout = () => {
    console.log("User logged out");
    setIsProfileOpen(false);
    // window.localStorage.clear()
    navigate("auth/login")
  };

  return (
    <div className='bg-white flex items-center px-6 py-2 justify-between sticky top-0 z-50'>
      <div className='flex gap-6'>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className='text-[#111827]'
        >
          {sidebarOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
        </button>
        <div className='flex items-center gap-2 bg-[#F5F6FA] py-2 px-6 rounded-md border-[1px] border-[#D1D5DB]'>
          <IoSearchOutline size={20} className='text-[#111827]' />
          <input 
            type="text" 
            placeholder='search' 
            className='focus:text-[#111827] focus:text-[15px] focus:font-[500] placeholder:text-[#111827] focus:outline-none' 
          />
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white p-4 rounded-md relative">
        {/* Sun Icon */}
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <LiaSunSolid className="text-xl text-gray-800" />
        </div>

        {/* USA Flag */}
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src="https://flagcdn.com/w80/us.png"
            alt="USA"
            className="w-4 h-4 object-cover rounded-full"
          />
        </div>

        {/* Envelope Icon */}
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <LiaEnvelopeSolid className="text-xl text-gray-800" />
        </div>

        {/* Bell Icon with Dot */}
        <div className="relative w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <LiaBellSolid className="text-xl text-gray-800" />
          <span className="absolute top-[-3px] right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </div>

        {/* Profile Image with Dropdown */}
        <div className="relative">
          <div 
            className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
            onClick={toggleProfileDropdown}
          >
            <img
              src={profile}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email.slice(0,20)}...</p>
              </div>
              <Link to="/auth/login"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header;
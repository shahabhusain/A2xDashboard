import React from 'react';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoPerson, IoCallSharp } from "react-icons/io5";
import { FaUserNurse, FaPerson } from "react-icons/fa6";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdSpeakerPhone, MdMessage } from "react-icons/md";
import { TbAlertSquareFilled } from "react-icons/tb";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { LuBaggageClaim } from "react-icons/lu";
import logo from '../assets/logo.png';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';
import icon5 from '../assets/icon5.png';
import icon6 from '../assets/icon6.png';
import icon7 from '../assets/icon7.png';
import icon8 from '../assets/icon8.png';
import icon9 from '../assets/icon9.png';
import icon10 from '../assets/icon10.png';
import icon11 from '../assets/icon11.png';
import icon12 from '../assets/icon12.png';
import icon13 from '../assets/icon13.png';

const Sidebar = ({ sidebarOpen }) => {
  const data = [
    { title: "Dashboard", link: "/", icon: icon1 },
    { title: "Client", link: "/client", icon: icon2},
    { title: "Caregiver", link: "/caregiver", icon: icon3},
    { title: "Scheduling", link: "/scheduling", icon: icon4},
    { title: "Marketing", link: "/marketing", icon: icon5},
    { title: "Communities", link: "/communities", icon: icon6},
    { title: "Calls", link: "/calls", icon: icon7 },
    { title: "Alerts", link: "/alerts", icon: icon8 },
    { title: "Messaging", link: "/messaging", icon: icon9},
    { title: "Telephony", link: "/telephony", icon: icon10 },
    { title: "Payroll/Billing", link: "/payroll", icon: icon11},
    { title: "Claims", link: "/claims", icon: icon12},
    { title: "Help", link: "/help", icon: icon13},
  ];

  return (
    <div
      className={`bg-white fixed h-screen border-r border-gray-200 shadow-sm 
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-[90px]' : 'w-[250px]'}`}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-2 border-b border-[#00000020] transition-all duration-300">
        <img src={logo} alt="logo" className="w-[40px]" />
        <h1
          className={`text-[15px] font-[600] text-[#111827] overflow-hidden transition-all duration-300
          ${sidebarOpen ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}
        `}
        >
          A2Z Home Health Care
        </h1>
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-2 p-3 overflow-y-auto ">
        {data.map((item, index) => (
          <NavLink
            to={item.link}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${isActive ? 'bg-[#F2F3F9] text-[#4B5563]' : 'text-[#4B5563] hover:bg-gray-100'}
              `
            }
          >
           <img
  src={item.icon}
  alt=""
  className={`transition-all duration-300 ${sidebarOpen ? "w-[20px] h-[20px]" : "w-[15px] h-[15px]"}`}
/>

            <span
              className={`transition-all  duration-300 whitespace-nowrap
              ${sidebarOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto text-[16px]'}`}
            >
              {item.title}
            </span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

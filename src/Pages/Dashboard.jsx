import React from "react";
import icon from '../assets/icon.png'
import ico1 from '../assets/iconn1.png'
import ico2 from '../assets/iconn3.png'
import ico3 from '../assets/iconn4.png'

const stats = [
  {
    icon: icon,
    title: "215",
    subtitle: "Caregivers",
    footer: "4 Caregivers joined this week",
    color: "bg-sky-400",
    footerColor: "text-sky-500",
  },
  {
    icon: ico1,
    title: "28",
    subtitle: "Pending Requests",
    footer: "8 Staffs on vacation",
    color: "bg-purple-400",
    footerColor: "text-purple-500",
  },
  {
    icon: ico2,
    title: "1,340",
    subtitle: "Active Clients",
    footer: "17 New Clients added this week",
    color: "bg-indigo-500",
    footerColor: "text-indigo-600",
  },
  {
    icon: ico3,
    title: "$85,000",
    subtitle: "Revenue",
    footer: "This Month Total",
    color: "bg-green-500",
    footerColor: "text-green-600",
  },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-6 ">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-4"
        >
          <img src={item.icon} alt="" />
          <div>
            <h3 className="text-[26px] font-semibold">{item.title}</h3>
            <p className="text-[17px] font-[400] text-[#4B5563]">{item.subtitle}</p>
            <p className={`text-xs mt-1 ${item.footerColor}`}>{item.footer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

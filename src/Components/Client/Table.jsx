import React from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { TbMessageCheck } from "react-icons/tb";
import { Link } from 'react-router-dom';


const Table = () => {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      status: 'Active',
      exStatus: 'None',
      administrator: 'Admin A',
      gender: 'Male',
      class: 'A',
      respParty: 'Jane Doe',
      phone: '123-456-7890',
      email: 'john@example.com',
      community: 'Community 1',
    },
    {
      id: 2,
      name: 'Alice Smith',
      status: 'Inactive',
      exStatus: 'Discharged',
      administrator: 'Admin B',
      gender: 'Female',
      class: 'B',
      respParty: 'Bob Smith',
      phone: '987-654-3210',
      email: 'alice@example.com',
      community: 'Community 2',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },

        {
      id: 4,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 5,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 6,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 7,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 8,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 9,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 10,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 11,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 12,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 13,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 14,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 15,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 16,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 17,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
        {
      id: 18,
      name: 'Michael Johnson',
      status: 'Pending',
      exStatus: 'NA',
      administrator: 'Admin C',
      gender: 'Male',
      class: 'C',
      respParty: 'Sarah Johnson',
      phone: '555-555-5555',
      email: 'michael@example.com',
      community: 'Community 3',
    },
  ];

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full  border-gray-300 text-sm">
        <thead>
          <tr className="bg-[#545454] text-white">
            <th className="p-2 ">ID</th>
            <th className="p-2 ">Name</th>
            <th className="p-2 ">Status</th>
            <th className="p-2 ">Ex Status</th>
            <th className="p-2 ">Administrator</th>
            <th className="p-2 ">Gender</th>
            <th className="p-2 ">Class</th>
            <th className="p-2 ">Resp Party</th>
            <th className="p-2 ">Phone</th>
            <th className="p-2 ">Email</th>
            <th className="p-2 ">Community</th>
            <th className="p-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="text-center hover:bg-gray-100">
              <td className="p-2">{row.id}</td>
              <td className="p-2 hover:text-blue-600 hover:underline cursor-pointer"><Link to="/clientform">{row.name}</Link></td>
              <td className="p-2">{row.status}</td>
              <td className="p-2">{row.exStatus}</td>
              <td className="p-2">{row.administrator}</td>
              <td className="p-2">{row.gender}</td>
              <td className="p-2">{row.class}</td>
              <td className="p-2">{row.respParty}</td>
              <td className="p-2">{row.phone}</td>
              <td className="p-2">{row.email}</td>
              <td className="p-2">{row.community}</td>
              <td className="p-2 flex items-center gap-2">
                <Link to="/clientform" className="bg-[#487FFF2E] p-2 rounded-full text-[#487FFF] cursor-pointer"><IoPersonCircleOutline size={15} /></Link>
                <button className="bg-[#45B3692E] p-2 rounded-full text-[#45B369] cursor-pointer"><BsCalendar3 size={15} /></button>
                <button className="bg-[#F866242E] p-2 rounded-full text-[#EF4A00] cursor-pointer"><TbMessageCheck size={15} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

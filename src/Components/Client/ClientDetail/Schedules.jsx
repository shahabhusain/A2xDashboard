import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoPencilOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import noDataAnimation from "../../../assets/loti.json";

const Schedules = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', status: '', exStatus: '' });

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.status || !formData.exStatus) return;

    const newUser = {
      id: data.length + 1,
      ...formData,
    };

    setData(prev => [...prev, newUser]);
    setFormData({ name: '', status: '', exStatus: '' });
    setShowModal(false);
  };

  return (
    <div className='bg-white  mt-4 py-4 border border-gray-300 rounded-md'>
      <div className='flex items-center justify-between px-6'>
        <div>
          <h1 className='text-[#111827] text-2xl font-semibold'>Current Schedules</h1>
          <p className='text-base text-[#111827]'>Show open visits to new caregiver</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className='text-white bg-[#487FFF] py-2 px-6 rounded-md font-medium'
        >
          + Add New User
        </button>
      </div>

      {/* Table or No Data */}
      <div className="overflow-x-auto mt-4">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-64 h-64">
              <Lottie animationData={noDataAnimation} loop={true} />
            </div>
            <p className="text-gray-500 text-lg font-medium mt-4">No data found</p>
          </div>
        ) : (
          <table className="min-w-full border-gray-300 text-sm">
            <thead>
              <tr className="bg-[#545454] text-white text-center">
                <th className="p-2">Name</th>
                <th className="p-2">Week</th>
                <th className="p-2">Certified</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="text-center hover:bg-gray-100">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">
                    <Link to="/" className="hover:text-blue-600 hover:underline">{row.exStatus}</Link>
                  </td>
                  <td className="p-2">{row.status}</td>
                  <td className="p-2">
                    <div className="flex justify-center">
                      <IoPencilOutline className="text-gray-600 hover:text-blue-600 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0000005c] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add New User</h2>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              name="status"
              placeholder="Certified Date"
              value={formData.status}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              name="exStatus"
              placeholder="Week"
              value={formData.exStatus}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-[#487FFF] text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedules;

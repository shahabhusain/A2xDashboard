import React, { useState } from 'react';

const ModificationForm = () => {
  const [formData, setFormData] = useState({
    reason: '',
    date: '06/11/2025',
    startTime: '12 - 00 - PM',
    endTime: '01 - 00 - PM',
    duration: '1h',
    caregiver: 'Unassigned',
    service: 'Personal Care LEGACY',
    rateType: 'Hourly'
  });

  const caregiverOptions = [
    'Unassigned',
    'John Smith',
    'Sarah Johnson',
    'Michael Brown'
  ];

  const serviceOptions = [
    'Personal Care LEGACY',
    'Companion Care',
    'Nursing Care',
    'Physical Therapy'
  ];

  const rateTypeOptions = [
    'Hourly',
    'Daily',
    'Weekly',
    'Monthly'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className=" p-3 mt-4 bg-white rounded-lg ">
      <div className="space-y-4">
        {/* Reason textarea */}
       <div>
  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
    Reason for Modification
  </label>
  <select
    name="reason"
    value={formData.reason}
    onChange={handleChange}
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select a reason</option>
    <option value="time_change">Time Change</option>
    <option value="caregiver_unavailable">Caregiver Unavailable</option>
    <option value="client_request">Client Request</option>
    <option value="schedule_conflict">Schedule Conflict</option>
    <option value="other">Other</option>
  </select>
</div>

        
        {/* Date */}
        <div className="flex items-center">
          <label className="w-24 font-medium">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Time range */}
        <div className="flex items-center">
          <label className="w-24 font-medium">Start</label>
          <input
            type="text"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
             </div>
             <div className=' flex items-center'>
          <span className="w-24 font-medium">End</span>
          <input
            type="text"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
     
        
        {/* Duration */}
        <div className="flex items-center">
          <label className="w-24 font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Caregiver - Now a select dropdown */}
        <div className="flex items-center">
          <label className="w-24 font-medium">Caregiver</label>
          <select
            name="caregiver"
            value={formData.caregiver}
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {caregiverOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Buttons */}
        <div className="flex space-x-6 pt-2">
          <button className=" text-[#487FFF] rounded-md hover:bg-gray-300">
            Send to Caregiver
          </button>
          <button className=" text-[#487FFF] rounded-md hover:bg-gray-300">
            Recommend
          </button>
        </div>
        
        {/* Service - Now a select dropdown */}
        <div className="flex items-center">
          <label className="w-24 font-medium">Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {serviceOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Rate Type - Now a select dropdown */}
        <div className="flex items-center">
          <label className="w-24 font-medium"></label>
          <select
            name="rateType"
            value={formData.rateType}
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          >
            {rateTypeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ModificationForm;
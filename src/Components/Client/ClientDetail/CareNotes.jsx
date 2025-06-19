import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoPencilOutline } from "react-icons/io5";
import Header from '../../../util/Header';

const CareNotes = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [displayedData, setDisplayedData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const generateWeekData = (startDate, endDate) => {
    const data = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
    
    if (currentDate > lastDate) {
      return [];
    }
    
    let id = 1;
    while (currentDate <= lastDate) {
      const weekStart = new Date(currentDate);
      const weekEnd = new Date(currentDate);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      if (weekEnd > lastDate) {
        weekEnd.setTime(lastDate.getTime());
      }
      
      data.push({
        id: id++,
        name: `${formatDate(weekStart)} - ${formatDate(weekEnd)}`,
        status: 'Foster, Melodie',
        exStatus: 'Not Certified',
        startDate: formatDate(weekStart),
        endDate: formatDate(weekEnd)
      });
      
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    return data;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const handleViewClick = () => {
    setHasSearched(true);
    
    if (!dateFrom || !dateTo) {
      setDisplayedData([]);
      return;
    }

    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    
    if (startDate > endDate) {
      setDisplayedData([]);
      return;
    }

    const dynamicData = generateWeekData(startDate, endDate);
    setDisplayedData(dynamicData);
  };

  return (
    <div className='bg-white mt-4 py-4 border-[1px] border-[#D1D5DB] rounded-md'>
      <div className='flex items-center justify-between px-6'>
        <div className='flex items-center gap-12'>
          <div className='flex flex-col gap-1'>
            <label className='text-[14px] font-[500] text-[#4B5563]'>Date From</label>
            <input 
              type="date" 
              className='py-2 px-5 rounded-md border-[1px] border-[#D1D5DB]' 
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-[14px] font-[500] text-[#4B5563]'>Date To</label>
            <input 
              type="date" 
              className='py-2 px-5 rounded-md border-[1px] border-[#D1D5DB]' 
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <button 
            className='text-[14px] mt-6 font-[500] text-white bg-[#4B5563] py-2 px-5 rounded-md'
            onClick={handleViewClick}
          >
            View Month / Week
          </button>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-[14px] font-[500] text-[#4B5563]'>Caregiver</label>
          <select className='py-2 px-5 rounded-md border-[1px] border-[#D1D5DB]'>
            <option>-- Show all --</option>
            <option>Foster, Melodie</option>
            <option>Other Caregiver</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto mt-4">
        {displayedData.length > 0 ? (
          <table className="min-w-full border-gray-300 text-sm">
            <thead>
              <tr className="bg-[#545454] text-white">
                <th className="p-2">Week Range</th>
                <th className="p-2">Start Date</th>
                <th className="p-2">End Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row) => (
                <tr key={row.id} className="text-center hover:bg-gray-100">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">{row.startDate}</td>
                  <td className="p-2">{row.endDate}</td>
                  <td className="p-2">
                    <div className="flex items-center justify-center">
                      <button className='text-[16px] font-[500] text-white bg-[#487FFF] rounded-md py-2 px-5'>
                        View / Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : hasSearched ? (
          <div className="flex flex-col items-center justify-center py-8 border border-gray-200 rounded-md bg-gray-50">
            <div className="text-gray-500 text-lg font-medium">No data found</div>
            <div className="text-gray-400 text-sm mt-2">
              Please try a different date range
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 border border-gray-200 rounded-md bg-gray-50">
            <div className="text-gray-500 text-lg font-medium">Select date range to view data</div>
            <div className="text-gray-400 text-sm mt-2">
              Choose dates and click "View Month/Week" to see results
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareNotes;
import React, { useState } from 'react';
import RecurringDaysAvailability from './RecurringDaysAvailability';
import BlockFromClientsUI from './BlockFromClientsUI';
import { ChevronDown } from 'lucide-react';

export default function AvailabilityBlocks() {
  const [selectedTab, setSelectedTab] = useState('single');
  const [date, setDate] = useState({
    mm: '',
    dd: '',
    yy: ''
  });
  const [startTime, setStartTime] = useState('12:00 AM');
  const [endTime, setEndTime] = useState('12:00 AM');
  const [allDay, setAllDay] = useState(false);
  const [reason, setReason] = useState('');
  const [memo, setMemo] = useState('');
  const [notes, setNotes] = useState('');
  const [unassign, setUnassign] = useState(true);

  const timeOptions = [
    '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM',
    '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',  
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
  ];

  const handleDateChange = (field, value) => {
    setDate(prev => ({
      ...prev,
      [field]: value
    }));
  };


  return (
    <div className=" mt-5">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">Availability Blocks</h1>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>Available to work 24x7 unless blocked</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium">
              Save Configuration
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Tabs */}
            <div className="mb-6">
              <div className="flex bg-gray-600 rounded-md p-1">
                <button
                  onClick={() => setSelectedTab('single')}
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    selectedTab === 'single'
                      ? 'bg-blue-500 text-white'
                      : 'text-white hover:bg-gray-500'
                  }`}
                >
                  Single Date
                </button>
                <button
                  onClick={() => setSelectedTab('recurring')}
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    selectedTab === 'recurring'
                      ? 'bg-blue-500 text-white'
                      : 'text-white hover:bg-gray-500'
                  }`}
                >
                  Recurring Days
                </button>
                <button
                  onClick={() => setSelectedTab('block')}
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    selectedTab === 'block'
                      ? 'bg-blue-500 text-white'
                      : 'text-white hover:bg-gray-500'
                  }`}
                >
                  Block From Clients
                </button>
              </div>
            </div>

            {/* Conditional Content */}
            {selectedTab === 'single' && (
          <div className="">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Form Section */}
        <div className="col-span-8 bg-white rounded-lg p-6">
          {/* Date Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Date</label>
            <div className="flex flex-1 space-x-3">
              <input
                type="text"
                placeholder="mm"
                value={date.mm}
                onChange={(e) => handleDateChange('mm', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                maxLength="2"
              />
              <input
                type="text"
                placeholder="dd"
                value={date.dd}
                onChange={(e) => handleDateChange('dd', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                maxLength="2"
              />
              <input
                type="text"
                placeholder="yy"
                value={date.yy}
                onChange={(e) => handleDateChange('yy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                maxLength="2"
              />
            </div>
          </div>

          {/* Start Time */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Start Time</label>
            <div className="relative w-40">
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* End Time */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">End Time</label>
            <div className="relative w-40">
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* All Day */}
          <div className="mb-6">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">All Day</span>
                <p className="text-sm text-gray-600 mt-1">
                  Choosing all day will block the caregiver from the entire 24 hour period.
                </p>
              </div>
            </label>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Reason</label>
            <div className="relative">
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Select a reason...</option>
                <option value="vacation">Vacation</option>
                <option value="sick">Sick Leave</option>
                <option value="personal">Personal Time</option>
                <option value="training">Training</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Memo */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Memo</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Enter memo..."
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 w-80 space-y-6">
          {/* Save Button */}
          <button className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
            Save New Block
          </button>

          {/* Unassign Option */}
          <div className="bg-white rounded-lg p-4">
            <label className="flex items-start space-x-3">
              <input
                type="radio"
                checked={unassign}
                onChange={(e) => setUnassign(e.target.checked)}
                className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div>
                <span className="text-[16px] font-medium text-gray-700">Unassign</span>
                <p className="text-[14px] text-gray-600 mt-1">
                  Caregive from blocked visits (locked or verified visits will not beremoved)
                </p>
              </div>
            </label>
          </div>

          {/* Tips & Hints */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-[16px] font-medium text-gray-900 mb-3">Tips & Hints</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-[16px] font-medium text-gray-700">Single Days</h4>
                <p className="text-[14px] text-blue-600 mt-1">
                  Choosing all day will block the caregiver from the entire 24 hour period.
                </p>
              </div>
              
              <div>
                <h4 className="text-[16px] font-medium text-gray-700">Recurring Days</h4>
                <p className="text-[14px] text-blue-600 mt-1">
                  Select "Date Range" if you'd like to set a start and end date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mt-8 bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Notes</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Save Notes
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Enter notes..."
        />
      </div>

      {/* Current Block List */}
      <div className="mt-8 bg-white rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Current Block List</h2>
        
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Block Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Block Details</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900"></td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  There are currently no blocks for this caregiver.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

            )}

              {
                selectedTab === "recurring" && (
                    <div>
                        <RecurringDaysAvailability />
                    </div>
                )
              }

              {
                selectedTab === "block" && (
                    <div>
                        <BlockFromClientsUI />
                    </div>
                )
              }
          </div>

        </div>
      </div>
    </div>
  );
}

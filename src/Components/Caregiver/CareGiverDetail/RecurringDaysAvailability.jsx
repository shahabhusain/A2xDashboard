import React, { useState } from 'react';

export default function RecurringDaysAvailability() {
  const [selectedDays, setSelectedDays] = useState({
    allDays: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });

  const [daySettings, setDaySettings] = useState({
    allDays: { startTime: '12:00 AM', endTime: '12:00 AM', allDay: false, frequency: 'always' },
    monday: { startTime: '12:00 AM', endTime: '12:00 AM', allDay: false, frequency: 'always' },
    tuesday: { startTime: '12:00 AM', endTime: '12:00 AM', allDay: false, frequency: 'always' },
    wednesday: { startTime: '12:00 AM', endTime: '12:00 AM', allDay: false, frequency: 'always' },
    thursday: { startTime: '12:00 AM', endTime: '12:00 AM', allDay: false, frequency: 'always' },
    friday: { startTime: '12:00 AM', endTime: '12:00 AM', allDay: false, frequency: 'always' },
    saturday: { startTime: '12:00 AM', endTime: '12:00 AM', allDay: false, frequency: 'always' },
    sunday: { startTime: '12:00 AM', endTime: '12:00 AM', allDay: false, frequency: 'always' }
  });

  const [reason, setReason] = useState('');
  const [memo, setMemo] = useState('');
  const [restrictions, setRestrictions] = useState('No Restrictions');
  const [sidebarOption, setSidebarOption] = useState('unassign');

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

  const days = [
    { key: 'allDays', label: 'All Days' },
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const handleDaySelection = (dayKey) => {
    setSelectedDays(prev => ({
      ...prev,
      [dayKey]: !prev[dayKey]
    }));
  };

  const handleTimeChange = (dayKey, field, value) => {
    setDaySettings(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [field]: value
      }
    }));
  };

  const handleFrequencyChange = (dayKey, frequency) => {
    setDaySettings(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        frequency: frequency
      }
    }));
  };

  const DayRow = ({ dayKey, label }) => {
    const isSelected = selectedDays[dayKey];
    const settings = daySettings[dayKey];

    return (
      <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
        <div className="w-4 mr-4">
          <input
            type="radio"
            checked={isSelected}
            onChange={() => handleDaySelection(dayKey)}
            className="h-4 w-4 text-blue-600 border-gray-300"
          />
        </div>
        
        <div className="w-24 text-sm font-medium text-gray-700">
          {label}
        </div>

        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Start Time</span>
            <select
              value={settings.startTime}
              onChange={(e) => handleTimeChange(dayKey, 'startTime', e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm w-24"
              disabled={!isSelected}
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">End Time</span>
            <select
              value={settings.endTime}
              onChange={(e) => handleTimeChange(dayKey, 'endTime', e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm w-24"
              disabled={!isSelected}
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">All Days</span>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name={`frequency-${dayKey}`}
                checked={settings.frequency === 'always'}
                onChange={() => handleFrequencyChange(dayKey, 'always')}
                className="h-4 w-4 text-blue-600"
                disabled={!isSelected}
              />
              <span className="text-sm text-gray-700">Always</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name={`frequency-${dayKey}`}
                checked={settings.frequency === 'dateRange'}
                onChange={() => handleFrequencyChange(dayKey, 'dateRange')}
                className="h-4 w-4 text-blue-600"
                disabled={!isSelected}
              />
              <span className="text-sm text-gray-700">Date Range</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="bg-white rounded-lg ">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-700">
                  Please select the days/times that the Caregiver is unavailable to work. You may also limit the by a date range.
                </p>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-700">The Caregiver is unavailable to work</span>
                <select
                  value={restrictions}
                  onChange={(e) => setRestrictions(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option>No Restrictions</option>
                  <option>With Restrictions</option>
                </select>
              </div>
            </div>

            {/* Days Selection */}
            <div className="space-y-2 mb-6">
              {days.map(day => (
                <DayRow key={day.key} dayKey={day.key} label={day.label} />
              ))}
            </div>

            {/* Reason and Memo */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select a reason</option>
                  <option value="vacation">Vacation</option>
                  <option value="sick">Sick Leave</option>
                  <option value="personal">Personal</option>
                  <option value="training">Training</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Memo</label>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 ">
            <div className="space-y-4 mb-6">
                              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium">
                  Save New Block
                </button>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sidebarOption"
                    value="unassign"
                    checked={sidebarOption === 'unassign'}
                    onChange={(e) => setSidebarOption(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Unassign</span>
                </label>
              </div>
              <div>
                <p className="text-sm text-gray-600">Caregiver from blocked</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">visits (locked or verified</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">visits will not be removed)</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Tips & Hints</h4>
              
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Single Days</h5>
                <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                  Choosing all day will block the caregiver from the entire 24 hour period.
                </p>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Recurring Days</h5>
                <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                  Select "Date Range" if you'd like to set a start and end date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
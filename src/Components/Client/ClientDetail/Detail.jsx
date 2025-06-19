import React, { useState } from 'react';
import { Clock, User, Tag, DollarSign, ChevronDown, Send, ThumbsUp, CalendarIcon } from 'lucide-react';

const ModificationForm = ({ event }) => {
  const [formData, setFormData] = useState({
    reason: event?.reason || '',
    date: event?.date || new Date().toLocaleDateString(),
    startTime: event?.startTime || '09:00',
    endTime: event?.endTime || '10:00',
    duration: event?.duration || '1h',
    caregiver: event?.caregiver || 'Unassigned',
    service: event?.service || 'Personal Care LEGACY',
    rateType: event?.rateType || 'Hourly',
    notes: event?.notes || ''
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

  const reasonOptions = [
    { value: '', label: 'Select a reason' },
    { value: 'time_change', label: 'Time Change' },
    { value: 'caregiver_unavailable', label: 'Caregiver Unavailable' },
    { value: 'client_request', label: 'Client Request' },
    { value: 'schedule_conflict', label: 'Schedule Conflict' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Calculate duration if both times are set
    if (field === 'startTime' && formData.endTime) {
      calculateDuration(value, formData.endTime);
    } else if (field === 'endTime' && formData.startTime) {
      calculateDuration(formData.startTime, value);
    }
  };

  const calculateDuration = (start, end) => {
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    
    let hours = endHour - startHour;
    let minutes = endMin - startMin;
    
    if (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }
    
    setFormData(prev => ({
      ...prev,
      duration: `${hours}h${minutes > 0 ? `${minutes}m` : ''}`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Modification saved successfully!');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Reason dropdown with icon */}
          <div className="relative">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Modification
            </label>
            <div className="relative">
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {reasonOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Tag className="w-4 h-4" />
              </div>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Date input with icon */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <CalendarIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* Time range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <div className="relative">
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={(e) => handleTimeChange('startTime', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <div className="relative">
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={(e) => handleTimeChange('endTime', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          
          {/* Caregiver dropdown with icon */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Caregiver</label>
            <div className="relative">
              <select
                name="caregiver"
                value={formData.caregiver}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {caregiverOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute left-3 top-2.5 text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Service dropdown with icon */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
            <div className="relative">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {serviceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Tag className="w-4 h-4" />
              </div>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Rate Type dropdown with icon */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rate Type</label>
            <div className="relative">
              <select
                name="rateType"
                value={formData.rateType}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium appearance-none"
              >
                {rateTypeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute left-3 top-2.5 text-gray-400">
                <DollarSign className="w-4 h-4" />
              </div>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Additional notes about this modification..."
            />
          </div>
          
          {/* Action buttons */}
          {/* <div className="flex justify-between pt-4">
            <div className="flex space-x-3">
              <button 
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send to Caregiver
              </button>
              <button 
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                Recommend
              </button>
            </div>
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default ModificationForm;
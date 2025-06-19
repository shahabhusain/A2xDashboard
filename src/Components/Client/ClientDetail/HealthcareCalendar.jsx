import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Plus, X, Settings, Printer, Mail, Play, 
  MoreHorizontal, Clock, DollarSign, FileText, Calendar as CalendarIcon,
  User, Tag, CheckCircle, AlertCircle, Clock as ClockIcon, MapPin
} from 'lucide-react';
import ServiceBilling from './ServiceBilling';
import ModificationForm from './Detail';
import CardSection from './PersonalCareLegacy';
import ADLSection from './ADLSection';
import { FaEllipsisH, FaFileInvoiceDollar, FaInfoCircle, FaNotesMedical, FaStickyNote } from 'react-icons/fa';
import { FaRegCalendarAlt, FaDollarSign, FaTag, FaRegStickyNote, FaEllipsisV } from "react-icons/fa";
const ScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddVisit, setShowAddVisit] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(1);

  const [visitForm, setVisitForm] = useState({
    service: 'Personal Care LEGACY',
    hours: 1,
    rate: 16.04,
    payableTimeMode: 'Auto',
    billable: 'Yes',
    payable: 'Yes',
    payRateMode: 'Auto',
    payForVisit: 'Yes',
    interVisitTravel: 0,
    message: '',
    expenses: 0,
    startTime: '09:00',
    endTime: '17:00',
    caregiver: '',
    notes: ''
  });

  const statusColors = {
    'Unassigned': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Verified': 'bg-green-100 text-green-800 border-green-200',
    'Removed': 'bg-gray-100 text-gray-800 border-gray-200',
    'Completed': 'bg-blue-100 text-blue-800 border-blue-200',
    'Scheduled': 'bg-purple-100 text-purple-800 border-purple-200',
    'Standalone': 'bg-white text-gray-800 border border-gray-300',
    'In-Progress': 'bg-orange-100 text-orange-800 border-orange-200',
    'Missed': 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    'Unassigned': <AlertCircle className="w-3 h-3" />,
    'Verified': <CheckCircle className="w-3 h-3" />,
    'Completed': <CheckCircle className="w-3 h-3" />,
    'Scheduled': <ClockIcon className="w-3 h-3" />,
    'In-Progress': <ClockIcon className="w-3 h-3" />,
    'Missed': <X className="w-3 h-3" />
  };

  const services = [
    'Personal Care',
    'Skilled Nursing',
    'Physical Therapy',
    'Occupational Therapy',
    'Speech Therapy',
    'Medical Social Work',
    'Home Health Aide'
  ];

  const caregivers = [
    'Sarah Johnson',
    'Michael Chen',
    'Emily Rodriguez',
    'David Wilson',
    'Jessica Brown'
  ];

  // Initialize with some sample appointments
  useEffect(() => {
    const sampleAppointments = [
      { id: 1, date: currentDate.getDate(), time: '4p-9p', client: 'Amitabh Khut', status: 'Unassigned', service: 'Personal Care', caregiver: '', notes: 'Initial assessment needed' },
      { id: 2, date: currentDate.getDate() + 1, time: '9a-12p', client: 'Maria Garcia', status: 'Verified', service: 'Skilled Nursing', caregiver: 'Sarah Johnson', notes: 'Wound care required' },
      { id: 3, date: currentDate.getDate() + 2, time: '1p-3p', client: 'John Smith', status: 'Completed', service: 'Physical Therapy', caregiver: 'Michael Chen', notes: 'Post-op rehabilitation' },
      { id: 4, date: currentDate.getDate() + 3, time: '10a-11a', client: 'Lisa Wong', status: 'Scheduled', service: 'Occupational Therapy', caregiver: 'Emily Rodriguez', notes: 'ADL training' },
      { id: 5, date: currentDate.getDate() + 1, time: '2p-4p', client: 'Robert Taylor', status: 'In-Progress', service: 'Speech Therapy', caregiver: 'David Wilson', notes: 'Cognitive therapy' },
      { id: 6, date: currentDate.getDate() + 4, time: '8a-10a', client: 'Emma Davis', status: 'Missed', service: 'Home Health Aide', caregiver: 'Jessica Brown', notes: 'Rescheduled for next week' }
    ];
    setAppointments(sampleAppointments);
  }, [currentDate]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter(apt => apt.date === date);
  };

  const handleAddAppointment = () => {
    if (!selectedDate) return;

    const newAppointment = {
      id: Date.now(),
      date: selectedDate,
      time: `${visitForm.startTime.replace(':', '')}-${visitForm.endTime.replace(':', '')}`,
      client: 'New Client',
      status: 'Scheduled',
      service: visitForm.service,
      caregiver: visitForm.caregiver,
      notes: visitForm.notes
    };

    setAppointments(prev => [...prev, newAppointment]);
    setShowAddVisit(false);
    setSelectedDate(null);
    setVisitForm({
      service: 'Personal Care LEGACY',
      hours: 1,
      rate: 16.04,
      payableTimeMode: 'Auto',
      billable: 'Yes',
      payable: 'Yes',
      payRateMode: 'Auto',
      payForVisit: 'Yes',
      interVisitTravel: 0,
      message: '',
      expenses: 0,
      startTime: '09:00',
      endTime: '17:00',
      caregiver: '',
      notes: ''
    });
  };

  const handleDeleteAppointment = (appointmentId) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    if (selectedEvent && selectedEvent.id === appointmentId) {
      setSelectedEvent(null);
    }
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setSelectedEvent(null);
    setShowAddVisit(true);
  };

  const handleEventClick = (event, day) => {
    setSelectedDate(day);
    setSelectedEvent(event);
    setShowAddVisit(true);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="flex gap-5 mt-4  min-h-screen">
      {/* Main Calendar */}
      <div className={`${showAddVisit ? 'w-2/3' : 'w-full'}  transition-all duration-300`}>
        <div className="">
          {/* Header */}
          <div className="flex bg-white rounded-lg shadow-sm items-center justify-between p-4 ">
            <h1 className="text-xl font-semibold">Care Schedule</h1>
            
            <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Printer className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Mail className="w-4 h-4" />
              </button>
            </div>
              <button 
                onClick={() => {
                  setSelectedDate(currentDate.getDate());
                  setSelectedEvent(null);
                  setShowAddVisit(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                New Visit
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex bg-white mt-4   items-center justify-center p-4 border-b-[#EBECEF] border-b-[1px]">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <h2 className="text-lg font-medium">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              
              <button 
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="text-sm text-blue-600 hover:text-blue-800 ml-2"
              >
                Today
              </button>
            </div>
            
          
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-[#efefef]">
            {/* Week day headers */}
            {weekDays.map(day => (
              <div key={day} className="bg-white p-3 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {days.map((day, index) => (
              <div 
                key={index} 
                className={`bg-white min-h-32 p-2 ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? 'border-2 border-blue-500' : ''}`}
              >
                {day && (
                  <>
                    <div 
                      className={`text-sm font-medium mb-2 p-1 rounded-full w-6 h-6 flex items-center justify-center ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? 'bg-blue-500 text-white' : ''}`}
                    >
                      {day}
                    </div>
                    
                    <div className="space-y-1 max-h-36 overflow-y-auto">
                      {getAppointmentsForDate(day).map(appointment => (
                        <div
                          key={appointment.id}
                          className={`text-xs p-2 mb-1 rounded cursor-pointer group relative ${statusColors[appointment.status]} border`}
                          onClick={() => handleEventClick(appointment, day)}
                        >
                          <div className="flex items-center gap-1 font-medium">
                            {statusIcons[appointment.status]}
                            <span>{appointment.time}</span>
                          </div>
                          <div className="truncate font-semibold">{appointment.client}</div>
                          <div className="flex items-center gap-1 text-xs">
                            <Tag className="w-3 h-3" />
                            <span>{appointment.service}</span>
                          </div>
                          {appointment.caregiver && (
                            <div className="flex items-center gap-1 text-xs">
                              <User className="w-3 h-3" />
                              <span>{appointment.caregiver}</span>
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAppointment(appointment.id);
                            }}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center"
                          >
                            <X className="w-2 h-2" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleDateClick(day)}
                      className="w-full text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1 rounded text-center mt-1 flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Visit
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Status Legend */}
          <div className="p-4 bg-white rounded-lg shadow-sm mt-5">
            <div className="flex flex-wrap gap-4">
              {Object.entries(statusColors).map(([status, colorClass]) => (
                <div key={status} className={`px-3 py-2 rounded text-[16px] flex items-center gap-2 ${colorClass} border`}>
                  {statusIcons[status] || <span className="w-6 h-6"></span>}
                  {status}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {showAddVisit && (
        <div className="w-1/3 p-6 bg-white border-l border-gray-300 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {selectedEvent ? 'Edit Visit' : 'Add New Visit'}
            </h2>
            <button 
              onClick={() => {
                setShowAddVisit(false);
                setSelectedEvent(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {selectedEvent ? (
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-500 border-b pb-2 mb-4">
                <div onClick={() => setOpen(1)} className={`cursor-pointer flex flex-col items-center gap-2 ${open === 1 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
                  <FaRegCalendarAlt size={16} /> Details
                </div>
                <div onClick={() => setOpen(2)} className={`cursor-pointer flex flex-col items-center gap-2 ${open === 2 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
                  <FaDollarSign size={16} /> Financial
                </div>
                <div onClick={() => setOpen(3)} className={`cursor-pointer flex flex-col items-center gap-2 ${open === 3 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
                  <FaTag size={16} /> Memo
                </div>
                <div onClick={() => setOpen(4)} className={`cursor-pointer flex flex-col items-center gap-2 ${open === 4 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
                  <FaRegStickyNote size={16} /> Care Notes
                </div>
                <div onClick={() => setOpen(5)} className={`cursor-pointer flex flex-col items-center gap-2 ${open === 5 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
                  <FaEllipsisV size={16} /> More
                </div>
              </div>

              <div className="mt-4">
                {open === 1 ? <ModificationForm event={selectedEvent} /> : 
                 open === 2 ? <ServiceBilling event={selectedEvent} /> : 
                 open === 3 ? <CardSection event={selectedEvent} /> : 
                 open === 4 ? <ADLSection event={selectedEvent} /> : 
                 open === 5 ? <div>Additional options here</div> : null}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={`${monthNames[currentDate.getMonth()]} ${selectedDate}, ${currentDate.getFullYear()}`}
                      readOnly
                      className="w-full pl-8 pr-4 py-2 border rounded-lg bg-gray-50"
                    />
                    <CalendarIcon className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select
                    value={visitForm.service}
                    onChange={(e) => setVisitForm({...visitForm, service: e.target.value})}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg"
                  >
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={visitForm.startTime}
                    onChange={(e) => setVisitForm({...visitForm, startTime: e.target.value})}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={visitForm.endTime}
                    onChange={(e) => setVisitForm({...visitForm, endTime: e.target.value})}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caregiver</label>
                <select
                  value={visitForm.caregiver}
                  onChange={(e) => setVisitForm({...visitForm, caregiver: e.target.value})}
                  className="w-full pl-8 pr-4 py-2 border rounded-lg"
                >
                  <option value="">Select Caregiver</option>
                  {caregivers.map(caregiver => (
                    <option key={caregiver} value={caregiver}>{caregiver}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={visitForm.notes}
                  onChange={(e) => setVisitForm({...visitForm, notes: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                  placeholder="Add any notes about this visit..."
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setShowAddVisit(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAppointment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Visit
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;
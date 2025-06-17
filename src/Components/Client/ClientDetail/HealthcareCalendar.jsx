
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Detail from './Detail';
import ServiceBilling from './ServiceBilling';
import PersonalCareLegacy from './PersonalCareLegacy';
import ADLSection from './ADLSection';
import { FaInfoCircle, FaFileInvoiceDollar, FaStickyNote, FaNotesMedical, FaEllipsisH } from "react-icons/fa";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    id: 1,
    title: 'Doctor Appointment',
    start: new Date(2025, 5, 20, 10, 0),
    end: new Date(2025, 5, 20, 11, 0),
    description: 'Annual physical checkup with Dr. Smith.',
  },
  {
    id: 2,
    title: 'Patient Follow-up',
    start: new Date(2025, 5, 22, 14, 30),
    end: new Date(2025, 5, 22, 15, 30),
    description: 'Follow-up for John Doe\'s medication plan.',
  },
];

const HealthcareCalendar = () => {
    const [open, setOpen] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex gap-5 mt-4">
      {/* Calendar */}
      <div className="w-2/3 p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Healthcare Calendar</h2>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {/* Sidebar */}
      <div className="w-1/3 p-6 bg-white border-l border-gray-300">
        {selectedEvent ? (
          <div>
      <div className="flex justify-between text-sm font-medium text-gray-500 border-b pb-2">
  <div onClick={() => setOpen(1)} className={`cursor-pointer flex items-center gap-2 flex-col ${open === 1 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
    <FaInfoCircle size={20} /> Details
  </div>
  <div onClick={() => setOpen(2)} className={`cursor-pointer flex items-center gap-2 flex-col ${open === 2 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
    <FaFileInvoiceDollar size={20} /> Financial
  </div>
  <div onClick={() => setOpen(3)} className={`cursor-pointer flex items-center gap-2 flex-col ${open === 3 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
    <FaStickyNote size={20} /> Memo
  </div>
  <div onClick={() => setOpen(4)} className={`cursor-pointer flex items-center gap-2 flex-col ${open === 4 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
    <FaNotesMedical size={20} /> Care Notes
  </div>
  <div onClick={() => setOpen(5)} className={`cursor-pointer flex items-center gap-2 flex-col ${open === 5 ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}`}>
    <FaEllipsisH size={20} /> More
  </div>
</div>

          <div>
            {open === 1 ? <><Detail /></> : open === 2 ? <><ServiceBilling /></> : open === 3 ? <><PersonalCareLegacy /></> : open === 4 ? <><ADLSection /></> : open === 5 ? <></> : null} 
          </div>
        
          </div>
        ) : (
          <p className="text-gray-500">Click an event to see details</p>
        )}
      </div>
    </div>
  );
};

export default HealthcareCalendar;

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const ClientManagementForm = () => {
  const [formData, setFormData] = useState({
    permanentPriorityNotes: 'Care being prioritized by Step-Mother (Melanie Foster).',
    clientNotes: '',
    marketingNotes: '',
    callNotes: {
      date: '',
      caller: '',
      subject: '',
      start: '',
      details: ''
    }
  });

  const [clientNotesList, setClientNotesList] = useState([]);
  const [marketingNotesList, setMarketingNotesList] = useState([]);
  const [callNotesList, setCallNotesList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = ['Admin', 'Client', 'Appraisal', 'Samples', 'Suggestions', 'User', 'Employer'];

  const updateHistory = [
    { date: '04/25/2025 12:27pm', action: 'Update client notes by Qadeer (id:589)' },
    { date: '04/25/2025 12:26pm', action: 'Update client notes by Qadeer (id:589)' },
    { date: '04/14/2025 9:48pm', action: 'Update client notes by mueed2021 (id: 137)' },
    { date: '04/10/2025 9:23pm', action: 'Update client profile by Azmat (id:4)' },
    { date: '04/10/2025 9:13pm', action: 'Update Legacy Authorizations & Third Party Billing by Azmat (id:4)' },
    { date: '04/09/2025 9:23pm', action: 'Update client profile by Azmat (id:4)' },
    { date: '04/09/2025 9:16pm', action: 'Create/Update by Azmat (id:4)' },
    { date: '02/04/2025 10:13pm', action: 'Update client profile by Azmat (id: 4)' },
    { date: '02/04/2025 10:47pm', action: 'Update client profile by Azmat (id:4)' },
    { date: '02/04/2025 10:36pm', action: 'Create customer profile by Azmat (id:4) Archive' },
    { date: '02/04/2025 10:36pm', action: 'Created (VH) by Azmat (id:4)' }
  ];

  const handleInputChange = (section, field, value) => {
    if (section === 'callNotes') {
      setFormData(prev => ({
        ...prev,
        callNotes: {
          ...prev.callNotes,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: value
      }));
    }
  };

  const addClientNote = () => {
    if (formData.clientNotes.trim()) {
      setClientNotesList(prev => [...prev, {
        id: Date.now(),
        text: formData.clientNotes,
        timestamp: new Date().toLocaleString()
      }]);
      setFormData(prev => ({ ...prev, clientNotes: '' }));
    }
  };

  const addMarketingNote = () => {
    if (formData.marketingNotes.trim()) {
      setMarketingNotesList(prev => [...prev, {
        id: Date.now(),
        text: formData.marketingNotes,
        tags: [...selectedTags],
        timestamp: new Date().toLocaleString()
      }]);
      setFormData(prev => ({ ...prev, marketingNotes: '' }));
      setSelectedTags([]);
    }
  };

  const addCallNote = () => {
    const { date, caller, subject, start, details } = formData.callNotes;
    if (date && caller && subject) {
      setCallNotesList(prev => [...prev, {
        id: Date.now(),
        date,
        caller,
        subject,
        start,
        details
      }]);
      setFormData(prev => ({
        ...prev,
        callNotes: { date: '', caller: '', subject: '', start: '', details: '' }
      }));
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const removeNote = (type, id) => {
    if (type === 'client') {
      setClientNotesList(prev => prev.filter(note => note.id !== id));
    } else if (type === 'marketing') {
      setMarketingNotesList(prev => prev.filter(note => note.id !== id));
    } else if (type === 'call') {
      setCallNotesList(prev => prev.filter(note => note.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      formData,
      clientNotes: clientNotesList,
      marketingNotes: marketingNotesList,
      callNotes: callNotesList
    });
    alert('Form submitted successfully!');
  };

  return (
    <div className=" mt-6">
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Permanent Priority Notes */}
            <div className="bg-white rounded-md border-[1px] border-[#D1D5DB]">
              <div className="px-6 py-4 border-b border-[#D1D5DB] ">
                <h2 className="text-lg font-semibold text-gray-800">Permanent Priority Notes</h2>
              </div>
              <div className="p-6">
                <textarea
                  className="w-full p-3 border border-[#D1D5DB] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="12"
                  placeholder="Enter permanent priority notes..."
                />
              </div>
            </div>

            {/* Client Notes */}
            <div className="bg-white rounded-md border-[#D1D5DB] border-[1px] ">
              <div className="px-6 py-4 border-b border-[#D1D5DB]">
                <h2 className="text-lg font-semibold text-gray-800">Client Notes</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <textarea
                      value={formData.clientNotes}
                      onChange={(e) => handleInputChange('clientNotes', '', e.target.value)}
                      className="flex-1 p-3 border border-[#D1D5DB] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="12"
                      placeholder="Enter client note..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Meetings Notes */}
            <div className="bg-white rounded-lg  border-[1px] border-[#D1D5DB]">
              <div className="px-6 py-4 ">
                <h2 className="text-lg font-semibold text-gray-800">Marketing Meetings Notes</h2>
              </div>
                      <div className=' mx-4'>
                         <textarea
                      value={formData.marketingNotes}
                      onChange={(e) => handleInputChange('marketingNotes', '', e.target.value)}
                      className=" w-full p-3 border border-[#D1D5DB] rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows="2"
                      placeholder="Enter marketing note..."
                    />
                      </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-blue-500 text-white'
                              : 'bg-[#008BBD] text-white hover:bg-gray-600'
                          }`}
                        >
                             <span className=' text-[22px] text-white'>+</span>
                          {tag}

                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
             
                    <button
                      type="button"
                      onClick={addMarketingNote}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors h-fit"
                    >
                      Add Note
                    </button>
                  </div>
                  
                  {marketingNotesList.length > 0 && (
                    <div className="space-y-2">
                      {marketingNotesList.map((note) => (
                        <div key={note.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-md">
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{note.text}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {note.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{note.timestamp}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeNote('marketing', note.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Related Call Notes Form */}
            <div className="bg-white rounded-md border-[1px] border-[#D1D5DB]">
              <div className="px-6 py-4 border-b border-[#D1D5DB] bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Related Call Notes</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="datetime-local"
                      value={formData.callNotes.date}
                      onChange={(e) => handleInputChange('callNotes', 'date', e.target.value)}
                      className="w-full p-2 border-[1px] border-[#D1D5DB]  rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Caller</label>
                    <input
                      type="text"
                      value={formData.callNotes.caller}
                      onChange={(e) => handleInputChange('callNotes', 'caller', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter caller name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.callNotes.subject}
                      onChange={(e) => handleInputChange('callNotes', 'subject', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={formData.callNotes.start}
                      onChange={(e) => handleInputChange('callNotes', 'start', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                  <textarea
                    value={formData.callNotes.details}
                    onChange={(e) => handleInputChange('callNotes', 'details', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    placeholder="Enter call details"
                  />
                </div>
                <button
                  type="button"
                  onClick={addCallNote}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Add Call Note
                </button>
                
                {/* Call Notes Table */}
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Caller</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Subject</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Start</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {callNotesList.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-6 text-center text-gray-500 text-sm">
                            No Results
                          </td>
                        </tr>
                      ) : (
                        callNotesList.map((call) => (
                          <tr key={call.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{call.date}</td>
                            <td className="px-4 py-3 text-sm">{call.caller}</td>
                            <td className="px-4 py-3 text-sm">{call.subject}</td>
                            <td className="px-4 py-3 text-sm">{call.start}</td>
                            <td className="px-4 py-3 text-sm">
                              <button
                                type="button"
                                onClick={() => removeNote('call', call.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Related Tagged Notes */}
            <div className="bg-white rounded-lg border-[1px] border-[#D1D5DB]">
              <div className="px-6 py-4 border-b border-[#D1D5DB] bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Related Tagged Notes</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-4">Tagged notes will appear here based on your selections</p>
                {marketingNotesList.filter(note => note.tags.length > 0).map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 rounded-md mb-2">
                    <p className="text-sm text-gray-700">{note.text}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Update History */}
            <div className="bg-white rounded-md border-[1px] border-[#D1D5DB]">
              <div className="px-6 py-4 border-b border-[#D1D5DB] bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Update History</h2>
              </div>
              <div className="p-6">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {updateHistory.map((update, index) => (
                    <div key={index} className="text-sm">
                      <span className="text-gray-500">{update.date}:</span>
                      <span className="text-gray-700 ml-2">{update.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientManagementForm;
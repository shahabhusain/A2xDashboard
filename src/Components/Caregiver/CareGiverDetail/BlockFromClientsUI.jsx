import React, { useState } from 'react';

export default function BlockFromClientsUI() {
  const [clientName, setClientName] = useState('');
  const [reason, setReason] = useState('');
  const [memo, setMemo] = useState('');
  const [notes, setNotes] = useState('');
  const [sidebarOption, setSidebarOption] = useState('unassign');

  const clientOptions = [
    'Select...',
    'John Smith',
    'Mary Johnson',
    'Robert Williams',
    'Patricia Brown',
    'Michael Davis',
    'Linda Miller',
    'William Wilson',
    'Elizabeth Moore',
    'David Taylor',
    'Barbara Anderson'
  ];

  const reasonOptions = [
    'Select a reason',
    'Client Request',
    'Incompatible Schedule',
    'Previous Issues',
    'Skill Mismatch',
    'Geographic Distance',
    'Personal Conflict',
    'Safety Concerns',
    'Other'
  ];

  return (
    <div className="">
      <div className="bg-white rounded-lg">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Client Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
              <div className="relative">
                <select
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white pr-8"
                >
                  {clientOptions.map((client, index) => (
                    <option key={index} value={client} disabled={index === 0}>
                      {client}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Reason Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <div className="relative">
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white pr-8"
                >
                  {reasonOptions.map((reasonOption, index) => (
                    <option key={index} value={reasonOption} disabled={index === 0}>
                      {reasonOption}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Memo */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Memo</label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter any additional notes about blocking this client..."
              />
            </div>

            {/* Notes Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition-colors">
                  Save Notes
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add general notes about this caregiver's availability blocks..."
              />
            </div>

            {/* Current Block List */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Current Block List</h3>
              
              <div className="bg-white rounded-md border border-gray-200">
                <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-200 bg-gray-50">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Block Type</h4>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Block Details</h4>
                  </div>
                </div>
                
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-600">
                    There are currently no blocks for this caregiver.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 ">
            <div className="flex  mb-6">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition-colors">
                Save New Block
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sidebarOption"
                    value="unassign"
                    checked={sidebarOption === 'unassign'}
                    onChange={(e) => setSidebarOption(e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Unassign</span>
                </label>
              </div>
              
              <div className="ml-6 space-y-1">
                <p className="text-sm text-gray-600">Caregiver from blocked</p>
                <p className="text-sm text-gray-600">clients (note this will</p>
                <p className="text-sm text-gray-600">unassign existing</p>
                <p className="text-sm text-gray-600">schedules and future</p>
                <p className="text-sm text-gray-600">visits between the</p>
                <p className="text-sm text-gray-600">Caregiver and clients)</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Tips & Hints</h4>
              
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Client Blocking</h5>
                <p className="text-sm text-blue-600 hover:underline cursor-pointer leading-relaxed">
                  Blocking a caregiver from specific clients will prevent future scheduling between them.
                </p>
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Existing Schedules</h5>
                <p className="text-sm text-blue-600 hover:underline cursor-pointer leading-relaxed">
                  Use the "Unassign" option to remove existing scheduled visits.
                </p>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Multiple Clients</h5>
                <p className="text-sm text-blue-600 hover:underline cursor-pointer leading-relaxed">
                  You can block the same caregiver from multiple clients by creating separate blocks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
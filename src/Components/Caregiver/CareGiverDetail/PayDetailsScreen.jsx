import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

export default function PayDetailsScreen() {
  const [billClient, setBillClient] = useState(true);
  const [payCaregiver, setPayCaregiver] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className=" mt-5">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-medium text-gray-900">Pay Details</h1>
        </div>

        <div className="p-6 space-y-8">
          {/* Pay Rate Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Pay Rate</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="flex items-center border-[1px] border-[#000] rounded-md px-3 justify-between py-2">
                  <div className="flex items-center flex-col gap-2.5  ">
                    <span className="text-sm text-gray-600 ">Hour</span>
                    <span className="text-sm text-gray-900">$ / hr</span>
                  </div>
                  <button className="text-blue-600 text-sm hover:text-blue-700">
                    Show Rates By Date
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Client Adjustments Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Client Adjustments</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium flex items-center space-x-1">
                      <ChevronDown className="w-4 h-4" />
                      <span>Caregiver</span>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Client</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Hourly Visits</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Daily Visits</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Fixed Visits</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Effective Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Client Admin</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-900">All Caregiver</td>
                    <td className="px-4 py-3 text-sm text-blue-600">Gujjar</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Set to $10.00</td>
                    <td className="px-4 py-3 text-sm text-gray-900"></td>
                    <td className="px-4 py-3 text-sm text-gray-900"></td>
                    <td className="px-4 py-3 text-sm text-gray-900"></td>
                    <td className="px-4 py-3 text-sm text-gray-900"></td>
                    <td className="px-4 py-3 text-sm text-gray-900"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Service Adjustments Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Service Adjustments</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Caregiver</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Service</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Adjustments</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Effective</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {/* Empty table */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pay Rate History Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Pay Rate History</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium flex items-center space-x-1">
                      <ChevronDown className="w-4 h-4" />
                      <span>Effective Date</span>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Modified By</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Change Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Rate</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Note</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {/* Empty table */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pay Rate Options Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Pay Rate Options</h2>
            <div className="space-y-4">
              <div className="flex border-[1px] border-[#000] rounded-md  py-3 px-4 items-center justify-between">
                <span className="text-sm text-gray-900">Bill Client</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={billClient}
                    onChange={(e) => setBillClient(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm text-blue-600">{billClient ? 'Yes' : 'No'}</span>
                </label>
              </div>
              
              <div className="flex items-center border-[1px] border-[#000] rounded-md  py-3 px-4 justify-between">
                <span className="text-sm text-gray-900">Pay Caregiver</span>
                <label className="relative inline-flex  items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={payCaregiver}
                    onChange={(e) => setPayCaregiver(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm text-blue-600">{payCaregiver ? 'Yes' : 'No'}</span>
                </label>
              </div>
              
              <div className="flex border-[1px] border-[#000] rounded-md  py-3 px-4 items-center justify-between">
                <span className="text-sm text-gray-900">Show Advanced Options</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAdvanced}
                    onChange={(e) => setShowAdvanced(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm text-gray-600">{showAdvanced ? 'Yes' : 'No'}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { useState } from 'react';

const ServiceBilling = () => {
  const [billableHours, setBillableHours] = useState(1);
  const [billableRate, setBillableRate] = useState(16.94);
  const [payableHours, setPayableHours] = useState(1);
  const [payableRate, setPayableRate] = useState(10.00);
  const [billVisit, setBillVisit] = useState('yes');
  const [payVisit, setPayVisit] = useState('yes');
  const [travelTime, setTravelTime] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log({
      billable: {
        hours: billableHours,
        rate: billableRate,
        total: billableHours * billableRate
      },
      payable: {
        hours: payableHours,
        rate: payableRate,
        total: payableHours * payableRate
      },
      billVisit,
      payVisit,
      travelTime,
      mileage,
      expenses
    });
    alert('Billing information submitted!');
  };

  return (
    <div className=" mt-4 p-3 bg-white rounded-lg">
      <h1 className="text-xl font-bold mb-4">Service Billing</h1>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">Personal Care LEGACY</h2>
          <span className="text-sm text-gray-600">Hourly</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border-[1px] border-[#E5E5E5] p-3 rounded">
            <h3 className="font-medium text-sm mb-2">Billable</h3>
            <div className="mb-2">
              <label className="block text-sm text-gray-600 mb-1">Hours:</label>
              <input 
                type="number" 
                value={billableHours}
                onChange={(e) => setBillableHours(parseFloat(e.target.value) || 0)}
                className="w-full p-2 border-[1px] border-[#E5E5E5] rounded"
                min="0"
                step="0.25"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Rate:</label>
              <div className="flex items-center">
                <span className="mr-1">$</span>
                <input 
                  type="number" 
                  value={billableRate}
                  onChange={(e) => setBillableRate(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border-[1px] border-[#E5E5E5] rounded"
                  min="0"
                  step="0.01"
                />
                <span className="ml-1 text-sm">/ hr</span>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="font-medium">Total: </span>
              <span>${(billableHours * billableRate).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-[1px] border-[#E5E5E5] p-3 rounded">
            <h3 className="font-medium text-sm mb-2">Payable</h3>
            <div className="mb-2">
              <label className="block text-sm text-gray-600 mb-1">Hours:</label>
              <input 
                type="number" 
                value={payableHours}
                onChange={(e) => setPayableHours(parseFloat(e.target.value) || 0)}
                className="w-full p-2 border-[1px] border-[#E5E5E5] rounded"
                min="0"
                step="0.25"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Rate:</label>
              <div className="flex items-center">
                <span className="mr-1">$</span>
                <input 
                  type="number" 
                  value={payableRate}
                  onChange={(e) => setPayableRate(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border-[1px] border-[#E5E5E5] rounded"
                  min="0"
                  step="0.01"
                />
                <span className="ml-1 text-sm">/ hr</span>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="font-medium">Total: </span>
              <span>${(payableHours * payableRate).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          <span className="text-sm mr-2">Payable Time Mode</span>
          <div className="bg-gray-100 px-2 py-1 rounded text-sm flex items-center">
            <span>Auto</span>
            <span className="ml-1 text-green-600">✓</span>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <span className="text-sm mr-2">$ Pay Rate Mode</span>
          <div className="bg-gray-100 px-2 py-1 rounded text-sm flex items-center">
            <span>Auto</span>
            <span className="ml-1 text-green-600">✓</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bill for the visit</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="billVisit"
                  checked={billVisit === 'yes'}
                  onChange={() => setBillVisit('yes')}
                  className="mr-1"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="billVisit"
                  checked={billVisit === 'no'}
                  onChange={() => setBillVisit('no')}
                  className="mr-1"
                />
                <span>No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Pay for the visit</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="payVisit"
                  checked={payVisit === 'yes'}
                  onChange={() => setPayVisit('yes')}
                  className="mr-1"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="payVisit"
                  checked={payVisit === 'no'}
                  onChange={() => setPayVisit('no')}
                  className="mr-1"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Inter-visit Travel</h3>
        <div className="flex items-center">
          <label className="text-sm mr-2">Time (mins)</label>
          <input 
            type="number" 
            value={travelTime}
            onChange={(e) => setTravelTime(parseInt(e.target.value) || 0)}
            className="w-20 p-2 border-[1px] border-[#E5E5E5] rounded"
            min="0"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Other</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Mileage</label>
            <input 
              type="number" 
              value={mileage}
              onChange={(e) => setMileage(parseInt(e.target.value) || 0)}
              className="w-full p-2 border-[1px] border-[#E5E5E5] rounded"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Expenses</label>
            <input 
              type="number" 
              value={expenses}
              onChange={(e) => setExpenses(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border-[1px] border-[#E5E5E5] rounded"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Submit Billing
      </button>
    </div>
  );
};

export default ServiceBilling;
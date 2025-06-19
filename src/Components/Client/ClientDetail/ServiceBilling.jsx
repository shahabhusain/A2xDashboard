import React, { useState } from 'react';
import { DollarSign, Clock, MapPin, Package, Check, X } from 'lucide-react';

const ServiceBilling = ({ event }) => {
  const [formData, setFormData] = useState({
    billableHours: event?.billableHours || 1,
    billableRate: event?.billableRate || 16.94,
    payableHours: event?.payableHours || 1,
    payableRate: event?.payableRate || 10.00,
    billVisit: event?.billVisit || 'yes',
    payVisit: event?.payVisit || 'yes',
    travelTime: event?.travelTime || 0,
    mileage: event?.mileage || 0,
    expenses: event?.expenses || 0,
    payableTimeMode: 'Auto',
    payRateMode: 'Auto'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Billing submitted:', formData);
    alert('Billing information saved successfully!');
  };

  const calculateTotal = (hours, rate) => {
    return (parseFloat(hours || 0) * (parseFloat(rate || 0)
  ))}
  

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <DollarSign className="w-5 h-5" />
        Service Billing
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">{event?.service || 'Personal Care LEGACY'}</h2>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {event?.rateType || 'Hourly'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Billable section */}
            <div className="border border-gray-200 p-4 rounded-lg bg-blue-50/20">
              <h3 className="font-medium text-sm mb-3 text-gray-700 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Billable
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Hours:</label>
                  <input 
                    type="number" 
                    name="billableHours"
                    value={formData.billableHours}
                    onChange={handleNumberChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    min="0"
                    step="0.25"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Rate:</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input 
                      type="number" 
                      name="billableRate"
                      value={formData.billableRate}
                      onChange={handleNumberChange}
                      className="w-full pl-8 pr-12 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">/hr</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Total:</span>
                    <span className="font-semibold">
                      ${calculateTotal(formData.billableHours, formData.billableRate).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payable section */}
            <div className="border border-gray-200 p-4 rounded-lg bg-green-50/20">
              <h3 className="font-medium text-sm mb-3 text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                Payable
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Hours:</label>
                  <input 
                    type="number" 
                    name="payableHours"
                    value={formData.payableHours}
                    onChange={handleNumberChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    min="0"
                    step="0.25"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Rate:</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input 
                      type="number" 
                      name="payableRate"
                      value={formData.payableRate}
                      onChange={handleNumberChange}
                      className="w-full pl-8 pr-12 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">/hr</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Total:</span>
                    <span className="font-semibold">
                      ${calculateTotal(formData.payableHours, formData.payableRate).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mode indicators */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm">
              <span className="text-gray-700">Payable Time Mode:</span>
              <span className="ml-2 font-medium text-green-600 flex items-center">
                {formData.payableTimeMode} <Check className="w-4 h-4 ml-1" />
              </span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm">
              <span className="text-gray-700">Pay Rate Mode:</span>
              <span className="ml-2 font-medium text-green-600 flex items-center">
                {formData.payRateMode} <Check className="w-4 h-4 ml-1" />
              </span>
            </div>
          </div>
          
          {/* Visit options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Bill for the visit</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="billVisit"
                    checked={formData.billVisit === 'yes'}
                    onChange={() => setFormData(prev => ({ ...prev, billVisit: 'yes' }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="billVisit"
                    checked={formData.billVisit === 'no'}
                    onChange={() => setFormData(prev => ({ ...prev, billVisit: 'no' }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pay for the visit</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="payVisit"
                    checked={formData.payVisit === 'yes'}
                    onChange={() => setFormData(prev => ({ ...prev, payVisit: 'yes' }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="payVisit"
                    checked={formData.payVisit === 'no'}
                    onChange={() => setFormData(prev => ({ ...prev, payVisit: 'no' }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Travel section */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Inter-visit Travel
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Time (minutes)</label>
              <div className="relative">
                <input 
                  type="number" 
                  name="travelTime"
                  value={formData.travelTime}
                  onChange={handleNumberChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min="0"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Other expenses */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Other Expenses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Mileage</label>
              <div className="relative">
                <input 
                  type="number" 
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleNumberChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min="0"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Expenses ($)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input 
                  type="number" 
                  name="expenses"
                  value={formData.expenses}
                  onChange={handleNumberChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit button */}
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Billing
        </button>
      </form>
    </div>
  );
};

export default ServiceBilling;
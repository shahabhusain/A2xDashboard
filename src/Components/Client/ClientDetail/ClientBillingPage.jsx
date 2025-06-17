import React, { useState } from 'react';
import { Plus, Search, Edit, Eye } from 'lucide-react';

const BillingDashboard = () => {
  const [billingInfo, setBillingInfo] = useState({
    clientClass: 'Sentara Health Plans, Personal Care, Respite Care',
    billingCycle: 'Weekly',
    insurancePolicyNumber: '35690720010',
    billingNotes: ''
  });

  const [legacySettings, setLegacySettings] = useState({
    billClient: true,
    billOvertimeRates: false,
    billHolidayRates: false,
    payCaregiver: true,
    hipaaInformationRelease: true,
    useMtuOnCalendar: false,
    includeTotalAmount: 'System Default (No)',
    services: 'All',
    requireAuthorizations: false,
    useFirstNameOnly: false,
    printInvoices: false,
    emailInvoices: false
  });

  const [payers, setPayers] = useState([
    {
      id: 1,
      name: 'Sentara Health Plans',
      status: 'Active',
      requiresAuth: 'Yes',
      verificationDate: '24/02/25',
      defaultFax: 'Personal Care',
      contact: 'Khalid Tursun',
      location: 'PO Box 8203, Kingston, NY, 12402'
    }
  ]);

  const [authorizations, setAuthorizations] = useState([
    {
      id: 1,
      authNumber: '250230733',
      payer: 'Sentara Health Plans',
      code: 'SHP-PC',
      description: 'Personal Care - Sentara',
      start: '02/05/2025',
      end: '08/04/2025',
      maxTime: '24 hrs 0 min',
      period: 'Week',
      status: 'Current'
    },
    {
      id: 2,
      authNumber: '250230847',
      payer: 'Sentara Health Plans',
      code: 'SHP-PC',
      description: 'Personal Care - Sentara',
      start: '02/05/2025',
      end: '08/04/2025',
      maxTime: '24 hrs 0 min',
      period: 'Week',
      status: 'Current'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newPayer, setNewPayer] = useState({
    name: '',
    contact: '',
    location: '',
    defaultFax: 'Personal Care'
  });
  const [showAddPayer, setShowAddPayer] = useState(false);
  const [showAddAuth, setShowAddAuth] = useState(false);
  const [newAuth, setNewAuth] = useState({
    authNumber: '',
    payer: 'Sentara Health Plans',
    code: '',
    description: '',
    start: '',
    end: '',
    maxTime: '',
    period: 'Week'
  });

  const handleLegacyToggle = (setting) => {
    setLegacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleAddPayer = () => {
    if (newPayer.name && newPayer.contact) {
      setPayers(prev => [...prev, {
        id: Date.now(),
        name: newPayer.name,
        status: 'Active',
        requiresAuth: 'Yes',
        verificationDate: new Date().toLocaleDateString('en-GB'),
        defaultFax: newPayer.defaultFax,
        contact: newPayer.contact,
        location: newPayer.location
      }]);
      setNewPayer({ name: '', contact: '', location: '', defaultFax: 'Personal Care' });
      setShowAddPayer(false);
    }
  };

  const handleAddAuth = () => {
    if (newAuth.authNumber && newAuth.code && newAuth.description) {
      setAuthorizations(prev => [...prev, {
        id: Date.now(),
        ...newAuth,
        status: 'Current'
      }]);
      setNewAuth({
        authNumber: '',
        payer: 'Sentara Health Plans',
        code: '',
        description: '',
        start: '',
        end: '',
        maxTime: '',
        period: 'Week'
      });
      setShowAddAuth(false);
    }
  };

  const filteredAuthorizations = authorizations.filter(auth =>
    auth.authNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auth.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auth.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" mt-4">
      <div className=" space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Billing Information</h1>
          <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
            Use Legacy Billing Page
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Billing Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">Client Class</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={billingInfo.clientClass}
                  onChange={(e) => setBillingInfo(prev => ({...prev, clientClass: e.target.value}))}
                >
                  <option>Sentara Health Plans, Personal Care, Respite Care</option>
                  <option>Medicare</option>
                  <option>Medicaid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">Billing Cycle</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={billingInfo.billingCycle}
                  onChange={(e) => setBillingInfo(prev => ({...prev, billingCycle: e.target.value}))}
                >
                  <option>Weekly</option>
                  <option>Bi-weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">Insurance Policy Number</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={billingInfo.insurancePolicyNumber}
                  onChange={(e) => setBillingInfo(prev => ({...prev, insurancePolicyNumber: e.target.value}))}
                >
                  <option>35690720010</option>
                  <option>35690720011</option>
                  <option>35690720012</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing Notes</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                  placeholder="Enter billing notes..."
                  value={billingInfo.billingNotes}
                  onChange={(e) => setBillingInfo(prev => ({...prev, billingNotes: e.target.value}))}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Legacy Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              {Object.entries({
                billClient: 'Bill Client',
                billOvertimeRates: 'Bill overtime rates',
                billHolidayRates: 'Bill holiday rates',
                payCaregiver: 'Pay Caregiver',
                hipaaInformationRelease: 'HIPAA information Release Signed',
                useMtuOnCalendar: 'Use mTU on calendar'
              }).map(([key, label]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{label}</span>
                  <button
                    onClick={() => handleLegacyToggle(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      legacySettings[key] ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        legacySettings[key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">Include Total Amount Due On Split Invoices</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={legacySettings.includeTotalAmount}
                  onChange={(e) => setLegacySettings(prev => ({...prev, includeTotalAmount: e.target.value}))}
                >
                  <option>System Default (No)</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">Services</label>
                <div className="flex space-x-4">
                  {['All', 'Authorized Only', 'Authorized + Assigned'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="services"
                        value={option}
                        checked={legacySettings.services === option}
                        onChange={(e) => setLegacySettings(prev => ({...prev, services: e.target.value}))}
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payers Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Payers</h2>
              <button
                onClick={() => setShowAddPayer(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {showAddPayer && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Payer Name"
                  value={newPayer.name}
                  onChange={(e) => setNewPayer(prev => ({...prev, name: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={newPayer.contact}
                  onChange={(e) => setNewPayer(prev => ({...prev, contact: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newPayer.location}
                  onChange={(e) => setNewPayer(prev => ({...prev, location: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <select
                  value={newPayer.defaultFax}
                  onChange={(e) => setNewPayer(prev => ({...prev, defaultFax: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option>Personal Care</option>
                  <option>Respite Care</option>
                </select>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleAddPayer}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddPayer(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Requires Auth.</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Verification Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Default Fax</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Contact</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {payers.map((payer) => (
                  <tr key={payer.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{payer.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-green-600">{payer.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">{payer.requiresAuth}</td>
                    <td className="px-4 py-3 text-sm">{payer.verificationDate}</td>
                    <td className="px-4 py-3 text-sm">{payer.defaultFax}</td>
                    <td className="px-4 py-3 text-sm">{payer.contact}</td>
                    <td className="px-4 py-3 text-sm">{payer.location}</td>
                    <td className="px-4 py-3 text-sm">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 flex items-center gap-1">
                        <Eye size={12} />
                        View / Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Responsibility Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Payment Responsibility</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Max Hours and Visits Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Max Hours and Visits</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Non Payer Authorizations Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Non Payer Authorizations</h2>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-orange-100 border border-orange-300 rounded flex items-center justify-center">
                  <span className="text-orange-600 text-xs font-bold">!</span>
                </div>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">LEGACY</span>
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={legacySettings.requireAuthorizations || false}
                onChange={() => handleLegacyToggle('requireAuthorizations')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Require Authorizations</span>
            </label>
          </div>
        </div>

        {/* Third Party Billing Configuration Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Third Party Billing Configuration</h2>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-orange-100 border border-orange-300 rounded flex items-center justify-center">
                  <span className="text-orange-600 text-xs font-bold">!</span>
                </div>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">LEGACY</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Any visits billed electronically will be billed to the first Payer below that it applies to. Selecting a Service Rate will cause a Payer to only receive visits that have that Service Rate. Enter as much information as possible. Upon saving, you will be presented with any warnings or errors that the settings will cause when submitting billing claims.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              ADD A NEW PAYER
            </button>
          </div>
        </div>

        {/* Default Service Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Default Service</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly:</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>[Auto-Guess] (SHP-PC)</option>
                    <option>Personal Care</option>
                    <option>Respite Care</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daily:</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>[Auto-Guess] (unknown)</option>
                    <option>Personal Care</option>
                    <option>Respite Care</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fixed:</label>
                <select className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>[Auto-Guess] (unknown)</option>
                  <option>Personal Care</option>
                  <option>Respite Care</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type:</label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input type="radio" name="serviceType" value="hourly" className="mr-2 text-blue-600" />
                    <span className="text-sm text-gray-700">Hourly</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="serviceType" value="daily" className="mr-2 text-blue-600" />
                    <span className="text-sm text-gray-700">Daily</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="serviceType" value="fix" className="mr-2 text-blue-600" />
                    <span className="text-sm text-gray-700">Fix</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="serviceType" value="autoGuess" defaultChecked className="mr-2 text-blue-600" />
                    <span className="text-sm text-gray-700">[Auto Guess] (Hourly)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information Section (QuickBooks) */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Billing Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-2">QuickBooks Name</label>
                  <input
                    type="text"
                    value="Adams, Nehemiyah"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-2">QuickBooks Id</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-2">QuickBooks Class</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select Class</option>
                    <option>Personal Care</option>
                    <option>Respite Care</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-2">Tax Code</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select Tax Code</option>
                    <option>Tax</option>
                    <option>Non-Tax</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Use only Caregiver's first name on the invoice</span>
                  <button
                    onClick={() => handleLegacyToggle('useFirstNameOnly')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      legacySettings.useFirstNameOnly ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        legacySettings.useFirstNameOnly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Print invoices in QuickBooks</span>
                  <button
                    onClick={() => handleLegacyToggle('printInvoices')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      legacySettings.printInvoices ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        legacySettings.printInvoices ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Email invoices in QuickBooks</span>
                  <button
                    onClick={() => handleLegacyToggle('emailInvoices')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      legacySettings.emailInvoices ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        legacySettings.emailInvoices ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authorizations Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Authorizations</h2>
              <button
                onClick={() => setShowAddAuth(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search authorizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {showAddAuth && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Auth Number"
                  value={newAuth.authNumber}
                  onChange={(e) => setNewAuth(prev => ({...prev, authNumber: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Code"
                  value={newAuth.code}
                  onChange={(e) => setNewAuth(prev => ({...prev, code: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newAuth.description}
                  onChange={(e) => setNewAuth(prev => ({...prev, description: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={newAuth.start}
                  onChange={(e) => setNewAuth(prev => ({...prev, start: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={newAuth.end}
                  onChange={(e) => setNewAuth(prev => ({...prev, end: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Max Time (e.g., 24 hrs 0 min)"
                  value={newAuth.maxTime}
                  onChange={(e) => setNewAuth(prev => ({...prev, maxTime: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleAddAuth}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddAuth(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Auth #</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Payer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Start</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">End</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Max Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Period</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthorizations.map((auth) => (
                  <tr key={auth.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {auth.authNumber}
                    </td>
                    <td className="px-4 py-3 text-sm">{auth.payer}</td>
                    <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {auth.code}
                    </td>
                    <td className="px-4 py-3 text-sm">{auth.description}</td>
                    <td className="px-4 py-3 text-sm">{auth.start}</td>
                    <td className="px-4 py-3 text-sm">{auth.end}</td>
                    <td className="px-4 py-3 text-sm">{auth.maxTime}</td>
                    <td className="px-4 py-3 text-sm">{auth.period}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-green-600">{auth.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDashboard;
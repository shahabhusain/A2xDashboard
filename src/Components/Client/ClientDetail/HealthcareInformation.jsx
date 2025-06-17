import React, { useState } from 'react';

const HealthcareForm = () => {
  const [formData, setFormData] = useState({
    primaryCarePhysician: '',
    physicianType: '',
    physicianPhone: '',
    physicianEmail: '',
    physicianReceiveUpdates: false,
    isCurrentPatient: false,
    referringProvider: '',
    preferredHospital: '',
    hospitalEmail: '',
    hospitalReceiveUpdates: false,
    isCurrentPatientHospital: false,
    preferredHomeHealthAgency: '',
    homeHealthEmail: '',
    homeHealthReceiveUpdates: false,
    isCurrentPatientHomeHealth: false,
    preferredHospiceAgency: '',
    hospiceEmail: '',
    hospiceReceiveUpdates: false,
    isCurrentPatientHospice: false,
    other: '',
    isCurrentPatientOther: false,
    diagnosis1: '',
    diagnosis2: '',
    diagnosis3: '',
    diagnosis4: '',
    medicalNotes: '',
    pharmacyMedicationInfo: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleClear = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const handleSelectCode = (field) => {
    // This would typically open a code selection modal
    console.log(`Opening code selector for ${field}`);
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('physicianPhone', formatted);
  };

  return (
    <div className=" mt-4">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Healthcare Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Healthcare Information</h2>
              <div className="mt-2">
                <span className="text-red-500 text-sm">(+Add More) (Create New)</span>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Primary Care Physician */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Primary Care Physician</label>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <select 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.primaryCarePhysician}
                    onChange={(e) => handleInputChange('primaryCarePhysician', e.target.value)}
                  >
                    <option value="">No Physician selected</option>
                    <option value="dr-smith">Dr. Smith</option>
                    <option value="dr-johnson">Dr. Johnson</option>
                  </select>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.isCurrentPatient}
                      onChange={() => handleCheckboxChange('isCurrentPatient')}
                      className="mr-2"
                    />
                    Is Current Patient
                  </label>
                  <span className="text-sm text-gray-600">Referring Provider</span>
                </div>
              </div>

              {/* Physician Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="text-sm font-medium text-gray-700">Physician Type</label>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.physicianType}
                    onChange={(e) => handleInputChange('physicianType', e.target.value)}
                  />
                </div>
              </div>

              {/* Physician Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="text-sm font-medium text-gray-700">Physician Phone</label>
                <div className="md:col-span-2">
                  <input
                    type="tel"
                    placeholder="(XXX-XXX-XXXX)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.physicianPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Physician Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="text-sm font-medium text-gray-700">Physician Email</label>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <input
                    type="email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.physicianEmail}
                    onChange={(e) => handleInputChange('physicianEmail', e.target.value)}
                  />
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.physicianReceiveUpdates}
                      onChange={() => handleCheckboxChange('physicianReceiveUpdates')}
                      className="mr-2"
                    />
                    Receive updates?
                  </label>
                </div>
              </div>

              {/* Preferred Hospital */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Preferred Hospital</label>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <select 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.preferredHospital}
                    onChange={(e) => handleInputChange('preferredHospital', e.target.value)}
                  >
                    <option value="">No Hospital selected</option>
                    <option value="general-hospital">General Hospital</option>
                    <option value="city-medical">City Medical Center</option>
                  </select>
                  <span className="text-red-500 text-sm">(Create New)</span>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.isCurrentPatientHospital}
                      onChange={() => handleCheckboxChange('isCurrentPatientHospital')}
                      className="mr-2"
                    />
                    Is Current Patient
                  </label>
                </div>
              </div>

              {/* Hospital Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="text-sm font-medium text-gray-700">Hospital Email</label>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <input
                    type="email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.hospitalEmail}
                    onChange={(e) => handleInputChange('hospitalEmail', e.target.value)}
                  />
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.hospitalReceiveUpdates}
                      onChange={() => handleCheckboxChange('hospitalReceiveUpdates')}
                      className="mr-2"
                    />
                    Receive updates?
                  </label>
                </div>
              </div>

              {/* Preferred Home Health Agency */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Preferred Home Health Agency</label>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <select 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.preferredHomeHealthAgency}
                    onChange={(e) => handleInputChange('preferredHomeHealthAgency', e.target.value)}
                  >
                    <option value="">No Agency selected</option>
                    <option value="home-care-plus">Home Care Plus</option>
                    <option value="caring-hands">Caring Hands</option>
                  </select>
                  <span className="text-red-500 text-sm">(Create New)</span>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.isCurrentPatientHomeHealth}
                      onChange={() => handleCheckboxChange('isCurrentPatientHomeHealth')}
                      className="mr-2"
                    />
                    Is Current Patient
                  </label>
                </div>
              </div>

              {/* Home Health Agency Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="text-sm font-medium text-gray-700">Home Health Agency Email</label>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <input
                    type="email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.homeHealthEmail}
                    onChange={(e) => handleInputChange('homeHealthEmail', e.target.value)}
                  />
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.homeHealthReceiveUpdates}
                      onChange={() => handleCheckboxChange('homeHealthReceiveUpdates')}
                      className="mr-2"
                    />
                    Receive updates?
                  </label>
                </div>
              </div>

              {/* Preferred Hospice Agency */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Preferred Hospice Agency</label>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <select 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.preferredHospiceAgency}
                    onChange={(e) => handleInputChange('preferredHospiceAgency', e.target.value)}
                  >
                    <option value="">No Agency selected</option>
                    <option value="compassionate-care">Compassionate Care</option>
                    <option value="peaceful-transitions">Peaceful Transitions</option>
                  </select>
                  <span className="text-red-500 text-sm">(Create New)</span>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.isCurrentPatientHospice}
                      onChange={() => handleCheckboxChange('isCurrentPatientHospice')}
                      className="mr-2"
                    />
                    Is Current Patient
                  </label>
                </div>
              </div>

              {/* Hospice Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="text-sm font-medium text-gray-700">Hospice Email</label>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <input
                    type="email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.hospiceEmail}
                    onChange={(e) => handleInputChange('hospiceEmail', e.target.value)}
                  />
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.hospiceReceiveUpdates}
                      onChange={() => handleCheckboxChange('hospiceReceiveUpdates')}
                      className="mr-2"
                    />
                    Receive updates?
                  </label>
                </div>
              </div>

              {/* Other */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Other</label>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <select 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.other}
                    onChange={(e) => handleInputChange('other', e.target.value)}
                  >
                    <option value="">None Selected</option>
                    <option value="other1">Other Option 1</option>
                    <option value="other2">Other Option 2</option>
                  </select>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={formData.isCurrentPatientOther}
                      onChange={() => handleCheckboxChange('isCurrentPatientOther')}
                      className="mr-2"
                    />
                    Is Current Patient
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Extra Information</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Diagnosis Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Diagnosis</label>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 w-8">{num === 1 ? '1st:' : num === 2 ? '2nd:' : num === 3 ? '3rd:' : '4th:'}</span>
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData[`diagnosis${num}`]}
                        onChange={(e) => handleInputChange(`diagnosis${num}`, e.target.value)}
                      />
                      <button
                        onClick={() => handleSelectCode(`diagnosis${num}`)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Select Code
                      </button>
                      <button
                        onClick={() => handleClear(`diagnosis${num}`)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Clear
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical Notes</label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.medicalNotes}
                  onChange={(e) => handleInputChange('medicalNotes', e.target.value)}
                />
              </div>

              {/* Pharmacy/Medication Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pharmacy/Medication Information</label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.pharmacyMedicationInfo}
                  onChange={(e) => handleInputChange('pharmacyMedicationInfo', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HealthcareForm;
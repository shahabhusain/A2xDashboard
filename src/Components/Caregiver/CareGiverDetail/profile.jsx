import React, { useState } from 'react';
import { User, Calendar, MapPin, FileText, Clock, Smartphone } from 'lucide-react';
import personal from '../../../assets/personal.png'
const Profile = () => {
    const [gender, setGender] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        middleInitial: '',
        lastName: '',
        goesBy: '',
        dateOfBirth: { month: '', day: '', year: '' },
        enteredAge: '',
        ethnicity: '',
        driverLicenseNumber: '',
        dlIssueDate: '',
        dlExpiryDate: '',
        driverLicenseIssuing: '',
        state: '',
        otherLanguageSpoken: '',
        workLocation: '',
        socialSecurityNumber: '',
        npi: '',
        // A2Z Care fields
        status: '',
        caregiverClass: '',
        applicationDate: { month: '', day: '', year: '' },
        interviewDate: { month: '', day: '', year: '' },
        hireDate: { month: '', day: '', year: '' },
        startDate: '',
        terminationDate: { month: '', day: '', year: '' },
        administrator: '',
        region: '',
        referredBy: '',
        quickBooksId: '',
        payrollId: '',
        seniorityHours: '0',
        offset: '0',
        mobileAppGeofence: 'Enabled',
        mobileAppVersion: 'App not installed',
        username: 'Vincentquijar'
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDateChange = (dateField, part, value) => {
        setFormData(prev => ({
            ...prev,
            [dateField]: {
                ...prev[dateField],
                [part]: value
            }
        }));
    };

    return (
        <div className="mt-4 flex gap-6 ">
            {/* Left side - Personal Information */}
            <div className="w-1/2">
                 {/* Personal Information */}
                  <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-lg font-semibold border-b-[1px] border-b-[#D1D5DB] pb-3 text-gray-800 mb-4 flex items-center gap-2">
                        Personal Information
                    </h2>
                    
                    <div className="flex items-center gap-4">

                            <img 
                                src={personal}
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-gray-600 w-28">First Name</label>
                                <input 
                                    type="text" 
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-gray-600 w-28">Middle Initial</label>
                                <input 
                                    type="text" 
                                    value={formData.middleInitial}
                                    onChange={(e) => handleInputChange('middleInitial', e.target.value)}
                                    className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-gray-600 w-28">Last Name</label>
                                <input 
                                    type="text" 
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-gray-600 w-28">Goes By</label>
                                <input 
                                    type="text" 
                                    value={formData.goesBy}
                                    onChange={(e) => handleInputChange('goesBy', e.target.value)}
                                    className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mt-5">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Gender</label>
                            <div className="flex gap-3 justify-between flex-1  ">
                                <button 
                                    onClick={() => setGender(1)} 
                                    className={`py-2 px-6 w-full  rounded-md transition-colors ${
                                        gender === 1 
                                            ? "bg-blue-500 text-white" 
                                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    Male
                                </button>
                                <button 
                                    onClick={() => setGender(2)} 
                                    className={`py-2 px-6 w-full rounded-md transition-colors ${
                                        gender === 2 
                                            ? "bg-blue-500 text-white" 
                                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    Female
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Date of Birth</label>
                            <div className="flex gap-2 flex-1">
                                <input 
                                    type="text" 
                                    placeholder="mm"
                                    value={formData.dateOfBirth.month}
                                    onChange={(e) => handleDateChange('dateOfBirth', 'month', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="dd"
                                    value={formData.dateOfBirth.day}
                                    onChange={(e) => handleDateChange('dateOfBirth', 'day', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="yyyy"
                                    value={formData.dateOfBirth.year}
                                    onChange={(e) => handleDateChange('dateOfBirth', 'year', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Entered Age</label>
                            <input 
                                type="text" 
                                value={formData.enteredAge}
                                onChange={(e) => handleInputChange('enteredAge', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Ethnicity</label>
                            <input 
                                type="text" 
                                value={formData.ethnicity}
                                onChange={(e) => handleInputChange('ethnicity', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Driver License Number</label>
                            <input 
                                type="text" 
                                value={formData.driverLicenseNumber}
                                onChange={(e) => handleInputChange('driverLicenseNumber', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">DL Issue Date</label>
                            <input 
                                type="text" 
                                value={formData.dlIssueDate}
                                onChange={(e) => handleInputChange('dlIssueDate', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">DL Expiry Date</label>
                            <input 
                                type="text" 
                                value={formData.dlExpiryDate}
                                onChange={(e) => handleInputChange('dlExpiryDate', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Driver License Issuing</label>
                            <input 
                                type="text" 
                                value={formData.driverLicenseIssuing}
                                onChange={(e) => handleInputChange('driverLicenseIssuing', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">State</label>
                            <input 
                                type="text" 
                                value={formData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Other Language Spoken</label>
                            <input 
                                type="text" 
                                value={formData.otherLanguageSpoken}
                                onChange={(e) => handleInputChange('otherLanguageSpoken', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Work Location</label>
                            <input 
                                type="text" 
                                value={formData.workLocation}
                                onChange={(e) => handleInputChange('workLocation', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Social Security Number</label>
                            <input 
                                type="text" 
                                value={formData.socialSecurityNumber}
                                onChange={(e) => handleInputChange('socialSecurityNumber', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">NPI</label>
                            <input 
                                type="text" 
                                value={formData.npi}
                                onChange={(e) => handleInputChange('npi', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
                 {/* Personal information */}

                 {/* mailing Information */}
                   <div className="bg-white shadow-md p-6 rounded-lg mt-3">
                    <h2 className="text-lg font-semibold border-b-[1px] border-b-[#D1D5DB] pb-3 text-gray-800 mb-4 flex items-center gap-2">
                       Mailing Information
                    </h2>

                          <div className=' space-y-4'>
                               <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Address</label>
                            <input 
                                type="text" 
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                         <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">City</label>
                            <input 
                                type="text" 
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                         <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">State</label>
                            <input 
                                type="text" 
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                         <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Zip Code</label>
                            <div className=' flex items-center gap-2 flex-1'>
                                  <input 
                                type="text" 
                                className=" w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                             <button className='  py-2 px-5 w-full rounded-md bg-[#487FFF] text-white'>Mailing Labels</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                             <label className="text-sm font-medium text-gray-600 w-28">Acceptable Driving Distance</label>
                            <div className=' flex items-center gap-2 flex-1'>
                                  <input 
                                type="text" 
                                className=" w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className=' text-[14px] font-[500] text-[#4B5563]'>mi</p>
                            <p className=' bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full'>!</p>
                            </div>
                        </div>
                          </div>

                   </div>
                  {/* mailing Information */}

                  {/* Tax */}
                  <div className="bg-white shadow-md p-6 rounded-lg mt-3">
                    <h2 className="text-lg font-semibold border-b-[1px] border-b-[#D1D5DB] pb-3 text-gray-800 mb-4 flex items-center gap-2">
                       Tax and General  Availability Information
                    </h2>
                            <textarea 
                                rows={12} 
                                type="text" 
                                className="flex-1 w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                  </div>
                  {/* Tax */}

                  {/* Caregiver Points */}
                  <div className="bg-white shadow-md p-6 rounded-lg mt-3">
                                        <h2 className="text-lg font-semibold border-b-[1px] border-b-[#D1D5DB] pb-3 text-gray-800 mb-4 flex items-center gap-2">
                            Caregiver Points
                    </h2>
                    <div className=' flex flex-col gap-5'>
                        <button className=' flex w-full items-center justify-between text-[#111827] text-[18px] font-[400]'>Caregiver Points <span>0</span></button>
                          <button className=' flex w-full items-center justify-between text-[#111827] text-[18px] font-[400]'>Caregiver Points <span>0</span></button>
                            <button className=' flex w-full items-center justify-between text-[#111827] text-[18px] font-[400]'>Caregiver Points <span>0</span></button>
                    </div>
                  </div>
                  {/* Caregiver Points */}

                  {/* Permanant */}
                  <div className="bg-white shadow-md p-6 rounded-lg mt-3">
                    <h2 className="text-lg font-semibold border-b-[1px] border-b-[#D1D5DB] pb-3 text-gray-800 mb-4 flex items-center gap-2">
                      Permanent Priority Notes
                    </h2>
                            <textarea 
                                rows={12} 
                                type="text" 
                                className="flex-1 w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                  </div>
                  {/* pernament */}
            </div>

                  {/* Right side - A2Z Care Information */}
            <div className="w-1/2 space-y-6">
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-lg font-semibold border-b-[1px] border-b-[#D1D5DB] pb-3 text-gray-800 mb-4 flex items-center gap-2">
                        A2Z Care Information
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Caregiver Class</label>
                            <input 
                                type="text" 
                                value={formData.caregiverClass}
                                onChange={(e) => handleInputChange('caregiverClass', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Application Date</label>
                            <div className="flex flex-1 gap-2">
                                <input 
                                    type="text" 
                                    placeholder="mm"
                                    value={formData.applicationDate.month}
                                    onChange={(e) => handleDateChange('applicationDate', 'month', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="dd"
                                    value={formData.applicationDate.day}
                                    onChange={(e) => handleDateChange('applicationDate', 'day', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="yy"
                                    value={formData.applicationDate.year}
                                    onChange={(e) => handleDateChange('applicationDate', 'year', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Interview Date</label>
                            <div className="flex flex-1 gap-2">
                                <input 
                                    type="text" 
                                    placeholder="mm"
                                    value={formData.interviewDate.month}
                                    onChange={(e) => handleDateChange('interviewDate', 'month', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="dd"
                                    value={formData.interviewDate.day}
                                    onChange={(e) => handleDateChange('interviewDate', 'day', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="yy"
                                    value={formData.interviewDate.year}
                                    onChange={(e) => handleDateChange('interviewDate', 'year', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Hire Date</label>
                            <div className="flex flex-1 gap-2">
                                <input 
                                    type="text" 
                                    placeholder="mm"
                                    value={formData.hireDate.month}
                                    onChange={(e) => handleDateChange('hireDate', 'month', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="dd"
                                    value={formData.hireDate.day}
                                    onChange={(e) => handleDateChange('hireDate', 'day', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="yy"
                                    value={formData.hireDate.year}
                                    onChange={(e) => handleDateChange('hireDate', 'year', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Start Date</label>
                            <input 
                                type="text" 
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Termination Date</label>
                            <div className="flex flex-1 gap-2">
                                <input 
                                    type="text" 
                                    placeholder="mm"
                                    value={formData.terminationDate.month}
                                    onChange={(e) => handleDateChange('terminationDate', 'month', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="dd"
                                    value={formData.terminationDate.day}
                                    onChange={(e) => handleDateChange('terminationDate', 'day', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    type="text" 
                                    placeholder="yy"
                                    value={formData.terminationDate.year}
                                    onChange={(e) => handleDateChange('terminationDate', 'year', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Administrator</label>
                            <select 
                                value={formData.administrator}
                                onChange={(e) => handleInputChange('administrator', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Administrator</option>
                                <option value="admin1">Administrator 1</option>
                                <option value="admin2">Administrator 2</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Region</label>
                            <select 
                                value={formData.region}
                                onChange={(e) => handleInputChange('region', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Region</option>
                                <option value="north">North</option>
                                <option value="south">South</option>
                                <option value="east">East</option>
                                <option value="west">West</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Referred By</label>
                            <div className="flex-1 flex items-center gap-2">
                                <select 
                                    value={formData.referredBy}
                                    onChange={(e) => handleInputChange('referredBy', e.target.value)}
                                    className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Referrer</option>
                                    <option value="website">Website</option>
                                    <option value="friend">Friend</option>
                                    <option value="advertisement">Advertisement</option>
                                </select>
                                <button className="text-blue-500 text-sm hover:underline">[Create New]</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Quick Books ID</label>
                            <input 
                                type="text" 
                                value={formData.quickBooksId}
                                onChange={(e) => handleInputChange('quickBooksId', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Payroll ID</label>
                            <input 
                                type="text" 
                                value={formData.payrollId}
                                onChange={(e) => handleInputChange('payrollId', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Seniority (Hours)</label>
                            <div className="flex items-center gap-2 flex-1">
                                <input 
                                    type="text" 
                                    value={formData.seniorityHours}
                                    onChange={(e) => handleInputChange('seniorityHours', e.target.value)}
                                    className="w-20 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-500">Offset:</span>
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">!</span>
                                </div>
                                <input 
                                    type="text" 
                                    value={formData.offset}
                                    onChange={(e) => handleInputChange('offset', e.target.value)}
                                    className="w-20 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Mobile App Geofence</label>
                            <div className="flex items-center gap-2 flex-1">
                                <select 
                                    value={formData.mobileAppGeofence}
                                    onChange={(e) => handleInputChange('mobileAppGeofence', e.target.value)}
                                    className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Enabled">Enabled</option>
                                    <option value="Disabled">Disabled</option>
                                </select>
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">!</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-32">Mobile App Version</label>
                            <input 
                                type="text" 
                                value={formData.mobileAppVersion}
                                onChange={(e) => handleInputChange('mobileAppVersion', e.target.value)}
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex gap-3">
                                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                                    Reset Password
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Username:</span>
                                <span className="text-sm font-medium text-gray-800">{formData.username}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Phone (Home)</label>
                            <input 
                                type="text" 
                                placeholder="(xxx-xxx-xxxx)"
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Phone (Mobile)</label>
                            <input 
                                type="text" 
                                placeholder="(xxx-xxx-xxxx)"
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Mobile Opt-in What to receive</label>
                            <div className="flex items-center gap-2 flex-1">
                                  <input 
                                type="text" 
                                placeholder="[None] (Receive None)"
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                                <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600">
                                    Change
                                </button>
                            </div>
                        </div>


                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Status Type</label>
                               <input 
                                type="text" 
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Phone (Other)</label>
                            <input 
                                type="text" 
                                placeholder="(xxx-xxx-xxxx)"
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Email Address</label>
                            <input 
                                type="email" 
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                      <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Mobile Opt-in What to receive</label>
                            <div className="flex items-center gap-2 flex-1">
                                  <input 
                                type="text" 
                                placeholder="[None] (Receive None)"
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                                <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600">
                                    Change
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Send Now</label>
                            <div className="flex-1">
                                <div className="text-sm text-gray-700">
                                    <span>Recurring: </span>
                                    <span className="text-blue-600 underline cursor-pointer">Weekly messages</span>
                                </div>
                                <div className="text-sm text-blue-600 underline cursor-pointer">
                                    Week Calendar  Next Day Schedule
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Add to group</label>
                              <input 
                                type="text" 
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Emergency Contact</label>
                            <input 
                                type="text" 
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Characteristics */}
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Characteristics</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Hobbies</label>
                            <textarea 
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                                rows="3"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600 w-28">Skills</label>
                            <textarea 
                                className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                                rows="3"
                            />
                        </div>
                    </div>
                </div>

                {/* Open Visit Requests */}
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Open Visit Requests</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-600 text-white">
                                    <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Caller</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Subject</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Staff</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                        No Results
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Related Call Notes */}
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Related Call Notes</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-600 text-white">
                                    <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Caller</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Subject</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Staff</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                        No Results
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Related Tagged Notes */}
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h1 className="text-lg font-semibold border-b-[1px] border-b-[#D1D5DB] pb-3 text-gray-800 mb-4 flex items-center gap-2">Related Tagged Notes</h1>
                </div>

                 {/* Marketing Meeting Notes*/}
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h1 className="text-lg font-semibold border-b-[1px] border-b-[#D1D5DB] pb-3 text-gray-800 mb-4 flex items-center gap-2">Marketing Meeting Notes</h1>
                </div>


                {/* Desired Work Schedule Comments*/}
                 <div className="bg-white shadow-md p-6 rounded-lg">
                    <h1 className="text-lg font-semibold border-b-[1px] border-b-[#D1D5DB] pb-3 text-gray-800 mb-4 flex items-center gap-2">Desired Work Schedule Comments</h1>
                    <textarea 
                                className=" w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                                rows="3"
                            />
                </div>
            </div>
            
        </div>
    );
};

export default Profile;
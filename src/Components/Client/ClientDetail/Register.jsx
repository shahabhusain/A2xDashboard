import React, { useState } from 'react';
import axios from 'axios';
import { axiosPublic } from '../../../lib/axious';

const Register = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    title: '',
    firstName: '',
    lastName: '',
    goesBy: '',
    gender: '',
    dob: { day: '', month: '', year: '' },
    a2zCareInfo: '',
    
    // Residential Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Contact Information
    phoneHome: '',
    phoneOther: '',
    phoneMother: '',
    email: '',
    
    // Billing Address
    sameAsResidential: false,
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingEmail: '',
    
    // Characteristics
    weight: '',
    height: { feet: '', inches: '' },
    language: '',
    hobbies: '',
    allergies: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const transformFormDataToApiFormat = () => {
    return {
      title: formData.title,
      first_name: formData.firstName,
      last_name: formData.lastName,
      goes_by: formData.goesBy,
      gender: formData.gender,
      date_of_birth: `${formData.dob.year}-${formData.dob.month.padStart(2, '0')}-${formData.dob.day.padStart(2, '0')}T00:00:00.000Z`,
      
      residentialAddress: {
        name: formData.firstName + ' ' + formData.lastName,
        address: formData.address,
        city: formData.city,
        residential_state: formData.state,
        residential_zipCode: formData.zipCode,
        mobile_app_geofence: "Enabled",
        override_geofence_radius: "100m",
        community: "Sunset Villas"
      },

      alternateAddresses: [], // You can add logic to populate this from your form

      contact: {
        phone_home: formData.phoneHome,
        phone_other: formData.phoneOther,
        phone_mobile: formData.phoneMother,
        mobile_opt_out: "false",
        telephony_phone: formData.phoneHome,
        email: formData.email,
        email_opt_out: "false",
        send_now: "yes"
      },

      directions_to_residence: {
        from: "" // Add this field if you collect it in your form
      },

      pets: [], // Add pet data if collected in your form

      careInfo: {
        status: "Active", // Make dynamic if needed
        lead_created_date: new Date().toISOString(),
        initial_assessment_date: new Date().toISOString(),
        start_date: new Date().toISOString(),
        effective_date: new Date().toISOString(),
        administrator: "Jane Admin", // Make dynamic
        region_code: "WEST01", // Make dynamic
        preferred_by: "Friend Referral", // Make dynamic
        medicaid_number: "MCD-123456789", // Make dynamic
        preferred_caregiver: "Emily Caregiver", // Make dynamic
        action_alerts: formData.allergies || "None",
        invoicing_id: "INV-555999" // Make dynamic
      },

      billing_address: {
        name: formData.sameAsResidential ? formData.firstName + ' ' + formData.lastName : formData.billingName,
        address: formData.sameAsResidential ? formData.address : formData.billingAddress,
        city: formData.sameAsResidential ? formData.city : formData.billingCity,
        alternate_state: formData.sameAsResidential ? formData.state : formData.billingState,
        alternate_zipCode: formData.sameAsResidential ? formData.zipCode : formData.billingZip,
        email: formData.sameAsResidential ? formData.email : formData.billingEmail
      },

      marital: {
        marital_status: "Married", // Add to form if needed
        spouse_name: "Jane Doe" // Add to form if needed
      },

      characteristics: {
        weight: parseInt(formData.weight) || 0,
        height: {
          feet: parseInt(formData.height.feet) || 0,
          inches: parseInt(formData.height.inches) || 0
        },
        language_spoken: formData.language,
        occupation: "Engineer", // Add to form if needed
        job_title: "Software Engineer", // Add to form if needed
        hobbies: formData.hobbies,
        triage_level: "2", // Add to form if needed
        advance_directive: true,
        dnr: false,
        allergies: formData.allergies || "None",
        will_to_live: true
      },

      isDeleted: false
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const apiData = transformFormDataToApiFormat();
      const response = await axiosPublic.post('/clients/register-client', apiData, {
      });
      console.log('API Response:', response.data);
      setSubmitSuccess(true);
      
    } catch (error) {
      console.error('API Error:', error);
      setSubmitError(error.response?.data?.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
       <div>

<div className='bg-white my-6 mx-4 py-4 px-4 border-[1px] border-[#D1D5DB] rounded-md'>
        <h1 className='text-[#111827] text-[24px] font-[600]'>Register Clients</h1>
    </div>



        <form onSubmit={handleSubmit} className="mx-auto pb-8 px-4">
      <div className="flex flex-col lg:flex-row gap-2">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 space-y-2">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">First Name<span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Last Name<span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Goes By</label>
                  <input
                    type="text"
                    name="goesBy"
                    value={formData.goesBy}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="flex flex-1 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'Male' })}
                    className={`px-4 w-full py-2 rounded-md border ${
                      formData.gender === 'Male'
                        ? 'bg-[#487FFF] text-white border-[#487FFF]'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'Female' })}
                    className={`px-4 py-2 w-full rounded-md border ${
                      formData.gender === 'Female'
                        ? 'bg-[#487FFF] text-white border-[#487FFF]'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <div className="grid flex-1 grid-cols-3 gap-3">
                  <div>
                    <input
                      type="number"
                      placeholder="DD"
                      min="1"
                      max="31"
                      value={formData.dob.day}
                      onChange={(e) => handleNestedChange('dob', 'day', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="MM"
                      min="1"
                      max="12"
                      value={formData.dob.month}
                      onChange={(e) => handleNestedChange('dob', 'month', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="YYYY"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.dob.year}
                      onChange={(e) => handleNestedChange('dob', 'year', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">A2Z Care Information</label>
                <textarea
                  name="a2zCareInfo"
                  value={formData.a2zCareInfo}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Residential Address */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Residential Address</h2>
            
            <div className="space-y-4">
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Address<span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">City<span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">State<span className='text-red-500'>*</span></label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    {/* Add all other states */}
                  </select>
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">Zip Code<span className='text-red-500'>*</span></label>
                <div className="flex flex-1 gap-2">
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    pattern="\d{5}(-\d{4})?"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#487FFF] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Verify
                  </button>

                  <button
                    type="button"
                    className="px-2 py-2 bg-[#4B5563] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Change / Fix
                  </button>
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">Mobile App Geofence</label>
                <div className="flex flex-1 gap-2">
                  <select className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option>Select Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Radius"
                  />
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Community</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Community</option>
                  <option>Community 1</option>
                  <option>Community 2</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-6 py-2 bg-[#487FFF] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Mailing Labels
                </button>
              </div>
            </div>
          </div>
          
          {/* Alternate Address */}
          <div className='bg-white rounded-lg shadow-md p-3 flex items-center justify-between'>
            <h2 className="text-xl font-semibold text-gray-800">Alternate Address</h2>
            <button
              type="button"
              className="px-6 py-2 bg-[#487FFF] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Contact Information</h2>
            
            <div className="space-y-4">
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Phone (Home)</label>
                <input
                  type="tel"
                  name="phoneHome"
                  value={formData.phoneHome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Phone (Other)</label>
                <input
                  type="tel"
                  name="phoneOther"
                  value={formData.phoneOther}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Phone (Mother)</label>
                <input
                  type="tel"
                  name="phoneMother"
                  value={formData.phoneMother}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Mobile Opt Out</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What NOT to receive"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Email Address<span className='text-red-500'>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Email Opt Out</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What NOT to receive"
                />
              </div>
            </div>
          </div>

          {/* Directions To Residence */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Directions To Residence</h2>
            <div className='flex items-center gap-6'>
              <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Pet Information */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Pet Information</h2>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Pet#1</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Pet#2</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Pet#3</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-full lg:w-1/2 space-y-2">
          {/* Status Information */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">A2Z Care Information</h2>
            
            <div className="space-y-4">
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Lead Created Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Initial Assessment Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Effective End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Administrator</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Administrator</option>
                  <option>Admin 1</option>
                  <option>Admin 2</option>
                </select>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Region Code</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Region</option>
                  <option>Region 1</option>
                  <option>Region 2</option>
                </select>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Preferred By</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Medicaid Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Preferred Caregiver</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Admin Alerts</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Invoicing ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Billing Address */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Billing Address</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sameAsResidential"
                  name="sameAsResidential"
                  checked={formData.sameAsResidential}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="sameAsResidential" className="ml-2 text-sm text-gray-700">
                  Same as Residential Address
                </label>
              </div>
              
              {!formData.sameAsResidential && (
                <>
                  <div className='flex items-center gap-6'>
                    <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="billingName"
                      value={formData.billingName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className='flex items-center gap-6'>
                    <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className='flex items-center gap-6'>
                      <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className='flex items-center gap-6'>
                      <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">State</label>
                      <select
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        {/* Add all other states */}
                      </select>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-6'>
                    <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <div className="flex flex-1 gap-2">
                      <input
                        type="text"
                        name="billingZip"
                        value={formData.billingZip}
                        onChange={handleChange}
                        pattern="\d{5}(-\d{4})?"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-[#487FFF] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="billingEmail"
                  value={formData.billingEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-6 py-2 bg-[#487FFF] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Mailing Labels
                </button>
              </div>
            </div>
          </div>

          {/* Marital Information */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Marital Information</h2>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-6'>
                <label className="w-[80px] block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className='flex items-center gap-6'>
                <label className="w-[80px] block text-sm font-medium text-gray-700 mb-1">Spouse</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Characteristics */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Characteristics</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className='flex items-center gap-6'>
                  <label className="w-[90px] block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <div className="flex flex-1">
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="inline-flex items-center px-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-gray-500">
                      lbs
                    </span>
                  </div>
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <div className="flex flex-1">
                    <input
                      type="number"
                      placeholder="Feet"
                      value={formData.height.feet}
                      onChange={(e) => handleNestedChange('height', 'feet', e.target.value)}
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Inches"
                      value={formData.height.inches}
                      onChange={(e) => handleNestedChange('height', 'inches', e.target.value)}
                      className="w-1/2 px-4 py-2 border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="inline-flex items-center px-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-gray-500">
                      ft/in
                    </span>
                  </div>
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Hobbies</label>
                <textarea
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className='flex items-center gap-6'>
                  <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">Advance Directive</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="advanceDirective"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="advanceDirective"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">DNR</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="dnr"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="dnr"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Actions and Status Messages */}
      <div className="mt-6 flex flex-col items-end space-y-4">
        {submitError && (
          <div className="w-full p-4 bg-red-100 text-red-700 rounded-md">
            {submitError}
          </div>
        )}
        
        {submitSuccess && (
          <div className="w-full p-4 bg-green-100 text-green-700 rounded-md">
            Profile saved successfully!
          </div>
        )}
        
        <div className="flex space-x-3">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
       </div>
  );
};

export default Register;
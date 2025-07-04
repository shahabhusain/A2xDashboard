import React, { useState, useEffect } from 'react';
import { axiosPublic } from '../../../lib/axious';
import { useGetCurrentUser } from '../../../Api/authApi';

const Profile = ({ clientData }) => {
  const user = useGetCurrentUser();
  const [formData, setFormData] = useState({
    // Initialize with empty/default values
    client_id: '',
    tenant_id: '',
    title: '',
    firstName: '',
    lastName: '',
    goesBy: '',
    gender: '',
    dob: { day: '', month: '', year: '' },
    a2zCareInfo: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    mobileAppGeofence: '',
    overrideGeofenceRadius: '',
    community: '',
    phoneHome: '',
    phoneOther: '',
    phoneMother: '',
    email: '',
    sameAsResidential: true,
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingEmail: '',
    weight: '',
    height: { feet: '', inches: '' },
    language: '',
    hobbies: '',
    allergies: '',
    advanceDirective: false,
    dnr: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize form data when clientData or user changes
  useEffect(() => {
    if (clientData && user) {
      const dobDate = new Date(clientData.date_of_birth);
      const dobDay = dobDate.getDate().toString();
      const dobMonth = (dobDate.getMonth() + 1).toString();
      const dobYear = dobDate.getFullYear().toString();

      setFormData({
        client_id: clientData._id,
        tenant_id: user.tenantId,
        title: clientData.title || '',
        firstName: clientData.first_name || '',
        lastName: clientData.last_name || '',
        goesBy: clientData.goes_by || '',
        gender: clientData.gender || '',
        dob: { day: dobDay, month: dobMonth, year: dobYear },
        a2zCareInfo: clientData.careInfo?.action_alerts || '',
        address: clientData.residentialAddress?.address || '',
        city: clientData.residentialAddress?.city || '',
        state: clientData.residentialAddress?.residential_state || '',
        zipCode: clientData.residentialAddress?.residential_zipCode || '',
        mobileAppGeofence: clientData.residentialAddress?.mobile_app_geofence || '',
        overrideGeofenceRadius: clientData.residentialAddress?.override_geofence_radius || '',
        community: clientData.residentialAddress?.community || '',
        phoneHome: clientData.contact?.phone_home || '',
        phoneOther: clientData.contact?.phone_other || '',
        phoneMother: clientData.contact?.phone_mobile || '',
        email: clientData.contact?.email || '',
        sameAsResidential: true,
        billingName: clientData.billing_address?.name || '',
        billingAddress: clientData.billing_address?.address || '',
        billingCity: clientData.billing_address?.city || '',
        billingState: clientData.billing_address?.alternate_state || '',
        billingZip: clientData.billing_address?.alternate_zipCode || '',
        billingEmail: clientData.billing_address?.email || '',
        weight: clientData.characteristics?.weight || '',
        height: {
          feet: clientData.characteristics?.height?.feet || '',
          inches: clientData.characteristics?.height?.inches || ''
        },
        language: clientData.characteristics?.language_spoken || '',
        hobbies: clientData.characteristics?.hobbies || '',
        allergies: clientData.characteristics?.allergies || '',
        advanceDirective: clientData.characteristics?.advance_directive || false,
        dnr: clientData.characteristics?.dnr || false
      });
    }
  }, [clientData, user]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      // Prepare the data for API
      const apiData = {
        client_id: formData.client_id,
        tenant_id: formData.tenant_id,
        title: formData.title,
        first_name: formData.firstName,
        last_name: formData.lastName,
        goes_by: formData.goesBy,
        gender: formData.gender,
        date_of_birth: `${formData.dob.year}-${formData.dob.month.padStart(2, '0')}-${formData.dob.day.padStart(2, '0')}`,
        residentialAddress: {
          address: formData.address,
          city: formData.city,
          residential_state: formData.state,
          residential_zipCode: formData.zipCode,
          mobile_app_geofence: formData.mobileAppGeofence,
          override_geofence_radius: formData.overrideGeofenceRadius,
          community: formData.community
        },
        contact: {
          phone_home: formData.phoneHome,
          phone_other: formData.phoneOther,
          phone_mobile: formData.phoneMother,
          email: formData.email
        },
        billing_address: {
          name: formData.billingName,
          address: formData.billingAddress,
          city: formData.billingCity,
          alternate_state: formData.billingState,
          alternate_zipCode: formData.billingZip,
          email: formData.billingEmail
        },
        characteristics: {
          weight: formData.weight,
          height: {
            feet: formData.height.feet,
            inches: formData.height.inches
          },
          language_spoken: formData.language,
          hobbies: formData.hobbies,
          allergies: formData.allergies,
          advance_directive: formData.advanceDirective,
          dnr: formData.dnr
        }
      };

      const response = await axiosPublic.patch("/clients/update-client", apiData);
      
      if (response.data && response.data.success) {
        setSubmitSuccess(true);
      } else {
        throw new Error(response.data?.message || 'Failed to update client');
      }
    } catch (error) {
      console.error('Update error:', error);
      setSubmitError(error.response?.data?.message || error.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!clientData) {
    return <div>Loading client data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto py-8">
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
                    <option value="CA">California</option>
                    {/* Add other states as needed */}
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
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">Mobile App Geofence</label>
                <div className="flex flex-1 gap-2">
                  <select 
                    name="mobileAppGeofence"
                    value={formData.mobileAppGeofence}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                  <input
                    type="text"
                    name="overrideGeofenceRadius"
                    value={formData.overrideGeofenceRadius}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Radius"
                  />
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Community</label>
                <input
                  type="text"
                  name="community"
                  value={formData.community}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Alternate Address */}
          <div className='bg-white rounded-lg shadow-md p-3'>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Alternate Addresses</h2>
            {clientData.alternateAddresses.map((address, index) => (
              <div key={index} className="mb-4 p-3 border rounded-lg">
                <div className='flex items-center gap-6 mb-2'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={address.name}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div className='flex items-center gap-6 mb-2'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={address.address}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div className='flex items-center gap-6 mb-2'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    value={address.city}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div className='flex items-center gap-6 mb-2'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    value={address.alternate_state}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div className='flex items-center gap-6 mb-2'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700">Zip Code</label>
                  <input
                    type="text"
                    value={address.alternate_zipCode}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="text"
                    value={address.email}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>
            ))}
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
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Phone (Mobile)</label>
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
                  value={clientData.contact.mobile_opt_out === "false" ? "No" : "Yes"}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
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
                  value={clientData.contact.email_opt_out === "false" ? "No" : "Yes"}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Directions To Residence */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Directions To Residence</h2>
            <div className='flex items-center gap-6'>
              <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">From</label>
              <textarea
                value={clientData.directions_to_residence.from}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Pet Information */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Pet Information</h2>
            <div className='flex flex-col gap-4'>
              {clientData.pets.map((pet, index) => (
                <div key={index} className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Pet #{index + 1}</label>
                  <input
                    value={pet.name}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              ))}
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
                <input
                  value={clientData.careInfo.status}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Lead Created Date</label>
                  <input
                    type="text"
                    value={new Date(clientData.careInfo.lead_created_date).toLocaleDateString()}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Initial Assessment Date</label>
                  <input
                    type="text"
                    value={new Date(clientData.careInfo.initial_assessment_date).toLocaleDateString()}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={new Date(clientData.careInfo.start_date).toLocaleDateString()}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                  <input
                    type="text"
                    value={new Date(clientData.careInfo.effective_date).toLocaleDateString()}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Administrator</label>
                <input
                  type="text"
                  value={clientData.careInfo.administrator}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Region Code</label>
                <input
                  type="text"
                  value={clientData.careInfo.region_code}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Preferred By</label>
                <input
                  type="text"
                  value={clientData.careInfo.preferred_by}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Medicaid Number</label>
                <input
                  type="text"
                  value={clientData.careInfo.medicaid_number}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Preferred Caregiver</label>
                <input
                  type="text"
                  value={clientData.careInfo.preferred_caregiver}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Action Alerts</label>
                <input
                  type="text"
                  value={clientData.careInfo.action_alerts}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Invoicing ID</label>
                <input
                  type="text"
                  value={clientData.careInfo.invoicing_id}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
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
                        <option value="CA">California</option>
                        {/* Add other states as needed */}
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
            </div>
          </div>

          {/* Marital Information */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Marital Information</h2>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-6'>
                <label className="w-[80px] block text-sm font-medium text-gray-700 mb-1">Status</label>
                <input
                  value={clientData.marital.marital_status}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div className='flex items-center gap-6'>
                <label className="w-[80px] block text-sm font-medium text-gray-700 mb-1">Spouse</label>
                <input
                  value={clientData.marital.spouse_name}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
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
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                <input
                  value={clientData.characteristics.occupation}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              
              <div className='flex items-center gap-6'>
                <label className="w-[120px] block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  value={clientData.characteristics.job_title}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
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
                        checked={formData.advanceDirective}
                        onChange={() => setFormData({...formData, advanceDirective: true})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="advanceDirective"
                        checked={!formData.advanceDirective}
                        onChange={() => setFormData({...formData, advanceDirective: false})}
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
                        checked={formData.dnr}
                        onChange={() => setFormData({...formData, dnr: true})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="dnr"
                        checked={!formData.dnr}
                        onChange={() => setFormData({...formData, dnr: false})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                </div>
                
                <div className='flex items-center gap-6'>
                  <label className="w-[94px] block text-sm font-medium text-gray-700 mb-1">Will to Live</label>
                  <input
                    value={clientData.characteristics.will_to_live ? "Yes" : "No"}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Actions and Status Messages */}
      <div className="mt-6 flex flex-col items-end space-y-4">
        {submitError && (
          <div className="w-full p-4 bg-green-100 text-green-700 rounded-md">
            {submitError}
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
  );
};

export default Profile;
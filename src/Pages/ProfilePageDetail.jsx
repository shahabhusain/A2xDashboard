import React, { useState } from 'react';
import { Camera, ChevronDown, Upload, Check, X, Eye, EyeOff } from 'lucide-react';

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState('edit');
  const [formData, setFormData] = useState({
    fullName: 'Will Jonto',
    email: 'willjontoax@gmail.com',
    phone: '(1) 2536 2561 2365',
    department: 'Design',
    designation: 'UI UX Designer',
    language: 'English',
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  });
  
  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: false,
    weeklyDigest: true,
    mentions: true
  });
  
  // Profile image upload
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Profile saved:', formData);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Password changed');
      setIsSaving(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleCancel = () => {
    // Reset form to initial state
    setFormData({
      fullName: 'Will Jonto',
      email: 'willjontoax@gmail.com',
      phone: '(1) 2536 2561 2365',
      department: 'Design',
      designation: 'UI UX Designer',
      language: 'English',
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    });
    setProfileImage(null);
    setBannerImage(null);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Settings</h1>
          {saveSuccess && (
            <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-md">
              <Check className="w-5 h-5 mr-2" />
              Changes saved successfully!
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Profile Card */}
            <div className="w-full lg:w-1/3 bg-white p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="text-center mb-8">
                {/* Profile Banner */}
                <div 
                  className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mb-6 relative overflow-hidden group"
                  style={bannerImage ? { backgroundImage: `url(${bannerImage})` } : {}}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:opacity-100 opacity-0 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Upload className="w-5 h-5 text-gray-700" />
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleBannerImageChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  
                  {/* Profile Picture */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 group">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        )}
                      </div>
                      <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:bg-blue-200 transition-colors">
                        <Camera className="w-4 h-4 text-blue-600" />
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleProfileImageChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-16">
                  <h2 className="text-xl font-bold text-gray-900">{formData.fullName}</h2>
                  <p className="text-gray-600 mt-1">{formData.designation}</p>
                  <div className="mt-3 flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {formData.department}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                      {formData.language}
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Personal Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="w-24 text-gray-600 flex-shrink-0">Full Name</span>
                    <span className="text-gray-900 font-medium">: {formData.fullName}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-24 text-gray-600 flex-shrink-0">Email</span>
                    <span className="text-gray-900 font-medium break-all">: {formData.email}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-24 text-gray-600 flex-shrink-0">Phone</span>
                    <span className="text-gray-900 font-medium">: {formData.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-24 text-gray-600 flex-shrink-0">Bio</span>
                    <span className="text-gray-900 font-medium">: {formData.bio.substring(0, 50)}...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="flex-1 p-6">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    activeTab === 'edit'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2"></span> Edit Profile
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    activeTab === 'password'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2"></span> Change Password
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    activeTab === 'notifications'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2"></span> Notifications
                </button>
              </div>

              {/* Edit Profile Form */}
              {activeTab === 'edit' && (
                <div className="space-y-6">
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter Full Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="Design">Design</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Sales">Sales</option>
                          <option value="Human Resources">Human Resources</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.designation}
                          onChange={(e) => handleInputChange('designation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="UI UX Designer">UI UX Designer</option>
                          <option value="Frontend Developer">Frontend Developer</option>
                          <option value="Backend Developer">Backend Developer</option>
                          <option value="Product Manager">Product Manager</option>
                          <option value="Marketing Specialist">Marketing Specialist</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Language <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.language}
                          onChange={(e) => handleInputChange('language', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                          <option value="Japanese">Japanese</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Max 200 characters</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Change Password Tab */}
              {activeTab === 'password' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        placeholder="Enter current password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      />
                      <button 
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      />
                      <button 
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with at least one number</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      />
                      <button 
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6">
                    <button
                      onClick={() => {
                        setActiveTab('edit');
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                      }}
                      className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </button>
                    <button
                      onClick={handlePasswordSave}
                      disabled={isSaving}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" /> Update Password
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Settings Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Receive important notifications via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.email}
                            onChange={() => handleNotificationToggle('email')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                          <p className="text-sm text-gray-500">Receive instant notifications on your device</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.push}
                            onChange={() => handleNotificationToggle('push')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Weekly Digest</h4>
                          <p className="text-sm text-gray-500">Get a weekly summary of activities</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.weeklyDigest}
                            onChange={() => handleNotificationToggle('weeklyDigest')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Mentions</h4>
                          <p className="text-sm text-gray-500">Notify me when I'm mentioned</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.mentions}
                            onChange={() => handleNotificationToggle('mentions')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6">
                    <button
                      onClick={() => setActiveTab('edit')}
                      className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </button>
                    <button
                      onClick={() => {
                        console.log('Notification settings saved:', notificationSettings);
                        setSaveSuccess(true);
                        setTimeout(() => setSaveSuccess(false), 3000);
                      }}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 mr-2" /> Save Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
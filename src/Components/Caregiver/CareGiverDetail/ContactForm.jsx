import React, { useState } from 'react';
import { Plus, X, HelpCircle, Edit, Trash2 } from 'lucide-react';

const ContactForm = () => {
  const [mainContact, setMainContact] = useState({
    name: '',
    relationship: '',
    phone1: '',
    phone2: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    hipaaDisclosure: '',
    emailOptOut: '',
    medicalDecisions: ''
  });

  const [linkedContacts, setLinkedContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newContact, setNewContact] = useState({
    contactName: '',
    contactPhone: '',
    email: '',
    physicalAddress: '',
    mailingAddress: ''
  });

  const handleMainContactChange = (field, value) => {
    setMainContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewContactChange = (field, value) => {
    setNewContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addLinkedContact = () => {
    if (newContact.contactName && newContact.contactPhone) {
      setLinkedContacts(prev => [...prev, {
        id: Date.now(),
        ...newContact
      }]);
      setNewContact({
        contactName: '',
        contactPhone: '',
        email: '',
        physicalAddress: '',
        mailingAddress: ''
      });
      setShowModal(false);
    }
  };

  const removeLinkedContact = (id) => {
    setLinkedContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleSubmit = () => {
    console.log('Main Contact:', mainContact);
    console.log('Linked Contacts:', linkedContacts);
    alert('Form submitted successfully!');
  };

  return (
    <div className=" mt-6">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm border-[1px] border-[#D1D5DB] p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact #1</h2>
          
          {/* Main Contact Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={mainContact.name}
                  onChange={(e) => handleMainContactChange('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={mainContact.relationship}
                  onChange={(e) => handleMainContactChange('relationship', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter relationship"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={mainContact.phone1}
                  onChange={(e) => handleMainContactChange('phone1', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={mainContact.phone2}
                  onChange={(e) => handleMainContactChange('phone2', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter additional phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={mainContact.email}
                  onChange={(e) => handleMainContactChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={mainContact.address}
                  onChange={(e) => handleMainContactChange('address', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={mainContact.city}
                  onChange={(e) => handleMainContactChange('city', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={mainContact.state}
                  onChange={(e) => handleMainContactChange('state', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter state"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    value={mainContact.zipCode}
                    onChange={(e) => handleMainContactChange('zipCode', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter zip code"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-md transition-colors"
                  >
                    Mailing Labels
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={mainContact.dateOfBirth}
                  onChange={(e) => handleMainContactChange('dateOfBirth', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* HIPAA Disclosure Authorization */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">HIPAA Disclosure Authorization</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hipaaDisclosure"
                  value="Yes"
                  checked={mainContact.hipaaDisclosure === 'Yes'}
                  onChange={(e) => handleMainContactChange('hipaaDisclosure', e.target.value)}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hipaaDisclosure"
                  value="No"
                  checked={mainContact.hipaaDisclosure === 'No'}
                  onChange={(e) => handleMainContactChange('hipaaDisclosure', e.target.value)}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Email Option Out */}
          <div className="mb-6 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Email Option Out</label>
            <input
              type="text"
              value={mainContact.emailOptOut}
              onChange={(e) => handleMainContactChange('emailOptOut', e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email option out details"
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Change
            </button>
          </div>

          {/* Medical Decisions */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Medical Decisions</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="medicalDecisions"
                  value="Yes"
                  checked={mainContact.medicalDecisions === 'Yes'}
                  onChange={(e) => handleMainContactChange('medicalDecisions', e.target.value)}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="medicalDecisions"
                  value="No"
                  checked={mainContact.medicalDecisions === 'No'}
                  onChange={(e) => handleMainContactChange('medicalDecisions', e.target.value)}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Linked Contacts Section */}
          <div className="bg-gray-700 text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Linked Contact {linkedContacts.length}</h3>
                <HelpCircle size={20} className="text-gray-300" />
              </div>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {/* Linked Contacts Table */}
          <div className="border border-t-0 rounded-b-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Contact Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Contact Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Physical Address</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Mailing Address</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {linkedContacts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No linked contacts added yet
                    </td>
                  </tr>
                ) : (
                  linkedContacts.map((contact) => (
                    <tr key={contact.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{contact.contactName}</td>
                      <td className="px-4 py-3 text-sm">{contact.contactPhone}</td>
                      <td className="px-4 py-3 text-sm">{contact.email}</td>
                      <td className="px-4 py-3 text-sm">{contact.physicalAddress}</td>
                      <td className="px-4 py-3 text-sm">{contact.mailingAddress}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeLinkedContact(contact.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Add Contact Button */}
          <div className="text-center mb-6">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-blue-600 hover:text-blue-800 font-medium text-lg"
            >
              Add a Contact
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-[#00000042] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add Linked Contact</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    value={newContact.contactName}
                    onChange={(e) => handleNewContactChange('contactName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter contact name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    value={newContact.contactPhone}
                    onChange={(e) => handleNewContactChange('contactPhone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newContact.email}
                    onChange={(e) => handleNewContactChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</label>
                  <textarea
                    value={newContact.physicalAddress}
                    onChange={(e) => handleNewContactChange('physicalAddress', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    placeholder="Enter physical address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mailing Address</label>
                  <textarea
                    value={newContact.mailingAddress}
                    onChange={(e) => handleNewContactChange('mailingAddress', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    placeholder="Enter mailing address"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addLinkedContact}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
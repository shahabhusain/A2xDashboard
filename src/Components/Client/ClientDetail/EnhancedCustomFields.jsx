import React, { useState } from 'react';
import { Search, Plus, Filter, Download, Printer, Bookmark, ChevronDown, Info } from 'lucide-react';

const EnhancedCustomFields = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    date: 'Last 30 days',
    activityType: 'All',
    category: 'All',
    columns: '8 / 101'
  });
  
  const [groupBy, setGroupBy] = useState('');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [combineCategories, setCombineCategories] = useState(false);
  const [expandDetails, setExpandDetails] = useState(false);

  // Sample data with the new structure
  const [customFields, setCustomFields] = useState([
    {
      id: 1,
      createdDate: '2024-06-15',
      createdBy: 'Dr. Smith',
      categoryAddedDate: '2024-06-15',
      categoryAddedBy: 'Admin',
      activityType: 'Patient Registration',
      category: 'Personal Info',
      details: 'Emergency contact information added to patient profile'
    },
    {
      id: 2,
      createdDate: '2024-06-14',
      createdBy: 'Nurse Johnson',
      categoryAddedDate: '2024-06-14',
      categoryAddedBy: 'Dr. Smith',
      activityType: 'Medical Assessment',
      category: 'Clinical Notes',
      details: 'Allergy information updated in medical records'
    },
    {
      id: 3,
      createdDate: '2024-06-13',
      createdBy: 'Admin',
      categoryAddedDate: '2024-06-13',
      categoryAddedBy: 'System',
      activityType: 'Insurance Verification',
      category: 'Billing',
      details: 'Insurance policy details verified and updated'
    },
    {
      id: 4,
      createdDate: '2024-06-12',
      createdBy: 'Receptionist',
      categoryAddedDate: '2024-06-12',
      categoryAddedBy: 'Manager',
      activityType: 'Appointment Scheduling',
      category: 'Scheduling',
      details: 'Patient preferences for appointment timing recorded'
    },
    {
      id: 5,
      createdDate: '2024-06-11',
      createdBy: 'Dr. Wilson',
      categoryAddedDate: '2024-06-11',
      categoryAddedBy: 'Dr. Wilson',
      activityType: 'Treatment Plan',
      category: 'Clinical Notes',
      details: 'Treatment protocol customized for patient needs'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newField, setNewField] = useState({
    createdBy: '',
    categoryAddedBy: '',
    activityType: '',
    category: '',
    details: ''
  });

  const filteredFields = customFields.filter(field => {
    const matchesSearch = Object.values(field).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesActivityType = filters.activityType === 'All' || field.activityType === filters.activityType;
    const matchesCategory = filters.category === 'All' || field.category === filters.category;
    
    return matchesSearch && matchesActivityType && matchesCategory;
  });

  const handleAddField = () => {
    if (newField.activityType && newField.category) {
      const currentDate = new Date().toISOString().split('T')[0];
      setCustomFields([...customFields, {
        ...newField,
        id: Date.now(),
        createdDate: currentDate,
        categoryAddedDate: currentDate
      }]);
      setNewField({
        createdBy: '',
        categoryAddedBy: '',
        activityType: '',
        category: '',
        details: ''
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteField = (id) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className=" mt-4">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Custom Fields</h2>

            {/* Filter Tags */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-500" />
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-blue-600 font-medium">Date</span>
                  <span className="text-sm text-gray-600">{filters.date}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-500" />
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-blue-600 font-medium">Activity Type</span>
                  <span className="text-sm text-gray-600">{filters.activityType}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-500" />
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-blue-600 font-medium">Category</span>
                  <span className="text-sm text-gray-600">{filters.category}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-500" />
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-blue-600 font-medium">Columns</span>
                  <span className="text-sm text-gray-600">{filters.columns}</span>
                </div>
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-8 h-8 border-2 border-dashed border-gray-400 rounded flex items-center justify-center hover:border-blue-500 hover:text-blue-500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Search and Controls */}
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                {/* Search */}
                <div className="relative max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Group By */}
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2 text-gray-500" />
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                  >
                    <option value="">Group by</option>
                    <option value="category">Category</option>
                    <option value="activityType">Activity Type</option>
                    <option value="createdBy">Created By</option>
                  </select>
                  <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
                </div>

                {/* Export */}
                <button
                  onClick={handleExport}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {/* Print */}
                <button
                  onClick={handlePrint}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </button>

                {/* Bookmarks */}
                <button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Bookmarks
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {/* Combine Categories */}
                <button
                  onClick={() => setCombineCategories(!combineCategories)}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Combine Categories
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {/* Expand Details */}
                <button
                  onClick={() => setExpandDetails(!expandDetails)}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Expand Details
                </button>
              </div>
            </div>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Custom Field</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Created By</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newField.createdBy}
                    onChange={(e) => setNewField({...newField, createdBy: e.target.value})}
                    placeholder="Enter creator name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Added By</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newField.categoryAddedBy}
                    onChange={(e) => setNewField({...newField, categoryAddedBy: e.target.value})}
                    placeholder="Enter category creator"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newField.activityType}
                    onChange={(e) => setNewField({...newField, activityType: e.target.value})}
                  >
                    <option value="">Select activity type</option>
                    <option value="Patient Registration">Patient Registration</option>
                    <option value="Medical Assessment">Medical Assessment</option>
                    <option value="Insurance Verification">Insurance Verification</option>
                    <option value="Appointment Scheduling">Appointment Scheduling</option>
                    <option value="Treatment Plan">Treatment Plan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newField.category}
                    onChange={(e) => setNewField({...newField, category: e.target.value})}
                  >
                    <option value="">Select category</option>
                    <option value="Personal Info">Personal Info</option>
                    <option value="Clinical Notes">Clinical Notes</option>
                    <option value="Billing">Billing</option>
                    <option value="Scheduling">Scheduling</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newField.details}
                    onChange={(e) => setNewField({...newField, details: e.target.value})}
                    placeholder="Enter details"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddField}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Field
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Category Added Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Category Added By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Activity Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFields.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Filter className="w-12 h-12 text-gray-300 mb-2" />
                        <p>No data found. Check your filters!</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredFields.map((field) => (
                    <tr key={field.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {field.createdDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {field.createdBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {field.categoryAddedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {field.categoryAddedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {field.activityType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {field.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {expandDetails ? field.details : field.details.substring(0, 50) + (field.details.length > 50 ? '...' : '')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteField(field.id)}
                          className="text-red-600 hover:text-red-900 mr-3"
                        >
                          Delete
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCustomFields;
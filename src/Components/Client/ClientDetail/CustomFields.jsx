import React, { useState } from 'react';
import { Search, Plus, Filter, Bookmark, ChevronDown } from 'lucide-react';

const CustomFields = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupByCategory, setGroupByCategory] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [customFields, setCustomFields] = useState([
    {
      id: 1,
      category: 'Patient Info',
      customField: 'Emergency Contact',
      value: 'John Doe - 555-0123',
      description: 'Primary emergency contact for patient'
    },
    {
      id: 2,
      category: 'Medical History',
      customField: 'Allergies',
      value: 'Penicillin, Peanuts',
      description: 'Known allergies and reactions'
    },
    {
      id: 3,
      category: 'Insurance',
      customField: 'Policy Number',
      value: 'INS-2024-001',
      description: 'Primary insurance policy identifier'
    },
    {
      id: 4,
      category: 'Treatment',
      customField: 'Preferred Time',
      value: 'Morning appointments',
      description: 'Patient scheduling preferences'
    },
    {
      id: 5,
      category: 'Patient Info',
      customField: 'Transportation',
      value: 'Own vehicle',
      description: 'How patient travels to appointments'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newField, setNewField] = useState({
    category: '',
    customField: '',
    value: '',
    description: ''
  });

  const filteredFields = customFields.filter(field => 
    field.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.customField.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddField = () => {
    if (newField.category && newField.customField) {
      setCustomFields([...customFields, {
        ...newField,
        id: Date.now()
      }]);
      setNewField({ category: '', customField: '', value: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteField = (id) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const groupedFields = groupByCategory 
    ? filteredFields.reduce((groups, field) => {
        const category = field.category;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(field);
        return groups;
      }, {})
    : null;

  return (
    <div className=" mt-4">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Custom Fields</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Field
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-sm text-blue-600">
                  <Filter className="w-4 h-4 mr-1" />
                  <span>Columns</span>
                </div>
                <span className="text-sm text-gray-600">All</span>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="w-8 h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-blue-500 hover:text-blue-500"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={() => setGroupByCategory(!groupByCategory)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Filter className="w-4 h-4 mr-2" />
                Group by Category
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              
              <button
                onClick={() => setShowBookmarks(!showBookmarks)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmarks
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Custom Field</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newField.category}
                    onChange={(e) => setNewField({...newField, category: e.target.value})}
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Field Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newField.customField}
                    onChange={(e) => setNewField({...newField, customField: e.target.value})}
                    placeholder="Enter field name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newField.value}
                    onChange={(e) => setNewField({...newField, value: e.target.value})}
                    placeholder="Enter value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newField.description}
                    onChange={(e) => setNewField({...newField, description: e.target.value})}
                    placeholder="Enter description"
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Custom Field
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFields.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Filter className="w-12 h-12 text-gray-300 mb-2" />
                        <p>No data found. Check your filters!</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {groupByCategory ? (
                      Object.entries(groupedFields).map(([category, fields]) => (
                        <React.Fragment key={category}>
                          <tr className="bg-gray-100">
                            <td colSpan="5" className="px-6 py-2 text-sm font-semibold text-gray-700">
                              {category} ({fields.length})
                            </td>
                          </tr>
                          {fields.map((field) => (
                            <tr key={field.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {field.category}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {field.customField}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {field.value}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {field.description}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => handleDeleteField(field.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    ) : (
                      filteredFields.map((field) => (
                        <tr key={field.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {field.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {field.customField}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {field.value}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {field.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleDeleteField(field.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFields;
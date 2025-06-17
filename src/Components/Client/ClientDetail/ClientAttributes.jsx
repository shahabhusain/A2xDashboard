import React, { useState } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

const ClientAttributes = () => {
  const [attributes, setAttributes] = useState([
    {
      id: 1,
      category: "Alzheimer's",
      description: "Client has Alzheimer's",
      value: null
    },
    {
      id: 2,
      category: "Bowel Incontinence",
      description: "Client has bowel incontinence",
      value: null
    },
    {
      id: 3,
      category: "Caregiver's Personal Transportation",
      description: "Client prefers caregivers who have their personal vehicle for transportation",
      value: null
    },
    {
      id: 4,
      category: "Cats",
      description: "Client has pet cat",
      value: null
    },
    {
      id: 5,
      category: "Client uses Depends",
      description: "Client uses depends",
      value: null
    },
    {
      id: 6,
      category: "Dogs",
      description: "Client has pet dog",
      value: null
    },
    {
      id: 7,
      category: "Female caregiver",
      description: "Client prefers female caregiver",
      value: null
    },
    {
      id: 8,
      category: "Gait Belt",
      description: "Client uses gait belt",
      value: null
    },
    {
      id: 9,
      category: "Hoyer Lift Experience",
      description: "Client uses Hoyer lift",
      value: null
    },
    {
      id: 10,
      category: "Lifting for client",
      description: "Client needs to be lifted",
      value: null
    },
    {
      id: 11,
      category: "Medical Appointments",
      description: "Client needs caregiver to accompany them to medical appointments",
      value: null
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAttribute, setNewAttribute] = useState({ category: '', description: '' });

  const handleAttributeChange = (id, value) => {
    setAttributes(prev => prev.map(attr => 
      attr.id === id ? { ...attr, value } : attr
    ));
  };

  const handleAddAttribute = () => {
    if (newAttribute.category.trim() && newAttribute.description.trim()) {
      const newId = Math.max(...attributes.map(a => a.id)) + 1;
      setAttributes(prev => [...prev, {
        id: newId,
        category: newAttribute.category,
        description: newAttribute.description,
        value: null
      }]);
      setNewAttribute({ category: '', description: '' });
      setIsAddingNew(false);
    }
  };

  const handleRemoveAttribute = (id) => {
    setAttributes(prev => prev.filter(attr => attr.id !== id));
  };

  const handleCancelAdd = () => {
    setNewAttribute({ category: '', description: '' });
    setIsAddingNew(false);
  };

  return (
    <div className=" mt-4">
      <div className=" bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">Attributes</h1>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Attribute
          </button>
        </div>

        {/* Attributes List */}
        <div className="p-6 space-y-6">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 mb-1">{attribute.category}</h3>
                <p className="text-gray-600 text-sm">{attribute.description}</p>
              </div>
              
              <div className="flex items-center gap-6 ml-6">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`attribute-${attribute.id}`}
                      value="yes"
                      checked={attribute.value === 'yes'}
                      onChange={() => handleAttributeChange(attribute.id, 'yes')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`attribute-${attribute.id}`}
                      value="no"
                      checked={attribute.value === 'no'}
                      onChange={() => handleAttributeChange(attribute.id, 'no')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
                
                <button
                  onClick={() => handleRemoveAttribute(attribute.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Attribute Form */}
          {isAddingNew && (
            <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newAttribute.category}
                    onChange={(e) => setNewAttribute(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter category name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newAttribute.description}
                    onChange={(e) => setNewAttribute(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter attribute description"
                    rows="2"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddAttribute}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Total Attributes: {attributes.length} | 
              Answered: {attributes.filter(attr => attr.value !== null).length} | 
              Pending: {attributes.filter(attr => attr.value === null).length}
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAttributes;
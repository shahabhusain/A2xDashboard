import React, { useState } from 'react';

export default function AttributesScreen() {
  const [attributes, setAttributes] = useState({
    alzheimers: null,
    bowelIncontinence: null,
    caregiverTransportation: null,
    cats: null,
    depends: null,
    dogs: null,
    femaleCaregiver: null,
    gaitBelt: null,
    hoyerLift: null,
    liftingClient: null,
    medicalAppointments: null
  });

  const handleAttributeChange = (attribute, value) => {
    setAttributes(prev => ({
      ...prev,
      [attribute]: value
    }));
  };

  const attributesList = [
    {
      key: 'alzheimers',
      title: "Alzheimer's",
      description: "Client has Alzheimer's"
    },
    {
      key: 'bowelIncontinence',
      title: 'Bowel Incontinence',
      description: 'Client has bowel incontinence'
    },
    {
      key: 'caregiverTransportation',
      title: "Caregiver's Personal Transportation",
      description: 'Client prefers caregivers who have their personal vehicle for transportation'
    },
    {
      key: 'cats',
      title: 'Cats',
      description: 'Client has pet cat'
    },
    {
      key: 'depends',
      title: 'Client uses Depends',
      description: 'Client uses depends'
    },
    {
      key: 'dogs',
      title: 'Dogs',
      description: 'Client has pet dog'
    },
    {
      key: 'femaleCaregiver',
      title: 'Female caregiver',
      description: 'Client prefers female caregiver'
    },
    {
      key: 'gaitBelt',
      title: 'Gait Belt',
      description: 'Client uses gait belt'
    },
    {
      key: 'hoyerLift',
      title: 'Hoyer Lift Experience',
      description: 'Client uses Hoyer lift'
    },
    {
      key: 'liftingClient',
      title: 'Lifting for client',
      description: 'Client needs to be lifted'
    },
    {
      key: 'medicalAppointments',
      title: 'Medical Appointments',
      description: 'Client needs caregiver to accompany them to medical appointments'
    }
  ];

  return (
    <div className=" mt-5 p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Attributes</h1>
      </div>

      {/* Attributes List */}
      <div className="space-y-6">
        {attributesList.map((attribute) => (
          <div key={attribute.key} className="border-b border-gray-100 pb-6 last:border-b-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-8">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {attribute.title}
                </h3>
                <p className="text-sm text-gray-700">
                  {attribute.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={attribute.key}
                    value="yes"
                    checked={attributes[attribute.key] === 'yes'}
                    onChange={() => handleAttributeChange(attribute.key, 'yes')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={attribute.key}
                    value="no"
                    checked={attributes[attribute.key] === 'no'}
                    onChange={() => handleAttributeChange(attribute.key, 'no')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section (Optional) */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Selected Attributes Summary:</h3>
        <div className="text-sm text-gray-600">
          {Object.entries(attributes).some(([key, value]) => value === 'yes') ? (
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(attributes)
                .filter(([key, value]) => value === 'yes')
                .map(([key, value]) => {
                  const attr = attributesList.find(a => a.key === key);
                  return (
                    <li key={key}>{attr?.title}</li>
                  );
                })}
            </ul>
          ) : (
            <p>No attributes selected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
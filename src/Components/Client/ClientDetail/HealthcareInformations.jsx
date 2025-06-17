import React, { useState } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';

const ADLTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState([
    { id: 1, name: 'Virginia DMAS-90', type: 'header' },
    { id: 2, name: 'Ambulation', type: 'activity' },
    { id: 3, name: 'Assist with Eating/Feeding', type: 'activity' },
    { id: 4, name: 'Assist with Self-Admin. Medication', type: 'activity' },
    { id: 5, name: 'Assist with Toileting', type: 'activity' },
    { id: 6, name: 'Clean Areas Used by Individual', type: 'activity' },
    { id: 7, name: 'Clean Kitchen/Wash Dishes', type: 'activity' },
    { id: 8, name: 'Complete/Partial Bath', type: 'activity' },
    { id: 9, name: 'Did you observe any change in the individual\'s motional condition?', type: 'activity' },
    { id: 10, name: 'Did you observe any change in the individual\'s physical condition?', type: 'activity' },
    { id: 11, name: 'Desponsate serves vander about the individual\'s', type: 'activity' }
  ]);

  const [selections, setSelections] = useState({});
  const [frequencyFilter, setFrequencyFilter] = useState('Always');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'All'];
  
  const getDefaultSelection = (activityId, day) => {
    if (activityId === 7) return 'checked'; // Clean Kitchen/Wash Dishes has checkmarks
    if (activityId === 10) return 'empty'; // Physical condition change is empty
    return 'filled'; // Most activities are filled
  };

  const handleSelectionChange = (activityId, day, selectionType) => {
    const key = `${activityId}-${day}`;
    setSelections(prev => ({
      ...prev,
      [key]: selectionType
    }));
  };

  const renderSelectionButton = (activityId, day) => {
    const key = `${activityId}-${day}`;
    const currentSelection = selections[key] || getDefaultSelection(activityId, day);
    
    const baseClasses = "w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110";
    
    const handleClick = () => {
      let nextSelection;
      switch (currentSelection) {
        case 'empty':
          nextSelection = 'filled';
          break;
        case 'filled':
          nextSelection = 'checked';
          break;
        case 'checked':
          nextSelection = 'empty';
          break;
        default:
          nextSelection = 'filled';
      }
      handleSelectionChange(activityId, day, nextSelection);
    };

    switch (currentSelection) {
      case 'filled':
        return (
          <button
            onClick={handleClick}
            className={`${baseClasses} bg-blue-500 border-blue-500`}
          />
        );
      case 'checked':
        return (
          <button
            onClick={handleClick}
            className={`${baseClasses} bg-blue-500 border-blue-500 flex items-center justify-center`}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        );
      case 'empty':
      default:
        return (
          <button
            onClick={handleClick}
            className={`${baseClasses} bg-white border-gray-300`}
          />
        );
    }
  };

  const addNewActivity = () => {
    const newId = Math.max(...activities.map(a => a.id)) + 1;
    setActivities(prev => [...prev, {
      id: newId,
      name: 'New Activity',
      type: 'activity'
    }]);
  };

  const removeActivity = (activityId) => {
    setActivities(prev => prev.filter(a => a.id !== activityId));
    // Clean up selections for removed activity
    const newSelections = { ...selections };
    Object.keys(newSelections).forEach(key => {
      if (key.startsWith(`${activityId}-`)) {
        delete newSelections[key];
      }
    });
    setSelections(newSelections);
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            Activities of Daily Living ({activities.filter(a => a.type === 'activity').length})
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={addNewActivity}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add ADL
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                {days.map(day => (
                  <th key={day} className="text-center py-3 px-4 font-medium min-w-[60px]">{day}</th>
                ))}
                <th className="text-center py-3 px-4 font-medium w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity, index) => (
                <tr key={activity.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}>
                  <td className="py-3 px-4">
                    {activity.type === 'header' ? (
                      <span className="font-medium text-gray-700">{activity.name}</span>
                    ) : (
                      <span className="text-gray-700">{activity.name}</span>
                    )}
                  </td>
                  {days.map(day => (
                    <td key={day} className="text-center py-3 px-4">
                      {activity.type === 'activity' && (
                        renderSelectionButton(activity.id, day)
                      )}
                    </td>
                  ))}
                  <td className="text-center py-3 px-4">
                    {activity.type === 'activity' && (
                      <button
                        onClick={() => removeActivity(activity.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Always</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">As Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full border border-blue-500"></div>
              </div>
              <span className="text-sm text-gray-600">Specific Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white"></div>
              <span className="text-sm text-gray-600">Never</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADLTracker;
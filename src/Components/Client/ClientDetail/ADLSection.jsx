import React from "react";
import { useState } from "react";
import { Check } from "lucide-react"; // Icon (optional)

const ADLSection = () => {
  const [inheritADLs, setInheritADLs] = useState(false);
  const [adlList, setAdlList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCheckboxChange = () => setInheritADLs(!inheritADLs);

  const handleAddADL = (adl) => {
    if (!adlList.includes(adl)) {
      setAdlList([...adlList, adl]);
    }
    setShowDropdown(false);
  };

  const adlOptions = ["Bathing", "Dressing", "Eating", "Toileting"];

  return (
    <div className="p-4 w-full bg-white mt-4 space-y-4">
      {/* Inherit Checkbox */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={inheritADLs}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-blue-600"
        />
        <span className="text-sm text-gray-700">Inherit ADLs</span>
      </label>

      {/* ADL Controls */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <span className="text-sm text-gray-700">ADLs ({adlList.length})</span>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 flex items-center space-x-1"
          >
            <span>Add ADL</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
              {adlOptions.map((adl) => (
                <div
                  key={adl}
                  onClick={() => handleAddADL(adl)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {adl}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ADL Display Table */}
      <div>
        <div className="text-sm text-gray-500 font-medium mb-1">Name</div>
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
          {adlList.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <Check className="w-6 h-6 mb-2" />
              <p className="text-sm">No ADLs Assigned</p>
            </div>
          ) : (
            <ul className="text-gray-700 text-sm space-y-1">
              {adlList.map((adl) => (
                <li key={adl} className="py-0.5">
                  • {adl}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ADLSection;

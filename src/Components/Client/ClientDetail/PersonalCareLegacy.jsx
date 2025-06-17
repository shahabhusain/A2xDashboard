import React from "react";
import { TagIcon, Search } from "lucide-react"; // Optional icon library

const CardSection = () => {
  return (
    <div className="space-y-4 mt-4 p-4 bg-white min-h-screen">
      {/* Card 1: Personal Care LEGACY */}
      <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm">
        <p className="text-blue-600 font-medium">Personal Care LEGACY</p>
      </div>

      {/* Card 2: Tag Selection */}
      <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
        <p className="text-blue-600 font-medium mb-2">Personal Care LEGACY</p>
        <TagIcon className="h-8 w-8 text-gray-400" />
        <p className="text-gray-500 text-sm mt-2">Select relevant tags</p>
      </div>

      {/* Card 3: Tag Someone Dropdown */}
        <select
          className="mt-2 bg-gray-100 w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Select relevant tags</option>
        </select>

      {/* Card 4: Clock-in Message */}
      <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm">
        <p className="text-blue-600 font-medium">Clock-in-message</p>
      </div>
    </div>
  );
};

export default CardSection;

import React from "react";
import { FaRegFileAlt } from "react-icons/fa";

const FormsScreen = () => {
  return (
    <div className=" mt-5">
      {/* Card Header */}
      <div className="bg-white rounded shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Forms</h2>
        </div>

        {/* Forms Table */}
        <div className="p-4">
          <div className="border rounded overflow-hidden">
            <div className="bg-gray-700 text-white grid grid-cols-5 text-center text-sm font-medium">
              <div className="py-2 border-r border-gray-600">Name</div>
              <div className="py-2 border-r border-gray-600">Created</div>
              <div className="py-2 border-r border-gray-600">Modified</div>
              <div className="py-2 border-r border-gray-600">Expire</div>
              <div className="py-2">Status</div>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center h-96 bg-white">
              <FaRegFileAlt className="text-6xl text-gray-500 mb-4" />
              <p className="text-sm font-semibold text-gray-700">
                CREATE A NEW FORM TO GET STARTED.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormsScreen;

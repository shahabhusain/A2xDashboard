import React, { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const initialPoints = [
  { label: "Availability & Readiness", value: 0 },
  { label: "Complaints", value: 0 },
  { label: "Compliments", value: 0 },
  { label: "Referral of aide", value: 0 },
  { label: "Referral of member", value: 0 },
];

const PointsTable = () => {
  const [points, setPoints] = useState(initialPoints);

  const handleIncrement = (index) => {
    const newPoints = [...points];
    newPoints[index].value += 1;
    setPoints(newPoints);
  };

  const handleDecrement = (index) => {
    const newPoints = [...points];
    if (newPoints[index].value > 0) {
      newPoints[index].value -= 1;
      setPoints(newPoints);
    }
  };

  return (
    <div className=" mt-5">
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Points</h2>
        <div className="divide-y">
          {points.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3"
            >
              <span>{item.label}</span>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={item.value}
                  className="w-12 text-center border rounded px-2 py-1"
                />
                <button
                  onClick={() => handleIncrement(index)}
                  className="text-green-500 text-xl hover:scale-110"
                >
                  <FaPlusCircle />
                </button>
                <button
                  onClick={() => handleDecrement(index)}
                  className="text-red-500 text-xl hover:scale-110"
                >
                  <FaMinusCircle />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsTable;

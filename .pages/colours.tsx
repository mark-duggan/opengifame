import React from 'react';

const ColoursPage = () => {
  return (
    <React.Fragment>
      <div className="inline-flex space-x-5">
        <button className="px-4 py-2 font-bold text-gray-800 py-2rounded bg-tofu">
          Tofu
        </button>
        <button className="px-4 py-2 font-bold text-gray-800 rounded bg-putty">
          Putty
        </button>
        <button className="px-4 py-2 font-bold text-gray-800 rounded bg-oatmeal">
          Oatmeal
        </button>
        <button className="px-4 py-2 font-bold text-gray-800 rounded bg-almond">
          Almond
        </button>
        <button className="px-4 py-2 font-bold text-gray-800 rounded bg-harvestwheat">
          Harvest Wheat
        </button>
        <button className="px-4 py-2 font-bold text-gray-800 rounded bg-buff">
          And Buff
        </button>
      </div>
    </React.Fragment>
  );
};
export default ColoursPage;

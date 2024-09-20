// ProgressBar.js
import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <div className="relative flex items-center">
        {/* Background bar */}
        <div className="w-full h-2 bg-gray-300 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {/* Step indicators */}
        <div className="absolute top-0 flex w-full justify-between px-1">
          {[...Array(totalSteps).keys()].map(step => (
            <div
              key={step}
              className={`w-4 h-4 rounded-full ${step < currentStep ? 'bg-blue-500' : 'bg-gray-300'} ${step === currentStep ? 'border-2 border-white' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

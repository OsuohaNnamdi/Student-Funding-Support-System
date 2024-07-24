import React from 'react';
import './application.css';

const FormSteps = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="form-steps">
      <ul>
        {steps.map((step, index) => (
          <li key={index} className={index <= completedSteps ? 'completed' : ''}>
            <span className={`step-circle ${index <= completedSteps ? 'completed' : ''}`}>
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormSteps;

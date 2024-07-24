import React, { useState } from 'react';
import FormSteps from './FormSteps';
import './application.css';

const ApplicationForm = ({ blogId }) => { // Accept blogId if needed
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guardianName: '',
    gpa: '',
    matricNo: '',
    enrolled: false,
    financialNeed: '',
    statement: '',
    documents: [],
    document2: [],
  });

  const steps = [
    'Personal Information',
    'Academic Details',
    'Financial Information',
    'Document Upload',
  ];

  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.name && formData.email && formData.guardianName;
      case 1:
        return formData.gpa && formData.documents.length > 0 && formData.statement;
      case 2:
        return formData.financialNeed && formData.matricNo;
      case 3:
        return formData.document2.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCompletedSteps(Math.max(completedSteps, step + 1));
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="application-form">
      <FormSteps steps={steps} currentStep={step} completedSteps={completedSteps} />
      <form>
        {step === 0 && (
          <div>
            <h2>Personal Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="guardianName"
              placeholder="Parent/Guardian Name"
              value={formData.guardianName}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {step === 1 && (
          <div>
            <h2>Academic Details</h2>
            <input
              type="number"
              name="gpa"
              placeholder="Minimum GPA (3.5)"
              value={formData.gpa}
              onChange={handleChange}
              required
            />
            <div>
              <h4>Upload Result</h4>
              <input
                type="file"
                multiple
                onChange={(e) => setFormData({ ...formData, documents: [...e.target.files] })}
              />
            </div>
            <textarea
              name="statement"
              placeholder="Statement of Purpose"
              value={formData.statement}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Financial Information</h2>
            <textarea
              name="financialNeed"
              placeholder="Reason For Sponsorship"
              value={formData.financialNeed}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="matricNo"
              placeholder="Matriculation Number"
              value={formData.matricNo}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {step === 3 && (
          <div>
            <h2>Letter of Recommendation</h2>
            <input
              type="file"
              multiple
              onChange={(e) => setFormData({ ...formData, document2: [...e.target.files] })}
              required
            />
          </div>
        )}
        <div className="form-navigation">
          <button type="button" onClick={handlePrevious} disabled={step === 0}>
            Previous
          </button>
          <button type="button" onClick={handleNext} disabled={!isStepValid()}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;

import React, { useState } from 'react';
import FormSteps from './FormSteps';
import axiosInstance from '../Auth/axiosInstance' 
import './application.css';

const ApplicationForm = () => {
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
    documents: null,
    document2: null,
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
        return formData.gpa && formData.documents && formData.statement;
      case 2:
        return formData.financialNeed && formData.matricNo;
      case 3:
        return formData.document2;
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
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : (files ? files[0] : value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
     
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('guardianName', formData.guardianName);
    formDataToSend.append('gpa', formData.gpa);
    formDataToSend.append('matricNo', formData.matricNo);
    formDataToSend.append('enrolled', formData.enrolled);
    formDataToSend.append('financialNeed', formData.financialNeed);
    formDataToSend.append('statement', formData.statement);
    if (formData.documents) {
      formDataToSend.append('documents', formData.documents);
    }
    if (formData.document2) {
      formDataToSend.append('document2', formData.document2);
    }

    try {
      await axiosInstance.post('/api/v1/applications/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Application submitted successfully');
      
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('Failed to submit application');
    }
  };

  return (
    <div className="application-form">
      <FormSteps steps={steps} currentStep={step} completedSteps={completedSteps} />
      <form onSubmit={handleSubmit}>
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
                name="documents"
                onChange={handleChange}
                required
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
              name="document2"
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-navigation">
          <button type="button" onClick={handlePrevious} disabled={step === 0}>
            Previous
          </button>
          {step === steps.length - 1 ? (
            <button type="submit" disabled={!isStepValid()}>
              Submit
            </button>
          ) : (
            <button type="button" onClick={handleNext} disabled={!isStepValid()}>
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;

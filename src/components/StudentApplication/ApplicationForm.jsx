// src/components/ApplicationForm.jsx
import React, { useState } from 'react';
import FormSteps from './FormSteps';
import axiosInstance from '../Auth/axiosInstance';
import Swal from 'sweetalert2';
import './application.css';

const ApplicationForm = ({ sponsorship }) => {
  const profile = JSON.parse(localStorage.getItem('profile'));
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: profile.email,
    guardianName: '',
    gpa: '',
    matricNo: '',
    enrolled: false,
    financialNeed: '',
    statement: '',
    documents: null,
    document2: null,
    companyName: sponsorship.donorName,
    companyImage: sponsorship.file
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('guardianName', formData.guardianName);
    formDataToSend.append('gpa', formData.gpa);
    formDataToSend.append('matricNo', formData.matricNo);
    formDataToSend.append('enrolled', formData.enrolled);
    formDataToSend.append('financialNeed', formData.financialNeed);
    formDataToSend.append('statement', formData.statement);
    formDataToSend.append('companyName', formData.companyName);
    formDataToSend.append('companyImage', formData.companyImage);

    if (formData.documents) {
      formDataToSend.append('documents', formData.documents);
    }
    if (formData.document2) {
      formDataToSend.append('document2', formData.document2);
    }

    try {
      await axiosInstance.post('/applications/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        title: 'Success!',
        text: 'Application submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setFormData({
        name: '',
        email: profile.email,
        guardianName: '',
        gpa: '',
        matricNo: '',
        enrolled: false,
        financialNeed: '',
        statement: '',
        documents: null,
        document2: null,
        companyName: '',
        companyImage: ''
      });
      setStep(0);
      setCompletedSteps(0);
    } catch (error) {
      console.error('Failed to submit application:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit application',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-form">
      <FormSteps steps={steps} currentStep={step} completedSteps={completedSteps} />
      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div>
            <h2>Personal Information</h2>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              
              required
            />
            <label htmlFor="guardianName">Parent/Guardian Name</label>
            <input
              type="text"
              id="guardianName"
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
            <label htmlFor="gpa">GPA</label>
            <input
              type="text"
              id="gpa"
              name="gpa"
              placeholder="GPA"
              value={formData.gpa}
              onChange={handleChange}
              required
            />
            <label htmlFor="matricNo">Matric Number</label>
            <input
              type="text"
              id="matricNo"
              name="matricNo"
              placeholder="Matric Number"
              value={formData.matricNo}
              onChange={handleChange}
              required
            />
            <label htmlFor="statement">Statement of Purpose</label>
            <textarea
              id="statement"
              name="statement"
              placeholder="Statement of Purpose"
              value={formData.statement}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="documents">Upload Documents</label>
            <input
              type="file"
              id="documents"
              name="documents"
              onChange={handleChange}
              required
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Financial Information</h2>
            <label htmlFor="financialNeed">Financial Need</label>
            <textarea
              id="financialNeed"
              name="financialNeed"
              placeholder="Describe your financial need"
              value={formData.financialNeed}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2>Document Upload</h2>
            <label htmlFor="document2">Letter of Recommendation</label>
            <input
              type="file"
              id="document2"
              name="document2"
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-navigation">
          {step > 0 && <button type="button" onClick={handlePrevious}>Previous</button>}
          {step < steps.length - 1 && <button type="button" onClick={handleNext} disabled={!isStepValid()}>Next</button>}
          {step === steps.length - 1 && <button type="submit" disabled={loading}>Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;

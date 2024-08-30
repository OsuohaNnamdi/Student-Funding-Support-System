import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './register.css';

const faculties = [
  { name: "Faculty of Arts", departments: ["Department of English", "Department of History", "Department of Philosophy", "Department of Music", "Department of Theatre Arts"] },
  { name: "Faculty of Science", departments: ["Department of Computer Science", "Department of Physics", "Department of Chemistry", "Department of Mathematics", "Department of Biology"] },
  { name: "Faculty of Social Sciences", departments: ["Department of Economics", "Department of Political Science", "Department of Sociology", "Department of Psychology", "Department of Anthropology"] },
  { name: "Faculty of Engineering", departments: ["Department of Civil Engineering", "Department of Mechanical Engineering", "Department of Electrical Engineering", "Department of Chemical Engineering", "Department of Computer Engineering"] },
  { name: "Faculty of Medicine", departments: ["Department of Anatomy", "Department of Physiology", "Department of Biochemistry", "Department of Pathology", "Department of Pharmacology"] },
  { name: "Faculty of Law", departments: ["Department of Private Law", "Department of Public Law", "Department of International Law", "Department of Criminal Law", "Department of Legal Studies"] },
  { name: "Faculty of Education", departments: ["Department of Curriculum Studies", "Department of Educational Psychology", "Department of Guidance and Counseling", "Department of Educational Administration", "Department of Special Education"] },
  { name: "Faculty of Business Administration", departments: ["Department of Accounting", "Department of Finance", "Department of Marketing", "Department of Management", "Department of Business Law"] },
  // Add more faculties and departments as needed
];

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization: '',
    faculty: '',
    department: '',
    gender: '',
    accountType: 'STUDENT',  // Default accountType
  });

  const [departments, setDepartments] = useState([]);
  const [isStudent, setIsStudent] = useState(true);
  const [loading, setLoading] = useState(false); // For loading spinner
  const nav = useNavigate();

  const handleRoleSwitch = (role) => {
    const newAccountType = role === 'student' ? 'STUDENT' : 'SPONSOR';
    setIsStudent(role === 'student');
    setFormData((prevData) => ({
      ...prevData,
      accountType: newAccountType,
      faculty: '',
      department: '',
      gender: '',
      organization: role === 'student' ? '' : prevData.organization,
    }));
  };

  const handleFacultyChange = (event) => {
    const selectedFacultyName = event.target.value;
    setFormData({ ...formData, faculty: selectedFacultyName, department: '' });
    const faculty = faculties.find(fac => fac.name === selectedFacultyName);
    setDepartments(faculty ? faculty.departments : []);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const url = 'http://localhost:8080/api/v1/register';
    try {
      await axios.post(url, formData);
      Swal.fire({
        title: 'Success!',
        text: 'Registration successful!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setFormData({
        name: '',
        email: '',
        password: '',
        organization: '',
        faculty: '',
        department: '',
        gender: '',
        accountType: 'STUDENT',
      });
      setDepartments([]);
      nav('/login');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Registration failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="switch-container">
          <button
            onClick={() => handleRoleSwitch('student')}
            className={isStudent ? 'active' : ''}
          >
            Student
          </button>
          <button
            onClick={() => handleRoleSwitch('funder')}
            className={!isStudent ? 'active' : ''}
          >
            Funder
          </button>
        </div>
        <div className="form">
          <h2>Register as {isStudent ? 'Student' : 'Funder'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {isStudent && (
              <>
                <div className="form-group">
                  <label>Faculty:</label>
                  <select name="faculty" value={formData.faculty} onChange={handleFacultyChange} required>
                    <option value="">Select Faculty</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.name} value={faculty.name}>{faculty.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Department:</label>
                  <select name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}
            {!isStudent && (
              <div className="form-group">
                <label>Organization:</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                'Register'
              )}
            </button>
            <p>
               Already have an account?{' '}
              <span className="link" onClick={() => nav('/login')}>
              Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

const faculties = [
  { name: "Faculty of Arts", departments: ["Department of English", "Department of History", "Department of Philosophy"] },
  { name: "Faculty of Science", departments: ["Department of Computer Science", "Department of Physics", "Department of Chemistry"] },
  { name: "Faculty of Social Sciences", departments: ["Department of Economics", "Department of Political Science", "Department of Sociology"] },
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
  });

  const [departments, setDepartments] = useState([]);
  const [isStudent, setIsStudent] = useState(true);

  const handleRoleSwitch = (role) => {
    setIsStudent(role === 'student');
    setFormData({
      name: '',
      email: '',
      password: '',
      organization: '',
      faculty: '',
      department: '',
      gender: '',
    });
    setDepartments([]);
  };
  const nav = useNavigate();

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
    const url = 'http://localhost:8080/api/v1/register';
    try {
      const response = await axios.post(url, formData);
      alert('Registration successful!');
      // Handle successful response
    } catch (error) {
      alert('Registration failed!');
      // Handle error response
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
            <button type="submit">Register</button>
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

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isStudent, setIsStudent] = useState(true);
  const nav = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleSwitch = (role) => {
    setIsStudent(role === 'student');
    setFormData({
      email: '',
      password: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = 'http://localhost:8080/api/v1/login';
      const response = await axios.post(url, formData);
      const { profileDTO, token } = response.data;
      const { accountType, matricNumber: responseMatricNumber } = profileDTO;
       console.log(response.data)
      switch (accountType) {
        case 'ADMIN':
          localStorage.setItem('TYPE', accountType);
          break;
        case 'SPONSOR':
          localStorage.setItem('TYPES', accountType);
          break;
        case 'STUDENT':
          localStorage.setItem('TYPESS', accountType);
          break;
        default:
          console.error('Unknown user type:', accountType);
      }

      localStorage.setItem('profile', JSON.stringify(profileDTO));
      localStorage.setItem('MatricNo', responseMatricNumber);
      localStorage.setItem('jwtToken', token);

      alert('Login Successful');
      nav('/');
      window.location.reload();
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed!');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="role-switch-container">
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
        <div className="form-container">
          <h2>Login as {isStudent ? 'Student' : 'Funder'}</h2>
          <form onSubmit={handleSubmit} className="form">
            {isStudent ? (
              <>
                <div className="form-group">
                  <label>Matriculation Number:</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
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
            <button type="submit">Login</button>
            <p>
              Don't have an account?{' '}
              <span className="link" onClick={() => nav('/register')}>
                Register here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;

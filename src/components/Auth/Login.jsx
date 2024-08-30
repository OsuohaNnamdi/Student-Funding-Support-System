import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/ClipLoader';
import './Auth.css';

const Auth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isStudent, setIsStudent] = useState(true);
  const [loading, setLoading] = useState(false);  // Loading state
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
    setLoading(true);  // Show spinner
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
      localStorage.setItem('jwtToken', token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have been successfully logged in.'
      }).then(() => {
        nav('/');
      });
    } catch (error) {
      console.error('Login error', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'There was an error logging in. Please try again.'
      });
    } finally {
      setLoading(false);  // Hide spinner
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
            ) : (
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
            <button type="submit" disabled={loading}>
              {loading ? (
                <ClipLoader color="#fff" loading={loading} size={20} />
              ) : (
                'Login'
              )}
            </button>
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

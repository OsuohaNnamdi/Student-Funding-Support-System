import React from 'react';
import './about.css';
import Back from '../common/back/Back';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Project Manager',
    image: 'path/to/john-doe.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'Lead Developer',
    image: 'path/to/jane-smith.jpg',
  },
  {
    name: 'Alice Johnson',
    role: 'UX Designer',
    image: 'path/to/alice-johnson.jpg',
  },
];

const About = () => {
  return (
    <>
    <Back title='About Project'/>
    <div className="about-project-container">
      <div className="about-project-header">
        <h2>About the Project</h2>
        <p>Discover the details and vision behind our scholarship management system.</p>
      </div>

      <div className="about-project-section">
        <h3>Introduction</h3>
        <p>
          Our Scholarship Management System is designed to streamline the process of applying for and managing scholarships. This platform connects students with potential funders, making the application process easier and more efficient.
        </p>
      </div>

      <div className="about-project-section">
        <img src="path/to/project-image.jpg" alt="Project" />
        <h3>Project Objectives</h3>
        <p>
          The main objectives of the project are:
        </p>
        <ul>
          <li>To provide a centralized platform for scholarship applications.</li>
          <li>To connect students with potential funders.</li>
          <li>To streamline the scholarship management process for administrators.</li>
        </ul>
      </div>

      <div className="about-project-section">
        <h3>Key Features</h3>
        <p>
          Our system offers a range of features to support both students and funders, including:
        </p>
        <ul>
          <li>Easy application submission with document uploads.</li>
          <li>Automated application tracking and status updates.</li>
          <li>Secure user authentication and data protection.</li>
          <li>Comprehensive dashboards for students, funders, and administrators.</li>
        </ul>
      </div>

      <div className="about-project-section">
        <h3>Technology Stack</h3>
        <p>
          The project is built using modern web technologies to ensure reliability and performance:
        </p>
        <ul>
          <li>Front-end: React, HTML, CSS</li>
          <li>Back-end: Java (Spring Boot)</li>
          <li>Database: MySQL</li>
          <li>Containerization: Docker</li>
        </ul>
      </div>

      <div className="about-project-section">
        <h3>Meet the Team</h3>
        <div className="team">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default About;

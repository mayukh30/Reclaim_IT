// src/components/ContactMe.jsx
import React from 'react';
import '../App.css';

const ContactMe = () => {
  return (
    <div className="app">
      <div className="left-panel">
        <div className="top-links yua">
          <a href="/">Back to Login</a>
        </div>
      </div>

      <div className="about-card oila">
        <h2>Contact Me</h2>
        <p>
          You can reach out to me through the following platforms:
        </p>

        <div className="contact-links">
          <p>
            <strong>Gmail:</strong>
            <a className="glow-link" href="mailto:your-email@gmail.com"> mayukhs.it.ug@jadavpuruniversity.in </a>
          </p>
          <p>
            <strong>LinkedIn: </strong>
            <a className="glow-link" href="" target="_blank" rel="noopener noreferrer">
              www.linkedin.com/in/mayukh-sinha-b262a9256
            </a>
          </p>
          {/* <p>
            <strong>LeetCode:</strong>
            <a className="glow-link" href="https://leetcode.com/your-username" target="_blank" rel="noopener noreferrer">
              https://leetcode.com/your-username
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ContactMe;

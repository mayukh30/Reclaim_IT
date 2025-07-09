// src/components/About.jsx
import React from 'react';
import '../App.css';
import myPhoto from '../assets/me.jpg';

const About = () => {
  return (
    <div className="app">
      <div className="left-panel">
        <div className="top-links yua">
          <a href="/">⬅ Back to Login</a>
        </div>
      </div>

      <div className="about-card animated-fade-in">
        <img src={myPhoto} alt="My Profile" className="profile-img" />
        <h2 className="about-heading">👋 About Me</h2>
        <p className="about-paragraph">
          I’m a <strong>2nd-year </strong> student currently pursuing <strong>Bachelor of Engineering</strong> in <strong>Information Technology</strong> at <strong>Jadavpur University </strong>. I’m a tech enthusiast with a passion for <em>web development</em> — creating interactive and user-friendly websites.
        </p>
        <p className="about-paragraph">
          Beyond coding, I enjoy:
          <br />
          <span className="hobby-list">
            🏏 Cricket &nbsp;🕺 Dance &nbsp;🏓 Table Tennis &nbsp;🥋 Kickboxing & Karate
            <br />
            🎬 Stunts &nbsp;🏀 Basketball &nbsp;🏸 Badminton &nbsp;⚽ Football
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;

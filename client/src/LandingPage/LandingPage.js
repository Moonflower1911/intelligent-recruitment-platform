import React from 'react';
import { Link } from 'react-router-dom'; // Ensure this import
import './LandingPage.css'; // Create a new CSS file for Register styling

function LandingPage() {
  return (
    <div className="LandingPagerContainer">
      <h2>Looking for a job? or wanting to hire?</h2>
      <p>Are You?</p>
      <div className="buttonContainer">
        <Link to='/authRecruiter/login' className="button">Recruiter</Link>
        <Link to='/authJobSeeker/login' className="button">Jobseeker</Link>
      </div>
    </div>
  );
}

export default LandingPage;

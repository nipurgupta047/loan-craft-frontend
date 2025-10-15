import React from 'react';
import { NavLink } from 'react-router-dom';   // ✅ Import NavLink
import './navbar.css';

export default function Navbar() {

  function downloadFiles() {
    const fileList = [
      '/files/samplePanCard.pdf',
      '/files/sampleSalarySlip.pdf',
      '/files/sampleData.txt',
    ];

    fileList.forEach((fileUrl) => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileUrl.split('/').pop(); // Extracts the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }


  return (
    <header className="navbar">
      <NavLink to="/" className="logo-link">
        <div className="logo">Automatic Loan Validation System</div>
      </NavLink>
      
      <nav>
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Home
        </NavLink>

        <NavLink 
          to="/apply" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Apply for Application
        </NavLink>

        <NavLink 
          to="/track" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Track Your Application
        </NavLink>
      </nav>

      <a className="download-btn" onClick={downloadFiles}>
        Download Sample Files
      </a>
    </header>
  );
}

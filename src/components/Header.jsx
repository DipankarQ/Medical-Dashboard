import React from 'react'
import TestLogo from '../assets/TestLogo.svg'

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img src={TestLogo} alt="Tech.Care Logo" />
        </div>
      </div>
      
      <nav className="header-nav">
        <a href="#" className="nav-link">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Overview</span>
        </a>
        <a href="#" className="nav-link active">
          <span className="nav-icon">👥</span>
          <span className="nav-text">Patients</span>
        </a>
        <a href="#" className="nav-link">
          <span className="nav-icon">📅</span>
          <span className="nav-text">Schedule</span>
        </a>
        <a href="#" className="nav-link">
          <span className="nav-icon">💬</span>
          <span className="nav-text">Message</span>
        </a>
        <a href="#" className="nav-link">
          <span className="nav-icon">💰</span>
          <span className="nav-text">Transactions</span>
        </a>
      </nav>

      <div className="header-right">
        <div className="notifications">
          <span className="notification-icon">🔔</span>
        </div>
        <div className="header-menu">
          <span className="menu-icon">⋮</span>
        </div>
        <div className="user-profile">
          <img
            src="https://i.pravatar.cc/150?img=52" 
            alt="Dr. Jose Simmons" 
            className="profile-image"
          />
          <div className="profile-info">
            <div className="profile-name">Dr. Jose Simmons</div>
            <div className="profile-role">General Practitioner</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


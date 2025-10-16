import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
      <div className="container-fluid">
        {/* Bootstrap brand/logo class */}
        <NavLink to="/" className="navbar-brand">
          TravelSite 
        </NavLink>

        {/* Bootstrap toggler button for smaller screens */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content for the navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Bootstrap class for unordered list of links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 "> 
            {/* Nav Item (li) and Nav Link (NavLink) classes */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeclassname="active">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/packages" className="nav-link" activeclassname="active">Packages</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/recommendations" className="nav-link" activeclassname="active">AI Recommendations</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/destinations" className="nav-link" activeclassname="active">Destinations</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar;
import React, { use, useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import { Button, Avatar } from 'antd';
import useTravelCost from './context/TravelContext';
import { toast } from 'react-toastify';
import "./navlink.css"


const Navbar = () => {
  const [isToggle, setToggle]=useState(true)
  const updatedToggle=()=>{
    setToggle(!isToggle)
  }
  const {user,loginWithGoogle,logout}=useTravelCost()
  let navigate=useNavigate()

  const handleAuth=async()=>{
    if(!user){
      await loginWithGoogle()
      navigate("/packages")
      toast("user logged in successfully")
    }else{
      await logout()
      navigate('/')
      toast("user logged out successfully")
    }
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light"> 
      <div className="container-fluid">
        {/* Bootstrap brand/logo class */}
        <NavLink to="/" className="navbar-brand fs-4 text-primary">
          TravelSite 
        </NavLink>

        {/* Bootstrap toggler button for smaller screens */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={updatedToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content for the navigation links */}
        <div className={`collapse navbar-collapse ${isToggle?"":"show"}`} id="navbarNav">
          {/* Bootstrap class for unordered list of links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0"> 
            {/* Nav Item (li) and Nav Link (NavLink) classes */}
            <li className="nav-item">
              <NavLink to="/home" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/destinations" className="nav-link">Destinations</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/packages" className="nav-link">Packages</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/recommendation" className="nav-link">AI Recommendations</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to={"/favourites"} className={"nav-link"}>Favourites</NavLink>
            </li>
          </ul>
          <div className='d-flex gap-3 align-items-center'>
            {user && <div className='d-flex align-items-center gap-1'><Avatar src={user.photo || "u"}/><p>{user.name || "user"}</p></div>}
            <Button onClick={handleAuth}>{user?"logout":"login with google"}</Button>
        </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar;
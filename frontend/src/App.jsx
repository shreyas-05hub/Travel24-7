import React from 'react'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home'; 
import Packages from './pages/Packages';
import Recommendations from './pages/Recommendations';
import Destinations from './pages/Destinations';
import { Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom'

const App = () => {
  return (
      <>
        <Navbar/> 
        <Routes>
            <Route path="/" element={<Navigate to={"/home"} />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/packages"} element={<Packages />} />
            <Route path={"/recommendation"} element={<Recommendations />} />
            <Route path={"/Destinations"} element={<Destinations />} />
        </Routes>
        <Footer/>
    </>
  )
}

export default App;
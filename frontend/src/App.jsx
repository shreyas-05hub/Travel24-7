import React from 'react'
import Home from './pages/Home'
import Packages from './pages/Packages'
import Recommendations from './pages/Recommendations'
import Destinations from './pages/Destinations'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const App = () => {
  return (
    <div>
      <Navbar>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/destinations" element={<Destinations />} />
          </Routes>
      </Navbar>
      <Footer/>
    </div>
  )
}

export default App

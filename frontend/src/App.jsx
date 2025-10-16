import React from 'react'
import Home from './pages/Home'
import Packages from './pages/Packages'
import Recommendations from './pages/Recommendations'
import Destinations from './pages/Destinations'

const App = () => {
  return (
    <div>
      <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/destinations" element={<Destinations />} />
            </Routes>
    </div>
  )
}

export default App

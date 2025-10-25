import React from 'react'
import "./aiHeroBg.css"
import useTravelCost from '../../context/TravelContext'
import { UserOutlined } from '@ant-design/icons';


const AiHero = () => {
  const { user }=useTravelCost()
  return (
    <>
      <div className='aiHeroBG text-center py-5'>
          <div className='my-5 py-5'>
              <h1 className='text-danger'>AI Travel Recommendations</h1>
              <p className='fw-medium fs-5'>Personalized trip suggestions powered by AI</p>
          </div>
      </div>
      {user && <div className="py-3 mb-3 user">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="card-body text-center">
              <h1 className="card-title">Hi, <span className='text-danger'>{user.name || "user"}</span></h1>
              <p className="card-text fs-5">“We’ve curated recommendations just for you!”</p>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default AiHero

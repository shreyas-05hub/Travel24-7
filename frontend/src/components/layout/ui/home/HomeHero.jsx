import React from 'react'
import "./homehero.css"


const HomeHero = ({header,caption}) => {

  return (
    <>
      <div className="container-fluid">
        <div className="row homeHero" >
            <div className="col-sm-12 col-md-12 col-sm-12 d-flex flex-column justify-content-center">
                <p className='text-danger text-center fw-bold' style={{fontSize:"4.73rem"}}>{header}</p>
                <p className='text-center fw-medium fs-4'>{caption}</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default HomeHero

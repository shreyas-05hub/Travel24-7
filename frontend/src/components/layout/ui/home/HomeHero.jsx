import React from 'react'
import "./homehero.css"


const HomeHero = ({header,caption}) => {

  return (
    <>
      <div className="container-fluid ">
        <div className="row homeHero" >
            <div className="col-sm-12 col-md-12 col-sm-12 d-flex flex-column justify-content-end">
              <p className='text-danger text-center fw-bold' style={{fontSize:"4.73rem"}}>{header}</p>
            </div>
            <p className='text-center text-white fw-bold fs-4 my-auto'>{caption}</p>
        </div>
      </div>
    </>
  )
}

export default HomeHero

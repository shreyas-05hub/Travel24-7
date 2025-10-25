import React, { useState} from 'react';
import { Link } from 'react-router-dom';
// import "./homesearch.css"

const HomeSearchWidget = () => {
  const [searchTerm, setSearchTerm] = useState("");
  let statesList=["Visakhapatnam", "Tirupati", "Vijayawada", "Amaravati", "Rajamahendravaram", "Srikalahasti", "Kurnool", "Kadapa", "Nellore", "Anantapur"]

  const states = statesList.filter(state => {
    return state.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center ai">
                    <h1 className='text-center'>Destination Search with AI</h1>
                    <div className='px-5 py-2'>
                        <div>
                            <label htmlFor="travelPlace" className="form-label fs-5">Trip (please Select the state.)</label>
                        </div>
                        <div className="">
                            <input type="text" className='form-control' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                            {/* Displaying top 10 famous states in ap & telangana */}
                            {searchTerm==""?"":<div className='card my-3 p-3 w-50 mx-auto text-center'>
                                {states.map((ele,index)=>(
                                    <p key={index}>{ele}</p>
                                ))}
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 px-0 order-1 order-lg-2">
                    <img src="./src/assets/travel.webp" alt="" className='img-fluid h-100' />
                </div>
            </div>
        </div>
    </>
  )
}


export default HomeSearchWidget



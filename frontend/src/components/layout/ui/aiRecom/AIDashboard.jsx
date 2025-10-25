import React, { useState } from 'react'
import "./aidashboard.css"

let destinations=['Madurai', 'Jaipur', 'Lucknow', 'Kochi', 'Varanasi', 'Delhi',
                'Pune', 'Nagpur', 'Goa', 'Hyderabad', 'Bhubaneswar', 'Chandigarh',
                'Kolkata', 'Chennai', 'Coimbatore', 'Visakhapatnam', 'Mumbai',
                'Bengaluru', 'Indore', 'Ahmedabad']
let TravelType=['Mountain', 'Historical', 'Island', 'Adventure', 'Coastal', 'City',
                'Beach', 'Backwater', 'Cultural', 'Hill Station', 'Desert']
const AIDashboard = () => {
    const [rangeValue,setRangeValue]=useState(3000)
  return (
    <>  
        <div className='form w-50 mx-auto p-3 my-4'>
            <div className='my-3 px-sm-5'>
                <label htmlFor="destination" className='my-3 fw-bold fs-5'>Select Destinations</label>
                <select name="destination" id="destination" className='form-select'>
                    {destinations.sort().map((ele,i)=><option value={`${ele}`} key={i}>{ele}</option>)} 
                </select>
                <label htmlFor="traveltype" className='my-3 fw-bold fs-5'>Select Travel Type</label>
                <select name="traveltype" id="traveltype" className='form-select'>
                    {TravelType.map((ele,i)=><option value={`${ele}`} key={i}>{ele}</option>)} 
                </select>
                <label htmlFor="" className='my-3 fw-bold fs-5'>Select Budget Range</label>
                <input type="range" className="form-range" min={3000} max={100000} value={rangeValue} id="budgetRange" onChange={(e)=>setRangeValue(Number(e.target.value))}/>
                <output htmlFor="range4" id="rangeValue" className='d-block fw-medium'>{rangeValue}</output>
                <label htmlFor="" className='my-3 fw-bold fs-5'>Select Duration</label>
                <input type="number" name="duration" id="duration" min={2} className='form-control' />
                <label htmlFor="" className='my-3 fw-bold fs-5'>Number Of Travellers</label>
                <input type="number" name="travellers" id="travellers" min={1} className='form-control' />
                <div className='text-center mt-4 py-2'>
                    <button className='reset btn btn-success px-4 py-2'>Reset</button>
                </div>
            </div>
        </div>
        <div className='text-center my-4'>
            <button type="button" className='btn btn-warning px-4 py-3 aiGnt'><i className="bi bi-magic"></i> AI Generate</button>
        </div>
    </>
  )
}

export default AIDashboard

import React, {useState} from 'react'
import "./resuggestions.css"

let TravelType=['Mountain', 'Historical', 'Island', 'Adventure', 'Coastal', 'City',
                'Beach', 'Backwater', 'Cultural', 'Hill Station', 'Desert']
const Resuggestions = () => {
    const [rangeValue,setRangeValue]=useState(3000)
  return (
    <div className='text-center'>
      <h1>Not what you expected</h1>
      <div className='form w-50 mx-auto p-3 my-4'>
            <div className='my-3 px-sm-5'>
                <label htmlFor="traveltype" className='my-3 fw-bold fs-5'>Change Travel Type</label>
                <select name="traveltype" id="traveltype" className='form-select'>
                    {TravelType.map((ele,i)=><option value={`${ele}`} key={i}>{ele}</option>)} 
                </select>
                <label htmlFor="" className='my-3 fw-bold fs-5'>Select Budget Range</label>
                <input type="range" className="form-range" min={3000} max={100000} value={rangeValue} id="budgetRange" onChange={(e)=>setRangeValue(Number(e.target.value))}/>
                <output htmlFor="range4" id="rangeValue" className='d-block fw-medium'>{rangeValue}</output>
                <label htmlFor="" className='my-3 fw-bold fs-5'>Select Duration</label>
                <input type="number" name="duration" id="duration" min={2} className='form-control' />
                <div className='text-center mt-4 py-2'>
                    <button className='reset btn btn-success px-4 py-2'>Reset</button>
                </div>
            </div>
        </div>
        <div className='text-center my-4'>
            <button type="button" className='btn px-4 py-3 reGnt'><i className="bi bi-magic"></i> Re Generate</button>
        </div>
    </div>
  )
}

export default Resuggestions

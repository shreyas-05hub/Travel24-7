import React, {useState} from 'react'
import { useDestinationData } from '../destinations/DestinationContext'
import packageData from '../../data/packageData'
import { usePackageData } from './PackageProvider'

const PackagesData = () => {
    const [rangeValue,setRangeValue]=useState(3000)
    const [duration,setDuration]=useState(2)
    const {destination}=useDestinationData()
    const data=packageData[destination]
    const {destinationTypes}=data
    console.log(destinationTypes)
    const {setPackage}=usePackageData()
    const getPackage = (ele) => {
      const enrichedPackage = {
        ...ele,
        budget: rangeValue,
        duration: duration
      };
      setPackage(enrichedPackage);
      localStorage.setItem("lastPackage", JSON.stringify(enrichedPackage));
    };
  return (
    <div className='container-fluid my-4'>
      <div className="container">
        <h5 className='text-center'>Enter Budget</h5>
        <input type="number" className='form' value={duration} min={2} onChange={(e)=>setDuration(e.target.value)} />
        <h5 className='text-center'>Enter Duration</h5>
        <input type="range" className="form-range" min={3000} max={100000} value={rangeValue} id="budgetRange" onChange={(e)=>setRangeValue(Number(e.target.value))}/>
         <output htmlFor="range4" id="rangeValue" className='d-block fw-medium'>{rangeValue}</output>
        <div className="row">
          {destinationTypes.map((ele,i)=>(
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 py-3" key={i}>
              <div className="card">
                <img src={ele.imgUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">{ele.type}</h5>
                  <p className="card-text">{ele.description}</p>
                  <button className="btn btn-primary" to={`/${ele.name}`} onClick={()=>getPackage(ele)}>Get Recommendations</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PackagesData

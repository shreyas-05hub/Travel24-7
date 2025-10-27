import React from 'react'
import { useParams } from 'react-router-dom'
import { usePackageData } from './PackageProvider'

const PackageDetails = () => {

    const {packageID}=useParams()
    console.log(packageID)
    const {Package}=usePackageData()

    const { type, imgUrl, description, budget, duration, recommendations } = Package;
    const packageDetails=recommendations.find((packageDetails)=>packageDetails.name==packageID)
    console.log(packageDetails)

  return (
    <div className='container-fluid min-vh-100 my-5'>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card m-3">
                        <img src={packageDetails.imgUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Title: {packageDetails.name}</h5>
                            <p className="card-text fw-bold fs-5">Price: {packageDetails.approxCost}</p>
                            <p className="card-text fw-bold fs-5">Duration: {packageDetails.duration}</p>
                            <p className="card-text">{packageDetails.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
    </div>
  )
}

export default PackageDetails

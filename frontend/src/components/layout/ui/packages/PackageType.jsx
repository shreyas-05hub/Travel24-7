import React from 'react'
import { usePackageData } from './PackageProvider'
import { Link } from 'react-router-dom'

const PackageType = () => {
    const {Package}=usePackageData()
    console.log(Package)
    const { type, imgUrl, description, budget, duration, recommendations } = Package;
    console.log(budget)
    console.log(duration)
    console.log(recommendations)
  return (
    <div className='container-fluid'>
      <div className="container">
        <h3 className='text-center'>{recommendations.length > 0 ? "Top Recommendations" : ""}</h3>
        <div className="row">
            {recommendations.map((ele,i)=>(
                <div className="col-sm-12 col-md-12 col-lg-6" key={i}>
                    <div className="card m-3">
                        <img src={ele.imgUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{ele.name}</h5>
                            <p className="card-text fw-bold fs-5">{ele.approxCost}</p>
                            <p className="card-text">{ele.description.slice(0,21)}...</p>
                            <Link to={`/${ele.name}`} className="btn btn-primary">Get Details</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PackageType
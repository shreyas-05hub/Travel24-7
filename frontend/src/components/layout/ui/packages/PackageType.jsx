import React from "react";
import { usePackageData } from "./PackageProvider";
import { Link } from "react-router-dom";
import { useDestinationData } from "../destinations/DestinationContext";

const PackageType = () => {
  const { Package } = usePackageData();
  console.log("pckg",Package);
  const { destination } = useDestinationData();
  console.log(destination)
  const { type, imgUrl, description, budget, duration, recommendations=[] } =
    Package;
  console.log(budget);
  console.log(duration);
  console.log(type)
  console.log("rrr",recommendations);
  return (
    <>
       <h3 className="text-center">
          {recommendations.length > 0 ? "Top Recommendations" : ""}
        </h3>
      <div className="container-fluid text-center" style={{backgroundImage:`url(./src/assets/assets1/${destination}_${type.toLowerCase().replaceAll(" ","")}.jpg)`,
              backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center center"}}>
        <div className="row">
          {recommendations.map((ele, i) => (
            <div className="col-12" key={i} >
              <div className="card mx-auto my-5 w-25 ">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <p className="card-text fw-bold fs-5">{ele.approxCost}</p>
                  <p className="card-text">{ele.description.slice(0, 21)}...</p>
                  <Link to={`/${ele.name}`} className="btn btn-primary">
                    Get Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PackageType;

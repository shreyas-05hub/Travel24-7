import React from "react";
import { useParams } from "react-router-dom";
import { usePackageData } from "./PackageProvider";
import { useDestinationData } from "../destinations/DestinationContext";

const PackageDetails = () => {
  const { packageID } = useParams();
  console.log(packageID);
  const { Package } = usePackageData();
  const { destination } = useDestinationData();

  const { type, imgUrl, description, budget, duration, recommendations } =
    Package;
  const packageDetails = recommendations.find(
    (packageDetails) => packageDetails.name == packageID
  );
  console.log(packageDetails);

  return (
    <div className="container-fluid min-vh-100 my-5" style={{backgroundImage:`url(./src/assets/assets1/${destination}_${type.toLowerCase().replaceAll(" ","")}.jpg)`,
              backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card m-3">
              <div className="card-body">
                <h5 className="card-title">Title: {packageDetails.name}</h5>
                <p className="card-text fw-bold fs-5">
                  Price: {packageDetails.approxCost}
                </p>
                <p className="card-text fw-bold fs-5">
                  Duration: {packageDetails.duration}
                </p>
                <p className="card-text">{packageDetails.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;

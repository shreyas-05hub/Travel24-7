// import React from "react";
// import { useParams } from "react-router-dom";
// import { usePackageData } from "./PackageProvider";
// import { useDestinationData } from "../destinations/DestinationContext";

// const PackageDetails = () => {
//   const { packageID } = useParams();
//   const { Package } = usePackageData();
//   const { destination } = useDestinationData();

//   // ✅ Fallback to localStorage if context is empty
//   const storedPackage = JSON.parse(localStorage.getItem("lastPackage") || "{}");
//   const activePackage = Object.keys(Package || {}).length
//     ? Package
//     : storedPackage;

//   const {
//     type = "",
//     budget = 0,
//     duration = 0,
//     recommendations = [],
//   } = activePackage;

//   // ✅ Ensure recommendations is always an array
//   const safeRecommendations = Array.isArray(recommendations)
//     ? recommendations
//     : (() => {
//         try {
//           return JSON.parse(recommendations);
//         } catch {
//           return [];
//         }
//       })();

//   const packageDetails = safeRecommendations.find(
//     (pkg) => String(pkg.Package_Id) === String(packageID)
//   );

//   const capitalize = (str = "") =>
//     str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

//   return (
//     <div
//       className="container-fluid min-vh-100"
//       style={{
//         backgroundImage: `url(./src/assets/assets1/${destination}_${type
//           .toLowerCase()
//           .replaceAll(" ", "")}.jpg)`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center center",
//       }}
//     >
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             {packageDetails ? (
//               <div className="card m-3">
//                 <div className="card-body">
//                   <h5 className="card-title fw-bold text-center">
//                     <span className="fw-lbold">
//                       {capitalize(packageDetails.Destination)}{" "}
//                       {packageDetails.Destination_Type}
//                     </span>
//                   </h5>
//                   <p className="card-text fw-bold fs-5 text-success">
//                     From City:{" "}
//                     <span className="fw-light text-dark mx-3">
//                       {packageDetails.From_City}
//                     </span>
//                   </p>
//                   <p className="card-text fw-bold fs-5 text-success">
//                     Cost:{" "}
//                     <span className="fw-light text-dark mx-3">
//                       {packageDetails.Budget}
//                     </span>
//                   </p>
//                   <p className="card-text fw-bold fs-5 text-success">
//                     Trip Duration Days:{" "}
//                     <span className="fw-light text-dark mx-3">
//                       {packageDetails.Trip_Duration_Days} Days
//                     </span>
//                   </p>
//                   <p className="card-text fw-bold fs-5 text-success">
//                     Accomodation:{" "}
//                     <span className="fw-light text-dark mx-3">
//                       {packageDetails.Accommodation}
//                     </span>
//                   </p>
//                   <p className="card-text fw-bold fs-5 text-success">
//                     Package Type:{" "}
//                     <span className="fw-light text-dark mx-3">
//                       {packageDetails.Package_Type}
//                     </span>
//                   </p>
//                   <p className="card-text fw-bold fs-5 text-success">
//                     Transport Mode:{" "}
//                     <span className="fw-light text-dark mx-3">
//                       {packageDetails.Transport_Mode}
//                     </span>
//                   </p>
//                   <p className="card-text fw-bold fs-5 text-success">
//                     Season:{" "}
//                     <span className="fw-light text-dark mx-3">
//                       {packageDetails.Season}
//                     </span>
//                   </p>
//                   <p className="card-text fw-bold fs-5 text-success">
//                     Activities Count:{" "}
//                     <span className="fw-light text-dark mx-3">
//                       {packageDetails.Activities_Count}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-white text-center mt-5">
//                 No package details found.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageDetails;

import React from "react";
import { useParams } from "react-router-dom";
import { usePackageData } from "./PackageProvider";
import { useDestinationData } from "../destinations/DestinationContext";

const PackageDetails = () => {
  const { packageID } = useParams();
  const { Package } = usePackageData();
  const { destination } = useDestinationData();

  // ✅ Fallback to localStorage if context is empty
  const storedPackage = JSON.parse(localStorage.getItem("lastPackage") || "{}");
  const activePackage = Object.keys(Package || {}).length
    ? Package
    : storedPackage;

  const {
    type = "",
    budget = 0,
    duration = 0,
    recommendations = [],
  } = activePackage;

  // ✅ Ensure recommendations is always an array
  const safeRecommendations = Array.isArray(recommendations)
    ? recommendations
    : (() => {
        try {
          return JSON.parse(recommendations);
        } catch {
          return [];
        }
      })();

  const packageDetails = safeRecommendations.find(
    (pkg) => String(pkg.Package_Id) === String(packageID)
  );

  const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // ✅ Safely load background image dynamically
  let backgroundImage = "";
  try {
    backgroundImage = new URL(
      `../../assets/assets1/${destination}_${type
        .toLowerCase()
        .replaceAll(" ", "")}.jpg`,
      import.meta.url
    ).href;
  } catch {
    // fallback if image not found
    backgroundImage = new URL(
      "../../assets/assets1/default.jpg",
      import.meta.url
    ).href;
  }

  return (
    <div
      className="container-fluid min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            {packageDetails ? (
              <div className="card m-3">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-center">
                    <span className="fw-lbold">
                      {capitalize(packageDetails.Destination)}{" "}
                      {packageDetails.Destination_Type}
                    </span>
                  </h5>

                  <p className="card-text fw-bold fs-5 text-success">
                    From City:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.From_City}
                    </span>
                  </p>
                  <p className="card-text fw-bold fs-5 text-success">
                    Cost:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.Budget}
                    </span>
                  </p>
                  <p className="card-text fw-bold fs-5 text-success">
                    Trip Duration Days:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.Trip_Duration_Days} Days
                    </span>
                  </p>
                  <p className="card-text fw-bold fs-5 text-success">
                    Accommodation:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.Accommodation}
                    </span>
                  </p>
                  <p className="card-text fw-bold fs-5 text-success">
                    Package Type:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.Package_Type}
                    </span>
                  </p>
                  <p className="card-text fw-bold fs-5 text-success">
                    Transport Mode:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.Transport_Mode}
                    </span>
                  </p>
                  <p className="card-text fw-bold fs-5 text-success">
                    Season:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.Season}
                    </span>
                  </p>
                  <p className="card-text fw-bold fs-5 text-success">
                    Activities Count:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.Activities_Count}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-white text-center mt-5">
                No package details found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;

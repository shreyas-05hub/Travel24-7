// PackageSidebar.jsx
import React from "react";
import "./destinationSidebar.css";
import { useFromcityData } from "./FromcityContext";

const DestinationSidebar = () => {
  const { Fromcity, setFromcity } = useFromcityData();
  console.log("Fromcity in Sidebar:", Fromcity);
  return (
    <div className="w-100 sidebar text-primary text-center p-3">
      <h5 className="mb-3">Enter Your Travel Preferences</h5>
      <div className="form">
        <div className="my-3">
          <label htmlFor="fromCity" className="my-1">
            Select From_City
          </label>
          <select
            className="form-select my-3 w-50 mx-auto"
            value={Fromcity}
            onChange={(e) => setFromcity(e.target.value)}
          >
            {[
              "Madurai",
              "Jaipur",
              "Lucknow",
              "Kochi",
              "Varanasi",
              "Delhi",
              "Pune",
              "Nagpur",
              "Goa",
              "Hyderabad",
              "Bhubaneswar",
              "Chandigarh",
              "Kolkata",
              "Chennai",
              "Coimbatore",
              "Visakhapatnam",
              "Mumbai",
              "Bengaluru",
              "Indore",
              "Ahmedabad",
            ]
              .sort()
              .map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default DestinationSidebar;

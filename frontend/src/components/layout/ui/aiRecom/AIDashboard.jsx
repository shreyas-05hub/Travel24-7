import React, { useState } from "react";
import "./aidashboard.css";

let destinations = [
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
];

let TravelType = [
  "Mountain",
  "Historical",
  "Island",
  "Adventure",
  "Coastal",
  "City",
  "Beach",
  "Backwater",
  "Cultural",
  "Hill Station",
  "Desert",
];

const AIDashboard = () => {
  const [rangeValue, setRangeValue] = useState(3000);
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState("");
  const [duration, setDuration] = useState("");
  const [travellers, setTravellers] = useState("");
  const [formData, setFormData] = useState(null); // store collected data

  const handleGenerate = () => {
    const data = {
      destination,
      travelType,
      budgetRange: rangeValue,
      duration,
      travellers,
    };

    setFormData(data); // store locally
    console.log("Collected Data:", data);
  };

  const handleReset = () => {
    setDestination("");
    setTravelType("");
    setRangeValue(3000);
    setDuration("");
    setTravellers("");
    setFormData(null);
  };

  return (
    <>
      <div className="form w-50 mx-auto p-3 my-4">
        <div className="my-3 px-sm-5">
          <label htmlFor="destination" className="my-3 fw-bold fs-5">
            Select Destination
          </label>
          <select
            name="destination"
            id="destination"
            className="form-select"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">-- Select --</option>
            {destinations.sort().map((ele, i) => (
              <option value={ele} key={i}>
                {ele}
              </option>
            ))}
          </select>

          <label htmlFor="traveltype" className="my-3 fw-bold fs-5">
            Select Travel Type
          </label>
          <select
            name="traveltype"
            id="traveltype"
            className="form-select"
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
          >
            <option value="">-- Select --</option>
            {TravelType.map((ele, i) => (
              <option value={ele} key={i}>
                {ele}
              </option>
            ))}
          </select>

          <label htmlFor="budgetRange" className="my-3 fw-bold fs-5">
            Select Budget Range
          </label>
          <input
            type="range"
            className="form-range"
            min={3000}
            max={100000}
            value={rangeValue}
            id="budgetRange"
            onChange={(e) => setRangeValue(Number(e.target.value))}
          />
          <output className="d-block fw-medium">{rangeValue}</output>

          <label htmlFor="duration" className="my-3 fw-bold fs-5">
            Select Duration (Days)
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            min={2}
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <label htmlFor="travellers" className="my-3 fw-bold fs-5">
            Number Of Travellers
          </label>
          <input
            type="number"
            name="travellers"
            id="travellers"
            min={1}
            className="form-control"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
          />

          <div className="text-center mt-4 py-2">
            <button
              className="reset btn btn-success px-4 py-2"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="text-center my-4">
        <button
          type="button"
          className="btn btn-warning px-4 py-3 aiGnt"
          onClick={handleGenerate}
        >
          <i className="bi bi-magic"></i> AI Generate
        </button>
      </div>
    </>
  );
};

export default AIDashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";


const HomeSearchWidget = () => {
  const [searchTerm, setSearchTerm] = useState("");
  let statesList = [
    "Ahmedabad",
    "Bengaluru",
    "Chennai",
    "Delhi",
    "Goa",
    "Hyderabad",
    "Jaipur",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Pune",
    "Surat",
    "Visakhapatnam",
  ];

  const handleSelect = (state) => {
    setSearchTerm(state);
  };

  const states = statesList.filter((state) => {
    return state.toLowerCase().includes(searchTerm.trim().toLowerCase());
  });
  useEffect(() => {
                AOS.init({
                  // Global settings for AOS
                  duration: 1000, // values from 0 to 3000, with step 50ms
                  once: true,     // whether animation should happen only once - while scrolling down
                });
                AOS.refresh(); // Recalculate positions of elements
              }, []);
  return (
    <>
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center ai">
            <h1 className="text-center">Destination Search </h1>
            <div className="px-5 py-2">
              <div>
                <label htmlFor="travelPlace" className="form-label fs-5">
                  Trip (please Select the city.)
                </label>
              </div>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Displaying top 10 famous states in ap & telangana */}
                {searchTerm.trim() === "" ? (
                  ""
                ) : (
                  <div className="card my-3 p-3 w-50 mx-auto text-center">
                    {states.map((ele, index) => (
                      <p
                        key={index}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSelect(ele)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSelect(ele);
                        }}
                        style={{ cursor: "pointer", margin: "0.25rem 0" }}
                      >
                        {ele}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 px-0 order-1 order-lg-2">
            <img
              src="./src/assets/travel.webp"
              alt=""
              className="img-fluid h-100"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSearchWidget;


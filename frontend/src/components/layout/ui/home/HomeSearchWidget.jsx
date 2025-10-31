import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import packageData from "../../data/packageData";
import { useHomeSearchData } from "./HomeSearchContext";
import { useNavigate } from "react-router-dom";



const HomeSearchWidget = () => {
  const {setSearch}=useHomeSearchData()
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType,setSearchType]=useState("")
  const [citySelected, setCitySelected] = useState(false);
  const navigate = useNavigate();
  let citiesList = ['Munnar', 'Mysuru', 'Shimla', 'Rann of Kutch', 'Andaman',
       'Auli', 'Kochi', 'Ooty', 'Alleppey', 'Varanasi', 'Pondicherry',
       'Darjeeling', 'Goa', 'Chennai', 'Leh-Ladakh', 'Bengaluru',
       'Rishikesh', 'Kodaikanal', 'Jaipur', 'Mumbai', 'Coorg', 'Agra',
       'Delhi', 'Jaisalmer'].sort()

  console.log(searchTerm, typeof searchTerm)

  let destinationTypeList=packageData[searchTerm] || {}
  console.log(destinationTypeList)

  const {destinationTypes=[]} = destinationTypeList
  console.log(destinationTypes)

  const handleSelect = (city) => {
  setSearchTerm(city);
  setCitySelected(true); // ✅ hide suggestions
};

  const cities = citiesList.filter((city) => {
    return city.toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  useEffect(() => {
  if (searchTerm && searchType) {
    const searchTerms = {
      city: searchTerm,
      type: searchType
    };
    setSearch(searchTerms);
    localStorage.setItem("lastHomeSearch", JSON.stringify(searchTerms));
    navigate("/favourites"); // ✅ navigate when both are selected
  }
}, [searchTerm, searchType]);

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
            <h1 className="text-center px-5 my-4">Know Your Favourite Destination & Type </h1>
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
                  placeholder="select the destination city"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCitySelected(false);
                  }}
                />
                {/* Displaying avaliable cities*/}
                {searchTerm.trim() !== "" && !citySelected && (
                  <div className="card my-3 p-3 w-50 mx-auto text-center">
                    {cities.map((ele, index) => (
                      <p
                        className="Scity"
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
            <div className="px-5 py-2">
                  <label htmlFor="travelPlace" className="form-label fs-5">
                  Type (please Select the destination type.)
                </label>
                <select className="form-control" value={searchType} onChange={(e)=>setSearchType(e.target.value)}>
                  <option value="">-- Select a type --</option>
                  {destinationTypes.map((ele,i)=>(
                    <option key={i} value={ele.type}>{ele.type}</option>
                  ))}
                </select>
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


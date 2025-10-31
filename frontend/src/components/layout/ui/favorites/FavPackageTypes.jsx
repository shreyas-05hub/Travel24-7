import React, { useState,useEffect } from "react";
import packageData from "../../data/packageData";
import { useHomeSearchData } from "../home/HomeSearchContext";
import "./favPackageType.css"

const FavPackageTypes = () => {
  const [highlightedKey, setHighlightedKey] = useState(null);
  const {Search} = useHomeSearchData()
  console.log(Search)
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritePackageTypes")) || [];
  });

  const handleRemove = (type) => {
    const updated = favorites.filter((fav) => fav !== type);
    setFavorites(updated);
    localStorage.setItem("favoritePackageTypes", JSON.stringify(updated));
  };
  useEffect(() => {
  if (Search?.city && Search?.type) {
    const key = `${Search.city}-${Search.type}`;
    if (favorites.includes(key)) {
      setHighlightedKey(key);
      setTimeout(() => setHighlightedKey(null), 3000); // remove highlight after 3s
    } else {
      alert(`No favorite found for ${Search.city} with type ${Search.type}`);
    }
  }
}, [Search, favorites]);


  return (
    <div className="container my-4">
      <h3 className="text-center">Your Favorite Package Types</h3>
      <div className="row">
        {favorites.map((type, i) => {
          const [destinationName, packageType] = type.split("-");
          const destination = packageData[destinationName];
          console.log(type)
          const cityName=type.split("-")
          console.log(cityName)
          const card = destination?.destinationTypes.find(
            (dt) => dt.type === packageType
          );
          console.log(card)
          const favKey = `${destinationName}-${packageType}`;
          const isHighlighted = favKey === highlightedKey;
          return card ? (
            <div className="col-md-4 py-3" key={i}>
              <div className={`card ${isHighlighted ? "border-5 border-warning shadow-lg" : ""}`} style={{ transition: "all 0.5s ease" }}>
                <img
                  src={`./src/assets/assets1/${cityName[0]}_${card.type.toLowerCase().replaceAll(" ","")}.jpg`}
                  className="card-img-top"
                  alt={"Image"}
                  height={"300px"}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.type}</h5>
                  <p className="card-text fw-bold fs-5">{cityName[0]}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(type)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default FavPackageTypes;

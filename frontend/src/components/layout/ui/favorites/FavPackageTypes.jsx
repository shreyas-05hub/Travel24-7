import React, { useState, useEffect } from "react";
import packageData from "../../data/packageData";
import { useHomeSearchData } from "../home/HomeSearchContext";
import "./favPackageType.css";
import AOS from "aos";

const FavPackageTypes = () => {
  const [highlightedKey, setHighlightedKey] = useState(null);
  const { Search } = useHomeSearchData();
  console.log(Search);
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
  useEffect(() => {
              AOS.init({ duration: 1000, once: true });
              AOS.refresh();
            }, []);

  return (
    <div className="container my-4">
      <h3 className="text-center">Your Favorite Package Types</h3>
      <div className="row" data-aos="flip-down">
        {favorites.map((type, i) => {
          console.log(type)
          const [destinationName, packageType] = type.split("_");
          console.log(destinationName)
          const destination = packageData[destinationName] || {};
          const cityName = destinationName;
          console.log(cityName)
          // ensure destinationTypes is an array before calling find
          const card = (destination.destinationTypes || []).find(
            (dt) => dt.type === packageType
          );
          const favKey = `${destinationName}-${packageType}`;
          const isHighlighted = favKey === highlightedKey;
          return card ? (
            <div className="col-md-4 py-3" key={i}>
              <div
                className={`card ${
                  isHighlighted ? "border-5 border-warning shadow-lg" : ""
                }`}
                style={{ transition: "all 0.5s ease" }}
              >
                {console.log(`/assets1/${cityName.replaceAll(" ","")}_${card.type
                    .toLowerCase()
                    .replaceAll(" ", "")}.jpg`)
                    }
                    {console.log(cityName)}
                <img
                  src={`/assets1/${cityName.replaceAll(" ","")}_${card.type
                    .toLowerCase()
                    .replaceAll(" ", "")}.jpg`}
                  className="card-img-top"
                  alt={"Image"}
                  height={"300px"}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.type}</h5>
                  <p className="card-text fw-bold fs-5">{cityName}</p>
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

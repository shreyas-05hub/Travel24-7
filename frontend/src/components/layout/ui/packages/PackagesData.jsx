import React, { useState, useEffect } from "react";
import { useDestinationData } from "../destinations/DestinationContext";
import packageData from "../../data/packageData";
import { usePackageData } from "./PackageProvider";
import FavPackageTypes from "../favorites/FavPackageTypes";
import { useFromcityData } from "../destinations/FromcityContext";

const PackagesData = () => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favoritePackageTypes");
    return stored ? JSON.parse(stored) : [];
  });
  const { Fromcity } = useFromcityData();
  console.log("Fromcity in PackagesData:", Fromcity);
  const [rangeValue, setRangeValue] = useState(3000);
  const [duration, setDuration] = useState(2);
  const { destination } = useDestinationData();
  const data = packageData[destination];
  const { destinationTypes } = data;
  console.log(destinationTypes);
  const { setPackage } = usePackageData();
  console.log("sp", setPackage);

  const getPackage = async (ele) => {
    const enrichedPackage = {
      ...ele,
      fromCity: Fromcity,
      toCity: destination,
      budget: rangeValue,
      duration: duration,
    };

    console.log("Sending enrichedPackage:", enrichedPackage);

    // Save locally (still useful)
    setPackage(enrichedPackage);
    localStorage.setItem("lastPackage", JSON.stringify(enrichedPackage));

    // ✅ Extract only required fields for the backend
    const payload = {
      fromCity: enrichedPackage.fromCity,
      toCity: enrichedPackage.toCity,
      type: enrichedPackage.type,
      duration: enrichedPackage.duration,
      budget: enrichedPackage.budget,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from backend:", result);

      //  Merge recommendations into enrichedPackage
      const finalPackage = {
        ...enrichedPackage,
        recommendations: Array.isArray(result.data?.recommendations)
          ? result.data.recommendations
          : [],
      };

      setPackage(finalPackage);
      localStorage.setItem("lastPackage", JSON.stringify(finalPackage));

      // You can handle response here (e.g., show recommendations)
      alert(`Recommendations received for ${destination}!`);
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data to backend. Check console for details.");
    }
  };

  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    if (destinationTypes) {
      const stored = localStorage.getItem("destinationFeedback");
      const existing = stored ? JSON.parse(stored) : {};
      const updated = { ...existing };

      destinationTypes.forEach((ele) => {
        if (!updated[ele.type]) {
          updated[ele.type] = {
            baseLikes: Math.floor(Math.random() * 500) + 100,
            baseDislikes: Math.floor(Math.random() * 300) + 50,
            liked: false,
            disliked: false,
          };
        }
      });

      setFeedback(updated);
      localStorage.setItem("destinationFeedback", JSON.stringify(updated));
    }
  }, [destinationTypes]);

  const toggleLike = (type) => {
    const current = feedback[type] || {
      baseLikes: Math.floor(Math.random() * 500) + 100,
      baseDislikes: Math.floor(Math.random() * 300) + 50,
      liked: false,
      disliked: false,
    };

    const updated = {
      ...feedback,
      [type]: {
        ...current,
        liked: !current.liked,
        disliked: current.liked ? current.disliked : false,
      },
    };

    setFeedback(updated);
    localStorage.setItem("destinationFeedback", JSON.stringify(updated));
  };

  const toggleDislike = (type) => {
    const current = feedback[type] || {
      baseLikes: Math.floor(Math.random() * 500) + 100,
      baseDislikes: Math.floor(Math.random() * 300) + 50,
      liked: false,
      disliked: false,
    };

    const updated = {
      ...feedback,
      [type]: {
        ...current,
        disliked: !current.disliked,
        liked: current.disliked ? current.liked : false,
      },
    };

    setFeedback(updated);
    localStorage.setItem("destinationFeedback", JSON.stringify(updated));
  };

  const toggleFavorite = (destination, type) => {
    const key = `${destination}-${type}`;
    let updatedFavorites;

    if (favorites.includes(key)) {
      updatedFavorites = favorites.filter((fav) => fav !== key);
    } else {
      updatedFavorites = [...favorites, key];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(
      "favoritePackageTypes",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <div className="container-fluid my-4">
      <div className="container">
        <h5 className="">Enter Duration</h5>
        <input
          type="number"
          className="form-control my-3"
          value={duration}
          min={2}
          onChange={(e) => setDuration(e.target.value)}
        />
        <h5 className="text-center">Enter Budget </h5>
        <input
          type="range"
          className="form-range my-3"
          min={3000}
          max={100000}
          value={rangeValue}
          id="budgetRange"
          onChange={(e) => setRangeValue(Number(e.target.value))}
        />
        <output htmlFor="range4" id="rangeValue" className="d-block fw-medium">
          {rangeValue}
        </output>
        <div className="row">
          {destinationTypes.map((ele, i) => {
            console.log(ele);
            const typeFeedback = feedback[ele.type] || {};
            const totalLikes =
              (typeFeedback.baseLikes || 0) + (typeFeedback.liked ? 1 : 0);
            const totalDislikes =
              (typeFeedback.baseDislikes || 0) +
              (typeFeedback.disliked ? 1 : 0);
            const favKey = `${destination}-${ele.type}`;
            return (
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 py-3" key={i}>
                <div className="card">
                  <img
                    src={`./src/assets/assets1/${destination}_${ele.type
                      .toLowerCase()
                      .replaceAll(" ", "")}.jpg`}
                    className="card-img-top"
                    style={{ height: "300px" }}
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{ele.type}</h5>
                    <p className="card-text">{ele.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => getPackage(ele)}
                    >
                      Get Recommendations
                    </button>
                    <div className="my-3">
                      <button
                        className="btn"
                        onClick={() => toggleFavorite(destination, ele.type)}
                      >
                        <i
                          className={`bi ${
                            favorites.includes(favKey)
                              ? "bi-heart-fill text-danger"
                              : "bi-heart"
                          }`}
                        ></i>
                      </button>
                      <button
                        className="btn"
                        onClick={() => toggleLike(ele.type)}
                        style={{
                          backgroundColor: typeFeedback.liked ? "green" : "",
                          color: typeFeedback.liked ? "white" : "",
                        }}
                      >
                        👍 {totalLikes}
                      </button>
                      <button
                        className="btn"
                        onClick={() => toggleDislike(ele.type)}
                        style={{
                          backgroundColor: typeFeedback.disliked ? "red" : "",
                          color: typeFeedback.disliked ? "white" : "",
                        }}
                      >
                        👎 {totalDislikes}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PackagesData;

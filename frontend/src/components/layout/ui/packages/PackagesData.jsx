import React, { useState, useEffect } from "react";
import { useDestinationData } from "../destinations/DestinationContext";
import packageData from "../../data/packageData";
import { usePackageData } from "./PackageProvider";
import { useFromcityData } from "../destinations/FromcityContext";
import AOS from "aos";

const PackagesData = () => {
  const [favorites, setFavorites] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [rangeValue, setRangeValue] = useState(3000);
  const [duration, setDuration] = useState(2);

  const { Fromcity } = useFromcityData();
  const { destination } = useDestinationData();
  const { setPackage } = usePackageData();

  const data = packageData[destination] || {};
  const { destinationTypes = [] } = data;

  // ✅ Safely load favorites after client-side hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favoritePackageTypes");
      if (stored) setFavorites(JSON.parse(stored));
    }
  }, []);

  // ✅ Initialize AOS animation once
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  // ✅ Initialize feedback data safely (runs only client-side)
  useEffect(() => {
    if (destinationTypes.length && typeof window !== "undefined") {
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

  // ✅ Backend call to get recommendations
  const getPackage = async (ele) => {
    const enrichedPackage = {
      ...ele,
      fromCity: Fromcity,
      toCity: destination,
      budget: rangeValue,
      duration: duration,
    };

    console.log("Sending enrichedPackage:", enrichedPackage);

    setPackage(enrichedPackage);
    if (typeof window !== "undefined") {
      localStorage.setItem("lastPackage", JSON.stringify(enrichedPackage));
    }

    const payload = {
      fromCity: enrichedPackage.fromCity,
      toCity: enrichedPackage.toCity,
      type: enrichedPackage.type,
      duration: enrichedPackage.duration,
      budget: enrichedPackage.budget,
    };

    try {
      const response = await fetch(
        "https://travel-backend-ttt9.onrender.com/api/recommend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from backend:", result);

      const finalPackage = {
        ...enrichedPackage,
        recommendations: Array.isArray(result.data?.recommendations)
          ? result.data.recommendations
          : [],
      };

      setPackage(finalPackage);
      if (typeof window !== "undefined") {
        localStorage.setItem("lastPackage", JSON.stringify(finalPackage));
      }

      alert(`Recommendations received for ${destination}!`);
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data to backend. Check console for details.");
    }
  };

  // ✅ Like / Dislike / Favorite Logic (all SSR-safe)
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
    if (typeof window !== "undefined") {
      localStorage.setItem("destinationFeedback", JSON.stringify(updated));
    }
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
    if (typeof window !== "undefined") {
      localStorage.setItem("destinationFeedback", JSON.stringify(updated));
    }
  };

  const toggleFavorite = (destination, type) => {
    const key = `${destination}_${type}`;
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
  useEffect(() => {
      AOS.init({ duration: 1000, once: true });
      AOS.refresh();
    }, []);
  return (
    <div className="container-fluid my-4">
      <div className="container">
        <h5>Enter Duration</h5>
        <input
          type="number"
          className="form-control my-3"
          value={duration}
          min={2}
          onChange={(e) => setDuration(e.target.value)}
        />
        <h5 className="text-center">Enter Budget</h5>
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
            const imagePath = `/assets1/${destination.replaceAll(" ", "")}_${ele.type
              .toLowerCase()
              .replaceAll(" ", "")}.jpg`;

            const typeFeedback = feedback[ele.type] || {};
            const totalLikes =
              (typeFeedback.baseLikes || 0) + (typeFeedback.liked ? 1 : 0);
            const totalDislikes =
              (typeFeedback.baseDislikes || 0) +
              (typeFeedback.disliked ? 1 : 0);
            const favKey = `${destination}_${ele.type}`;
            
            return (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-4 py-3"
                key={i}
                data-aos="fade-up"
              >
                <div className="card shadow-sm h-100">
                  <img
                    src={imagePath}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }}
                    alt={`${destination} ${ele.type}`}
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

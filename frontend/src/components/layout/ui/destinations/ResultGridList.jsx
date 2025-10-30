// ResultGridList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDestinationData } from "./DestinationContext";
import AOS from "aos";


const ResultGridList = () => {
  const { setDestination } = useDestinationData();
  const getDestination = (title = "Banglore") => {
    setDestination(title);
    localStorage.setItem("lastDestination", title);
  };
  const [isListView, setIsListView] = useState(false);
  const columnClass = isListView
    ? "col-12"
    : "col-12 col-sm-6 col-md-6 col-lg-4";
  const changeView = () => {
    setIsListView((prev) => !prev);
  };
  const cities = [
    {
      image: "./src/assets/agra.jpeg",
      title: "Agra",
      description:
        "Home to the timeless Taj Mahal — a city of Mughal grandeur and architectural marvels.",
    },

    {
      image: "./src/assets/allipee.jpeg",
      title: "Alleppey",
      description:
        "The Venice of the East — glide through serene backwaters, houseboats, and coconut groves in God’s Own Country.",
    },
    {
      image: "./src/assets/andaman.jpeg",
      title: "Andaman",
      description:
        "Tropical heaven with turquoise waters, coral reefs, and exotic beaches — perfect for scuba diving and island hopping.",
    },
    {
      image: "./src/assets/auli.webp",
      title: "Auli",
      description:
        "India’s skiing capital — surrounded by snow peaks and meadows, offering breathtaking Himalayan views and adventure sports.",
    },
    {
      image: "./src/assets/banglore.jpg",
      title: "Bengaluru",
      description:
        "The Garden City — where modern tech meets vibrant nightlife, green parks, and cultural experiences.",
    },
    {
      image: "./src/assets/chennai.jpeg",
      title: "Chennai",
      description:
        "A vibrant coastal city offering classical music, golden beaches, and delicious South Indian flavors — the gateway to Tamil culture.",
    },
    {
      image: "./src/assets/coorg.jpeg",
      title: "Coorg",
      description:
        "The Scotland of India — lush coffee estates, waterfalls, and peaceful landscapes for nature lovers.",
    },
    {
      image: "./src/assets/darjeeling.jpg",
      title: "Darjeeling",
      description:
        "The spiritual heart of India — witness divine rituals on the Ganges and experience centuries of sacred traditions.",
    },
    {
      image: "./src/assets/delhi.jpeg",
      title: "Delhi",
      description:
        "The capital that tells India’s story — a blend of Mughal monuments, bustling markets, and cosmopolitan experiences.",
    },
    {
      image: "./src/assets/Goa.webp",
      title: "Goa",
      description:
        "India’s ultimate beach escape — golden sands, thrilling water sports, lively nightlife, and Portuguese charm await.",
    },
    {
      image: "./src/assets/jaipur.jpeg",
      title: "Jaipur",
      description:
        "The Pink City — explore royal forts, bustling bazaars, and Rajasthan’s regal elegance.",
    },
    {
      image: "./src/assets/jaisalmer.jpeg",
      title: "Jaisalmer",
      description:
        "The Golden City — explore desert dunes, royal havelis, and stunning sandstone forts under the desert sun.",
    },
    {
      image: "./src/assets/kochi.jpeg",
      title: "Kochi",
      description:
        "Where history meets the sea — explore spice markets, backwaters, and a unique fusion of cultures in this coastal gem.",
    },
    {
      image: "./src/assets/kodaikanal.jpeg",
      title: "Kodaikanal",
      description:
        "The Princess of Hill Stations — with misty lakes, pine forests, and romantic viewpoints",
    },
    {
      image: "./src/assets/lehladak.webp",
      title: "Leh-Ladakh",
      description:
        "A land of high passes — rugged beauty, monasteries, and adventure on the world’s most scenic roads.",
    },
    {
      image: "./src/assets/mumbai.jpeg",
      title: "Mumbai",
      description:
        "The City of Dreams — a dazzling mix of seaside charm, nightlife, Bollywood, and cosmopolitan vibes.",
    },
    {
      image: "./src/assets/munaar.jpeg",
      title: "Munnar",
      description:
        "A misty hill station blanketed with tea gardens, waterfalls, and lush greenery — an ideal spot for peace and nature lovers.",
    },
    {
      image: "./src/assets/mysore.jpeg",
      title: "Mysuru",
      description:
        "The City of Palaces — admire royal architecture, vibrant markets, and a rich blend of history and culture.",
    },
    {
      image: "./src/assets/ooty.jpg",
      title: "Ooty",
      description:
        "A charming hill station wrapped in misty hills, lakes, and colonial-era charm — nature at its most peaceful.",
    },
    {
      image: "./src/assets/pondicherry.jpeg",
      title: "Pondicherry",
      description:
        "A slice of French elegance in India — tranquil beaches, colorful streets, and a relaxed seaside charm.",
    },
    {
      image: "./src/assets/ranofkutch.webp",
      title: "Rann of Kutch",
      description:
        "A surreal white desert that glows under moonlight — experience cultural festivals, handicrafts, and desert adventures.",
    },
    {
      image: "./src/assets/rishikesh.jpeg",
      title: "Rishikesh",
      description:
        "The Yoga Capital of the World — an adventure and spiritual retreat along the banks of the Ganges.",
    },
    {
      image: "./src/assets/shimla.jpeg",
      title: "Shimla",
      description:
        "The Queen of Hills — offering colonial charm, cool mountain breezes, and scenic landscapes for a refreshing getaway.",
    },
    {
      image: "./src/assets/varanasi.jpeg",
      title: "Varanasi",
      description:
        "The spiritual capital of India — witness Ganga Aarti, sacred ghats, and centuries of divine tradition.",
    },
  ];

  useEffect(() => {
              AOS.init({
                // Global settings for AOS
                duration: 1000, // values from 0 to 3000, with step 50ms
                once: true,     // whether animation should happen only once - while scrolling down
              });
              AOS.refresh(); // Recalculate positions of elements
            }, []);

  return (
    <div className="container-fluid my-4 text-center"  data-aos="zoom-in">
      <button className="btn btn-success my-3" onClick={changeView}>
        {isListView ? "Switch to Grid View" : "Switch to List View"}
      </button>
      <h3 className="my-3">Select To Destination</h3>
      <div className="row">
        {cities.map((ele, i) => (
          <div className={`${columnClass} my-3`} key={i}>
            <Link
              className="text-decoration-none text-dark"
              to={"/packages"}
              onClick={() => getDestination(ele.title)}
            >
              <div className={`card ${isListView ? "w-50 mx-auto" : ""} h-100`}>
                <img src={ele.image} className="card-img-top h-100" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{ele.title}</h5>
                  <hr />
                  <p className="card-text">{ele.description}</p>
                  <button className="btn btn-primary">
                    See Available Packages
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultGridList;

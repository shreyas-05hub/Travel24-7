import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDestinationData } from "./DestinationContext";
import AOS from "aos";

// ✅ Import all images properly
import agra from "../../../../assets/agra.jpeg";
import alleppey from "../../../../assets/allipee.jpeg";
import andaman from "../../../../assets/andaman.jpeg";
import auli from "../../../../assets/auli.webp";
import bangalore from "../../../../assets/banglore.jpg";
import chennai from "../../../../assets/chennai.jpeg";
import coorg from "../../../../assets/coorg.jpeg";
import darjeeling from "../../../../assets/darjeeling.jpg";
import delhi from "../../../../assets/delhi.jpeg";
import goa from "../../../../assets/Goa.webp";
import jaipur from "../../../../assets/jaipur.jpeg";
import jaisalmer from "../../../../assets/jaisalmer.jpeg";
import kochi from "../../../../assets/kochi.jpeg";
import kodaikanal from "../../../../assets/kodaikanal.jpeg";
import leh from "../../../../assets/lehladak.webp";
import mumbai from "../../../../assets/mumbai.jpeg";
import munnar from "../../../../assets/munaar.jpeg";
import mysore from "../../../../assets/mysore.jpeg";
import ooty from "../../../../assets/ooty.jpg";
import pondicherry from "../../../../assets/pondicherry.jpeg";
import rann from "../../../../assets/ranofkutch.webp";
import rishikesh from "../../../../assets/rishikesh.jpeg";
import shimla from "../../../../assets/shimla.jpeg";
import varanasi from "../../../../assets/varanasi.jpeg";

const ResultGridList = () => {
  const { setDestination } = useDestinationData();
  const [isListView, setIsListView] = useState(false);

  const getDestination = (title = "Bengaluru") => {
    setDestination(title);
    localStorage.setItem("lastDestination", title);
  };

  const columnClass = isListView
    ? "col-12"
    : "col-12 col-sm-6 col-md-6 col-lg-4";

  const changeView = () => setIsListView((prev) => !prev);

  // ✅ Cities with imported images
  const cities = [
    { image: agra, title: "Agra", description: "Home to the timeless Taj Mahal — a city of Mughal grandeur and architectural marvels." },
    { image: alleppey, title: "Alleppey", description: "The Venice of the East — glide through serene backwaters, houseboats, and coconut groves in God’s Own Country." },
    { image: andaman, title: "Andaman", description: "Tropical heaven with turquoise waters, coral reefs, and exotic beaches — perfect for scuba diving and island hopping." },
    { image: auli, title: "Auli", description: "India’s skiing capital — surrounded by snow peaks and meadows, offering breathtaking Himalayan views and adventure sports." },
    { image: bangalore, title: "Bengaluru", description: "The Garden City — where modern tech meets vibrant nightlife, green parks, and cultural experiences." },
    { image: chennai, title: "Chennai", description: "A vibrant coastal city offering classical music, golden beaches, and delicious South Indian flavors — the gateway to Tamil culture." },
    { image: coorg, title: "Coorg", description: "The Scotland of India — lush coffee estates, waterfalls, and peaceful landscapes for nature lovers." },
    { image: darjeeling, title: "Darjeeling", description: "The spiritual heart of India — witness divine rituals on the Ganges and experience centuries of sacred traditions." },
    { image: delhi, title: "Delhi", description: "The capital that tells India’s story — a blend of Mughal monuments, bustling markets, and cosmopolitan experiences." },
    { image: goa, title: "Goa", description: "India’s ultimate beach escape — golden sands, thrilling water sports, lively nightlife, and Portuguese charm await." },
    { image: jaipur, title: "Jaipur", description: "The Pink City — explore royal forts, bustling bazaars, and Rajasthan’s regal elegance." },
    { image: jaisalmer, title: "Jaisalmer", description: "The Golden City — explore desert dunes, royal havelis, and stunning sandstone forts under the desert sun." },
    { image: kochi, title: "Kochi", description: "Where history meets the sea — explore spice markets, backwaters, and a unique fusion of cultures in this coastal gem." },
    { image: kodaikanal, title: "Kodaikanal", description: "The Princess of Hill Stations — with misty lakes, pine forests, and romantic viewpoints." },
    { image: leh, title: "Leh-Ladakh", description: "A land of high passes — rugged beauty, monasteries, and adventure on the world’s most scenic roads." },
    { image: mumbai, title: "Mumbai", description: "The City of Dreams — a dazzling mix of seaside charm, nightlife, Bollywood, and cosmopolitan vibes." },
    { image: munnar, title: "Munnar", description: "A misty hill station blanketed with tea gardens, waterfalls, and lush greenery — an ideal spot for peace and nature lovers." },
    { image: mysore, title: "Mysuru", description: "The City of Palaces — admire royal architecture, vibrant markets, and a rich blend of history and culture." },
    { image: ooty, title: "Ooty", description: "A charming hill station wrapped in misty hills, lakes, and colonial-era charm — nature at its most peaceful." },
    { image: pondicherry, title: "Pondicherry", description: "A slice of French elegance in India — tranquil beaches, colorful streets, and a relaxed seaside charm." },
    { image: rann, title: "Rann of Kutch", description: "A surreal white desert that glows under moonlight — experience cultural festivals, handicrafts, and desert adventures." },
    { image: rishikesh, title: "Rishikesh", description: "The Yoga Capital of the World — an adventure and spiritual retreat along the banks of the Ganges." },
    { image: shimla, title: "Shimla", description: "The Queen of Hills — offering colonial charm, cool mountain breezes, and scenic landscapes for a refreshing getaway." },
    { image: varanasi, title: "Varanasi", description: "The spiritual capital of India — witness Ganga Aarti, sacred ghats, and centuries of divine tradition." },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  return (
    <div className="container-fluid my-4 text-center" data-aos="zoom-in">
      <button className="btn btn-success my-3" onClick={changeView}>
        {isListView ? "Switch to Grid View" : "Switch to List View"}
      </button>

      <h3 className="my-3">Select Your Destination</h3>
      <div className="row">
        {cities.map((ele, i) => (
          <div className={`${columnClass} my-3`} key={i}>
            <Link
              className="text-decoration-none text-dark"
              to={"/packages"}
              onClick={() => getDestination(ele.title)}
            >
              <div className={`card ${isListView ? "w-50 mx-auto" : ""} h-100`}>
                <img
                  src={ele.image}
                  className="card-img-top h-100"
                  alt={ele.title}
                />
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

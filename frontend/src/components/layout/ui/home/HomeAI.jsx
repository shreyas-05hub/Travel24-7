import React from "react";
import Marquee from "react-fast-marquee";

const HomeAI = () => {
  return (
    <div className="m-0 py-5">
      <h1 className="text-center py-5">Recomendations</h1>
      <Marquee>
        <div className="mx-5">
          <img
            src="./src/assets/tawang.jpeg"
            alt=""
            className="img-fluid rounded-circle"
            style={{ height: "200px", width: "200px" }}
          />
          <p className="text-center fw-bold fs-5">tawang</p>
        </div>
        <div className="mx-5">
          <img
            src="./src/assets/rishikesh.jpeg"
            alt=""
            className="img-fluid rounded-circle"
            style={{ height: "200px", width: "200px" }}
          />
          <p className="text-center fw-bold fs-5">Rishikesh</p>
        </div>
        <div className="mx-5">
          <img
            src="./src/assets/andaman.jpeg"
            alt=""
            className="img-fluid rounded-circle"
            style={{ height: "200px", width: "200px" }}
          />
          <p className="text-center fw-bold fs-5">A&D Islands</p>
        </div>
        <div className="mx-5">
          <img
            src="./src/assets/Amritsar.jpg"
            alt=""
            className="img-fluid rounded-circle"
            style={{ height: "200px", width: "200px" }}
          />
          <p className="text-center fw-bold fs-5">Amritsar</p>
        </div>
        <div className="mx-5">
          <img
            src="./src/assets/allipee.jpeg"
            alt=""
            className="img-fluid rounded-circle"
            style={{ height: "200px", width: "200px" }}
          />
          <p className="text-center fw-bold fs-5">Alappuzha</p>
        </div>
        <div className="mx-5">
          <img
            src="./src/assets/srinagar.jpeg"
            alt=""
            className="img-fluid rounded-circle"
            style={{ height: "200px", width: "200px" }}
          />
          <p className="text-center fw-bold fs-5">Srinagar</p>
        </div>
      </Marquee>
    </div>
  );
};

export default HomeAI;

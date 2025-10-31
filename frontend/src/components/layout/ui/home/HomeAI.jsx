// import React, { useEffect } from "react";
// import Marquee from "react-fast-marquee";
// import AOS from "aos";

// const HomeAI = () => {
//   useEffect(() => {
//     AOS.init({
//       // Global settings for AOS
//       duration: 1000, // values from 0 to 3000, with step 50ms
//       once: true, // whether animation should happen only once - while scrolling down
//     });
//     AOS.refresh(); // Recalculate positions of elements
//   }, []);
//   return (
//     <div className="m-0 py-5" data-aos="fade-up">
//       <h1 className="text-center py-5">Recomendations</h1>
//       <Marquee>
//         <div className="mx-5">
//           <img
//             src="./src/assets/tawang.jpeg"
//             alt=""
//             className="img-fluid rounded-circle"
//             style={{ height: "200px", width: "200px" }}
//           />
//           <p className="text-center fw-bold fs-5">tawang</p>
//         </div>
//         <div className="mx-5">
//           <img
//             src="./src/assets/rishikesh.jpeg"
//             alt=""
//             className="img-fluid rounded-circle"
//             style={{ height: "200px", width: "200px" }}
//           />
//           <p className="text-center fw-bold fs-5">Rishikesh</p>
//         </div>
//         <div className="mx-5">
//           <img
//             src="./src/assets/andaman.jpeg"
//             alt=""
//             className="img-fluid rounded-circle"
//             style={{ height: "200px", width: "200px" }}
//           />
//           <p className="text-center fw-bold fs-5">A&D Islands</p>
//         </div>
//         <div className="mx-5">
//           <img
//             src="./src/assets/Amritsar.jpg"
//             alt=""
//             className="img-fluid rounded-circle"
//             style={{ height: "200px", width: "200px" }}
//           />
//           <p className="text-center fw-bold fs-5">Amritsar</p>
//         </div>
//         <div className="mx-5">
//           <img
//             src="./src/assets/allipee.jpeg"
//             alt=""
//             className="img-fluid rounded-circle"
//             style={{ height: "200px", width: "200px" }}
//           />
//           <p className="text-center fw-bold fs-5">Alappuzha</p>
//         </div>
//         <div className="mx-5">
//           <img
//             src="./src/assets/srinagar.jpeg"
//             alt=""
//             className="img-fluid rounded-circle"
//             style={{ height: "200px", width: "200px" }}
//           />
//           <p className="text-center fw-bold fs-5">Srinagar</p>
//         </div>
//       </Marquee>
//     </div>
//   );
// };

// export default HomeAI;

import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import AOS from "aos";

// ✅ Import images properly
import tawang from "../../../../assets/tawang.jpeg";
import rishikesh from "../../../../assets/rishikesh.jpeg";
import andaman from "../../../../assets/andaman.jpeg";
import amritsar from "../../../../assets/Amritsar.jpg";
import alleppey from "../../../../assets/allipee.jpeg";
import srinagar from "../../../../assets/srinagar.jpeg";

const HomeAI = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  const destinations = [
    { image: tawang, title: "Tawang" },
    { image: rishikesh, title: "Rishikesh" },
    { image: andaman, title: "A&D Islands" },
    { image: amritsar, title: "Amritsar" },
    { image: alleppey, title: "Alappuzha" },
    { image: srinagar, title: "Srinagar" },
  ];

  return (
    <div className="m-0 py-5" data-aos="fade-up">
      <h1 className="text-center py-5">Recommendations</h1>
      <Marquee pauseOnHover={true} speed={60}>
        {destinations.map((place, index) => (
          <div className="mx-5 text-center" key={index}>
            <img
              src={place.image}
              alt={place.title}
              className="img-fluid rounded-circle"
              style={{
                height: "200px",
                width: "200px",
                objectFit: "cover",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              }}
            />
            <p className="fw-bold fs-5 mt-3">{place.title}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default HomeAI;

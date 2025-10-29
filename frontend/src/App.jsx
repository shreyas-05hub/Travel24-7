import React, { Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
// import Home from './pages/Home';
// import Packages from './pages/Packages';
// import Recommendations from './pages/Recommendations';
// import Destinations from './pages/Destinations';
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import Login from './pages/Login';
import DestinationProvider from "./components/layout/ui/destinations/DestinationContext";
import PackageProvider from "./components/layout/ui/packages/PackageProvider";
// import PackageDetails from './components/layout/ui/packages/PackageDetails';
import FromcityProvider from "./components/layout/ui/destinations/FromcityContext";

import "./app.css";

let Home = React.lazy(() => import("./pages/Home"));
let Packages = React.lazy(() => import("./pages/Packages"));
let Recommendations = React.lazy(() => import("./pages/Recommendations"));
let Destinations = React.lazy(() => import("./pages/Destinations"));
let Login = React.lazy(() => import("./pages/Login"));
let PackageDetails = React.lazy(() =>
  import("./components/layout/ui/packages/PackageDetails")
);
let Favourites = React.lazy(() => import("./pages/Favourites"));

const App = () => {
  return (
    <>
      <Navbar />
      <FromcityProvider>
      <PackageProvider>
        <DestinationProvider>
          <Suspense fallback={<p className="loader"></p>}>
            <Routes>
              <Route path="/" element={<Navigate to={"/home"} />} />
              <Route path={"/home"} element={<Home />} />
              <Route path={"/packages"} element={<Packages />} />
              <Route path="/:packageID" element={<PackageDetails />} />
              <Route path={"/recommendation"} element={<Recommendations />} />
              <Route path={"/Destinations"} element={<Destinations />} />
              <Route path={"/favourites"} element={<Favourites />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </Suspense>
        </DestinationProvider>
      </PackageProvider>
      </FromcityProvider>
      <Footer />
    </>
  );
};

export default App;

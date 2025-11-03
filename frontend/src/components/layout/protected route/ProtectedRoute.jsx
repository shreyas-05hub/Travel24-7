// src/components/layout/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import useTravelCost from "../context/TravelContext";
import Login from "../../../pages/Login";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useTravelCost();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // ✅ Detect unknown user trying to access protected route
  useEffect(() => {
    if (!user && location.pathname !== "/home") {
      navigate("/home", { replace: true }); // redirect to home
      setShowLoginPopup(true); // show popup
    }
  }, [user, location, navigate]);

  // ✅ If user logged in, allow route
  if (user) {
    return children;
  }

  // ✅ If user not logged in and is on home page, render home normally
  return (
    <>
      {children}

      {/* ✅ Login popup overlay */}
      {showLoginPopup && (
        <div
          onClick={(e) => {
            // Close popup when clicking outside of modal box
            if (e.target.classList.contains("login-overlay")) {
              setShowLoginPopup(false);
            }
          }}
          className="login-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            animation: "fadeIn 0.4s ease",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              width: "420px",
              boxShadow: "0 4px 25px rgba(0,0,0,0.2)",
              padding: "30px 40px",
              position: "relative",
              animation: "popIn 0.3s ease",
            }}
          >
            <Login onSuccess={() => setShowLoginPopup(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;

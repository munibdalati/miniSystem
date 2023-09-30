import React from "react";
import NavComponent from "../components/Shared/NavComponent";
import Body from "../components/LandingPage/Body";
import JobOpening from "../components/LandingPage/JobOpening";
import Footer from "../components/Shared/Footer";

function LandingPage() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={containerStyle}>
      <NavComponent />
      <div style={contentStyle}>
        <Body />
        <JobOpening />
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;

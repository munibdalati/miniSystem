import React from "react";
import NavComponent from "../components/Shared/NavComponent";
import Footer from "../components/Shared/Footer";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


function Confirmation() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    gap: 30
  };

  return (
    <div style={containerStyle}>
      <NavComponent />
      <div style={contentStyle}>
        <h2>Your Job Application have been saved successfully</h2>
        <Link to={"/"}>
          <Button className="Careerly__btn">Return to Home Page</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Confirmation;

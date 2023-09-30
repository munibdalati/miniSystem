import React from "react";
import NavComponent from "../../components/Shared/NavComponent";
import Footer from "../../components/Shared/Footer";
import WelcomingAdmin from "../../components/AdminPage/WelcomingAdmin";
import "./AdminPanel.css"

function AdminPanel() {
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
        <WelcomingAdmin />
      </div>
      <Footer />
    </div>
  );
}

export default AdminPanel;

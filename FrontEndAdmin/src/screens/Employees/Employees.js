import React from "react";
import NavComponent from "../../components/Shared/NavComponent";
import Footer from "../../components/Shared/Footer";
import { Container } from "react-bootstrap";

import EmployeesTable from '../../components/Employees/EmployeesTable'

function Applications() {
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
      <Container style={contentStyle}>
      <h1 style={{textAlign:"center"}}>Welcome to Employees Page</h1>
        <EmployeesTable />
      </Container>
      <Footer />
    </div>
  );
}

export default Applications;

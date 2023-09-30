import React from "react";
import NavComponent from "../../components/Shared/NavComponent";
import Footer from "../../components/Shared/Footer";
import { Container } from "react-bootstrap";

import TasksTable from "../../components/Tasks/TasksTable";

function Tasks() {
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
        <h1 style={{ textAlign: "center" }}>Welcome to Tasks Page</h1>
        <TasksTable />
      </Container>
      <Footer />
    </div>
  );
}

export default Tasks;

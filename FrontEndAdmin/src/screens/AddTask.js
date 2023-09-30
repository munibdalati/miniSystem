import React from "react";
import NavComponent from "../components/Shared/NavComponent";
import Footer from "../components/Shared/Footer";
import TaskForm from "../components/Tasks/TaskForm";

function AddTask() {
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
        <TaskForm />
      </div>
      <Footer />
    </div>
  );
}

export default AddTask;

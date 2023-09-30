import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import employeeImg from "../../assets/employee.jpg";
import taskImg from "../../assets/task.jpg";

function WelcomingAdmin() {
  return (
    <Container className="centeredContentStyle">
      <h1>Welcome to Admin Dashboard</h1>
      <div className="btnsContainerStyle">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={employeeImg} />
          <Card.Body>
            <Card.Title>Employees</Card.Title>
            <Card.Text>Here you can find employees information</Card.Text>
            <Link to="/Employees">
              <Button className="login-btn">Open</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={taskImg} />
          <Card.Body>
            <Card.Title>Tasks</Card.Title>
            <Card.Text>Here you can find employees tasks details</Card.Text>
            <Link to="/Tasks">
              <Button className="login-btn">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default WelcomingAdmin;

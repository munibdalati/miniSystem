import React, { useState, useEffect } from "react";
import "../../style/Button.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";

function formatDeadline(deadline) {
  const date = new Date(deadline);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function JobOpening() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make the API call within a useEffect hook
    axios
      .get("http://localhost:8000/api/vacancy/allVacancies")
      .then((res) => {
        setData(res.data.data.vacancies);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []); // The empty array as the second argument makes it run only once

  return (
    <Container style={{ paddingTop: 50 }}>
      <h2 className="mb-5">Job Openings</h2>
      {data.length === 0 ? (
        <h4 className="text-center my-5">No job openings available at the moment</h4>
      ) : (
        <Row className="align-items-center justify-content-center">
          {data.map((job, index) => (
            <Col key={index} xs="12" sm="6" md="4" className="mb-4">
              <Card className="card">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Text>{job.description}</Card.Text>
                  <Card.Text>
                    <strong>Deadline: {formatDeadline(job.deadline)}</strong>
                  </Card.Text>
                  <Link to={`/PersonalInfo/${job.title}`}>
                    <Button className="Careerly__btn">Apply Now</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default JobOpening;

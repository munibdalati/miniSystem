import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../style/AdminPanel.css";

function InfoTable() {
  const tableHeadings = [
    "Vacancy",
    "First Name",
    "Last Name",
    "Gender",
    "Age",
    "Country of Residence",
    "City",
    "Street",
    "Building Number",
    "Email",
    "Mobile Number",
    "Educational Level",
    "Field of Studying",
    "Years of Experience",
    "CV",
    "Notes",
  ];

  const [data, setData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(""); 

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/application/allApplications")
      .then((res) => {
        setData(res.data.data.applications);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []); 

  // Filter the applications based on the selected title
  const filteredApplications = selectedTitle
    ? data.filter((application) => application.title === selectedTitle)
    : data;

  return (
    <Container>
      <Row className="mb-3">
        <Form.Label>Position</Form.Label>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Select
            aria-label="Default select example"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            required
          >
            <option value="">Filter applications via vacancies</option>
            {data.map((application, index) => (
              <option key={index} value={application.title}>
                {application.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Col md="6">
          <Link to="/AddVacancy">
            <Button className="Apply-btn">Add a Job Vacancy</Button>
          </Link>
        </Col>
      </Row>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            {tableHeadings.map((heading, index) => (
              <th style={{ whiteSpace: "nowrap", textAlign:"center" }} key={index}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((application, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.title}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.firstName}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.lastName}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.gender}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.age}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>
                {application.countryOfResidence}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.city}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.street}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>
                {application.buildingNumber}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.email}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>
                {application.mobileNumber}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>
                {application.educationalLevel}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>
                {application.fieldOfStudying}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>
                {application.yearsOfExperience}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.cv}</td>
              <td style={{ whiteSpace: "nowrap", textAlign:"center" }}>{application.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default InfoTable;

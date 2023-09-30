import React from "react";
import "../../style/Body.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import interview from "../../assets/interview.svg";

function Body() {
  const scrollToBottom = () => {
    const windowHeight = window.innerHeight
    window.scrollTo(0, windowHeight)
  }
  return (
    <Container>
      <Row className="align-items-center">
        <Col className="first__col d-flex flex-column align-items-center text-center pb-5">
          <h1>
            Find A Job Through Our Platform{" "}
            <strong style={{ color: "#ff8947" }}>Careerly</strong>
          </h1>
          <Button className="btn-orange mt-4" onClick={scrollToBottom}>View Openings</Button>
        </Col>
        <Col>
          <img src={interview} alt="Interview" />
        </Col>
      </Row>
    </Container>
  );
}

export default Body;

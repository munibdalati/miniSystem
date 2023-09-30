import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import "../../style/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  // Get the current year using JavaScript
  const currentYear = new Date().getFullYear();
  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <Container className="footer">
      <Row
        className="align-items-center text-center justify-content-center footer__row "
        style={{ paddingBottom: 50, paddingTop: 30 }}
      >
        <Col className="">
          <Link style={linkStyle} to="/">

            <p className="footer__careerly">Careerly</p>
          </Link>
        </Col>
        <Col className="footer__copyright mb-4">
          Copyright {currentYear} Powered by Munib Al Dalati
        </Col>
        <Col className="d-flex justify-content-center gap-3">
          <i
            className="fa-brands fa-facebook-f"
            style={{ color: "#ff8947", cursor: "pointer" }}
          ></i>
          <i
            className="fa-brands fa-twitter"
            style={{ color: "#ff8947", cursor: "pointer" }}
          ></i>
          <i
            className="fa-brands fa-linkedin-in"
            style={{ color: "#ff8947", cursor: "pointer" }}
          ></i>
          <i
            class="fa-solid fa-envelope"
            style={{ color: "#ff8947", cursor: "pointer" }}
          ></i>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;

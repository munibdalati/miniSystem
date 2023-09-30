import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavComponent() {
  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Link style={linkStyle} to="/">
          <Navbar.Brand
            href="#"
            style={{ fontSize: 30, fontWeight: "bold", color: "#ff8947" }}
          >
            Careerly
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>About us</Nav.Link>
            <Nav.Link>Blog</Nav.Link>
            <Nav.Link>Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;

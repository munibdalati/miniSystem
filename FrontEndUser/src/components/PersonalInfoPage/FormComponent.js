import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "../../style/Button.css";
import "../../style/FormComponent.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function FormComponent() {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [educationalLevel, setEducationalLevel] = useState("");
  const [fieldOfStudying, setFieldOfStudying] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [cv, setCv] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { title } = useParams();

  const selectCountry = (val) => {
    setCountryOfResidence(val);
  };

  const selectRegion = (val) => {
    setCity(val);
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/application/addApplication",
        {
          title,
          firstName,
          lastName,
          gender,
          age,
          countryOfResidence,
          city,
          street,
          buildingNumber,
          email,
          mobileNumber,
          educationalLevel,
          fieldOfStudying,
          yearsOfExperience,
          cv,
          notes,
        },
        config
      );

      console.log(response.data.token);
      console.log(response.data);

      navigate("/Confirmation");
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        console.log(err.response.data); // This will print the error response from the server
        setError(err.response.data.error);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Request made, but no response received:", err.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", err.message);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/Confirmation");
    }
  }, []);

  return (
    <Container style={{ paddingTop: 50 }}>
      <h4 className="mb-5">Application for {title}</h4>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* First Row */}
        <Row>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom01"
            className="mb-3"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Full Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              isInvalid={formSubmitted && !firstName}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your first name.
            </Form.Control.Feedback>

            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom02"
            className="mb-3"
          >
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              isInvalid={formSubmitted && !lastName}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your last name.
            </Form.Control.Feedback>

            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Second Row */}
        <Row>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom03"
            className="mb-3"
          >
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Default select example"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              isInvalid={formSubmitted && !gender}
            >
              <option value="">Open this select menu</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select your gender
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom04"
            className="mb-3"
          >
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter your age"
              min="18"
              max="100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              isInvalid={formSubmitted && !age}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a number between 18 and 100
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Third Row */}
        <Row>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom01"
            className="mb-3"
          >
            <Form.Label>Country of Residence</Form.Label>
            <CountryDropdown
              className="form-control"
              value={countryOfResidence}
              onChange={(val) => selectCountry(val)}
              required
              isInvalid={formSubmitted && !countryOfResidence}
            />
            <Form.Control.Feedback type="invalid">
              Please select your country of residence.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom02"
            className="mb-3"
          >
            <Form.Label>City</Form.Label>
            <RegionDropdown
              className="form-control"
              country={countryOfResidence}
              value={city}
              onChange={(val) => selectRegion(val)}
              required
              isInvalid={formSubmitted && !city}
            />
            <Form.Control.Feedback type="invalid">
              Please select your city.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Fourth Row */}
        <Row>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom05"
            className="mb-3"
          >
            <Form.Label>Street</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter your street name"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              isInvalid={formSubmitted && !street}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your street.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom06"
            className="mb-3"
          >
            <Form.Label>Building Number</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter your building number"
              value={buildingNumber}
              onChange={(e) => setBuildingNumber(e.target.value)}
              isInvalid={formSubmitted && !buildingNumber}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your building number
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Fifth Row */}
        <Row>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom07"
            className="mb-3"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={formSubmitted && !email}
            />
            <Form.Control.Feedback type="invalid">
              Please write a valid email address
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom08"
            className="mb-3"
          >
            <Form.Label>Mobile Number</Form.Label>
            <PhoneInput
              required
              placeholder="Enter your Mobile number ex:0788776655"
              value={mobileNumber}
              onChange={(value) => setMobileNumber(value)}
              isInvalid={formSubmitted && !mobileNumber}
              className="custom-phone-input" // Apply the CSS class here
            />
            <Form.Control.Feedback type="invalid">
              Please write a valid mobile Number
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Sixth Row */}
        <Row>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom09"
            className="mb-3"
          >
            <Form.Label>Educational Level</Form.Label>
            <Form.Select
              aria-label="Default select example"
              required
              value={educationalLevel}
              onChange={(e) => setEducationalLevel(e.target.value)}
              isInvalid={formSubmitted && !educationalLevel}
            >
              <option value="">Open this select menu</option>
              <option value="High School">High School</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select your educational Level
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom10"
            className="mb-3"
          >
            <Form.Label>Field of Studying</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter the field of studying in your school or university"
              value={fieldOfStudying}
              onChange={(e) => setFieldOfStudying(e.target.value)}
              isInvalid={formSubmitted && !fieldOfStudying}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your field of studying in your school or university
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Seventh Row */}
        <Row>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom11"
            className="mb-3"
          >
            <Form.Label>Years of Experience</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="How many years of experience do you have"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              isInvalid={formSubmitted && !yearsOfExperience}
            />
            <Form.Control.Feedback type="invalid">
              Please write the number of your years of experience
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom12"
            className="mb-3"
          >
            <Form.Label>Upload your CV</Form.Label>
            <Form.Control
              type="file"
              required
              value={cv}
              // ref={fileInput}
              onChange={(e) => setCv(e.target.value)}
              isInvalid={formSubmitted && !cv}
            />
            <Form.Control.Feedback type="invalid">
              Please upload your CV
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Last Row */}
        <Row>
          <Form.Group
            as={Col}
            md="12"
            controlId="validationCustom13"
            className="mb-3"
          >
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add any other information you want us to know about you"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Form.Control.Feedback>Optional Field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit" className="Careerly__btn">
          Submit form
        </Button>
      </Form>
    </Container>
  );
}

export default FormComponent;

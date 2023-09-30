import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "./ConfirmWindow.css";

function EmployeesTable() {
  const tableHeadings = [
    "First Name",
    "Last Name",
    "Email",
    "Birthday",
    "Mobile Number",
    "National ID",
    "nationality",
    "Marital Status",
    "Personal Photo",
    "Start Date",
    "Department",
    "Actions",
  ];

  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false); // State variable for showing/hiding the confirmation alert
  const [deleteCandidateId, setDeleteCandidateId] = useState(null); // Track the candidate ID to delete
  const [deleteCandidateTitle, setDeleteCandidateTitle] = useState(""); // Track the candidate title to delete

  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/employee/search/${searchKey}`
      );
      // const filteredEmployees = data.filter((employee) =>
      //   employee.firstName.toLowerCase().includes(searchKey.toLowerCase())
      // );
      setSearchResults(searchKey)
      // Update the search results state with the filtered employees
      console.log(searchKey);

    } catch (error) {
      console.log("Failed to get products", error);
    }
  };

  // useEffect to get all the Applications
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/employee/getAllEmployees")
      .then((res) => {
        setData(res.data.data.employees);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // delete Applciation function
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(
        "http://localhost:8000/api/employee/deleteEmployee/" + id,
        {
          data: { employee: id },
        }
      );
      window.location.reload();
      console.log("deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteCandidateId(null); // Reset the candidate ID
      setShowAlert(false); // Hide the confirmation alert
    }
  };

  // Function to format date and time
  const formatDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const day = dateObj.getUTCDate().toString().padStart(2, "0");
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getUTCFullYear();
    return ` ${day}/${month}/${year}`;
  };
  return (
    <Container>
      {data.length === 0 ? (
        <h4 className="text-center my-5">
          No Employees are available at the moment
        </h4>
      ) : (
        <div>
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />
          <button onClick={handleSearch}>search</button>

          <div style={{ whiteSpace: "nowrap", textAlign: "center" }}></div>

          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                {tableHeadings.map((heading, index) => (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={index}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {searchKey.length !== 0
                ? searchResults
                : data.map((employee, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {employee.firstName}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {employee.lastName}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {employee.email}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {formatDateTime(employee.birthday)}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {employee.mobileNumber}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {employee.nationalID}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {employee.nationality}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {employee.matiralStatus}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        <img
                          src={employee.personalPhoto}
                          alt={`Personal Photo of ${employee.firstName} ${employee.lastName}`}
                          width="100"
                          height="100"
                        />
                      </td>

                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {formatDateTime(employee.startDate)}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        {employee.department}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        <i
                          class="fa-solid fa-trash"
                          style={{ color: "#FF0000", cursor: "pointer" }}
                          onClick={() => {
                            setDeleteCandidateId(employee._id); // Set the candidate ID to delete
                            setShowAlert(true);
                            setDeleteCandidateTitle(
                              employee.firstName + " " + employee.lastName
                            );
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
          {/* Confirmation Alert */}
          {showAlert && (
            <div className="confirmation-alert">
              <p>
                Are you sure you want to delete{" "}
                <strong>{deleteCandidateTitle}</strong> Profile?
              </p>
              <button
                className="confirm-button"
                onClick={() => deleteEmployee(deleteCandidateId)}
              >
                Confirm
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setDeleteCandidateId(null); // Reset the candidate ID
                  setShowAlert(false); // Hide the confirmation alert
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default EmployeesTable;

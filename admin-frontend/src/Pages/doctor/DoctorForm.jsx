import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Card, Toast, ToastContainer } from "react-bootstrap";
import "./DoctorForm.css";

const DoctorForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [departmentId, setDepartmentId] = useState(""); // Renamed to departmentId
  const [departments, setDepartments] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState(""); // "success" or "danger"
  const [showToast, setShowToast] = useState(false);

  // Fetch the list of departments
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/departments`)
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const doctorData = { name, specialization, departmentId }; // Updated to use departmentId
    console.log(doctorData);

    axios
      .post(`${process.env.REACT_APP_API_URL}/doctors`, doctorData)
      .then((response) => {
        setToastVariant("success");
        setToastMessage("Doctor added successfully!");
        setShowToast(true);
        onAdd(); // Notify parent to refresh the doctor list
        // Clear form fields
        setName("");
        setSpecialization("");
        setDepartmentId(""); // Clear departmentId
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
        setToastVariant("danger");
        setToastMessage(
          error.response?.data?.message || "Error adding doctor."
        );
        setShowToast(true);
      });
  };

  return (
    <Card className="doctor-form-card mt-4 shadow-sm">
      <Card.Body>
        <Card.Title className="text-center mb-4">Add Doctor</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="doctorName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter doctor's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="doctorSpecialization" className="mb-3">
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="doctorDepartment" className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              value={departmentId} // Updated to use departmentId
              onChange={(e) => setDepartmentId(e.target.value)} // Updated to use departmentId
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Add Doctor
          </Button>
        </Form>
      </Card.Body>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body className={toastVariant === "danger" ? "text-white" : ""}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  );
};

export default DoctorForm;

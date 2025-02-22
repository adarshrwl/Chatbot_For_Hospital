import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { Form, Button, Card, Toast, ToastContainer } from "react-bootstrap";
import "./DoctorForm.css";

const DoctorForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [timings, setTimings] = useState(""); // New field
  const [consultationFee, setConsultationFee] = useState(""); // New field
  const [contact, setContact] = useState(""); // New field
  const [experience, setExperience] = useState(""); // New field
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [showToast, setShowToast] = useState(false);

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

    const doctorData = {
      name,
      specialization,
      departmentId,
      timings,
      consultationFee,
      contact,
      experience,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/doctors`, doctorData)
      .then((response) => {
        setToastVariant("success");
        setToastMessage("Doctor added successfully!");
        setShowToast(true);
        onAdd();
        setName("");
        setSpecialization("");
        setDepartmentId("");
        setTimings("");
        setConsultationFee("");
        setContact("");
        setExperience("");
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
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
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
          <Form.Group controlId="doctorTimings" className="mb-3">
            <Form.Label>Available Timings</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., 9:00 AM - 5:00 PM"
              value={timings}
              onChange={(e) => setTimings(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="consultationFee" className="mb-3">
            <Form.Label>Consultation Fee</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter consultation fee"
              value={consultationFee}
              onChange={(e) => setConsultationFee(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="contactInfo" className="mb-3">
            <Form.Label>Contact Information</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact number or email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="experience" className="mb-3">
            <Form.Label>Experience (Years)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter years of experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
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

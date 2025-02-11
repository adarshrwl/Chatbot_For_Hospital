import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Toast, ToastContainer } from "react-bootstrap";

const DepartmentForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState(""); // "success" or "danger"
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const departmentData = { name, location, contact, description };

    axios
      .post(`${process.env.REACT_APP_API_URL}/departments`, departmentData)
      .then((response) => {
        setToastVariant("success");
        setToastMessage("Department added successfully!");
        setShowToast(true);
        onAdd(response.data); // Notify parent component
        // Clear form fields
        setName("");
        setLocation("");
        setContact("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error adding department:", error);
        setToastVariant("danger");
        setToastMessage("Error adding department.");
        setShowToast(true);
      });
  };

  return (
    <Card className="department-form-card mt-4 shadow-sm">
      <Card.Body>
        <Card.Title className="text-center mb-4">Add Department</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="departmentName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="departmentLocation" className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="departmentContact" className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact info"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="departmentDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Add Department
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

export default DepartmentForm;

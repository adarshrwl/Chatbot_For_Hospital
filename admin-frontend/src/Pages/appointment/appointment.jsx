import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button, Modal } from "react-bootstrap";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    doctor: "",
    status: "scheduled",
  });
  const [doctors, setDoctors] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch all appointments
  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentTime = new Date(`${formData.date}T${formData.time}`);
      const appointmentData = {
        patientName: formData.patientName,
        doctor: formData.doctor,
        appointmentTime,
        status: formData.status,
      };

      if (editMode) {
        // Update appointment
        await axios.put(`${API_URL}/appointments/${appointmentId}`, appointmentData);
      } else {
        // Create new appointment
        await axios.post(`${API_URL}/appointments`, appointmentData);
      }
      fetchAppointments();
      setShowModal(false);
      resetForm();
      setEditMode(false);
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  const handleEdit = (appointment) => {
    const date = new Date(appointment.appointmentTime).toISOString().split("T")[0];
    const time = new Date(appointment.appointmentTime).toISOString().split("T")[1].slice(0, 5);
    setFormData({
      patientName: appointment.patientName,
      date,
      time,
      doctor: appointment.doctor._id,
      status: appointment.status,
    });
    setAppointmentId(appointment._id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetForm();
    setEditMode(false);
  };

  const resetForm = () => {
    setFormData({
      patientName: "",
      date: "",
      time: "",
      doctor: "",
      status: "scheduled",
    });
  };

  return (
    <div className="appointments-container">
      <h2 className="text-center my-4">Appointments</h2>
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="mb-4"
      >
        Add Appointment
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.doctor.name}</td>
              <td>{new Date(appointment.appointmentTime).toLocaleDateString()}</td>
              <td>{new Date(appointment.appointmentTime).toLocaleTimeString()}</td>
              <td>{appointment.status}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(appointment)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(appointment._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Appointment */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Edit Appointment" : "Add Appointment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPatientName" className="mb-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTime" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDoctor" className="mb-3">
              <Form.Label>Doctor</Form.Label>
              <Form.Select
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {editMode ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Appointments;

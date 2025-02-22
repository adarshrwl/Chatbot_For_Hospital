import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "../../utils/axiosInstance";

import "./Dashboard.css"; // Custom CSS for styling improvements

const Dashboard = () => {
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [appointmentStats, setAppointmentStats] = useState({
    scheduled: 0,
    completed: 0,
    cancelled: 0,
  });

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctors, departments, appointments] = await Promise.all([
          axios.get(`${API_URL}/doctors`),
          axios.get(`${API_URL}/departments`),
          axios.get(`${API_URL}/appointments`),
        ]);

        setTotalDoctors(doctors.data.length);
        setTotalDepartments(departments.data.length);

        const appointmentsData = appointments.data;
        const stats = appointmentsData.reduce(
          (acc, appointment) => {
            acc[appointment.status] += 1;
            return acc;
          },
          { scheduled: 0, completed: 0, cancelled: 0 }
        );

        setTotalAppointments(appointmentsData.length);
        setAppointmentStats(stats);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <Container fluid className="dashboard-container mt-4">
      <Row>
        <Col>
          <h2 className="mb-3 text-center">Hospital Admin Dashboard</h2>
        </Col>
      </Row>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm text-white bg-primary h-100">
            <Card.Body className="text-center">
              <Card.Title>Total Doctors</Card.Title>
              <Card.Text className="display-4">{totalDoctors}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-white bg-info h-100">
            <Card.Body className="text-center">
              <Card.Title>Total Departments</Card.Title>
              <Card.Text className="display-4">{totalDepartments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-white bg-success h-100">
            <Card.Body className="text-center">
              <Card.Title>Total Appointments</Card.Title>
              <Card.Text className="display-4">{totalAppointments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="g-4 mt-4">
        <Col md={4}>
          <Card className="shadow-sm text-white bg-warning h-100">
            <Card.Body className="text-center">
              <Card.Title>Completed Appointments</Card.Title>
              <Card.Text className="display-4">
                {appointmentStats.completed}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-white bg-secondary h-100">
            <Card.Body className="text-center">
              <Card.Title>Scheduled Appointments</Card.Title>
              <Card.Text className="display-4">
                {appointmentStats.scheduled}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-white bg-danger h-100">
            <Card.Body className="text-center">
              <Card.Title>Cancelled Appointments</Card.Title>
              <Card.Text className="display-4">
                {appointmentStats.cancelled}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

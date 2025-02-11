import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard = () => {
  // These values are sample placeholders; you can fetch dynamic data later.
  const totalDoctors = 10;
  const todaysAppointments = 25;
  const activePatients = 50;

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-3">Dashboard</h2>
          <p className="lead">Welcome to the Hospital Admin Dashboard!</p>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
          <Card bg="primary" text="white" className="h-100">
            <Card.Body>
              <Card.Title>Doctors</Card.Title>
              <Card.Text style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {totalDoctors}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">Total Doctors</Card.Footer>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card bg="success" text="white" className="h-100">
            <Card.Body>
              <Card.Title>Appointments</Card.Title>
              <Card.Text style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {todaysAppointments}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              Today's Appointments
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card bg="warning" text="white" className="h-100">
            <Card.Body>
              <Card.Title>Patients</Card.Title>
              <Card.Text style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {activePatients}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">Active Patients</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

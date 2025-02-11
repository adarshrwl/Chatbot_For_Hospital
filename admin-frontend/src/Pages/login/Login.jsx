import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, Button, Card, Toast, ToastContainer } from "react-bootstrap";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext"; // Correct import

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // "success" or "danger"
  const [showToast, setShowToast] = useState(false);

  // Access AuthContext to update global user state
  const { login } = useContext(AuthContext); // Use AuthContext, not AuthProvider

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_URL + "/users/login", {
        username,
        password,
      })
      .then((response) => {
        const { token, user } = response.data;

        // Update the global auth context
        login({ username: user.username, token });

        // Show success message
        setToastVariant("success");
        setToastMessage("Login successful!");
        setShowToast(true);

        // Optionally, redirect the user (e.g., to the dashboard)
        setTimeout(() => {
          window.location.href = "/"; // Or use useNavigate for React Router
        }, 2000);
      })
      .catch((error) => {
        console.error("Login error:", error);
        setToastVariant("danger");
        setToastMessage("Login failed. Please check your credentials.");
        setShowToast(true);
      });
  };

  return (
    <Card className="login-card mt-5 shadow-sm">
      <Card.Body>
        <Card.Title className="text-center mb-4">Login</Card.Title>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="loginUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="loginPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
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

export default Login;
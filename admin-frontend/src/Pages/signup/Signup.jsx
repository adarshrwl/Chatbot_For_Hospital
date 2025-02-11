import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState(''); // "success" or "danger"
  const [showToast, setShowToast] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setToastVariant('danger');
      setToastMessage('Passwords do not match.');
      setShowToast(true);
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/register`, { username, password })
      .then((response) => {
        setToastVariant('success');
        setToastMessage('Signup successful! You can now login.');
        setShowToast(true);
        // Clear form fields
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        console.error('Signup error:', error);
        setToastVariant('danger');
        setToastMessage('Signup failed. Please try again.');
        setShowToast(true);
      });
  };

  return (
    <div className="signup-page d-flex align-items-center justify-content-center">
      <Card className="signup-card shadow-lg">
        <Card.Body>
          <Card.Title className="text-center mb-4">Sign Up</Card.Title>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="signupUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 btn-signup-custom">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body className={toastVariant === 'danger' ? 'text-white' : ''}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Signup;

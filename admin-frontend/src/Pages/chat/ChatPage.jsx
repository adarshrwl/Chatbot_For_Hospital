// src/pages/chat/ChatPage.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import "./ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm here to help with any questions about our hospital. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        process.env.REACT_APP_CHAT_API_URL || "http://localhost:5000/api/chat",
        { message: userMessage },
        { headers: { "Content-Type": "application/json" } }
      );
      const botReply = response.data.reply;
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "Sorry, there was an error processing your query.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <Container fluid className="chat-page">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={8} lg={6}>
          <Card className="chat-card shadow-sm">
            <Card.Header as="h5">Hospital Chatbot</Card.Header>
            <Card.Body>
              <ListGroup variant="flush" className="chat-messages">
                {messages.map((msg, index) => (
                  <ListGroup.Item
                    key={index}
                    className={
                      msg.sender === "bot" ? "bot-message" : "user-message"
                    }
                  >
                    <strong>{msg.sender === "bot" ? "Bot" : "You"}: </strong>
                    {msg.text}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group controlId="chatInput">
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-2 w-100"
                  disabled={loading || !input.trim()}
                >
                  {loading ? "Sending..." : "Send"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;

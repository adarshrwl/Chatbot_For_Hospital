import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";
import "./ChatPage.css";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm here to help with any questions about our hospital. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoRead, setAutoRead] = useState(true);
  const [lastUserQuery, setLastUserQuery] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Browser does not support Speech Recognition API.");
    }
  }, []);

  const startVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const speakText = (text) => {
    if (autoRead && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleAutoRead = () => {
    setAutoRead((prev) => !prev);
  };

  const sendMessage = async (query) => {
    const userMessage = query || input;
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setLastUserQuery(userMessage);
    if (!query) setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        process.env.REACT_APP_CHAT_API_URL || "http://localhost:5000/api/chat",
        { message: userMessage },
        { headers: { "Content-Type": "application/json" } }
      );
      const botReply = response.data.reply;
      const updatedMessages = [
        ...newMessages,
        { sender: "bot", text: botReply },
      ];
      setMessages(updatedMessages);
      speakText(botReply);
    } catch (error) {
      console.error("Error sending message:", error);
      const updatedMessages = [
        ...newMessages,
        {
          sender: "bot",
          text: "Sorry, there was an error processing your query.",
        },
      ];
      setMessages(updatedMessages);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleResend = () => {
    if (lastUserQuery) {
      sendMessage(lastUserQuery);
    }
  };

  return (
    <Container fluid className="chat-page">
      <Card className="chat-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Hospital Chatbot</span>
          <div>
            <Button
              variant={autoRead ? "success" : "secondary"}
              size="sm"
              onClick={toggleAutoRead}
            >
              {autoRead ? "Auto Read: ON" : "Auto Read: OFF"}
            </Button>
            <Button
              variant="warning"
              size="sm"
              onClick={handleResend}
              disabled={!lastUserQuery || loading}
              className="ml-2"
            >
              Resend
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <ListGroup variant="flush" className="chat-messages">
            {messages.map((msg, index) => (
              <ListGroup.Item
                key={index}
                className={
                  msg.sender === "bot" ? "bot-message" : "user-message"
                }
              >
                <strong>{msg.sender === "bot" ? "Bot" : "You"}: </strong>
                <span
                  dangerouslySetInnerHTML={{
                    __html: msg.text.replace(/\n/g, "<br/>"),
                  }}
                ></span>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={handleSubmit} className="mt-auto">
            <Form.Group controlId="chatInput">
              <Form.Control
                type="text"
                placeholder="Type your message or click the mic to speak..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <div className="d-flex justify-content-between mt-2">
              <Button
                variant="secondary"
                onClick={startVoiceInput}
                disabled={loading}
              >
                🎤 Voice Input
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={loading || !input.trim()}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

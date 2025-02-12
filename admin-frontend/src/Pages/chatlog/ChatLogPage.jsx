import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import "./ChatLogPage.css";

const ChatLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch chat logs from the backend endpoint
    axios
      .get(process.env.REACT_APP_API_URL + "/chat/logs")
      .then((response) => {
        setLogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chat logs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="chatlog-page mt-4">
      <h2 className="mb-4">Chat Logs</h2>
      {loading ? (
        <p>Loading chat logs...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Query</th>
              <th>Reply</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log._id}>
                <td>{index + 1}</td>
                <td>{log.query}</td>
                <td>{log.reply}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ChatLogPage;

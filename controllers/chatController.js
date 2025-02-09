const axios = require("axios");

exports.getChatResponse = async (req, res) => {
  const userQuery = req.body.query;

  try {
    // Send query to Python Flask service
    const pythonResponse = await axios.post("http://localhost:8000/process-query", {
      query: userQuery
    });

    // Return Python service's response to the client
    res.json({
      userQuery,
      botResponse: pythonResponse.data.response
    });
  } catch (error) {
    console.error("Error communicating with Python service:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

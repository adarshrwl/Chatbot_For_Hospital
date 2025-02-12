const axios = require("axios");
const ChatLog = require("../models/Chat"); // if you want to log conversations

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    // Build a hospital-specific prompt based on the user's query
    let finalPrompt = "";
    if (message.toLowerCase().includes("appointment")) {
      finalPrompt = `You are a hospital chatbot. Here is some appointment info. Answer concisely: ${message}`;
    } else if (message.toLowerCase().includes("doctor")) {
      finalPrompt = `You are a hospital chatbot. Provide information about available doctors. Answer concisely: ${message}`;
    } else if (message.toLowerCase().includes("department")) {
      finalPrompt = `You are a hospital chatbot. Provide information about the departments. Answer concisely: ${message}`;
    } else {
      finalPrompt = `You are a helpful hospital information chatbot. Answer the following question concisely: ${message}`;
    }

    // Define the Ollama API endpoint from the environment variable
    const ollamaEndpoint =
      process.env.OLLAMA_API_URL || "http://localhost:11434/v1/completions";

    // Prepare the payload based on Ollama's API requirements
    const payload = {
      prompt: finalPrompt,
      model: "llama3.2:latest", // Ensure this is the correct model identifier
      max_tokens: 256, // Adjust as needed
      temperature: 0.7, // Adjust for creativity vs. determinism
    };

    // Send a POST request to the Ollama API endpoint
    const response = await axios.post(ollamaEndpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Ollama response:", response.data);

    // Extract the reply from the response data using the choices array
    const reply =
      response.data.choices &&
      response.data.choices[0] &&
      response.data.choices[0].text
        ? response.data.choices[0].text.trim()
        : "No response from model.";
    // Optionally, save the conversation log to your database
    // const chatLog = new ChatLog({ query: message, reply });
    // await chatLog.save();

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error querying Ollama:", error);
    res
      .status(500)
      .json({ message: "Error processing your query", error: error.message });
  }
};

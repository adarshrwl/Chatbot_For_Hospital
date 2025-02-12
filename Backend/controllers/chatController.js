// controllers/chatController.js
const axios = require("axios");
const ChatLog = require("../models/Chat"); // ChatLog model for logging conversations
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Department = require("../models/Department");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    let finalPrompt = "";

    // Check if the user's query relates to doctors
    if (message.toLowerCase().includes("doctor")) {
      const doctors = await Doctor.find();
      const doctorList = doctors
        .map((doc) => `${doc.name} (${doc.specialization})`)
        .join(", ");
      finalPrompt = `You are a hospital chatbot. The available doctors are: ${doctorList}. Now answer the following question concisely: ${message}`;

      // Check if the query is about appointments
    } else if (message.toLowerCase().includes("appointment")) {
      const appointments = await Appointment.find().populate("doctor");
      const appointmentList = appointments
        .map((app) => {
          const doctorName = app.doctor ? app.doctor.name : "Unknown doctor";
          const apptTime = app.appointmentTime
            ? new Date(app.appointmentTime).toLocaleString()
            : "Unknown time";
          return `${app.patientName} with ${doctorName} on ${apptTime}`;
        })
        .join("; ");
      finalPrompt = `You are a hospital chatbot. Today's appointments are: ${appointmentList}. Now answer the following question concisely: ${message}`;

      // Check if the query is about departments
    } else if (message.toLowerCase().includes("department")) {
      const departments = await Department.find();
      const departmentList = departments
        .map((dept) => `${dept.name} (located at ${dept.location || "N/A"})`)
        .join(", ");
      finalPrompt = `You are a hospital chatbot. Our departments are: ${departmentList}. Now answer the following question concisely: ${message}`;

      // Default prompt if no keywords are detected
    } else {
      finalPrompt = `You are a helpful hospital information chatbot. Answer the following question concisely: ${message}`;
    }

    // Define the Ollama API endpoint (ensure your .env has OLLAMA_API_URL)
    const ollamaEndpoint =
      process.env.OLLAMA_API_URL || "http://localhost:11434/v1/completions";

    // Prepare the payload for the Ollama API
    const payload = {
      prompt: finalPrompt,
      model: "llama3.2:latest", // Ensure this is correct
      max_tokens: 256,
      temperature: 0.7,
    };

    // Send the POST request to the Ollama API
    const response = await axios.post(ollamaEndpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Ollama response:", response.data);

    // Extract the reply from the response
    const reply =
      response.data.choices &&
      response.data.choices[0] &&
      response.data.choices[0].text
        ? response.data.choices[0].text.trim()
        : "No response from model.";

    // Save the conversation log to the database
    const chatLog = new ChatLog({
      query: message,
      reply: reply,
      // Optionally, add user info if available:
      // user: req.user ? req.user._id : null,
    });
    await chatLog.save();

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error in chat controller:", error);
    res
      .status(500)
      .json({ message: "Error processing your query", error: error.message });
  }
};

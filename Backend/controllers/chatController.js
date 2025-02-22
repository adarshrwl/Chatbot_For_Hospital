const axios = require("axios");
const ChatLog = require("../models/Chat");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Department = require("../models/Department");

exports.chat = async (req, res) => {
  try {
    const { message, history } = req.body;
    // history is expected to be an array of objects, e.g. [{ role: "user", text: "..." }, { role: "bot", text: "..." }]

    // Build a conversation context string from the history
    let conversationContext = "";
    if (history && Array.isArray(history)) {
      conversationContext =
        history
          .map((msg) => `${msg.role === "user" ? "User" : "Bot"}: ${msg.text}`)
          .join("\n") + "\n";
    }

    let finalPrompt = conversationContext; // start with the history

    // Check if the user's query relates to doctors
    if (message.toLowerCase().includes("doctor")) {
      const doctors = await Doctor.find();
      const doctorList = doctors
        .map((doc) => `${doc.name} (${doc.specialization})`)
        .join(", ");
      finalPrompt += `You are a hospital chatbot. The available doctors are: ${doctorList}. `;
      finalPrompt += `Now answer the following question concisely: ${message}`;

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
      finalPrompt += `You are a hospital chatbot. Today's appointments are: ${appointmentList}. `;
      finalPrompt += `Now answer the following question concisely: ${message}`;

      // Check if the query is about departments
    } else if (message.toLowerCase().includes("department")) {
      const departments = await Department.find();
      const departmentList = departments
        .map((dept) => `${dept.name} (located at ${dept.location || "N/A"})`)
        .join(", ");
      finalPrompt += `You are a hospital chatbot. Our departments are: ${departmentList}. `;
      finalPrompt += `Now answer the following question concisely: ${message}`;

      // Default prompt if none of the keywords are detected
    } else {
      finalPrompt += `You are a helpful hospital information chatbot. Answer the following question concisely: ${message}`;
    }

    // Define the Ollama API endpoint
    const ollamaEndpoint =
      process.env.OLLAMA_API_URL || "http://localhost:11434/v1/completions";

    // Prepare the payload for Ollama
    const payload = {
      prompt: finalPrompt,
      model: "llama3.2:latest",
      max_tokens: 256,
      temperature: 0.7,
    };

    // Send the request to Ollama
    const response = await axios.post(ollamaEndpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Ollama response:", response.data);

    // Extract the reply
    const reply =
      response.data.choices &&
      response.data.choices[0] &&
      response.data.choices[0].text
        ? response.data.choices[0].text.trim()
        : "No response from model.";

    // Optionally log the conversation with context
    const chatLog = new ChatLog({
      query: conversationContext + "User: " + message,
      reply: reply,
      // Optionally include user info if available: user: req.user ? req.user._id : null,
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

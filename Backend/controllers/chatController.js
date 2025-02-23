const axios = require("axios");
const Sentiment = require("sentiment");
const ChatLog = require("../models/Chat");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Department = require("../models/Department");

const sentiment = new Sentiment();

exports.chat = async (req, res) => {
  try {
    const { message, history } = req.body;

    // Analyze Sentiment
    const sentimentScore = sentiment.analyze(message).score;

    // Build conversation context
    let conversationContext = "";
    if (history && Array.isArray(history)) {
      conversationContext =
        history
          .map((msg) => `${msg.role === "user" ? "User" : "Bot"}: ${msg.text}`)
          .join("\n") + "\n";
    }

    let promptContext = ""; // This will store all database info
    let chatbotResponse = "";

    // 🚨 Handle Urgent Cases 🚨
    if (sentimentScore < -2) {
      chatbotResponse =
        "I'm really sorry to hear that. Would you like me to connect you with a hospital representative for assistance?";
      return res
        .status(200)
        .json({ reply: chatbotResponse, sentiment: sentimentScore });
    }

    // **Doctor Queries**
    const doctorQuery = message.match(/dr\.\s*(\w+\s*\w*)/i);
    if (doctorQuery) {
      const doctorName = doctorQuery[1].trim();
      const doctor = await Doctor.findOne({
        name: { $regex: doctorName, $options: "i" },
      }).populate("department");

      if (!doctor) {
        promptContext += `No doctor named ${doctorName} was found in the hospital database.\n`;
      } else {
        promptContext += `Here is the information for Dr. ${doctor.name}:
          - Specialization: ${doctor.specialization}
          - Timings: ${doctor.timings}
          - Consultation Fee: Rs. ${doctor.consultationFee}
          - Contact: ${doctor.contact}
          - Experience: ${doctor.experience} years
          - Department: ${doctor.department?.name || "No Department"}\n`;
      }
    } else if (message.toLowerCase().includes("doctors")) {
      const doctors = await Doctor.find().populate("department");

      if (!doctors || doctors.length === 0) {
        promptContext += "No doctors found in the hospital database.\n";
      } else {
        promptContext += "Here are the available doctors:\n";
        doctors.forEach((doc) => {
          promptContext += `- Dr. ${doc.name} (${doc.specialization}, ${
            doc.department?.name || "No Department"
          })
            Timings: ${doc.timings}, Consultation Fee: Rs. ${
            doc.consultationFee
          }, Contact: ${doc.contact}, Experience: ${doc.experience} years.\n`;
        });
      }
    }

    // **Appointment Queries**
    else if (message.toLowerCase().includes("appointment")) {
      const appointments = await Appointment.find().populate("doctor");

      if (!appointments || appointments.length === 0) {
        promptContext += "No appointments found for today.\n";
      } else {
        promptContext += "Here are today's appointments:\n";
        appointments.forEach((app) => {
          const doctorName = app.doctor ? app.doctor.name : "Unknown doctor";
          const apptTime = app.appointmentTime
            ? new Date(app.appointmentTime).toLocaleString()
            : "Unknown time";
          promptContext += `- Patient ${app.patientName} with Dr. ${doctorName} on ${apptTime}.\n`;
        });
      }
    }

    // **Department Queries**
    else if (message.toLowerCase().includes("department")) {
      const departments = await Department.find();

      if (!departments || departments.length === 0) {
        promptContext += "No departments found in the hospital.\n";
      } else {
        promptContext += "We have the following departments:\n";
        departments.forEach((dept) => {
          promptContext += `- ${dept.name} (Located at: ${
            dept.location || "N/A"
          }).\n`;
        });
      }
    }

    // **General Queries**
    else {
      promptContext += `You are a helpful hospital chatbot. Answer the following question: ${message}\n`;
    }

    // **Final Prompt for Ollama**
    const finalPrompt = `
      You are a hospital chatbot that provides information about doctors, appointments, and departments. 
      Based on the user's query and the following hospital data, generate an informative and natural response which also should be short .
      
      ${promptContext}
      
      User's Query: ${message}
    `;

    // **Ollama API Call**
    const ollamaEndpoint =
      process.env.OLLAMA_API_URL || "http://localhost:11434/v1/completions";

    const payload = {
      prompt: finalPrompt,
      model: "llama3.2:latest",
      max_tokens: 600,
      temperature: 0.7,
    };

    const response = await axios.post(ollamaEndpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Ollama response:", response.data);

    // Extract AI Response
    chatbotResponse =
      response.data.choices &&
      response.data.choices[0] &&
      response.data.choices[0].text
        ? response.data.choices[0].text.trim()
        : "No response from AI model.";

    // **Log chat conversation**
    const chatLog = new ChatLog({
      query: conversationContext + "User: " + message,
      reply: chatbotResponse,
    });
    await chatLog.save();

    res.status(200).json({ reply: chatbotResponse, sentiment: sentimentScore });
  } catch (error) {
    console.error("Error in chat controller:", error);
    res
      .status(500)
      .json({ message: "Error processing your query", error: error.message });
  }
};

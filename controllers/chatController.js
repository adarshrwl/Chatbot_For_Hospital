exports.getChatResponse = (req, res) => {
    const userQuery = req.body.query;
  
    // Example: Dummy logic for now
    let botResponse = "Sorry, I couldn't understand your query.";
  
    // Simulate a response based on the query
    if (userQuery.toLowerCase().includes("doctor")) {
      botResponse = "You can find doctors in the Main Building, Floor 1.";
    } else if (userQuery.toLowerCase().includes("pharmacy")) {
      botResponse = "The pharmacy is located near the main entrance.";
    }
  
    res.json({
      userQuery,
      botResponse,
    });
  };
  
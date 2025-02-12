const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader); // Log the Authorization header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("Missing or invalid Authorization header"); // Log missing header
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token
  console.log("Extracted Token:", token);

  try {
    // Verify the token and attach user payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to req.user
    console.log("Token Verified. Decoded Payload:", decoded); // Debug log
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Token verification failed:", error.message); // Debug log
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
